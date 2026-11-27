---
title: Lue DPA tietosuojavastaavan näkökulmasta
section: Sopimukset ja lainsäädäntö
order: 6
description: Käy GitHub Data Protection Agreement läpi kohta kohdalta, vertaa sitä GDPR:n 28 artiklaan ja huomioi omalle vastuullesi jäävät asiat.
verified: "2026-11-12"
diagram: breach-notification
additionalDiagrams:
  - contract-stack
  - government-request
checks:
  - question: GitHub ilmoittaa yritysympäristöösi vaikuttavasta tietoturvahäiriöstä. Kuka päättää, onko valvontaviranomaiselle ilmoitettava?
    answer: Rekisterinpitäjä määrittää, tarvitaanko ilmoitus. DPA sitouttaa GitHubin ilmoittamaan sinulle ilman aiheetonta viivytystä ja avustamaan, mutta vastaat edelleen omista GDPR:n 33 artiklan mukaisista ilmoitusvelvollisuuksistasi.
  - question: GitHub lisää uuden alikäsittelijän, jota et voi hyväksyä. Mitä vaihtoehtoja sinulla on?
    answer: GitHub ilmoittaa 30 päivää ennen kuin alikäsittelijä saa pääsyn. Jos vastustat muutosta, voit irtisanoa kyseisen palvelun ilman seuraamuksia kirjallisella ilmoituksella ennen ilmoitusajan päättymistä. Jos palvelu kuuluu pakettiin, irtisanominen koskee koko pakettia.
  - question: Tiimi haluaa kokeilla Copilotin esiversio-ominaisuutta repositoriossa, joka sisältää asiakastietoja. Mitä DPA sanoo?
    answer: Esiversiot on rajattu DPA:n ulkopuolelle, ellei GitHub määritä toisin, ja DPA:n mukaan asiakkaiden ei tulisi käyttää esiversioita henkilötietojen tai säänneltyjen tietojen käsittelyyn, ellei toisin mainita.
sources:
  - https://github.com/customer-terms/github-data-protection-agreement
  - https://github.com/customer-terms
  - https://github.com/customer-terms/general-terms
  - https://www.microsoft.com/licensing/terms/productoffering/GitHubOfferings/MCA
  - https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors
  - https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
  - https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Tunnistamaan GitHubin käyttöä koskevat sopimusasiakirjat riippumatta siitä, ostatko suoraan vai Microsoftin kautta.
- Vertaamaan GitHub DPA:ta GDPR:n 28 artiklan henkilötietojen käsittelijän tarkistuslistaan.
- Luettelemaan velvollisuudet, jotka DPA jättää sinulle.

Tässä luvussa tiivistetään lokakuun 2025 [GitHub Data Protection Agreement](https://github.com/customer-terms/github-data-protection-agreement), joka tarkistettiin 12. marraskuuta 2026. Tämä ei ole oikeudellista neuvontaa. Ratkaisevia ovat allekirjoitettu sopimuksesi ja siinä viitatut versiot.

<a id="which-documents-apply"></a>
## Mitä asiakirjoja sovelletaan

| Ostat | Pääsopimus | Tietosuojaehdot |
| --- | --- | --- |
| Suoraan GitHubilta | [GitHub Customer Agreement](https://github.com/customer-terms): General Terms, Product Specific Terms ja Copilotia koskeva Generative AI Services Terms | GitHub DPA |
| Microsoft-sopimuksen, kuten EA:n tai MCA:n, kautta | Microsoft-sopimuksesi, mukaan lukien [Microsoft Product Terms for GitHub Offerings](https://www.microsoft.com/licensing/terms/productoffering/GitHubOfferings/MCA) | Tarkista sopimuksesi. GitHub Offerings -ehdot viittaavat GitHub DPA:n tietoturvakäytäntöihin. |

Kaksi Product Terms -ehtojen yksityiskohtaa on tärkeää alueellista sijaintia tarvitseville ostajille. Niissä luetellaan ”GitHub Enterprise (with data residency enabled)” ja Copilot-tilaukset **GitHub Core Online Services** -palveluina ja todetaan kunkin täyttävän **SSAE 18 SOC 1 Type II:n ja SOC 2 Type II:n** vaatimukset.

**Guide advice (oppaan suositus):** kysy asiakkuustiimiltäsi kirjallisesti, mihin DPA:n versioon sopimuksesi viittaa. Säilytä vastaus sopimuksen yhteydessä.

<a id="the-dpa-mapped-to-gdpr-article-28"></a>
## DPA suhteessa GDPR:n 28 artiklaan

| 28 artiklan 3 kohdan vaatimus | Missä GitHub DPA käsittelee sen |
| --- | --- |
| Käsittely vain dokumentoitujen ohjeiden perusteella | §3.B luettelee ohjeesi. §3.D:n mukaan GitHub ilmoittaa, jos se katsoo ohjeen rikkovan lakia. |
| Henkilöstön salassapito | Liite II: henkilöstöä sitoo salassapito, joka jatkuu tehtävän päättymisen jälkeen. |
| Käsittelyn turvallisuus (32 artikla) | §4 ja liite II: tekniset ja organisatoriset toimenpiteet, mukaan lukien vähintään viikoittaiset varmuuskopiot erillään ensisijaisista järjestelmistä, vähimmät oikeudet, lokitus ja vuosittainen riskinarviointi. |
| Alikäsittelijät | §9: yleinen valtuutus, julkaistu [alikäsittelijäluettelo](https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors), 30 päivän ilmoitus ja oikeus irtisanoa kyseinen palvelu ilman seuraamuksia. |
| Avustaminen rekisteröityjen pyynnöissä | §3.G: GitHub ohjaa rekisteröidyt sinulle ja tarjoaa ”tarvittavat keinot vastata”. |
| Avustaminen tietoturva-, tietoturvaloukkaus- ja DPIA-velvollisuuksissa | §6: häiriöilmoitus ”ilman aiheetonta viivytystä”, tutkinta ja lieventäminen. §6.C: apu ilmoituksissasi soveltuvan lain edellyttämässä laajuudessa. |
| Poisto tai palautus lopussa | §8: ”poistaa tai palauttaa kaikki asiakkaan henkilötiedot valintasi mukaan”. General Terms §9.5 sallii enintään 90 päivää sopimuksen päättymisen jälkeen repositoriodatan siirtämiseen tai siirtopyyntöön ilman tuotantokäyttöä. |
| Auditoinnit ja tiedot | §5: SOC 1 Type 2-, SOC 2 Type 2- ja ISO 27001 -raportit pyynnöstä. Jos sääntelyviranomainen tarvitsee enemmän, käytetään riippumatonta akkreditoitua auditoijaa, 30 päivän ilmoitusta ja asiakkaan kustannuksella. |

<a id="clauses-that-matter-most-for-eu-residency"></a>
## EU:n alueellisen sijainnin tärkeimmät sopimuskohdat

<a id="your-region-is-an-instruction-7a"></a>
### Alueesi on ohje (§7.A)

”Jos valitset ja käytät verkkopalvelua, jossa tietyt tiedot tallennetaan levossa tietylle maantieteelliselle alueelle, GitHub tallentaa soveltuvat tiedot kyseisen ohjeen perusteella.” Tämä on GHE.comin alueellisen sijainnin sopimuksellinen perusta. Lue sitä yhdessä [dokumentoitujen poikkeusten](/part-3/1-data-map/) kanssa, jotka myös §7 sallii.

<a id="transfers-still-have-a-legal-basis-7bc"></a>
### Tiedonsiirroilla on edelleen oikeusperusta (§7.B–C)

Soveltuville henkilötietojen siirroille DPA kuvaa seuraavat suojatoimet; arvioi todelliset tiedot, kohde ja soveltuvat ehdot:

- GitHubin itsevarmennus **EU-US Data Privacy Frameworkiin**, mukaan lukien Yhdistyneen kuningaskunnan ja Sveitsin laajennukset.
- Ja/tai **vuoden 2021 vakiosopimuslausekkeet** ([päätös 2021/914](https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj)): moduuli yksi GitHubille rekisterinpitäjänä ja moduulit kaksi ja kolme GitHubille henkilötietojen käsittelijänä. Niihin sovelletaan **Alankomaiden lakia**, ja riidat käsitellään **Alankomaiden tuomioistuimissa**.
- Yhdistyneen kuningaskunnan lisäosa ja Sveitsin mukautukset näitä lainkäyttöalueita varten.

<a id="government-access-redirect-notify-challenge-3f-and-annex-iv"></a>
### Viranomaisten pääsy: ohjaa, ilmoita, riitauta (§3.F ja liite IV)

- GitHub ei luovuta tietojasi lainvalvontaviranomaisille, ellei laki sitä edellytä. Se ohjaa pyynnöt sinulle mahdollisuuksien mukaan.
- Jos luovutus määrätään, GitHub ottaa sinuun yhteyttä ja toimittaa kopion oikeudellisesta menettelystä, ellei laki sitä kiellä.
- Liite IV lisää, että GitHub yrittää saada mahdollisen ilmoituskiellon kumotuksi ja **riitauttaa luovutusmääräyksen oikeudellisesti**.
- GitHub korvaa rekisteröidyille vahingon, joka aiheutuu GDPR:n V luvun vastaisesta luovutuksesta EU:n/ETA:n ulkopuoliselle viranomaiselle, ilmoitettujen poikkeusten mukaisesti.

<a id="github-as-independent-controller-3c"></a>
### GitHub itsenäisenä rekisterinpitäjänä (§3.C)

GitHub toimii rekisterinpitäjänä vain ”tyhjentävässä” luettelossa:

- laskutus ja tilinhallinta
- korvausten laskenta
- lakisääteiset velvoitteet
- väärinkäytösten ja haittaohjelmien havaitseminen
- kootut tilastot

Se sitoutuu olemaan käyttämättä tietojasi profilointiin, mainontaan tai tietojen myyntiin. Näitä tietoja koskee [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

<a id="previews-are-outside-the-dpa-2aii"></a>
### Esiversiot ovat DPA:n ulkopuolella (§2.A.ii)

Esiversiot on rajattu ulkopuolelle, ellei GitHub määritä toisin, ja ”asiakkaiden ei tulisi käyttää esiversioita henkilötietojen tai muiden oikeudellisten tai sääntelyyn liittyvien vaatimusten alaisten tietojen käsittelyyn”. **Guide advice (oppaan suositus):** tee tästä yrityskäytäntö ja poista käytöstä arvioimattomat esiversio-ominaisuudet.

<a id="restricted-data-types-12"></a>
### Rajoitetut tietotyypit (§12)

Älä lataa ilman GitHubin etukäteen antamaa kirjallista suostumusta Yhdysvaltain CJIS-sääntöjen alaisia rikostietoja, HIPAA:n alaisia yhdysvaltalaisia terveystietoja, kliinisen tutkimuksen tietoja tai biometrisen tunnistamisen tietoja. Pidä tällaiset tiedot poissa repositorioista, issueista ja kehotteista.

<a id="what-stays-with-you"></a>
## Mikä jää vastuullesi

- **Lainmukaisuus:** §3.D:n mukaan GitHub ei vastaa yritykseesi soveltuvien lakien selvittämisestä.
- **Tietoturvaloukkauksesta ilmoittaminen:** GDPR:n 33 artiklan mukaan rekisterinpitäjä ilmoittaa valvontaviranomaiselle ilman aiheetonta viivytystä ja mahdollisuuksien mukaan 72 tunnin kuluessa tiedon saamisesta, ellei ole epätodennäköistä, että loukkaus aiheuttaa riskiä ihmisten oikeuksille ja vapauksille. Artikla 34 voi edellyttää ilmoitusta rekisteröidyille, kun riski on korkea. GitHubin ilmoitukselle ei ole kiinteää tuntimäärää, joten huomioi tämä häiriötilanteiden toimintasuunnitelmassa.
- **Rekisteröityjen pyynnöt:** vastaat niihin. GitHub ohjaa pyynnön esittäjät sinulle.
- **Kirjanpito ja arvioinnit:** käsittelytoimien rekisteri, mahdollinen DPIA ja tiedonsiirron vaikutustenarviointi alueen ulkopuolisille luokille.
- **Yhteystiedot:** §14:n mukaan sinun on pidettävä ilmoitusten yhteystiedot ajan tasalla ja seurattava niitä. Ilmoitukset GitHubille tehdään tuen tai tietosuojalomakkeen kautta, kopio osoitteeseen `dpo@github.com`.
- **Tilaa alikäsittelijämuutosten ilmoitukset:** 30 päivän vastustusaika auttaa vain, jos joku lukee ilmoitukset.

<a id="worked-example-the-procurement-redline"></a>
## Esimerkki: hankinnan sopimusmuutos

**Hypothetical scenario (hypoteettinen tilanne):** Alankomaalaisen energiayhtiön hankintatiimi saa vakio-DPA:n. Sen mallipohja vaatii ilmoitusta tietoturvaloukkauksesta 24 tunnin kuluessa ja oikeutta paikan päällä tehtävään auditointiin.

Lakitiimi vertaa vaatimuksia DPA:han:

- **Auditointi:** §5 tarjoaa jo raportit pyynnöstä sekä sääntelyviranomaisen edellyttämät auditoinnit akkreditoidun kolmannen osapuolen kautta. Tämä täyttää yhtiön NIS2-toimittajakäytännön, joten se luopuu paikan päällä tehtävän auditoinnin vaatimuksesta.
- **Tietoturvaloukkausilmoitus:** ”ilman aiheetonta viivytystä” ei vastaa sisäistä mallipohjaa. Pitkän sopimusmuutoksen sijaan tiimi kirjaa eron, lisää GitHubin tilasivun ja tietoturvailmoitukset seurantaan ja käynnistää oman 72 tunnin kellonsa tiedonsaantihetkestä.
- **Esiversiot:** tiimi ottaa §2.A.ii:n säännön yrityskäytännöksi.

Sopimus saadaan päätökseen viikoissa kuukausien sijaan, ja puutteet dokumentoidaan eikä niitä piiloteta.
