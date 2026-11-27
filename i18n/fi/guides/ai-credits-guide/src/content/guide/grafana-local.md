---
title: Suunnittele paikallinen Grafana-näkymä
section: Tiedon visualisointi
order: 405
description: Erota vientiin perustuva menokoontinäyttö seuratun asiakkaan vianmääritysnäkymästä.
verified: "2026-11-12"
diagram: grafana-dashboard
checks:
  - question: Paikallinen agentin jäljitys tallentaa tokenien käytön. Onko se GitHubin laskuttama summa?
    answer: Ei. Se on seuratun asiakkaan havainto, ei laskutettu maksu eikä Copilotin täydellinen kattavuus. Täsmäytä menot GitHub-laskutukseen.
  - question: Infinity lukee laskutuksen CSV-tiedostoa, mutta numeeriset summat eivät käyttäydy numeroina. Mitä analyytikon pitäisi tarkistaa?
    answer: CSV-sarakkeet palautetaan oletusarvoisesti merkkijonoina. Määritä numero- ja aikaleimamuodot harkiten ja täsmäytä muunnettu tulos alkuperäiseen vientiin.
  - question: Pitäisikö koontinäyttöesimerkin captureContent-asetus kopioida oletusarvoisesti arvoon true?
    answer: Ei. Sisällön tallennus voi sisältää kehotteita, vastauksia, koodia ja työkalujen argumentteja. Jätä se pois käytöstä, ellei käytäntö nimenomaisesti salli sitä ja ympäristö ole luotettu.
sources:
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
  - https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights
  - https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion
  - https://grafana.com/grafana/dashboards/25053-github-copilot/
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Suunnittelemaan pienen laskutuskoontinäytön esittämättä esimerkkiarvoja näyttönä.
- Erottamaan yleisen vienti-integraation telemetriakoontinäytöstä.
- Suojaamaan laskutuksen tunnistetiedot, raporttien henkilötiedot ja tallennetun sisällön.

<a id="read-the-wireframe"></a>

## Rautalankamallin tulkinta

Kuva on **lähtösuunnitelma, ei toimiva koontinäyttö**. Kukin paneeli nimeää lähdekentän ja kysymyksen, johon se vastaa. Siinä ei ole keksittyjä trendejä, arvoja tai asiakastietueita. Sen päivitysaikaleima on paikallista poiminnan metatietoa. Erillinen vianmääritysnäkymä käsittelee asiakastelemetriaa.

<a id="job-1-spending-and-attribution-from-billing"></a>

## Tehtävä 1: menot ja kohdistus laskutuksesta

**Oppaan neuvo, ei virallinen GitHub-integraatio:** ajoita valtuutettu AI-käytön CSV- tai AI-krediittien REST-vienti Grafanan ulkopuolella, säilytä sen jakso ja tililaajuus ja tarjoa sitten rajoitettu raportointipoiminta yleisen tietolähteen kautta.

Grafanan [Infinity-laajennus](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) voi kysellä REST-päätepisteitä sekä muotoja kuten JSON ja CSV. Sen CSV-dokumentaatio tukee URL-osoitetta tai rivinsisäistä dataa; se ei vahvista suoraa paikallisen tiedoston lähdettä. Paikallinen vienti tarvitsee siis tarkoituksella tarjotun HTTP-päätepisteen tai sopivan rivinsisäisen tuonnin, ei oletettua tiedostojärjestelmän valitsinta. Infinity vaatii Grafana 11.6:n tai uudemman eikä ole suunniteltu suurille tietoaineistoille; rivinsisäisten katkelmien pitäisi olla alle 1 MB.

Aloita otsakkeista ja määritä sitten kenttätyypit. CSV-sarakkeet ovat **oletusarvoisesti merkkijonoja**; valitse tarvittaessa Number- tai Timestamp-muoto. Suojaa poiminnan päätepiste sekä koontinäyttö.

| Aloituspaneeli | Lähde | Määritelty laskelma ja kysymys |
| --- | --- | --- |
| Kulutus mallin mukaan | AI-CSV:n `model`, `unit_type`, `quantity` | Oppaan laskelma: laske `quantity` yhteen mallin ja yksikön mukaan; mitkä mallit aiheuttavat raportoitua kulutusta? |
| Nettomaksut omistajan mukaan | CSV:n `cost_center_name`, `net_amount` | Oppaan laskelma: laske `net_amount` yhteen omistajan mukaan yhdelle tilille ja jaksolle; minne maksut kohdistetaan? |
| Kohdistamaton käyttö | Yrityksen REST-kysely `cost_center_id=none` | Tarkastele tätä suodatettua laajuutta; mikä tarvitsee omistajuuden tarkistusta? Älä oleta vastauskenttää `costCenter.name` |
| Viennin tuoreus | Paikallinen `fetched_at`-metatieto | Oppaan laskelma: nykyinen aika miinus hakuaika; kuinka vanha poiminta on? Tämä ei osoita laskutustietojen täydellisyyttä |

<a id="worked-example-an-analysts-weekly-view"></a>

## Esimerkki: analyytikon viikkonäkymä

**Hypoteettinen määritys:** Analyytikolla on jo tarkistettu viikoittainen AI-käytön CSV. Hän pitää raakiedoston rajoitettuna, julkaisee sopivasti rajatun poiminnan paikalliseen raportointipäätepisteeseen ja määrittää Infinityn lukemaan sitä. Hän määrittää numeeriset tyypit, valitsee lähteen kanssa saman jakson, rakentaa kaksi ensimmäistä paneelia ja vertaa molempia kokonaissummia CSV-tiedostoon.

Jos hän tutkii kohdistamatonta käyttöä, hän hakee erikseen rajatun yrityspoiminnan käyttäen `cost_center_id=none` ja merkitsee kyseisen paneelin laajuuden. Hän ei lisää sitä uudelleen kokonaissummaan, joka sisältää sen jo. Hän kirjaa hakuajan paikallisesti ja näyttää sen väittämättä tietojen olevan reaaliaikaisia.

GitHubin laskutustunnistetieto pysyy vientiprosessissa **koontinäyttöjen ja tietovarastojen ulkopuolella**. Laskutusviennit sisältävät käyttäjätunnuksia ja kustannuksia. **Oppaan neuvo:** paikallinen koontinäyttö on yhden analyytikon lähtökohta; jaettu käyttöönotto tarvitsee päätökset pääsynhallinnasta, rajatuista tiedoista ja säilytyksestä.

<a id="job-2-agent-behavior-from-client-telemetry"></a>

## Tehtävä 2: agentin toiminta asiakastelemetriasta

[VS Coden seurantaopas](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) dokumentoi Copilot Chatin OpenTelemetry-jäljitysten, -mittareiden ja -tapahtumien viennin, mukaan lukien tokenien käytön. Se kuvaa paikalliset **Aspire Dashboard**- ja **Jaeger**-vaihtoehdot, Application Insightsin ja muut OTLP-taustajärjestelmät. Nämä ovat seurattujen asiakkaiden havaintoja, **eivät maksuja eivätkä kaikki Copilot-käyttöympäristöt**.

Esimerkiksi `gen_ai.client.token.usage` raportoi tokenit, `gen_ai.client.operation.duration` mittaa keston sekunteina ja `copilot_chat.tool.call.count` raportoi työkalukutsut. Käytä niitä toiminnan tutkimiseen, älä laskutussumman keksimiseen. Päätteessä käynnistetyt Copilot CLI -istunnot tuottavat itsenäisiä juurijäljityksiä nimen `github-copilot` alla; dokumentoitu CLI-ajoympäristö tukee tilaa `otlp-http`, ei kaikkia viejätiloja.

[Microsoftin Grafana-opas](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) kuvaa ketjun **Collector → Azure Monitor exporter → Application Insights → Grafana**, jossa käytetään Azure Monitor -tietolähdettä. Collector ja viejä ovat yhteisön tukemia komponentteja; Azure-palvelun tuki on erillinen rajaus. [Luettelon koontinäyttö 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) vaatii Grafana 11.6+:n ja Application Insights -telemetrian Azure Monitorin kautta. Se ei ole käyttövalmis paikallinen GitHub-laskutuksen koontinäyttö.

**Azure Monitor OTLP Collector -vastaanotto — <span class="status caution">julkinen esiversio - käytä harkiten</span>:** Microsoftin Grafana-opas merkitsee [asiaan liittyvän vastaanottoartikkelin](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) merkinnällä ”(Preview)”, mutta artikkelissa itsessään ei tarkastellussa tekstissä ole esiversiomerkintää. Säilytä varoitus ja tarkista [lähderistiriita](/sources/#visualisation-source-tensions-reviewed-2026-11-12). Sen natiivi OTLP-vastaanoton määritys ei ole sama kuin yllä kuvattu viejä- ja yhteysmerkkijonoreitti.

<a id="keep-content-capture-off-unless-approved"></a>

## Pidä sisällön tallennus pois käytöstä, ellei sitä ole hyväksytty

VS Code -oppaan mukaan kehotteita, vastauksia tai työkalujen argumentteja ei tallenneta oletusarvoisesti. `github.copilot.chat.otel.captureContent` on oletusarvoisesti `false`; sen käyttöönotto voi sisällyttää arkaluonteista sisältöä. Jotkin julkaistut esimerkit ottavat sen käyttöön. **Oppaan neuvo:** älä kopioi asetusta, ellei käytäntö salli sitä ja ympäristö ole luotettu.

Sama opas merkitsee Local harnessin vanhentuneeksi, ja sen poisto on suunniteltu helmikuulle 2027. Noudata ajantasaisia harness-kohtaisia ohjeita sen sijaan, että oletat yhden määrityksen kattavan jokaisen istunnon. Sen telemetriaominaisuuden yleinen julkaisuvaihe on tarkastellulla sivulla **tila vahvistamaton**; dokumentaatio yksin ei väitä yleistä saatavuutta.
