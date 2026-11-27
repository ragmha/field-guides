---
title: Copilot ja datan alueellinen sijainti EU:ssa
section: Mitä GHE.com tarjoaa
order: 5
description: Ota Copilotin alueellinen sijainti käyttöön, selvitä sen takuut ja kustannukset sekä vastaa laki- ja tietoturvatiimien kysymyksiin koodiasi käyttävästä tekoälystä.
verified: "2026-11-12"
diagram: copilot-flow
additionalDiagrams:
  - copilot-policy-delta
  - copilot-governance
  - ip-commitment
checks:
  - question: Ostit Copilot Businessin GHE.com-yritysympäristöösi etkä muuttanut asetuksia. Tapahtuuko päättely EU:ssa?
    answer: Sitä ei taata. "Restrict Copilot to data residency compliant models" -käytäntö on oletusarvoisesti pois käytöstä. Kunnes yrityksen omistaja ottaa sen käyttöön, Copilotin tietoja voidaan käsitellä ja tallentaa alueen ulkopuolella.
  - question: Taloushallinto kysyy, kuinka paljon alueellisen sijainnin käytäntö lisää Copilotin kustannuksia.
    answer: Käytännön ollessa käytössä käsitellyt pyynnöt kuluttavat 10 % enemmän AI Credits -krediittejä. Toiminto, joka kuluttaisi 100 AI Credits -krediittiä, kuluttaa 110.
  - question: Voitko luottaa siihen, että sisällön poissulkeminen estää Copilotia koskaan lukemasta arkaluonteista tiedostoa?
    answer: Et. GitHub toteaa, ettei sisällön poissulkeminen ole tiedostojärjestelmän tietoturvaraja. Se on suojakaide GitHubin hallitsemille työkaluille. Pidä salaisuudet poissa repositorioista ja käytä pääsynhallintaa todella arkaluonteiselle koodille.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-in-your-ide/set-up-copilot/authenticate-to-ghecom
  - https://docs.github.com/en/copilot/reference/ai-models/model-hosting
  - https://github.com/customer-terms/github-generative-ai-services-terms
  - https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/customer-copyright-commitment
  - https://docs.github.com/en/copilot/concepts/context/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/copilot-metrics
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Ottamaan Copilotin alueellisen sijainnin käyttöön ja selittämään tarkasti, mitä se takaa.
- Vastaamaan koulutusta, säilytystä, omistajuutta ja korvausvastuuta koskeviin kysymyksiin sopimusviitteiden avulla.
- Määrittämään hallinnan: käytännöt, auditoinnin, mittarit, sisällön poissulkemisen ja asiakasohjelmien asetukset.

<a id="the-one-switch-that-matters"></a>
## Ratkaiseva asetus

GHE.comissa Copilotin tiedot luetellaan luokissa, joita GitHub [voi tallentaa alueesi ulkopuolella](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency), **ellet** ota käytäntöä käyttöön. Copilotin alueellinen sijainti on [saatavilla EU:n ja Yhdysvaltojen alueille](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency).

1. Avaa yrityksesi Copilot-käytäntöjen sivu ([näin löydät sen](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies)).
2. Ota **Features**-osiossa käyttöön **Restrict Copilot to data residency compliant models**. Se on **oletusarvoisesti pois käytöstä**.

Kun käytäntö on käytössä, GitHubin mukaan ”koodisi, kehotteesi ja Copilotin vastaukset eivät koskaan poistu alueeltasi päättelykäsittelyn aikana”. Se toteuttaa tämän kolmella tasolla:

| Taso | Mitä GitHub tekee |
| --- | --- |
| Tunnistautuminen ja reititys | Käyttäjien tunnukset antavat pääsyn vain alueesi päätepisteisiin. |
| Mallien saatavuus | Copilot näyttää vain alueellasi sertifioidut ja saatavilla olevat mallit. Kehittäjät eivät pääse muualla isännöityihin malleihin. |
| Lokit ja telemetria | Copilotiin liittyvät lokit ja telemetria tallennetaan alueelle sopivaan, vaatimustenmukaiseen tallennustilaan. |

<a id="what-it-costs-and-what-changes-for-developers"></a>
## Kustannukset ja kehittäjille koituvat muutokset

- **Hinta:** käytännön ollessa käytössä käsitellyt pyynnöt kuluttavat **10 % enemmän AI Credits -krediittejä**. GitHubin esimerkissä 100 krediittiä muuttuu 110:ksi. GitHub selittää tämän mallintarjoajien alueellisista ja vaatimustenmukaisiksi sertifioiduista päätepisteistä veloittamana lisäkustannuksena.
- **Mallit:** EU:n luettelo on github.comin luetteloa lyhyempi, ja uudet mallit voivat saapua myöhemmin palveluntarjoajien ottaessa alueellista infrastruktuuria käyttöön. Tarkista [ajantasainen EU:n malliluettelo](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency#available-ai-models-by-region) kopion sijaan, koska se muuttuu usein.
- **Ominaisuudet:** kaikki yleisesti saatavilla olevat Copilot-ominaisuudet toimivat. Esiversio-ominaisuuksia tuetaan vaatimustenmukaisilla malleilla, kun ne tulevat yleisesti saataville.
- **Asiakasohjelmat:** kehittäjät tarvitsevat Copilot-laajennuksen tai CLI:n, joka on julkaistu vuonna 2025 tai myöhemmin. Vanhempia asiakasohjelmia kehotetaan päivittämään.

**Guide advice (oppaan suositus):** ota käytäntö käyttöön ennen Copilot-käyttöpaikkojen jakamista, tarkista, että kehittäjät käyttävät yhteensopivia asiakasohjelmia ja tuettuja ominaisuuksia, ja varaa budjettiin 10 %:n lisäkulutus. Arvioi muut työkalut ja integraatiot erikseen; tämä käytäntö ei hallitse kaikkia mahdollisia koodin tai kehotteiden kohteita.

<a id="the-questions-legal-will-ask"></a>
## Lakitiimin kysymykset

| Kysymys | Vastaus | Missä se on kirjattu |
| --- | --- | --- |
| Käytetäänkö koodiamme mallien koulutukseen? | Ei. GitHub ”ei käytä syötteitä tai tuotoksia generatiivisten tekoälymallien koulutukseen, ellette ole antaneet meille dokumentoituja ohjeita siihen”. | [Generative AI Services Terms](https://github.com/customer-terms/github-generative-ai-services-terms), kohta 3 |
| Kuka omistaa tuotoksen? | ”GitHub ei omista syötteitä tai tuotoksia. Säilytätte syötteisiin jo kuuluvat omistusoikeutenne.” | Samat ehdot, kohta 2 |
| Säilyttävätkö mallintarjoajat kehotteemme? | GitHub dokumentoi isännöimiensä palveluntarjoajien kanssa sopimukset, joiden mukaan tietoja ei säilytetä, ja palveluntarjoajien sitoumukset olla kouluttamatta malleja asiakkaan liiketoimintadatalla. Tarkista sivulta jokainen sallimasi malli. | [Mallien isännöinti](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) |
| Puolustetaanko meitä tuotoksiin liittyviä immateriaalioikeusvaatimuksia vastaan? | Suorissa sopimuksissa sopimukseenne sisältyvä puolustus kolmannen osapuolen vaatimuksia vastaan koskee myös tuotoksia. Microsoftin kautta ostettaessa sovelletaan Microsoft Product Termsin Customer Copyright Commitmentia. | Generative AI Services Terms, kohta 4; [Customer Copyright Commitment](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/customer-copyright-commitment) |
| Onko kaksoiskappaleiden tunnistussuodatin otettava käyttöön tämän suojan saamiseksi? | Ei enää. 3. huhtikuuta 2026 lähtien GitHub Offeringsille ei ole ”muita vaadittuja lieventäviä toimia”. Suodatin on edelleen saatavilla. | Customer Copyright Commitment -sivu |
| Mitä tietosuojaehtoja sovelletaan? | GitHub DPA:ta. Generative AI Services Terms soveltaa sitä Copilotiin, ellei sopimukseesi sisälly muuta DPA:ta. | Generative AI Services Terms, johdanto |

Generative AI Services Terms korvaa 5. maaliskuuta 2026 alkaen aiemmat Copilot Product Specific Terms -ehdot suorissa ostoissa. Jos ostat Microsoftin kautta, sovelletaan sen sijaan GitHub Offeringsin Microsoft Product Terms -ehtoja. Varmista, että lakitiimi tarkistaa sopimustasi vastaavan version.

**Guide advice (oppaan suositus):** kaksoiskappaleiden tunnistussuodatin ei ole enää tekijänoikeussitoumuksen ehto. Harkitse silti julkista koodia vastaavien ehdotusten estämistä, jos lisenssikäytäntösi kieltää copyleft-koodin suljetuissa tuotteissa.

<a id="governance-you-can-show-an-auditor"></a>
## Hallinta, jonka voit osoittaa auditoijalle

- **Käytännöt:** päätä yritystasolla, mitkä ominaisuudet ovat käytössä, kuten pilviagentti, koodin tarkistus, CLI ja MCP-palvelimet, sekä mitkä mallit ovat sallittuja.
- **Auditointiloki:** tallentaa asetusten ja käytäntöjen muutokset, käyttöpaikkojen muutokset ja agenttien toiminnan GitHubin verkkosivustolla. Se säilyttää tapahtumat 180 päivää, joten [suoratoista se SIEMiin](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs). Se ”ei sisällä asiakasistunnon tietoja, kuten käyttäjän paikallisesti Copilotille lähettämiä kehotteita”.
- **Mittarit:** käytä [Copilotin käyttömittareita](https://docs.github.com/en/copilot/concepts/copilot-metrics) käyttöönoton osoittamiseen ja odottamattoman käytön havaitsemiseen.
- **Sisällön poissulkeminen:** estää Copilotia käyttämästä valittuja polkuja kontekstina. GitHub toteaa selvästi, ettei se ”ole tiedostojärjestelmän tietoturvaraja” ja että kolmannen osapuolen MCP-palvelimet tai asiakasohjelmat eivät välttämättä noudata sitä ([rajoitukset](https://docs.github.com/en/copilot/concepts/context/content-exclusion)).

<a id="configure-every-client-for-ghecom"></a>
## Määritä jokainen asiakasohjelma GHE.comia varten

Kehittäjien on kirjauduttava alitoimialueeseesi, ei github.comiin ([kaikki IDE-kohtaiset vaiheet](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-in-your-ide/set-up-copilot/authenticate-to-ghecom)):

```jsonc
// VS Code settings.json
"github-enterprise.uri": "https://SUBDOMAIN.ghe.com",
"github.copilot.advanced": { "authProvider": "github-enterprise" }
```

```bash
# Copilot CLI
copilot login --host SUBDOMAIN.ghe.com
```

JetBrains IDE:t tarvitsevat Copilot-laajennuksen version 1.4.11 tai uudemman. Visual Studiossa, Xcodessa ja Eclipsessä on kussakin yrityskirjautumisen asetus.

<a id="worked-example-the-dpos-ai-checklist"></a>
## Esimerkki: tietosuojavastaavan tekoälyn tarkistuslista

**Hypothetical scenario (hypoteettinen tilanne):** Logistiikkayrityksen tietosuojavastaavan on hyväksyttävä Copilot ennen käyttöönottoa. Alustatiimi tuo viisi asiaa:

1. Kuvakaappaus käytössä olevasta alueellisen sijainnin käytännöstä sekä muutoksen tallentanut auditointilokitapahtuma.
2. Generative AI Services Termsin kohdat 2 ja 3 (omistajuus ja koulutuskielto) sekä mallien isännöintisivu, joka näyttää säilytysehdot.
3. Luettelo sallituista malleista, jotka ovat kaikki EU:n luettelosta.
4. Auditointilokin suoratoisto yrityksen SIEMiin ja huomautus siitä, etteivät paikalliset kehotteet ole auditointilokissa.
5. Kehittäjäsääntö: asiakkaan henkilötietoja ei liitetä kehotteisiin; sääntöä tuetaan koulutuksella ja data fixture -kansion sisällön poissulkemisella.

Tietosuojavastaava hyväksyy käyttöönoton, joka tarkistetaan kuuden kuukauden kuluttua tai GitHubin muuttaessa alueellisen sijainnin sivua sen mukaan, kumpi tapahtuu ensin.
