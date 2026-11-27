---
title: Toteuta kolmessa vaiheessa
section: Toteutus
order: 5
description: Muunna budjettipäätös toimivaksi toimintamalliksi Start-, Adopt- ja Advance-vaiheiden etenemissuunnitelman avulla.
verified: "2026-11-10"
diagram: rollout-roadmap
checks:
  - question: Paperilla tehtävässä pilotissa käyttäjälle annetaan 10 dollarin yleinen ULB, 20 dollarin kustannuspaikan ULB ja 30 dollarin henkilökohtainen ULB. Mikä on sovellettava?
    answer: 30 dollarin henkilökohtainen ULB on etusijalla. Se ei ole 10 dollarin minimi eikä 60 dollarin summa. Muut toisistaan riippumattomat sovellettavat rajoitukset voivat silti pysäyttää käyttäjän aiemmin.
  - question: AI-hallintarooli on määritetty. Todistaako se yksin, että henkilö voi muuttaa laskutusasetuksia?
    answer: Ei. Hallinta- ja laskutusvaltuudet ovat eri asioita. Varmista ehdotetun budjetin laajuuden edellyttämät käyttöoikeudet.
  - question: Pitäisikö toistuvat budjettikorotukset automatisoida ennen kuin manuaalinen hyväksyntä- ja palautumisprosessi toimii?
    answer: Ei. Varmista ensin manuaalinen prosessi, omistajuus ja havaittu toiminta ja tarkista sitten API:n tila ja käyttöoikeudet ennen automatisointia.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/copilot/tutorials/budgets/getting-started-with-budget-controls
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat toteuttaa Well-Architectedin yhdeksän vaihetta kolmessa jaksossa.
- Osaat varmistaa pilotin ennen laajentamista tai automatisointia.

<a id="read-the-roadmap"></a>

## Etenemissuunnitelman tulkinta

Etenemissuunnitelma on näyttöön perustuva vaiheistus, ei vain luettelo tallennettavista asetuksista. Start tekee omistajuudesta ja kohdistuksesta käyttökelpoisia. Adopt lisää rajatut rajoitukset ja harjoitellun palautumisen. Advance käyttää havaittuja tuloksia prosessin parantamiseen ja sen jälkeen automatisointiin. Oikealle siirtymisen peruste on toimiva luovutus, ei käyttöön otettujen rajoitusten määrä.

Ero on tärkeä, koska tallennettu summa voi näyttää oikealta, vaikka väärä käyttäjämääritys, pakottamisasetus tai käyttöoikeus tekee suunnitelmasta tehottoman. Jokainen alla oleva vaihe yhdistää toiminnon ja valmistumisen ehdon. Käsittele ehtoja hyväksytyn muistion hyväksymiskriteereinä.

<a id="before-you-begin"></a>

## Ennen aloittamista

Vahvista laskutettava taho, paketti ja käyttöoikeudet. Yrityksen omistajat ja laskutuspäälliköt määrittävät yritystason rajoitukset; organisaation omistajat määrittävät organisaation budjetit. Ota mukaan [päätösmuistio](/planning/) ja käyttäjien kustannuspaikkakohdistus.

**Yrityksen mukautetut roolit — <span class="status caution">julkinen esiversio - käytä harkiten</span>** voivat delegoida AI-hallintaa, mutta [AI manager -roolin ohje](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) ei oletusarvoisesti anna pääsyä Copilot-laskutusasetuksiin. AI-hallinta ei ole laskutusvaltuus.

Katso tarkat käyttöliittymäkentät [GitHubin ajantasaisista määritysohjeista](https://docs.github.com/en/billing/how-tos/set-up-budgets). Valitse **Bundled AI credits budget**, kun haluat kattaa kaikki AI-krediitit, tai **SKU-tason budjetti** rajatummalle katolle. Tarkista [päällekkäisyydet ja muihin tuotteisiin vaikuttavat estot](/controls/#choose-budget-type-as-well-as-scope).

<a id="start-establish-the-baseline"></a>

## Start: määritä lähtötaso

| Lähteen vaihe | Tee | Valmis, kun |
| --- | --- | --- |
| 1. Suunnittele kerrokset | Nimeä kunkin laajuus, omistaja, pakottamisvalinta ja hyväksyntä | Sisältyvän käytön rajoitukset ja mittariperusteiset budjetit pidetään erillään |
| 2. Viesti | Selitä estot, käytön näkyvyys ja eskalointi | Käyttäjät ja reagoinnista vastaavat selittävät saman ULB-tilanteen |
| 3. Yritysbudjetti | Tallenna hyväksytty mittariperusteinen summa, ilmoitukset ja pakottavan pysäytyksen valinta; tarkista maksullisen käytön käytäntö | Asetukset vastaavat hyväksyttyä katto- tai jatkuvuustavoitetta |
| 6. Kohdistus | Kohdista lähteen käyttö omistajille olemassa olevan raportin tai laskentataulukon avulla | Kokonaissummat täsmäävät ja kohdistamaton käyttö on näkyvissä |

Vaihe 6 siirtyy aiemmaksi, koska [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) pitää kohdistusta optimoinnin edellytyksenä, ei palkintona automatisointiin pääsemisestä.

<a id="adopt-add-accountable-controls"></a>

## Adopt: lisää vastuulliset rajoitukset

| Lähteen vaihe | Tee | Valmis, kun |
| --- | --- | --- |
| 4. Kustannuspaikat | Tarkista määritykset, mittariperusteiset budjetit, sisällytys yrityskattoon tai poissulku ja ilmoitukset | Jokaisella kustannuspaikalla on omistaja ja testattu pakottaminen; mahdollinen sisältyvän varannon katto määritetään erikseen |
| 5. ULB:t | Aseta lähtötaso, kustannuspaikkojen oletukset ja perustellut henkilökohtaiset ohitukset | Osaat ratkaista järjestyksen **henkilökohtainen > kustannuspaikan ULB > yleinen** ja tarkistaa tai päättää poikkeukset |
| 7. Käyttöohjeet | Opeta mallin ja tehtävän yhteensopivuutta, kontekstin hallintaa ja kulutuksen näkyvyyttä | Käyttäjät voivat tarkistaa käytön ja löytää hyväksytyn liikkumavaran |
| 8. Toimintamalli | Nimeä ilmoitusten käsittelijä, hyväksyjä, ylläpitäjä ja varahenkilö | Estolla on nimetty palautumisreitti |

ULB:t pysäyttävät käytön aina sisältyvän ja mittariperusteisen kulutuksen perusteella; nolla-ULB estää krediittejä kuluttavat ominaisuudet heti. Älä käytä vähäistä kulutusta tuottavuusmittarina.

**CLI:n AI-krediittien istuntorajat — <span class="status caution">julkinen esiversio - käytä harkiten</span>** tarjoavat istuntotason rajoituksen, mutta ovat pehmeitä rajoja: keskeneräinen vastaus valmistuu ja voi ylittää määritetyn summan. Ne eivät korvaa yritysbudjetteja tai ULB:itä. Tarkista [istuntorajan dokumentaatio](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) ja esiversiokäytäntö ennen käyttöönottoa.

<a id="advance-review-then-automate"></a>

## Advance: arvioi ja automatisoi

**9. Arvioi kuukausittain ja mukauta.** Vertaa todellista kulutusta, ennustetta, estoja, poikkeuksia ja kohdistuksen laatua. Automatisoi toistuvat toiminnot vasta, kun manuaalinen prosessi toimii; varmista API:n tila ja käyttöoikeudet. Jokainen muutos tarvitsee syyn, hyväksyjän, auditointijäljen ja tarkistuspäivän, ei vain automaattista korotusta.

<a id="validate-before-broad-rollout"></a>

## Validoi ennen laajaa käyttöönottoa

**Pilottiesimerkki (hypoteettinen):** Uusi tiimi liittyy olemassa olevaan kustannuspaikkaan. Tarkista sen kohdistus ja käyttäjäkohtainen oletus ennen muiden kutsumista. Käytä mahdollisuuksien mukaan olemassa olevia tietueita; älä synnytä maksullista käyttöä ilman lupaa.

Aloita paperiharjoituksella, älä maksullisella pyynnöllä. Oletetaan, että yleinen ULB on 10 dollaria, kustannuspaikan ULB 20 dollaria ja yhden pilottikäyttäjän henkilökohtainen ULB 30 dollaria. Nämä ovat havainnollistavia arvoja, eivät suositeltuja rajoja. Henkilökohtainen arvo on sovellettava, joten odotettu henkilökohtainen raja on 30 dollaria, ei 10 dollarin minimi tai 60 dollarin summa. Toinen jäsen, jolla ei ole henkilökohtaista ohitusta, perii sovellettavan kustannuspaikan ULB:n.

Tarkista seuraavaksi, mitä tapahtuisi, jos ensimmäinen käyttäjä kuluttaisi 30 dollarin ULB:n loppuun. Yhteiset krediitit ja vapaa yritysbudjetti eivät ohittaisi sitä. Kirjaa odotettu esto, hyväksyntäreitti ja tapa, jolla ylläpitäjä varmistaisi valtuutetun muutoksen. Jos erillinen sovellettava katto voisi estää käytön aiemmin, kirjaa sekin. Vertaa asetuksia ja mahdollisia hyväksyttyjä havaintoja näihin odotuksiin ennen pilotin laajentamista.

| Tarkistus | Odotettu tulos |
| --- | --- |
| Henkilökohtainen ULB ohittaa laajemman oletuksen | Käytetään sovellettavaa henkilökohtaista arvoa, ei rajojen summaa |
| ULB on kulutettu loppuun | Jäljellä olevat yhteiset krediitit tai tiimibudjetti eivät poista estoa |
| Mittariperusteinen pakottava pysäytys on pois käytöstä | Sitä pidetään seurantana, ei kattona |
| Kustannuspaikka on suljettu pois yrityksen laajuudesta | Sen käyttö pysyy näkyvissä ja sitä hallitaan erikseen |
| Käyttäjällä on useita lisensoivia organisaatioita | Kohdistus tarkistetaan sen sijaan, että oletetaan sen pysyvän vakaana |
| Rajoitus estää krediittien kulutuksen | Kooditäydennys ja seuraavan muokkauksen ehdotukset ovat edelleen käytettävissä |

Kirjaa asetukset ja havaitut tulokset. Tarkista ne viikoittain käyttöönoton aikana ja kuukausittain toiminnan vakiinnuttua. Pilotti onnistuu, kun toiminta vastaa hyväksyttyä muistiota.
