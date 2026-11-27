---
title: Lähteet, tila ja ajantasaisuus
section: Viitteet
order: 9
description: Selvitä, mille väitteille on lähde, mitkä ominaisuudet vaativat harkintaa ja milloin opas on tarkistettava uudelleen.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents
  - https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/
  - https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/billing/concepts/budgets-and-alerts
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
  - https://docs.github.com/en/rest/billing/usage
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
  - https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/
  - https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/
  - https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/
  - https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/
  - https://learn.github.com/well-architected/
  - https://learn.github.com/well-architected/overview/release-notes
  - https://learn.github.com/well-architected/governance/recommendations/governing-agents
  - https://github.blog/changelog/label/copilot/feed/
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://docs.github.com/en/billing/tutorials/automate-usage-reporting
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription
  - https://microsoft.github.io/finops-toolkit/hubs
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

- Osaat erottaa dokumentoidun toiminnan vahvistetusta julkaisutilasta.
- Osaat löytää budjettipäätöksen ensisijaisen lähteen.
- Osaat tunnistaa vanhentuneen tai ristiriitaisen näytön.

<a id="feature-status-register"></a>

## Ominaisuuksien tilarekisteri

Julkaisutila tarkistetaan erillään toiminnasta. Esiversiovaroituksen puuttuminen ei todista yleistä saatavuutta.

| Ominaisuus | Tila tarkistettaessa | Näyttö ja toimenpide |
| --- | --- | --- |
| AI-krediittien käyttöperusteinen laskutus ja yhteinen sisältyvä varanto | **Käytössä; käyttöönotto vahvistettu 1. kesäkuuta 2026** | [Siirtymäilmoitus](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) ja [1. kesäkuuta julkaistu ilmoitus](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/); käytä ajantasaista [laskutusdokumentaatiota](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) pakettien ja maksullisen käytön toimintaa varten |
| Yleiset ja henkilökohtaiset ULB:t | **Yleisesti saatavilla** | [1. kesäkuuta tehty ilmoitus](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/) toteaa nimenomaisesti ULB:iden olevan yleisesti saatavilla; se ei vahvista jokaisen myöhemmän parannuksen vaihetta |
| Kustannuspaikkojen ULB:t | **Saatavilla; julkaisuvaihetta ei vahvistettu** | [30. kesäkuuta tehty ilmoitus](https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/) vahvistaa ensin RESTin kautta tapahtuvan saatavuuden ja etusijajärjestyksen, ei nimenomaista yleisen saatavuuden merkintää; nykyiset määritysohjeet kuvaavat käyttöliittymämäärityksen |
| Henkilökohtaisen ULB:n päättyminen | Julkaisuvaiheen **tilaa ei vahvistettu** | [Budjettidokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) kuvaa päättymisen mutta ei merkitse sen julkaisuvaihetta |
| Yrityksen, organisaation ja kustannuspaikan mittariperusteiset budjetit sekä poissulku | Julkaisuvaiheen **tilaa ei vahvistettu** | [Budjettidokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets); varmista määritys laskutettavassa tahossa |
| Kustannuspaikan sisältyvän käytön rajoitukset | **Saatavilla; julkaisuvaihetta ei vahvistettu** | [2. heinäkuuta tehty ilmoitus](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/) vahvistaa ensin RESTin kautta tapahtuvan saatavuuden, ei nimenomaista yleisen saatavuuden merkintää; erillinen mittariperusteisista budjeteista |
| Budjetinkorotuspyynnöt | **Yleisesti saatavilla; ei saatavilla yrityksille, joilla on hallitut käyttäjät** | [16. syyskuuta tehty ilmoitus](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/); Copilot Business ja Enterprise käyttöperusteisessa laskutuksessa |
| Copilot access GitHub Enterprisen kautta | **Saatavilla asiakastiimien kautta; itsepalvelu vaiheittain** | [28. lokakuuta tehty ilmoitus](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/); GitHub Enterprise Cloud, ei sisältyviä kuukausittaisia AI-krediittejä käyttäjäpaikkaa kohti |
| Copilot Chat, CLI, cloud agent ja Spaces | Oppaassa julkaisuvaiheen **tilaa ei vahvistettu** | Lueteltu krediittejä kuluttavina [laskutusdokumentaatiossa](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing); ei yleistä saatavuutta koskevaa kattavaa väitettä |
| Kolmannen osapuolen koodausagentit | <span class="status caution">julkinen esiversio - käytä harkiten</span> | [Ajantasainen agenttidokumentaatio](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents) merkitsee esiversion nimenomaisesti; kustannuksiin sisältyy Actions-minuutteja ja AI-krediittejä |
| CLI:n AI-krediittien istuntorajat | <span class="status caution">julkinen esiversio - käytä harkiten</span> | [Istuntorajan dokumentaatio](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) merkitsee esiversion; pehmeät rajat antavat keskeneräisen vastauksen valmistua |
| REST-laskutuksen käyttöyhteenvetopäätepisteet | <span class="status caution">julkinen esiversio - käytä harkiten</span> | [REST-käyttöviite](https://docs.github.com/en/rest/billing/usage) merkitsee organisaation ja henkilökohtaisen käyttäjän yhteenvetopäätepisteet; älä laajenna merkintää kaikkiin yrityksen tai AI-krediittiraportin päätepisteisiin |
| Yrityksen mukautetut roolit | <span class="status caution">julkinen esiversio - käytä harkiten</span> | [AI manager -ohje](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) merkitsee esiversion; sen rooliohje ei oletusarvoisesti anna Copilot-laskutuksen käyttöoikeutta |
| GitHub Agentic Workflows | **Yleisesti saatavilla** | [28. lokakuuta 2026 tehty ilmoitus](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/); oletusarvoinen Copilot CLI -moottori tarvitsee Copilot-lisenssin |
| Spark | **Poistettu käytöstä; lähderistiriita kirjattu** | Laskutusdokumentaatio luettelee sen edelleen, mutta [virallinen käytöstäpoistoilmoitus](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/) ilmoittaa poistosta 31. elokuuta 2026 jälkeen; ei käyttöönottosuositus |
| Copilot-käyttömittarit | **Yleisesti saatavilla** | Tarkistettu **2026-11-12**: [27. helmikuuta tehty yleisen saatavuuden ilmoitus](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/); täsmäytysdokumentaatiossa ei ole vaiheen merkintää |
| Yrityksen AI-krediittien REST- ja käyttöyhteenvetopäätepisteet | Julkaisuvaiheen **tilaa ei vahvistettu** | Tarkistettu **2026-11-12**: [yrityksen viite](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage) dokumentoi ne ilman esiversioilmoitusta; tästä ei päätellä yleistä saatavuutta |
| Azuren AI-krediittitiedot | **Tilaa ei vahvistettu** | Tarkistettu **2026-11-12**: [Azure-laskutus](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) luettelee Copilotin aktiiviset käyttäjäpaikat, ei käyttäjä- tai mallikohtaisia AI-krediittejä |
| FinOps hubsin GitHub AI-krediittiliitin | **Tarkastellut lähteet eivät vahvista** | Tarkistettu **2026-11-12**: [hubs](https://microsoft.github.io/finops-toolkit/hubs) dokumentoi omien tietojen tuonnin laajennettavuuden, ei tätä liitintä; mukautettu tuonti on oppaan neuvo |
| Infinity-tietolähde ja luettelon Copilot-koontinäyttö | Julkaisuvaiheen **tilaa ei vahvistettu** | Tarkistettu **2026-11-12**: [laajennuksen dokumentaatio](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) ja [koontinäyttö 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) dokumentoivat ominaisuudet ja edellytykset, eivät väitettä yleisestä saatavuudesta |
| VS Code -asiakkaan OpenTelemetry | Julkaisuvaiheen **tilaa ei vahvistettu** | Tarkistettu **2026-11-12**: [seurantaoppaassa](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) ei ole esiversion tai yleisen saatavuuden merkintää; Local harness on vanhentunut, poisto on suunniteltu helmikuulle 2027 |
| Azure Monitor OTLP Collector -vastaanotto | <span class="status caution">julkinen esiversio - käytä harkiten</span> | Tarkistettu **2026-11-12**: [Grafana-opas](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) merkitsee [asiaan liittyvän vastaanottoartikkelin](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) ”(Preview)”; linkitetyssä artikkelissa ei itsessään ole näkyvää esiversiomerkintää; ristiriita säilytetään |

<a id="visualisation-sources-reviewed-2026-11-12"></a>

## Visualisointilähteet tarkistettu 2026-11-12

Alla olevat päivämäärät koskevat näitä lähdetarkistuksia, eivät rekisterin jokaisen vanhemman väitteen uutta tarkistusta. Sivujen ja lähteiden nykyiset päivämäärät pysyvät muuttumattomina. Dokumentaatio vahvistaa mainitun ominaisuuden; vaiheen merkinnän puuttuminen ei vahvista yleistä saatavuutta.

| Lähde | Tarkistettu | Tarkistettu näyttö |
| --- | --- | --- |
| [Sisäiset käyttönäkymät](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) | 2026-11-12 | ”Organisaation omistajat eivät voi nähdä käyttäjätason tietoja suoraan”; käytä raporttia. AI-käyttö, kaavion lataus, käyttäjäsuodattimen roolit ja 24 tunnin sähköpostilinkki |
| [Laskutusraportit](https://docs.github.com/en/billing/reference/billing-reports) | 2026-11-12 | Yhteenvedon enimmäisjakso yksi vuosi; yksityiskohtaisen ja AI-raportin 31 päivää; yksityiskohtainen vain verkossa; dokumentoidut snake_case-sarakkeet ja token-erittely |
| [Kustannuspaikat suuressa mittakaavassa](https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale) | 2026-11-12 | Raportit käyttävät kenttää `cost_center_name`; käyttökaavioita voi suodattaa kustannuspaikan mukaan |
| [Mittarien täsmäytys](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) | 2026-11-12 | ”Liukuva 28 päivän aikaväli” verrattuna päivittäisiin tietueisiin; IDE-telemetrian aukot; organisaatiosummia ei saa laskea yhteen yrityksen kokonaissummaksi |
| [Mittarien yleisen saatavuuden ilmoitus](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/) | 2026-11-12 | ”GitHub Copilot -käyttömittarit ovat nyt yleisesti saatavilla” |
| [Mittarien REST-käytäntö](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) | 2026-11-12 | Käytännön on oltava ”Enabled everywhere”, jotta yritys voi ottaa päätepisteet käyttöön |
| [Yrityksen laskutuksen REST](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage) | 2026-11-12 | AI-krediittireitti, suodattimet, `usageItems`, 24 kuukauden saatavuus, rooli- ja token-sanamuoto; vastausesimerkit eivät vahvista `costCenter`-kenttää |
| [Organisaation ja käyttäjän laskutuksen REST](https://docs.github.com/en/rest/billing/usage) | 2026-11-12 | Organisaation AI-krediittireitin ja suodattimien erot; organisaation ja henkilökohtaisen käyttäjän yhteenvetojen esiversioilmoitukset ovat päätepistekohtaisia |
| [Käyttöraportoinnin automatisointi](https://docs.github.com/en/billing/tutorials/automate-usage-reporting) | 2026-11-12 | Classic-PAT-ohje ja väite, etteivät fine-grained PAT -tunnukset ole tuettuja; todennusristiriita alla |
| [Azure-laskutus](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) | 2026-11-12 | Yhdistetty laskutus, päivittäinen siirto, seuraavan kuukauden lasku; Copilot-mittari ”Number of active seats” |
| [Azure-tilauksen viite](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription) | 2026-11-12 | Tuoteryhmien rivit, SKU ja sisäiset yritys- tai kustannuspaikkatunnukset, MACC-kelpoisuus ja eri tilaukset kustannuspaikoittain |
| [FinOps hubs](https://microsoft.github.io/finops-toolkit/hubs) | 2026-11-12 | ”Bring your own data”, FOCUS ja Azuressa isännöity analytiikka; käyttöönotto- ja käyttökustannukset; tarkastellulla sivulla ei dokumentoitua GitHub AI-krediittiliitintä |
| [Infinityn yleiskatsaus](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) | 2026-11-12 | Yleinen REST/JSON/CSV-laajennus; Grafana 11.6+; ei suurille tietomäärille, rivinsisäiset katkelmat alle 1 MB |
| [Infinityn kyselylähteet](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/) | 2026-11-12 | URL hakee HTTP-päätepisteen; rivinsisäiset ja muut lähteet ovat erillisiä, ei dokumentoitua paikallisen tiedoston valitsinta |
| [Infinity CSV](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/) | 2026-11-12 | ”Oletusarvoisesti kaikki sarakkeet palautetaan merkkijonoina”; määritä numero- ja aikaleimakentät nimenomaisesti |
| [VS Coden seuranta](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) | 2026-11-12 | Jäljitykset, mittarit ja tapahtumat, token-signaalit, paikalliset Aspire/Jaeger, CLI:n itsenäiset juuret ja HTTP-viejä; sisällön tallennus oletuksena false ja arkaluonteista käytössä ollessaan |
| [Grafana ja Application Insights](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) | 2026-11-12 | Collector → Azure Monitor exporter → Application Insights → Grafana; yhteisön tukema Collector ja viejä; liittyvä vastaanottolinkki merkitty ”(Preview)” |
| [Natiivi OTLP-vastaanotto](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) | 2026-11-12 | DCR/DCE-pohjainen reitti eroaa viejän ja yhteysmerkkijonon määrityksestä; tarkastellulla sivulla itsessään ei näkyvää vaiheen merkintää |
| [Grafana Copilot -koontinäyttö 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) | 2026-11-12 | ”Grafana 11.6+ ja Azure Monitor -tietolähde”; vaatii Application Insights -telemetriaa, ei paikallista laskutustuontia |

<a id="visualisation-source-tensions-reviewed-2026-11-12"></a>

## Visualisointilähteiden ristiriidat (tarkistettu 2026-11-12)

**Todennus:** Automatisointiohje kehottaa käyttämään classic PAT -tunnusta ja sanoo, etteivät laskutuksen käyttöpäätepisteet tue fine-grained PAT -tunnuksia. Yrityksen AI-krediittien REST-viite sallii myös GitHub App -asennuksen pääsyn yrityksen laskutuksen lukuoikeudella ja kuvaa mukautettujen roolien haltijat. Organisaation päätepisteiden token-luettelot eroavat jälleen. Lähteet eivät sovita kattavuuttaan yhteen. Säilytä ero ja varmista kyseisen päätepisteen ja tilin käyttöoikeudet ennen kerääjän tunnistetiedon valintaa; opas ei ratkaise ristiriitaa.

**Kustannuspaikan skeema:** CSV dokumentoi kentän `cost_center_name`. Tarkastellut yrityksen AI-krediittien REST-esimerkit eivät vahvista rakennetta `costCenter {id, name}`, vaikka yrityksen `cost_center_id`-pyyntösuodatin on dokumentoitu. Organisaation AI-krediittisuodattimet eivät luettele kyseistä suodatinta. Älä keksi vastauskenttiä tai kopioi suodattimia laajuuksien välillä.

**Esiversion sanamuoto:** Microsoftin Grafana-artikkeli merkitsee siihen liittyvän vastaanottolinkin ”(Preview)”, mutta linkitetyllä sivulla itsellään ei tarkastellussa tekstissä ole näkyvää esiversioilmoitusta. Säilytä kyseisen polun varoitus sen sijaan, että korottaisit sen hiljaa yleisesti saatavaksi. Älä yhdistä natiivia OTLP/DCR/DCE-määritystä viejän ja yhteysmerkkijonon määritykseen.

**Esimerkit ja tietosuoja:** VS Coden mukaan sisällön tallennus on oletusarvoisesti pois käytöstä, mutta jotkin Aspire- ja Microsoft Grafana -esimerkit asettavat sen arvoon true. Opas suosittelee tarkoituksella jättämään sen pois käytöstä, ellei käytäntö salli tallennusta. Koontinäyttöluettelon token-tehokkuusosio ei vahvista GitHub-laskutusmittaria, vaikka sen otsikko mainitsisi kustannukset.

<a id="source-map"></a>

## Lähdekartta

**Tuotteen toiminta:** [Laskutus](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) ja [budjetit](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) ovat varantojen, nollausajankohdan, pakottamisen ja etusijajärjestyksen lähteitä. [Budjetin määritys](https://docs.github.com/en/billing/how-tos/set-up-budgets) on hallinnollinen menettely.

**Tuotteiden välinen kattavuus:** [Budjetit ja ilmoitukset](https://docs.github.com/en/billing/concepts/budgets-and-alerts) sekä budjetin määritys erottavat yhdistetyt AI-krediittirajat SKU-tason rajoista, mukaan lukien Code Security AI Credits. Yhteinen pakottava budjetti voi vaikuttaa useisiin tuotteisiin.

**Arkkitehtuuri- ja toimintasuositukset:** [GitHub Well-Architected](https://learn.github.com/well-architected/) ja sen [AI-krediittisuositus](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) ovat kypsyyspolun, kohdistus ensin -suunnittelun, käyttöohjeiden ja toimintarytmin perustana. [Agenttien hallinnan kustannustarkistuslista](https://learn.github.com/well-architected/governance/recommendations/governing-agents#5-cost-management) lisää agenttikustannusten ilmoitukset, mallikoulutuksen ja käytön seurannan.

**Julkaisuvaihe ja käytöstäpoisto:** GitHubin dokumentaation nimenomaiset merkinnät ja päivätyt muutosloki-ilmoitukset vahvistavat tilan. Älä käytä vanhoja esiversioilmoituksia myöhemmän yleistä saatavuutta tai käytöstäpoistoa koskevan näytön ohittamiseen.

**Esiversion käyttöönotto:** GitHubin [julkaisuvaiheiden määritelmät](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models#considering-different-release-stages), [esiversioon osallistumisen käytäntö](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies#opting-in-to-previews-or-feedback) ja [esiversion lisenssiehdot](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms) tukevat varoitusmerkintöjä. Tarkista sovellettavat ehdot ja tuotantokäytön ulkopuoliset rajoitukset; käytännön käyttöönotto ei ole tuotantokäytön hyväksyntä.

**Muutosten havaitseminen:** Seuraa [Well-Architectedin julkaisutietoja](https://learn.github.com/well-architected/overview/release-notes) ja virallista [Copilot-muutoslokisyötettä](https://github.blog/changelog/label/copilot/feed/). Ne osoittavat uudelleen luettavia artikkeleita eivätkä todista oppaan nykyisten väitteiden pysyvän ajan tasalla.

<a id="known-source-tensions"></a>

## Tunnetut lähderistiriidat

**Pakottavat pysäytykset:** Budjettidokumentaatio suosittelee pakottavien pysäytysten käyttöönottoa rajojen noudattamiseksi; Well-Architected suosittelee yrityksen pakottavan pysäytyksen pitämistä pois käytöstä jatkuvuuden vuoksi. [Opas tuo päätöksen näkyviin](/controls/#strict-cap-or-continuity) sen sijaan, että valitsisi hiljaa yhden vaihtoehdon kaikille asiakkaille.

**Mittariperusteinen reititys ja yritystason yhteenlaskenta:** Lue dokumentoitu reititysjärjestys yhdessä yrityskattoon sisällyttämisen tai poissulkemisen ja riippumattomien rajoitusten liikkumavarasäännön kanssa. Kustannuspaikan reitti ei ole ehdoton yrityskaton ohitus.

**Spark:** Laskutusluettelo ei todista tuotteen saatavuutta. Käytöstäpoistoilmoitus on ensisijainen käyttöönotossa; tämän ristiriidan tulee pysyä näkyvissä, kunnes viralliset lähteet sovitetaan yhteen.

<a id="how-freshness-is-maintained"></a>

## Ajantasaisuuden ylläpito

Jokaisella sivulla on lähteiden tarkistuspäivä ja linkit. **Nykyinen ylläpito on manuaalista:** tietovaraston ylläpitäjälle **@ragmha** on määritetty viikoittainen tarkistus **maanantaisin klo 07.37 UTC**, ja seuraava suunniteltu tarkistus on **2026-11-16**. Määritys ei tarkoita, että tarkistus olisi jo tehty.

Tarkistaja lukee kokonaiset lähteet ja tarkistaa olennaiset väitteet, julkaisumerkinnät, itsearvioinnin vastaukset ja kaavioiden tekstit. Todelliset havainnot ja näyttö kuuluvat tarkistus-PR:ään ja tietovaraston lähdehavaintojen lokiin; lähteet, joihin ei päästä, ja ratkaisemattomat ristiriidat kuuluvat `[freshness]`-issueihin. Lokia ei täytetä etukäteen ilman todellisia tarkistettuja lähdehavaintoja. Katso [manuaalisen tarkistuksen prosessi](https://github.com/ragmha/field-guides/blob/main/guides/ai-credits-guide/docs/freshness-setup.md#current-maintenance-manual-review).

Päivämäärät päivitetään vasta, kun asiaankuuluvat väitteet ja julkaisumerkinnät on todella tarkistettu uudelleen, ei vain siksi, että URL-osoite vastaa onnistuneesti. Epäonnistunut tarkistus ei todista kaiken olevan kunnossa. Seuraava sivuston koonti näyttää 30 päivän jälkeen ilmoituksen myöhästyneestä tarkistuksesta; staattinen julkaistu sivusto on koottava uudelleen, jotta koontiaikainen ilmoitus muuttuu.

**Ajantasaisuuden tarkistus on tässä monorepossa manuaalinen.** Alkuperäisen tietovaraston käytöstä poistettua GitHub Agentic Workflow -työnkulkua ei siirretty. Täällä ei ole käytössä automaattista lähdetarkistuspalvelua. Staattisen sivuston julkaisu on erillinen eikä tarvitse mallin tunnistetietoa. Katso [monorepon määritysohjeet](https://github.com/ragmha/field-guides#readme).

<a id="a-few-useful-definitions"></a>

## Hyödyllisiä määritelmiä

| Termi | Tässä oppaassa |
| --- | --- |
| Sisältyvä varanto | Kelpoisten määritettyjen lisenssien kasvattamat yhteiset kuukausittaiset AI-krediitit |
| Mittariperusteinen käyttö | Käyttö, joka synnyttää lisämaksuja; alkaa heti paketissa, johon ei sisälly varantoa |
| ULB | Käyttäjäkohtainen kulutuksen pakottava katto, mukaan lukien sisältyvä käyttö |
| Kustannusten esittäminen | Käytön ja kustannusten näkyvyys ilman sisäistä veloitusta |
| Edelleenveloitus | Sovittu taloudellisen kohdistuksen prosessi |
| Ennuste | Arvio, ei pakottava rajoitus eikä ostovaltuus |
| Poissulku | Määritetty erottaminen yritysbudjetin yhteenlaskennasta, ei maksuton käyttö |
