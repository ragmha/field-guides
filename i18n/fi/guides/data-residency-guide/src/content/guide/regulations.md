---
title: Kartoita sääntely
section: Sopimukset ja lainsäädäntö
order: 7
description: Yhdistä kukin GitHub-yritysympäristöäsi koskeva EU:n säädös sen vaatimuksiin, GitHubin tarjoamaan näyttöön ja omalle vastuullesi jääviin toimiin.
verified: "2026-11-12"
diagram: regulation-timeline
additionalDiagrams:
  - privacy-assessments
  - regulation-comparison
checks:
  - question: Pankkisi käyttää GHE.comia maksualustansa koodille. Mikä DORA-velvollisuus unohtuu helpoimmin?
    answer: Irtautumisstrategia. DORA:n 28 artiklan 8 kohta edellyttää irtautumisstrategioita kriittisiä tai tärkeitä toimintoja tukeville ICT-palveluille. Alueellinen sijainti ei poista tätä velvollisuutta, joten dokumentoi, miten siirtäisit repositoriot, Actions-työnkulut ja historian toiselle alustalle.
  - question: Tekeekö AI Act Copilotista kehittäjillesi suuririskisen tekoälyjärjestelmän?
    answer: Koodiavustus ei kuulu liitteen III suuririskisiin käyttötapauksiin, edellyttäen ettet käytä sitä jossakin niistä, kuten työntekijöiden arviointiin. Käyttöönottajana sinulla on silti 4 artiklan mukainen velvollisuus varmistaa henkilöstön riittävä tekoälylukutaito, jota on sovellettu 2. helmikuuta 2025 alkaen.
  - question: GitHub ei ole ESAs-viranomaisten kriittisten kolmansien osapuolten ICT-palveluntarjoajien luettelossa. Vähentääkö se DORA-velvollisuuksiasi?
    answer: Ei. Nimeäminen ratkaisee, mitä palveluntarjoajia Euroopan valvontaviranomaiset valvovat suoraan. Omat DORA-velvollisuutesi, kuten tietorekisteri, sopimusehdot, riskinarviointi ja irtautumissuunnitelmat, koskevat jokaista käyttämääsi ICT-palveluntarjoajaa.
sources:
  - https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj
  - https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf
  - https://eur-lex.europa.eu/eli/dir/2022/2555/oj
  - https://eur-lex.europa.eu/eli/reg/2022/2554/oj
  - https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital
  - https://eur-lex.europa.eu/eli/reg/2024/1689/oj
  - https://eur-lex.europa.eu/eli/reg/2023/2854/oj
  - https://eur-lex.europa.eu/eli/reg/2024/2847/oj
  - https://www.law.cornell.edu/uscode/text/18/2713
  - https://transparencycenter.github.com/
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Yhdistämään kunkin EU-säännön siihen GitHub-ympäristösi osaan, johon se vaikuttaa.
- Osoittamaan GitHubin näytön kustakin velvollisuudesta ja tunnistamaan, missä näyttöä ei ole.
- Suunnittelemaan omalle vastuullesi jäävät toimet valitsemastasi alueesta riippumatta.

Tämä on kartoitus, ei oikeudellista neuvontaa. Toimialasäännöt, kansalliset lait ja valvontaviranomaisesi ohjeet voivat tuoda lisävaatimuksia.

<a id="the-map"></a>
## Kartoitus

| Sääntö | Vaatimus | GitHubin näyttö | Oma toimesi |
| --- | --- | --- | --- |
| [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), 28 art. | Henkilötietojen käsittelijän sopimus tietyin ehdoin | [GitHub DPA](/part-7/1-dpa/) | Säilytä allekirjoitettu versio ja käsittelytoimien rekisteri |
| GDPR V luku (44–46 art.) | Oikeusperusta ETA:n ulkopuolisille siirroille | DPA §7: Data Privacy Framework -sertifiointi ja SCC-lausekkeet | Tiedonsiirron vaikutustenarviointi [alueen ulkopuolisille luokille](/part-3/1-data-map/) |
| GDPR 33 art. | Ilmoita valvontaviranomaiselle ilman aiheetonta viivytystä ja mahdollisuuksien mukaan 72 tunnin kuluessa, ellei ole epätodennäköistä, että loukkaus aiheuttaa riskiä ihmisten oikeuksille ja vapauksille | DPA §6: ilmoitus ”ilman aiheetonta viivytystä” | Lisää GitHubin ilmoitukset häiriötilanteiden toimintasuunnitelmaan |
| [NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) 21 art. 2 kohdan d alakohta | Toimitusketjun turvallisuus, mukaan lukien suorat toimittajat | SOC 1- ja SOC 2 Type 2- sekä ISO 27001 -raportit (DPA §5) | Toimittajan riskinarviointi ja alustan turvallisen kehityksen säännöt |
| [DORA](https://eur-lex.europa.eu/eli/reg/2022/2554/oj) 28 art. | Tietorekisteri; kriittisten toimintojen irtautumisstrategia (28 art. 8 kohta) | DPA §8 poisto ja palautus; General Terms §9.5, enintään 90 päivää repositorion migraatioon ilman tuotantokäyttöä | Lisää GitHub rekisteriin; varmista ehdot; kirjoita ja testaa irtautumissuunnitelma |
| DORA 30 art. | Keskeiset sopimusmääräykset yhdessä kirjallisessa asiakirjassa | Customer Agreement, DPA ja SLA-sopimukset | Vertaa sopimusta 30 artiklaan lakitiimin kanssa ja tunnista puutteet |
| [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) 4 art. | Tekoälyjärjestelmiä käyttävän henkilöstön tekoälylukutaito | Copilotin dokumentaatio ja käytännöt | Kouluta kehittäjät; säilytä kirjanpito |
| [Data Act](https://eur-lex.europa.eu/eli/reg/2023/2854/oj) VI luku | Vaihtamisoikeudet; vaihtomaksut kielletään 12. tammikuuta 2027 alkaen (29 art.) | Git on siirrettävä; vienti- ja migraatiotyökalut | Tunne vaihtoehdot ja testaa vienti |
| Data Act 32 art. | Palveluntarjoajien on toteutettava toimia kolmansien maiden laitonta pääsyä vastaan muihin kuin henkilötietoihin | DPA:n liitteen IV sitoumukset (henkilötiedoille) | Kysy GitHubilta, miten se soveltaa 32 artiklaa muihin kuin henkilötietoihin |
| [Cyber Resilience Act](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) | Toimitettujen tuotteiden haavoittuvuuksien käsittely; raportointi 11. syyskuuta 2026 alkaen | Code scanning, Dependabot, secret scanning ja auditointilokit | Käytä alustaa turvallisen kehitysprosessisi todentamiseen |

<a id="key-dates"></a>
## Keskeiset päivämäärät

| Päivä | Tapahtuma |
| --- | --- |
| 17. tammikuuta 2025 | DORA:n soveltaminen alkaa |
| 2. helmikuuta 2025 | AI Actin lukuja I ja II aletaan soveltaa, mukaan lukien 4 artiklan tekoälylukutaito |
| 2. elokuuta 2025 | AI Actin yleiskäyttöisten tekoälymallien tarjoajia koskevia sääntöjä aletaan soveltaa |
| 12. syyskuuta 2025 | Suurinta osaa Data Actista aletaan soveltaa |
| 18. marraskuuta 2025 | Euroopan valvontaviranomaiset julkaisevat [ensimmäisen kriittisten kolmansien osapuolten ICT-palveluntarjoajien luettelon](https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital) |
| 2. elokuuta 2026 | Suurinta osaa AI Actista aletaan soveltaa |
| 11. syyskuuta 2026 | Cyber Resilience Actin raportointivelvollisuuksia (14 art.) aletaan soveltaa |
| 12. tammikuuta 2027 | Data Actin vaihtomaksujen kielto |
| 11. joulukuuta 2027 | Cyber Resilience Actin pääasiallisia velvollisuuksia aletaan soveltaa |

NIS2:n täytäntöönpanon määräaika oli 17. lokakuuta 2024. Velvollisuutesi riippuvat maasi kansallisesta laista, joten tarkista sen tilanne.

<a id="transfers-why-the-legal-basis-still-matters"></a>
## Tiedonsiirrot: miksi oikeusperusta on edelleen tärkeä

EU-US Data Privacy Framework perustuu [riittävyyspäätökseen 2023/1795](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj). Unionin yleinen tuomioistuin hylkäsi Latomben kanteen 3. syyskuuta 2025 ([lehdistötiedote](https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf)). Valitus unionin tuomioistuimeen on vireillä.

Kaksi aiempaa tiedonsiirtojärjestelyä, Safe Harbour ja Privacy Shield, kumottiin. Alueellinen sijainti voi vähentää tiedonsiirtoihin liittyvää altistumista: repositorion sisältö ja tuettu Copilot-päättely pysyvät GitHubin valitulla EU-alueella, johon kuuluvat myös Norja ja Sveitsi. DPA sisältää myös SCC-lausekkeet, ja jotkin luokat voivat poistua alueelta. Arvioi asiaankuuluvat tiedonsiirrot ja soveltuvat ehdot.

**Guide advice (oppaan suositus):** kirjoita tiedonsiirron vaikutustenarviointi niin, että se toimii edelleen, jos Data Privacy Framework kumotaan. Käytännössä tämä tarkoittaa tukeutumista SCC-lausekkeisiin ja alueelliseen sijaintiin sekä edelleen EU:sta poistuvien tietojen luettelemista.

<a id="where-residency-does-not-reach-the-cloud-act"></a>
## Mihin alueellinen sijainti ei ulotu: CLOUD Act

[Yhdysvaltain CLOUD Act](https://www.law.cornell.edu/uscode/text/18/2713) sallii Yhdysvaltain viranomaisten velvoittaa yhdysvaltalaisen palveluntarjoajan luovuttamaan hallussaan, huostassaan tai määräysvallassaan olevia tietoja riippumatta siitä, sijaitsevatko kyseinen viesti, tallenne tai muu tieto Yhdysvalloissa vai sen ulkopuolella. GitHub, Inc. on yhdysvaltalainen yhtiö, joten tietojen sijainti ei yksin ratkaise tätä riskiä.

Sen sijaan käytettävissäsi ovat:

- **Sopimus:** DPA §3.F ja liite IV, jotka koskevat pyyntöjen ohjaamista sinulle, ilmoittamista sinulle ja määräysten riitauttamista.
- **Läpinäkyvyys:** GitHubin [läpinäkyvyyskeskus](https://transparencycenter.github.com/) julkaisee pyyntötilastoja.
- **Omat hallintakeinot:** salaa arkaluonteisimmat aineistosi ennen kuin ne päätyvät GitHubiin ja pidä säännellyt henkilötiedot poissa repositorioista.

[Alueellinen sijainti ja suvereniteetti -luku](/part-1/2-residency-vs-sovereignty/) käsittelee tämän jäännösriskin rehellistä kuvaamista.

<a id="worked-example-a-fintechs-regulator-file"></a>
## Esimerkki: fintech-yrityksen viranomaisaineisto

**Hypothetical scenario (hypoteettinen tilanne):** Liettualainen maksulaitos siirtyy GHE.comiin. Sen vaatimustenmukaisuudesta vastaava henkilö laatii kansalliselle sääntelyviranomaiselle yhden sivun aineiston:

- **Tietorekisteri:** GitHub on lueteltu lähdekoodin hallinnan ja CI/CD:n ICT-palveluntarjoajana, joka tukee kriittistä toimintoa.
- **Sopimus:** DORA:n 30 artiklaan nähden havaitut puutteet on lueteltu sovittuine lieventämistoimineen.
- **Irtautumissuunnitelma:** peilaa repositoriot öisin sisäiselle Git-palvelimelle ja vie työnkulkujen määritelmät. Tiimi teki vientitestin viime neljänneksellä.
- **Tiedonsiirrot:** alueen ulkopuoliset luokat kattava tiedonsiirron vaikutustenarviointi, joka on kirjoitettu kestämään Data Privacy Frameworkin menettäminen.
- **Tekoäly:** Copilotin alueellisen sijainnin käytäntö on käytössä ja kehittäjien tekoälylukutaitokoulutus on kirjattu.

Kun sääntelyviranomainen kysyy, vastauksena on linkki, ei projekti.
