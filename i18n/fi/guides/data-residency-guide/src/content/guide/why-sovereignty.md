---
title: Miksi suvereniteetista keskustellaan
section: Miksi suvereniteetti
order: 1
description: Ymmärrä oikeudelliset, sääntelyyn liittyvät ja strategiset paineet, joiden vuoksi EU:n organisaatiot kysyvät, missä niiden koodi sijaitsee ja kuka pääsee siihen käsiksi.
verified: "2026-11-12"
diagram: sovereignty-drivers
additionalDiagrams:
  - decision-owners
checks:
  - question: Lakiasiainjohtajasi sanoo, että EU:n ja Yhdysvaltojen Data Privacy Framework on voimassa, joten tiedonsiirrot on ratkaistu. Mikä on riski, jos luotetaan vain tähän?
    answer: Euroopan unionin tuomioistuin kumosi molemmat aiemmat EU:n ja Yhdysvaltojen järjestelyt (Schrems I ja Schrems II). Nykyistä järjestelyä koskeva kanne hylättiin unionin yleisessä tuomioistuimessa syyskuussa 2025, mutta valitus on vireillä. Tietojen säilyttäminen EU:ssa vähentää riippuvuutta yksittäisen tiedonsiirtomekanismin pysyvyydestä.
  - question: Estääkö tietojen tallennus EU:ssa Yhdysvaltain viranomaista määräämästä yhdysvaltalaisen emoyhtiön omistamaa palveluntarjoajaa luovuttamaan tiedot?
    answer: Ei yksinään. Yhdysvaltain CLOUD Act koskee palveluntarjoajan hallussa, huostassa tai määräysvallassa olevia tietoja riippumatta siitä, säilytetäänkö niitä Yhdysvalloissa vai sen ulkopuolella. Apua tarjoaa sopimussitoumus ohjata pyynnöt asiakkaalle, ilmoittaa niistä ja riitauttaa ne; seuraavat luvut käsittelevät tätä.
  - question: Pankki kysyy, miksi sen lähdekoodirepositoriot kuuluvat DORA:n mukaiseen kolmansien osapuolten ICT-riskien hallintaan. Mikä on lyhyt vastaus?
    answer: DORA edellyttää finanssiyhteisöiltä kolmansien osapuolten ICT-riskien hallintaa, ICT-sopimuksia koskevan tietorekisterin ylläpitoa ja irtautumisstrategioita. Isännöity koodialusta, joka rakentaa ja ottaa tuotantojärjestelmiä käyttöön, on ICT-palvelu ja kuuluu siksi tähän työhön.
sources:
  - https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62018CJ0311
  - https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj
  - https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf
  - https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng
  - https://www.law.cornell.edu/uscode/text/18/2713
  - https://eur-lex.europa.eu/eli/dir/2022/2555/oj
  - https://eur-lex.europa.eu/eli/reg/2022/2554/oj
  - https://eur-lex.europa.eu/eli/reg/2023/2854/oj
  - https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Selittämään, miksi lähdekoodi ja sitä ympäröivät tiedot ansaitsevat yhtä huolellisen käsittelyn kuin asiakastiedot.
- Nimeämään EU:n suvereniteettivaatimusten taustalla olevat neljä painetta ja kuhunkin liittyvän lainsäädännön.
- Erottamaan, mihin datan alueellinen sijainti voi vastata ja mihin ei.

<a id="your-repositories-hold-more-than-code"></a>
## Repositoriosi sisältävät muutakin kuin koodia

Koodialusta on helppo luokitella ”kehittäjätyökaluiksi”. Tyypillisen yrityksen repositoriosta löytyy:

- **Henkilötietoja:** commitien tekijöiden nimiä ja sähköpostiosoitteita, issue- ja pull request -keskusteluja, tarkistuskommentteja ja auditointilokeja.
- **Liikesalaisuuksia:** algoritmeja, hinnoittelulogiikkaa ja malleja, jotka erottavat tuotteesi muista.
- **Kartta järjestelmistäsi:** infrastruktuuria koodina, verkkorakenteita, käyttöönottoputkia ja liian usein vuotanut salaisuus.
- **Korjaamattomia heikkouksia:** tietoturvahavaintoja ja yksityisiä tietoturvatiedotteita, jotka kuvaavat mahdollisia hyökkäystapoja ennen korjauksen julkaisua.

Tekoälykoodiavustajan kanssa sama aineisto kulkee myös kehotteissa ja vastauksissa. Kysymys ”missä koodimme sijaitsee ja kuka pääsee siihen käsiksi?” koskee siis tietosuojaa, tietoturvaa ja liiketoiminnan jatkuvuutta, ei vain työkaluja.

<a id="four-pressures-behind-the-question"></a>
## Kysymyksen taustalla olevat neljä painetta

<a id="1-data-protection-law-and-fragile-transfer-mechanisms"></a>
### 1. Tietosuojalainsäädäntö ja hauraat tiedonsiirtomekanismit

[GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) sallii henkilötietojen siirtämisen EU:n ulkopuolelle vain V luvun tiedonsiirtosääntöjen mukaisesti. Euroopan unionin tuomioistuin on kahdesti kumonnut EU:n ja Yhdysvaltojen välisten tiedonsiirtojen oikeusperustan. Heinäkuun 2020 [Schrems II -ratkaisussa (C-311/18)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62018CJ0311) se mitätöi Privacy Shieldin, ja yritykset joutuivat kiireesti tekemään tiedonsiirtojen vaikutustenarviointeja.

Nykyinen [EU:n ja Yhdysvaltojen Data Privacy Framework](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj) hyväksyttiin 10. heinäkuuta 2023. Unionin yleinen tuomioistuin [hylkäsi sen kumoamista koskevan kanteen](https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf) 3. syyskuuta 2025 (Latombe v Commission), ja asiassa on tehty [valitus (C-703/25 P)](https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng). Järjestely on tällä hetkellä voimassa. Historia kehottaa varautumaan sen muuttumiseen.

**Miksi alueellinen sijainti auttaa:** kun keskeiset tietosi tallennetaan GitHubin EU-alueelle, harvemmat käsittelytoimesi saattavat olla riippuvaisia siitä, että tiedonsiirtomekanismi kestää seuraavan oikeustapauksen. Alueeseen kuuluvat myös Norja ja Sveitsi; arvioi tiedonsiirrot omien olosuhteidesi perusteella.

<a id="2-reach-of-foreign-law"></a>
### 2. Ulkomaisen lain ulottuvuus

Yhdysvaltain [CLOUD Act](https://www.law.cornell.edu/uscode/text/18/2713) (18 U.S.C. § 2713) velvoittaa yhdysvaltalaiset palveluntarjoajat luovuttamaan hallussaan, huostassaan tai määräysvallassaan olevia tietoja riippumatta siitä, sijaitsevatko ne Yhdysvalloissa vai sen ulkopuolella. Myös Yhdysvaltain valvontalainsäädäntö oli Schrems II -ratkaisun ytimessä.

**Miksi alueellinen sijainti auttaa vain osittain:** GitHub on Microsoftin omistama yhdysvaltalainen yhtiö. Tietojen tallentaminen EU:ssa muuttaa niiden sijaintia, ei sitä, mitkä hallitukset voivat esittää palveluntarjoajalle vaatimuksia. Lisäksi voit hankkia sopimuksen, joka sitouttaa palveluntarjoajan vastustamaan vaatimuksia; asiaa käsitellään [DPA-luvussa](/part-7/1-dpa/).

<a id="3-operational-resilience-rules"></a>
### 3. Operatiivisen häiriönsietokyvyn säännöt

Sääntelyviranomaiset käsittelevät nyt toimittajiasi osana riskiäsi:

- **[NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj):** 21 artikla edellyttää keskeisiltä ja tärkeiltä toimijoilta toimitusketjun turvallisuuden hallintaa, mukaan lukien suorien toimittajien turvallisuus.
- **[DORA](https://eur-lex.europa.eu/eli/reg/2022/2554/oj):** soveltuu EU:n finanssiyhteisöihin 17. tammikuuta 2025 alkaen. Se edellyttää kolmansien osapuolten ICT-riskien hallintaa, ICT-sopimusten tietorekisteriä, auditointioikeuksia ja irtautumisstrategioita.
- **[Data Act](https://eur-lex.europa.eu/eli/reg/2023/2854/oj):** asettaa pilvipalvelun vaihtamista koskevia sääntöjä, ja 32 artikla edellyttää palveluntarjoajilta suojautumista kolmansien maiden hallitusten pääsyltä muihin kuin henkilötietoihin, kun pääsy olisi EU:n tai kansallisen lain vastaista.

Alusta, joka tallentaa koodisi ja suorittaa koonti- ja käyttöönottoputkesi, on näiden sääntöjen mukainen ICT-palvelu. Sinun on tiedettävä, missä se toimii, miten siitä irtaudutaan ja mitä näyttöä voit esittää valvontaviranomaiselle.

<a id="4-strategic-autonomy"></a>
### 4. Strateginen autonomia

Kesäkuussa 2026 Euroopan komissio ehdotti [Cloud and AI Development Actia](https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act) ja totesi, että liiallinen riippuvuus EU:n ulkopuolisista pilvipalveluntarjoajista aiheuttaa merkittävän riskin Euroopan digitaaliselle autonomialle ja häiriönsietokyvylle. Se on ehdotus, ei vielä laki. Julkisen sektorin ostajat pisteyttävät jo suvereniteettia tarjouskilpailuissa, ja säännellyt asiakkaat välittävät samat kysymykset toimittajilleen. Jos myyt pankeille, hallituksille tai terveydenhuoltoon, varaudu kehitysalustaasi koskevaan suvereniteettikyselyyn.

<a id="what-residency-answers-and-what-it-does-not"></a>
## Mihin alueellinen sijainti vastaa ja mihin ei

| Sidosryhmiesi kysymys | Vastaako EU:n alueellinen sijainti siihen? |
| --- | --- |
| Tallennetaanko koodimme GitHubin EU-alueella? | **Kyllä.** Repositoriot, pull requestit, Actions-lokit ja henkilötunnisteet tallennetaan alueella, johon kuuluvat myös Norja ja Sveitsi. |
| Käsitelläänkö tuettu Copilot-päättely EU-alueella? | **Ota käytäntö käyttöön.** Se on oletusarvoisesti pois käytöstä; tarkista tuetut asiakasohjelmat ja ominaisuudet. |
| Poistuuko jotain alueelta? | **Joitakin dokumentoituja luokkia voi poistua.** Telemetriaa, laskutus-, tuki- ja joidenkin ominaisuuksien tietoja voidaan tallentaa muualla. Katso [datakartta](/part-3/1-data-map/). |
| Voiko EU:n ulkopuolinen hallitus määrätä pääsyn tietoihin? | **Sijainti ei ratkaise tätä.** Sopimusehdot ja läpinäkyvyys pienentävät riskiä, mutta eivät poista sitä. |
| Voimmeko tarvittaessa irtautua? | **Osittain.** Git on siirrettävä. Suunnittele loput, kuten issuet, Actions ja integraatiot. |

**Guide advice (oppaan suositus):** kerro nämä rajat selkeästi sidosryhmillesi. Luottamus syntyy siitä, että tiedät tarkasti, mitä riskejä olet vähentänyt ja mitkä olet hyväksynyt, ei yleisestä ”suvereeni”-merkinnästä.

<a id="worked-example-the-board-question"></a>
## Esimerkki: hallituksen kysymys

**Hypothetical scenario (hypoteettinen tilanne):** Eurooppalaisen vakuutusyhtiön hallitus kysyy ulkomaista pääsyä tietoihin käsittelevän uutisen jälkeen: ”Onko lähdekoodimme turvassa ulkomaisilta hallituksilta?”

Heikko vastaus on ”kyllä, se on EU:ssa”. Vahvassa vastauksessa on neljä osaa:

1. Koodimme ja henkilötietomme tallennetaan GitHubin EU-alueella DPA:n mukaisesti, johon tämä ohje on kirjattu.
2. Kun alueellisen sijainnin käytäntö on käytössä, tuettu Copilot-päättely pysyy valitulla EU-alueella, johon kuuluvat Norja ja Sveitsi.
3. GitHub on yhdysvaltalaisomisteinen, joten jäljellä oleva riski on oikeudellinen määräys. DPA sitouttaa GitHubin ohjaamaan pyynnön esittäjän asiakkaalle, ilmoittamaan meille sallituilta osin ja riitauttamaan määräyksen. GitHub julkaisee läpinäkyvyysraportin.
4. Meillä on testattu irtautumissuunnitelma, joten emme ole lukittuina, jos riskitilanne muuttuu.

Vastaus on rehellinen ja todennettavissa, ja se antaa hallitukselle mahdollisuuden hyväksyä tietyn jäännösriskin.
