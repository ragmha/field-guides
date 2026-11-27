---
title: Käytä GitHubin sisäisiä analyysinäkymiä
section: Tiedon visualisointi
order: 402
description: Etsi kulutus ja kohdistus laskutuksesta ja käytä sitten käyttöönottomittareita sekoittamatta aktiivisuutta menoihin.
verified: "2026-11-12"
diagram: visualisation-map
checks:
  - question: Organisaation omistaja tarvitsee käyttäjäkohtaisen AI-krediittien kulutuksen, mutta ei voi suodattaa AI-käyttönäkymää käyttäjän mukaan. Mitä hänen pitäisi tehdä?
    answer: Ladata AI-käyttöraportti. Yrityksen omistajat ja laskutuspäälliköt voivat suodattaa näkymää käyttäjän mukaan; organisaation omistajat eivät näe käyttäjätason tietoja suoraan kyseisessä näkymässä.
  - question: Voiko liukuva 28 päivän käyttöönottosumma selittää kuukausilaskun maksut?
    answer: Ei. Käyttöönotto ja laskutus mittaavat eri asioita ja käyttävät eri aikavälejä. Käytä maksuihin laskutusnäyttöä ja vertaa käyttöönottoa vain yhtenevillä mittarimääritelmillä ja jaksoilla.
  - question: Käyttöraportin latauslinkki ei enää toimi päivän jälkeen. Tarkoittaako se, että käyttötietueet on poistettu?
    answer: Ei. Sähköpostilinkki vanhenee 24 tunnin kuluttua. Pyydä uusi raportti sen sijaan, että tulkitsisit vanhentuneen linkin puuttuvaksi kulutukseksi.
sources:
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Valitse kulutuskysymystä vastaava laskutusnäkymä tai raportti.
- Tunnista käyttöoikeuksien ja raportointijaksojen rajoitukset.
- Selitä, miksi käyttöönottomittarit eivät täsmää taloudelliseen kokonaislukuun.

<a id="read-the-picture"></a>

## Kuvan tulkinta

Kaksi ensimmäistä riviä ovat yrityksen eri näkymiä. **Laskutus** selittää krediittien kulutusta ja maksuja. **Copilot-käyttömittarit** kuvaavat käyttöönottoa ja aktiivisuutta. Niiden käyttäjät, aikavälit ja määritelmät voivat erota. Kaavio, jonka nimi on ”käyttö”, ei automaattisesti ole menokaavio.

<a id="start-in-billing--licensing"></a>

## Aloita Billing & Licensing -osiosta

GitHub tarjoaa **Metered usage** -sivun ja tilin käyttäessä AI-krediittejä lisäksi **AI usage** -näkymän. [Katseluoppaassa](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) yksilöidään kysymyksiä, joihin AI-näkymä vastaa: krediittien kokonaiskulutus, suurkuluttajat, menoja aiheuttavat mallit ja käyttöönotto organisaatioittain.

Käytä näkymän suodattimia, ryhmittelyä ja aikaväliä harkiten. Käyttökaavioita voi suodattaa kustannuspaikan mukaan. **Yrityksen omistajat ja laskutuspäälliköt voivat suodattaa AI-käyttöä käyttäjän mukaan. Organisaation omistajat eivät voi nähdä käyttäjätason tietoja suoraan tässä näkymässä; heidän on ladattava käyttöraportti käyttäjäkohtaista kulutusta varten.** Älä tulkitse tätä käyttöliittymän rajoitusta kaikkien REST-päätepisteiden käyttöoikeuksien kuvaukseksi.

Saat raportin valitsemalla **Get usage report**, määrittämällä raportin tiedot ja valitsemalla **Email me the report**. Ensisijaiseen sähköpostiosoitteeseen lähetetty latauslinkki **vanhenee 24 tunnin kuluttua**. Kaaviovalinnoilla voit myös ladata piirretyt tiedot.

<a id="choose-the-report-before-the-period"></a>

## Valitse raportti ennen jaksoa

[Laskutusraporttien viite](https://docs.github.com/en/billing/reference/billing-reports) erottaa nämä viennit:

| Raportti | Enimmäisjakso | Käyttötarkoitus |
| --- | --- | --- |
| Yhteenvetokäyttö | Yksi vuosi | Tuote- ja SKU-kokonaissummat sekä kustannuspaikkaraportointi |
| Yksityiskohtainen käyttö | 31 päivää | Käyttäjien ja työnkulkujen lisätiedot eri maksullisista tuotteista; saatavilla verkkokäyttöliittymästä, ei REST-päätepisteestä `/usage` |
| AI-käyttö | 31 päivää | Käyttäjäkohtaiset AI-krediitit päivämäärän, mallin ja käyttäjätunnuksen mukaan ryhmiteltynä, token-erittelyineen |

Raportit käyttävät kenttiä kuten `date`, `quantity`, `unit_type`, `gross_amount`, `discount_amount` ja `net_amount`. AI-raportti sisältää kentät `model`, `input`, `output`, `cache_read` ja `cache_write`; sen kuvaus ryhmittelee kulutuksen kenttien `date`, `model` ja `username` mukaan. `cost_center_name` ilmaisee soveltuvan kustannuspaikan. Nämä ovat dokumentoituja kenttien nimiä, eivät takuu CSV-sarakejärjestyksestä.

<a id="worked-example-explain-a-model-driven-increase"></a>

## Esimerkki: selitä mallista johtuva kasvu

**Hypoteettinen selvitys:** Organisaation omistajalta kysytään, miksi AI-krediittien kulutus kasvoi pilotin aikana. Ensin hän asettaa laskutusjakson ja ryhmittelee AI-käyttönäkymän mallin mukaan. Kaavio osoittaa, mitä kannattaa tutkia; se ei todista tietyn kehittäjän aiheuttaneen kasvua.

Koska omistaja ei voi suodattaa kyseistä näkymää suoraan käyttäjän mukaan, hän pyytää AI-käyttöraportin samalta jaksolta sen 31 päivän rajan puitteissa. Hän tarkastelee kenttiä `date`, `model` ja `username` ja säilyttää token-erittelyn tarvittaessa. Jos sähköpostilinkki vanhenee ennen tarkastelua, hän pyytää uuden raportin. Kustannuspaikkasuodatin tai `cost_center_name` auttaa yhdistämään havainnon vastuulliseen omistajaan.

Tuloksena on kulutuksen selitys kyseiselle raportointilaajuudelle ja jaksolle. Päätös siitä, oikeuttiko työkuorma kulutuksensa, tarvitsee edelleen kontekstin ja omistajan; suuri käyttö ei yksin ole arvio suoriutumisesta.

<a id="use-adoption-metrics-for-a-different-question"></a>

## Käytä käyttöönottomittareita eri kysymykseen

[Julkaisuilmoituksen](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/) mukaan Copilot-käyttömittarit tulivat **yleisesti saataville 27. helmikuuta 2026**. [Täsmäytysdokumentaatio](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) selittää eron **liukuvan 28 päivän koontinäytön** ja **päivittäisten API-tietueiden** välillä. Yksityiskohtainen IDE-aktiivisuus riippuu IDE-telemetriasta; sen poistaminen käytöstä poistaa kyseisen aktiivisuuden koontinäytöistä, API-raporteista ja vienneistä, vaikka palvelinpuolen aktiivisuus laskisi käyttäjän edelleen aktiiviseksi.

Pilotissa liukuva käyttöönottokaavio voi auttaa vastaamaan siihen, käyttävätkö ihmiset Copilotia. Se ei voi korvata edellä käytettyä laskutusraporttia. Organisaatiotason käyttöönottosummia ei myöskään pidä laskea yhteen yrityksen kokonaismääräksi: dokumentaation mukaan käyttäjät voidaan kohdistaa jokaiseen organisaatioon, johon he kuuluvat. Vertaa samanlaisia määritelmiä, tililaajuuksia ja aikavälejä, älä samankaltaisesti nimettyjä lukuja.

[Mittarien REST-viitteen](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) mukaan **Copilot usage metrics** -käytännön on oltava **Enabled everywhere**, jotta yritys voi ottaa sen päätepisteet käyttöön. Tämä on mittareiden käyttöoikeusvaatimus, ei kulutuslupa. Täsmäytyssivulla itsellään ei ole yleisen saatavuuden tai esiversion merkintää; päivätty muutosloki on yllä olevan yleistä saatavuutta koskevan väitteen näyttö.
