---
title: Rakenna laskentataulukko- tai BI-näkymä vienneistä
section: Tiedon visualisointi
order: 403
description: Säilytä raportin tarkkuustaso, tililaajuus ja alkuperätiedot ennen kaavion laskemista tai julkaisemista.
verified: "2026-11-12"
diagram: attribution-pipeline
checks:
  - question: Voiko yksityiskohtaisen käyttöraportin hakea yleisen REST-käyttöpäätepisteen kautta?
    answer: Ei. Yksityiskohtainen raportti on saatavilla vain verkkokäyttöliittymästä ja sen enimmäisjakso on 31 päivää. AI-krediittien REST-päätepiste on erillinen rajapinta, jolla on omat kenttänsä ja 24 kuukauden historia.
  - question: Yrityksen AI-krediittipoiminta suodatetaan kentällä cost_center_id. Voiko koontinäyttö olettaa jokaisen vastauksen sisältävän costCenter.name-kentän?
    answer: Ei. Tarkastellut REST-vastausesimerkit eivät vahvista kyseistä kenttää. Säilytä kyselyn laajuus poiminnan metatietoina ja tarkista todellinen vastaus; CSV-raportit dokumentoivat kentän cost_center_name.
  - question: Voiko laskentataulukossa laskea yhteen samat yrityksen ja organisaation käyttöpoiminnat suuremman kokonaissumman luomiseksi?
    answer: Ei turvallisesti. Valitse määritelty tililaajuus ja jakso ja vältä päällekkäisten tietueiden laskemista kahdesti. Täsmäytä yksi ensisijainen raportointilaajuus ennen julkaisua.
sources:
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://docs.github.com/en/rest/billing/usage
  - https://docs.github.com/en/billing/tutorials/automate-usage-reporting
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Rakentamaan hyödyllisen näkymän olemassa olevalla laskentataulukolla tai BI-työkalulla ennen infrastruktuurin lisäämistä.
- Pitämään CSV-sarakkeet erillään REST-vastauskentistä.
- Määrittelemään laskelmat ja säilyttämään riittävän näytön niiden toistamiseen.

<a id="read-the-pipeline"></a>

## Putken tulkinta

Kuvan kohdistus- ja täsmäytysvaiheet tehdään ennen kaavion julkaisua. Raportin kokonaissumma voi olla oikein, vaikka se kohdistetaan väärälle kustannusomistajalle. Vientiin perustuva näkymä tarvitsee siksi alkuperäisen jakson, maksavan tilin, lähteen ja omistajuuden käsittelyn, ei vain visualisointia.

<a id="start-with-one-csv"></a>

## Aloita yhdestä CSV-tiedostosta

AI-käyttöraportti antaa käyttäjäkohtaisen erittelyn kenttien `date`, `model` ja `username` mukaan ryhmiteltynä. Raportit dokumentoivat kentät `quantity`, `unit_type`, `gross_amount`, `discount_amount`, `net_amount` ja tarvittaessa `cost_center_name`. Token-sarakkeet käyttävät kenttiä `input`, `output`, `cache_read` ja `cache_write`.

**Oppaan neuvo:** säilytä lähdetiedosto muuttumattomana ja rakenna erillinen työtaulukko. Jäsennä päivämäärät yhdenmukaisesti, muunna numeeriset sarakkeet harkiten ja pidä ratkaisematon omistajuus näkyvissä. Valitse raporttityyppi ja tuettu aikaväli: yhteenvetoraportit kattavat enintään vuoden; yksityiskohtaiset ja AI-käyttöraportit enintään 31 päivää. Yksityiskohtaista raporttia ei saa yleisen REST-päätepisteen `/usage` kautta.

<a id="move-to-rest-when-repeated-exports-justify-it"></a>

## Siirry RESTiin, kun toistuvat viennit perustelevat sen

Yrityksen AI-krediittireitti on `GET /enterprises/{enterprise}/settings/billing/ai_credit/usage`. Sen dokumentoituja suodattimia ovat `year`, `month`, `day`, `organization`, `user`, `model`, `product` ja `cost_center_id`. Viimeisessä suodattimessa **`none` kohdistuu käyttöön ilman kustannuspaikkaa**. Saatavilla ovat vain **viimeiset 24 kuukautta**.

Organisaation vastaava reitti on `GET /organizations/{org}/settings/billing/ai_credit/usage`. Sen viite luettelee suodattimet `year`, `month`, `day`, `user`, `model` ja `product`; älä kopioi vain yritykselle tarkoitettuja suodattimia organisaatiopyyntöön.

REST-esimerkit palauttavat `usageItems`-tiedot, jotka sisältävät kentät `product`, `sku`, `model`, `unitType`, `pricePerUnit`, `grossQuantity`, `grossAmount`, `discountQuantity`, `discountAmount`, `netQuantity` ja `netAmount`. CSV käyttää snake_case-nimiä kuten `net_amount`; REST käyttää camelCase-nimiä kuten `netAmount`. Sovittimen on kohdistettava ne nimenomaisesti.

Yrityksen AI-krediittiesimerkin vastauksessa on `usageItems`-tietojen lisäksi ylimmän tason `timePeriod` (esimerkissä vain `year`) ja `enterprise`.

Tarkastellut vastausesimerkit **eivät** vahvista `costCenter`-oliota, jossa on `id` ja `name`. Säilytä valittu kustannuspaikan tunnus ja pyynnön päivämääräsuodattimet **paikallisina poiminnan metatietoina** sen sijaan, että oletat ne vastaussarakkeiksi. CSV:n dokumentoitu `cost_center_name` on eri kenttä.

Organisaation **REST-laskutuksen käyttöyhteenvetopäätepisteet — <span class="status caution">julkinen esiversio - käytä harkiten</span>** ovat erillisiä yllä olevasta AI-krediittireitistä. Yrityksen yhteenvetoviitteessä ei ole vastaavaa esiversiohuomautusta; sen julkaisuvaihe on **tila vahvistamaton**, ei päätelty yleinen saatavuus. Myös opetusohjelma ja päätepisteviite eroavat tuetun todennuksen osalta; katso [kirjattu lähderistiriita](/sources/#visualisation-source-tensions-reviewed-2026-11-12) ennen kerääjän toteuttamista.

<a id="worked-example-a-reproducible-weekly-model-view"></a>

## Esimerkki: toistettava viikoittainen mallinäkymä

**Hypoteettinen raportointiharjoitus:** Analyytikko tarvitsee viikoittaisen näkymän mallikohtaisesta kulutuksesta ja kustannusomistajakohtaisista maksuista. Hän valitsee yhden maksavan tilin ja samat seitsemän UTC-päivämäärää AI-käytön CSV-tiedostosta. Hän säilyttää tiedoston, sen hakuajan ja valitun laajuuden ja luo sitten mallin mukaan ryhmitellyn pivot-taulukon ja erillisen kustannusomistajanäkymän.

Määritä kaaviot ennen esittämistä. **Oppaan laskelmat:** mallikohtainen kulutus on `sum(quantity)` ryhmiteltynä kenttien `model` **ja `unit_type`** mukaan; omistajan nettomaksut ovat `sum(net_amount)` ryhmiteltynä kentän `cost_center_name` mukaan samassa laajuudessa ja samoina päivinä. Raportti määrittää `net_amount = gross_amount - discount_amount`. Älä laske erilaisia yksiköitä yhteen tai sekoita määrää ja rahaa.

Analyytikko täsmäyttää kokonaissummat lähteeseen ennen jakamista. Hän ei lisää päällekkäistä yrityksen ja organisaation poimintaa yhteen ikään kuin ne olisivat erillisiä maksuja. Jos hän siirtyy myöhemmin päivittäisiin REST-poimintoihin, hän säilyttää pyynnön päivämäärät paikallisina metatietoina keksimättä vastaukseen `date`-saraketta.

**Oppaan neuvo:** pidä laskutuksen tunnistetiedot poissa laskentataulukoista, koontinäyttöjen määrityksistä ja tietovarastoista. Laskutusviennit sisältävät käyttäjätunnuksia ja kustannuksia; rajoita pääsyä ja säilytysaikaa. Päivityksen aikaleima on paikallista raportoinnin metatietoa, ei tuotteen takuu reaaliaikaisesta täydellisyydestä.
