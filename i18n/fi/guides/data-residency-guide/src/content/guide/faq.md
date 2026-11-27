---
title: Usein kysytyt kysymykset
section: Ota käyttöön luottavaisin mielin
order: 10
description: Lyhyet, lähteistetyt vastaukset tietosuojavastaavien, lakimiesten, tietoturvatiimien ja kehittäjien kysymyksiin GitHubin datan alueellisesta sijainnista EU:ssa.
verified: "2026-11-27"
checks:
  - question: Konsultti työskentelee kahdessa yritysympäristössäsi, joista toinen on github.comissa ja toinen GHE.comissa. Kuinka monta lisenssiä hän tarvitsee?
    answer: Kaksi. General Termsin kohta 1.3 sanoo yhden lisenssin antavan pääsyn yhteen pilviympäristöön ja antaa esimerkin käyttäjästä, joka tarvitsee kaksi lisenssiä päästäkseen sekä Yhdysvalloissa että Euroopassa sijaitsevaan yritysympäristöön.
  - question: Tarkoittaako EU-alueen valinta, etteivät Yhdysvaltain viranomaiset voi koskaan saada tietojasi?
    answer: Ei. GitHub, Inc. on yhdysvaltalainen palveluntarjoaja, ja CLOUD Act ulottuu palveluntarjoajan hallinnassa oleviin tietoihin niiden tallennuspaikasta riippumatta. Alueellista sijaintia tukevat sopimussuojat, kuten pyyntöjen ohjaaminen asiakkaalle, ilmoittaminen ja määräysten riitauttaminen, ei koskemattomuus.
sources:
  - https://github.com/customer-terms/general-terms
  - https://github.com/customer-terms/github-data-protection-agreement
  - https://github.com/customer-terms/github-generative-ai-services-terms
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency
  - https://docs.github.com/en/site-policy/other-site-policies/guidelines-for-legal-requests-of-user-data
  - https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/reference/ai-models/model-hosting
  - https://docs.github.com/en/copilot/concepts/context/content-exclusion
  - https://docs.github.com/en/copilot/using-github-copilot/finding-public-code-that-matches-github-copilot-suggestions
  - https://www.law.cornell.edu/uscode/text/18/2713
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Vastaamaan yleisimpiin käyttöönottoa koskeviin kysymyksiin yhdellä tai kahdella lauseella.
- Tietämään, mihin lähteeseen kussakin vastauksessa viitataan.
- Tunnistamaan kysymykset, joihin tarvitaan edelleen suora vastaus GitHubilta.

Vastaukset perustuvat julkisiin lähteisiin 27. marraskuuta 2026. Jos mikään julkinen lähde ei vastaa kysymykseen, se kerrotaan vastauksessa.

<a id="data-and-location"></a>
## Data ja sijainti

<a id="can-anything-leave-githubs-eu-region"></a>
### Voiko GitHubin EU-alueelta poistua mitään?

Kyllä, dokumentoitu joukko luokkia: tunnisteita sisältävä telemetria, laskutus, tukitiedot, Copilotin tiedot, ellei käytäntöä oteta käyttöön, erikseen käyttöön otettavat salaisuuksien tarkistukset ja TLS-varmenteiden tiedot. Katso [datakartta](/part-3/1-data-map/). GitHub ”ei ilmoita siirtojen tapahtuessa”.

<a id="is-our-data-stored-only-in-eu-member-states"></a>
### Tallennetaanko tietomme vain EU:n jäsenvaltioissa?

Ei välttämättä. EU-alueeseen on 1. toukokuuta 2026 lähtien kuulunut Azure-alueita myös Norjassa ja Sveitsissä Ranskan, Ruotsin, Saksan ja Alankomaiden lisäksi. Jos käytäntösi sanoo ”vain EU:n jäsenvaltiot”, päivitä se tai ota ero esiin ennen allekirjoitusta. Katso [Mikä GHE.com on](/part-2/1-ghe-com/).

<a id="is-github-part-of-the-microsoft-eu-data-boundary"></a>
### Kuuluuko GitHub Microsoftin EU Data Boundaryyn?

GitHubin mukaan Norjaan ja Sveitsiin laajentaminen [yhdenmukaistaa alueen Microsoftin EU Data Boundaryn kanssa](https://github.blog/changelog/2026-03-31-eu-data-residency-region-expanding-to-include-efta-countries/). GitHubia ei kuitenkaan mainita Microsoftin [EU Data Boundary -sivulla](https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn) tarkistuspäivänä. GHE.comin alueellinen sijainti on erillinen GitHubin sitoumus, jonka GitHub dokumentoi ja jonka perustana on DPA §7.A. Jos käytäntösi viittaa EU Data Boundaryyn nimeltä, varmista asia asiakkuustiimiltäsi.

<a id="can-we-use-our-own-encryption-keys"></a>
### Voimmeko käyttää omia salausavaimiamme?

Emme löytäneet tarkistuspäivänä julkista dokumentaatiota asiakkaan hallitsemista avaimista GHE.comissa. Kysy suoraan GitHubilta ja pyydä vastaus kirjallisena.

<a id="github-copilot"></a>
## GitHub Copilot

<a id="is-our-code-used-to-train-ai-models"></a>
### Käytetäänkö koodiamme tekoälymallien koulutukseen?

Copilot Businessin ja Enterprisen osalta GitHub sanoo, ettei se käytä syötteitä tai tuotoksia generatiivisten tekoälymallien koulutukseen, ellet anna dokumentoituja ohjeita siihen. Katso [Generative AI Services Termsin](https://github.com/customer-terms/github-generative-ai-services-terms) kohta 3.

<a id="what-leaves-the-developers-machine-and-is-it-stored"></a>
### Mitä kehittäjän laitteelta poistuu ja tallennetaanko sitä?

Pyyntö voi sisältää asiaankuuluvaa työtilan kontekstia, liitteitä tai keskusteluhistoriaa, ei vain kehittäjän kirjoittamaa tekstiä; tarkka konteksti riippuu ominaisuudesta ja asiakasohjelmasta. Säilytys vaihtelee ominaisuuden ja mallintarjoajan mukaan, joten tarkista [mallien isännöinti](https://docs.github.com/en/copilot/reference/ai-models/model-hosting). Lisäksi Copilot-sovellus ja CLI voivat tallentaa istuntohistorian paikallisesti ja synkronoida sen GitHubiin käytännöstä riippuen; katso [istuntotiedot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data).

<a id="can-copilot-processing-stay-in-the-eu"></a>
### Voiko Copilotin käsittely pysyä EU:ssa?

Kyllä, tuetussa Copilotin käytössä soveltuvassa GitHub Enterprise Cloud -käyttöönotossa, jossa datan alueellinen sijainti on EU:ssa, kun **Restrict Copilot to data residency compliant models** -käytäntö on käytössä. Se on oletusarvoisesti pois käytöstä, koskee vain tuettuja malleja ja ominaisuuksia ja lisää AI Credits -kulutusta 10 %. Varmista vuokraaja, mallit ja ominaisuudet ennen vain EU:ta koskevaa sitoumusta. Katso [Copilot ja alueellinen sijainti](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency).

<a id="are-prompts-recorded-in-the-audit-log"></a>
### Tallennetaanko kehotteet auditointilokiin?

Yrityksen auditointiloki kattaa valittuja käytäntö-, lisenssi- ja agenttitapahtumia, mutta ei sisällä paikallisista asiakasohjelmista lähetettyjä kehotteita. Tapahtumia säilytetään 180 päivää, joten suoratoista loki SIEMiin, jos tarvitset pidemmän historian. Katso [GitHub Copilotin auditointilokien tarkastelu](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs).

<a id="can-we-exclude-sensitive-files"></a>
### Voimmeko sulkea arkaluonteisia tiedostoja pois?

Sisällön poissulkeminen on hyödyllinen suojakaide, ei tietoturvaraja. Sen toiminta vaihtelee asiakasohjelman ja ominaisuuden mukaan, ja GitHubin mukaan kolmannen osapuolen MCP-palvelimet tai asiakasohjelmat eivät välttämättä noudata sitä. Testaa se hyväksytyillä asiakasohjelmilla ja ominaisuuksilla ja käytä pääsynhallintaa pelkkien poissulkemisten sijaan. Katso [GitHub Copilotin sisällön poissulkeminen](https://docs.github.com/en/copilot/concepts/context/content-exclusion).

<a id="can-we-merge-generated-code"></a>
### Voimmeko yhdistää luotua koodia?

Kyllä, saman ihmisen tekemän tarkistuksen, testien, tietoturvatarkistusten ja lisenssitarkistusten jälkeen kuin muunkin koodin. Älä pidä julkisen koodin estämistä yleispätevänä takuuna: kaikki tuotteet tai ominaisuudet eivät tue estotilaa. Tarkista esiin tuodut vastaavuudet ja noudata organisaatiosi lisenssikäytäntöä. Katso [Copilotin ehdotuksia vastaavan julkisen koodin löytäminen](https://docs.github.com/en/copilot/using-github-copilot/finding-public-code-that-matches-github-copilot-suggestions).

<a id="can-we-use-every-model-that-githubcom-offers"></a>
### Voimmeko käyttää kaikkia github.comin tarjoamia malleja?

Emme. Vain EU-alueella sertifioidut ja saatavilla olevat mallit näkyvät. Uudet mallit voivat saapua myöhemmin. Tarkista [ajantasainen luettelo](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency#available-ai-models-by-region).

<a id="contract-and-law"></a>
## Sopimus ja lainsäädäntö

<a id="who-is-our-contracting-party-and-which-law-applies"></a>
### Kuka on sopimuskumppanimme ja mitä lakia sovelletaan?

Suorissa ostoissa sopimus tehdään GitHub, Inc:n kanssa. [General Terms §10.11](https://github.com/customer-terms/general-terms) soveltaa **Irlannin lakia ja Dublinin tuomioistuimia**, jos päätoimipaikkasi on EU:ssa, ETA:ssa tai Sveitsissä. DPA:n SCC-lausekkeisiin sovelletaan Alankomaiden lakia. Jos ostat Microsoftin kautta, Microsoft-sopimuksesi määrittää nämä ehdot.

<a id="what-happens-if-a-government-asks-github-for-our-data"></a>
### Mitä tapahtuu, jos viranomainen pyytää GitHubilta tietojamme?

GitHubin [oikeudellisia pyyntöjä koskevien ohjeiden](https://docs.github.com/en/site-policy/other-site-policies/guidelines-for-legal-requests-of-user-data) mukaan se ei luovuta yksityisten repositorioiden sisältöä ilman pätevää etsintälupaa, ja se ilmoittaa asianomaisille käyttäjille, ellei laki estä sitä. DPA lisää pyyntöjen ohjaamisen sinulle ja määräysten riitauttamisen (liite IV). Katso CLOUD Actista [Kartoita sääntely](/part-8/1-regulations/).

<a id="can-github-withdraw-the-service"></a>
### Voiko GitHub vetää palvelun pois?

General Terms sallii irtisanomisen ilman syytä 30 päivän ilmoitusajalla (§9.2). GitHub voi myös muuttaa tuotetta tai vetää sen pois lainkäyttöalueelta sääntelysyistä, jolloin ainoa hyvityskeino on maksun palautus (§9.4), ja keskeyttää palvelun, jos sopimuksen täyttäminen rikkoisi Yhdysvaltain kauppa- tai pakotelakeja (§10.5). Näistä syistä [irtautumissuunnitelmasi](/part-10/1-readiness/) on tärkeä.

<a id="do-github-staff-commit-to-eu-only-operations"></a>
### Onko GitHub sitoutunut vain EU:ssa toimivaan henkilöstöön?

Emme löytäneet julkista sitoumusta siitä, että vain EU:ssa sijaitseva henkilöstö operoi tai tukee GHE.comia. Jos käytäntösi vaatii sitä, ota asia esiin hankinnassa.

<a id="licensing-and-operations"></a>
## Lisensointi ja operaatiot

<a id="does-a-user-in-both-githubcom-and-ghecom-need-two-licences"></a>
### Tarvitseeko sekä github.comin että GHE.comin käyttäjä kaksi lisenssiä?

Kyllä. [General Terms §1.3](https://github.com/customer-terms/general-terms): yksi lisenssi antaa pääsyn yhteen pilviympäristöön.

<a id="can-we-move-back-to-githubcom-later-or-change-our-subdomain"></a>
### Voimmeko palata myöhemmin github.comiin tai muuttaa alitoimialuettamme?

GHE.comista takaisin github.comiin ei ole virallista migraatiopolkua, ja alitoimialue on pysyvä. Tee molemmat valinnat harkiten. Katso [Ota käyttöön, yhdistä ja siirrä](/part-9/1-migrate/).

<a id="can-developers-still-contribute-to-open-source"></a>
### Voivatko kehittäjät edelleen osallistua avoimeen lähdekoodiin?

Eivät hallitulta tililtään. Julkiset repositoriot eivät ole saatavilla GHE.comissa. Kehittäjät käyttävät avointa lähdekoodia varten erillistä henkilökohtaista github.com-tiliä osallistumiskäytäntösi mukaisesti.

<a id="is-anything-missing-compared-with-githubcom"></a>
### Puuttuuko jotain github.comiin verrattuna?

Kyllä. [Ominaisuuksien yleiskatsaus](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency) luettelee tällä hetkellä tai pysyvästi puuttuvat ominaisuudet, mukaan lukien GitHub Marketplace ja julkiset repositoriot. Testaa tärkeimmät työnkulut kokeilun aikana.

<a id="worked-example-the-one-hour-faq-session"></a>
## Esimerkki: tunnin kysymys- ja vastaustilaisuus

**Hypothetical scenario (hypoteettinen tilanne):** Ennen migraatiota alustasta vastaava henkilö järjestää tunnin tilaisuuden 40 tiiminvetäjälle. Hän näyttää tämän sivun ja vastaa jokaiseen kysymykseen avaamalla linkitetyn lähteen, ei muistinvaraisesti. Kolmeen kysymykseen ei ole julkista vastausta: asiakkaan hallitsemat avaimet, vain EU:ssa toimiva henkilöstö ja EU Data Boundary. Hän kirjaa ne avoimiksi asiakkuustiimin käsiteltäviksi ja julkaisee vastaukset sisäisessä wikissä niiden saavuttua.
