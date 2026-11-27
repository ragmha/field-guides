---
title: Alueellinen sijainti ei ole sama kuin suvereniteetti
section: Miksi suvereniteetti
order: 2
description: Jaa suvereniteetti neljään kerrokseen, katso, mitkä niistä GHE.com EU:ssa kattaa, ja päätä, mitkä jäännösriskit hyväksyt.
verified: "2026-11-12"
diagram: sovereignty-layers
checks:
  - question: Hankintalomakkeessa kysytään, onko GHE.com EU:ssa "suvereeni pilvi". Miten vastaat?
    answer: Kuvaa se kerroksittain kyllä- tai ei-vastauksen sijaan. Se tarjoaa vahvan datan sijainnin EU:ssa, asiakkaan hallinnan identiteettiin ja suureen osaan operaatioista, EU:lle sopivan sopimuskehyksen ja yhdysvaltalaisomisteisen palveluntarjoajan. Komission ehdottamassa nelitasoisessa mallissa datan alueellinen sijainti vastaa tasoa 1.
  - question: Sopimuksesi GitHubin kanssa on suora ja päätoimipaikkasi sijaitsee Saksassa. Minkä maan lakia sopimukseen sovelletaan?
    answer: Irlannin lakia ja Dublinin tuomioistuimia GitHub General Termsin kohdan 10.11 mukaisesti. DPA:n vakiosopimuslausekkeisiin sovelletaan Alankomaiden lakia.
  - question: Mitä suvereniteetin kerrosta testattu irtautumissuunnitelma koskee?
    answer: Siirrettävyyttä ja irtautumista. Se ei muuta datan tallennuspaikkaa tai palveluntarjoajan omistajaa, mutta rajoittaa riippuvuuttasi, jos riskitilanne muuttuu.
sources:
  - https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act
  - https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf
  - https://eur-lex.europa.eu/eli/reg/2018/1807/oj
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://github.com/customer-terms/general-terms
  - https://github.com/customer-terms/github-data-protection-agreement
  - https://transparencycenter.github.com/
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Kuvaamaan suvereniteettia neljän kerroksen avulla ilman iskulauseita.
- Kertomaan tarkasti, mitä GHE.com EU:ssa kattaa kullakin tasolla.
- Kirjaamaan hyväksymäsi jäännösriskit ja niiden perustelut.

<a id="three-words-that-get-mixed-up"></a>
## Kolme helposti sekoittuvaa käsitettä

- **Datan alueellinen sijainti:** palveluntarjoaja sitoutuu tallentamaan ja joskus käsittelemään datasi valitulla maantieteellisellä alueella. Se on sopimuksella tuettu tuotteen ominaisuus. GHE.com EU:ssa tarkoittaa datan alueellista sijaintia.
- **Datan lokalisointi:** *lakisääteinen vaatimus* pitää data tietyllä alueella. EU:n lainsäädäntö määrittelee sen [asetuksen 2018/1807 3 artiklan 5 kohdassa](https://eur-lex.europa.eu/eli/reg/2018/1807/oj) ja yleensä rajoittaa jäsenvaltioita asettamasta sitä muille kuin henkilötiedoille.
- **Suvereniteetti:** se, missä määrin sinä ja EU:n lainsäädäntö hallitsette palvelua: missä data on, kuka sitä operoi, minkä maan laki ulottuu siihen ja voitko irtautua.

Euroopan komission [ehdottama Cloud and AI Development Act](https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act) konkretisoi eron neljällä varmennustasolla:

| Taso | Ehdotettu määritelmä |
| --- | --- |
| 1 | Dataa käsitellään ja tallennetaan unionissa sijaitsevassa infrastruktuurissa. |
| 2 | Palveluntarjoajat osoittavat riippumattomuutensa kolmansista maista sekä ohjelmistotoimitusketjunsa läpinäkyvyyden. |
| 3 | Palveluntarjoajat ovat EU:sta omistettuja ja hallittuja ja täyttävät lisäkriteerit, kuten henkilöstön kansalaisuutta koskevat ehdot. |
| 4 | Ohjelmistotoimitusketjun täydellinen läpinäkyvyys ja hallinta eikä kolmannen maan puuttumista. |

Komission [Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf), jota se käyttää omissa pilvipalveluhankinnoissaan, menee pidemmälle: siinä on kahdeksan tavoitetta strategisesta ja oikeudellisesta suvereniteetista toimitusketjuun ja kestävyyteen.

**Guide advice (oppaan suositus):** useimmat yksityisen sektorin vaatimukset koskevat tasoa 1 sekä vahvoja sopimusehtoja. Käytä tason 3 tai 4 sanastoa vain, jos sääntelyviranomainen, tarjouskilpailu tai asiakassopimus sitä todella vaatii. Nämä tasot sulkevat yhdysvaltalaisomisteiset palveluntarjoajat tarkoituksellisesti ulkopuolelle.

<a id="four-layers-and-where-ghecom-in-the-eu-lands"></a>
## Neljä kerrosta ja GHE.comin sijoittuminen EU:ssa

Käytä näitä kerroksia minkä tahansa palveluntarjoajan kuvaamiseen. Arvio on oppaan suositus, joka perustuu GitHubin julkiseen dokumentaatioon ja ehtoihin.

<a id="1-data-location-strong"></a>
### 1. Datan sijainti: vahva

GitHub [tallentaa asiakassisällön, Actionsin tiedot ja lokit, varmuuskopiot ja henkilötunnisteet](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency) EU-alueella. [DPA:n kohta 7.A](https://github.com/customer-terms/github-data-protection-agreement) tekee aluevalinnastasi sopimuksellisen ohjeen: ”GitHub tallentaa soveltuvat tiedot kyseisen ohjeen perusteella.” Poikkeukset on dokumentoitu, ja Copilot edellyttää käytännön käyttöönottoa. Katso [datakartta](/part-3/1-data-map/) ja [Copilot](/part-6/1-copilot/).

<a id="2-operational-control-shared"></a>
### 2. Operatiivinen hallinta: jaettu

Hallitset identiteettiä Enterprise Managed Users -käyttäjien ja oman identiteetintarjoajasi avulla, ehdollista pääsyä, IP-sallittujen luetteloita, auditointilokin suoratoistoa omaan tallennustilaasi ja Azure-yksityisverkotusta runnereille. GitHub operoi alustaa, tukea ja tietoturvan valvontaa.

Arvioinnissamme ei löytynyt julkista sitoumusta siitä, että vain EU:ssa sijaitseva henkilöstö voi käyttää GHE.com-järjestelmiä. **Guide advice (oppaan suositus):** jos tarvitset tämän, ota se esiin neuvotteluissa ja pyydä vastaus kirjallisena.

<a id="3-legal-jurisdiction-mixed"></a>
### 3. Oikeudellinen toimivalta: vaihteleva

Edut:

- Suorissa sopimuksissa, jos päätoimipaikkasi on EU:ssa, ETA:ssa tai Sveitsissä, [GitHub General Termsin kohta 10.11](https://github.com/customer-terms/general-terms) määrää sopimukseen sovellettavaksi Irlannin lain ja Dublinin tuomioistuimet.
- DPA:n vakiosopimuslausekkeisiin sovelletaan Alankomaiden lakia.
- DPA:n liite IV sitouttaa GitHubin ohjaamaan viranomaismääräykset asiakkaalle, ilmoittamaan niistä ja riitauttamaan ne sekä korvaamaan rekisteröidyille vahinkoja joissakin tapauksissa.
- GitHub julkaisee [läpinäkyvyysraportin](https://transparencycenter.github.com/).

Jäljelle jää:

- GitHub, Inc. on Microsoftin omistama yhdysvaltalainen yhtiö, joten Yhdysvaltain oikeudelliset menettelyt voivat ulottua siihen.
- General Termsin kohta 10.5 sallii GitHubin keskeyttää tai päättää palvelun, jos sopimuksen täyttäminen rikkoisi Yhdysvaltain tai muuta kauppa- ja pakotelainsäädäntöä.
- Kohta 9.4 sallii GitHubin muuttaa tuotetta tai vetää sen pois lainkäyttöalueelta uuden sääntelyn vuoksi; ainoa hyvityskeino on maksun palautus.

<a id="4-portability-and-exit-good-for-code-plan-the-rest"></a>
### 4. Siirrettävyys ja irtautuminen: hyvä koodille, suunnittele loput

Git on avoin muoto, joten täydellinen klooni sisältää repositorion historian. Suoran oston General Terms ([kohta 9.5](https://github.com/customer-terms/general-terms)) sallii enintään 90 päivää sopimuksen päättymisen jälkeen repositoriodatan siirtämiseen tai siirtopyynnön tekemiseen ilman tuotantokäyttöä. Varmista ostokseesi soveltuvat ehdot. Issuet, pull request -historia, Actions-työnkulut, salaisuudet, Packages ja integraatiot tarvitsevat oman vientisuunnitelmansa. GHE.comista takaisin github.comiin ei ole virallista migraatiopolkua. Katso [Ota käyttöön, yhdistä ja siirrä](/part-9/1-migrate/).

<a id="write-down-the-residual-risk"></a>
## Kirjaa jäännösriski

Luottamus ei tarkoita nollariskiä. Se tarkoittaa, että jokaisella jäljellä olevalla riskillä on omistaja, perustelu ja tarkistuspäivä.

| Jäännösriski | Tyypillinen käsittely | Omistaja |
| --- | --- | --- |
| Yhdysvaltain oikeudellinen menettely ulottuu GitHubiin | Hyväksy vedoten DPA:n liitteeseen IV, läpinäkyvyysraportointiin ja datasi arkaluonteisuuteen. Pidä arkaluonteisimmat salaisuudet poissa repositorioista. | Tietosuojavastaava ja lakiasiat |
| Dokumentoidut luokat poistuvat EU-alueelta | Hyväksy vähäriskiset. Hallitse muita käytännöillä, kuten Copilotin alueellisella sijainnilla ja tukipyyntöjen säännöillä. | Tietosuojavastaava ja alustatiimi |
| Pakotteet tai sääntelystä johtuva vetäytyminen | Hyväksy irtautumissuunnitelman ja kriittisten repositorioiden säännöllisten täydellisten peilien avulla. | CISO |
| Palvelua operoivan henkilöstön sijainti | Hyväksy tai neuvottele sopimussitoumus. | Hankinta |
| Lukittuminen muuhun kuin Git-dataan | Vähennä vientikomentosarjoilla ja asetusten infrastruktuuri koodina -ratkaisuilla. | Alustatiimi |

<a id="worked-example-the-sovereignty-questionnaire"></a>
## Esimerkki: suvereniteettikysely

**Hypothetical scenario (hypoteettinen tilanne):** Ohjelmistotoimittaja osallistuu aluehallinnon tarjouskilpailuun. Tarjouspyynnössä kysytään jokaisen toimitettavaan koodiin koskevan työkalun ”suvereniteettitasoa”.

Tiimi vastaa kerroksittain sen sijaan, että väittäisi ratkaisua ”täysin suvereeniksi”:

- Datan sijainti: EU, Copilotin alueellisen sijainnin käytäntö käytössä.
- Operaatiot: identiteetti ja lokit toimittajan hallinnassa.
- Lainkäyttövalta: Irlannin lain alainen sopimus, yhdysvaltalaisomisteinen palveluntarjoaja ja liitteen IV sitoumukset.
- Irtautuminen: Git-peilit toimittajan omassa EU-tallennuksessa ja palautustesti neljännesvuosittain.

Tarjouspyyntö edellytti kehitystyökaluilta vain tasoa 1, joten vastaus saa täydet pisteet. Sen rehellisyys välttää myös myöhemmän kiistan ”suvereeni”-väitteestä.
