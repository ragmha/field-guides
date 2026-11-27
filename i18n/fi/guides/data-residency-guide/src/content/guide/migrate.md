---
title: Ota käyttöön, yhdistä ja siirrä
section: Ota käyttöön luottavaisin mielin
order: 9
description: Perusta yritysympäristö, yhdistä identiteetti, verkot ja kehittäjätyökalut ja siirrä repositoriot sitten aalloissa oikealla työkalulla.
verified: "2026-11-12"
diagram: migration-window
additionalDiagrams:
  - importer-flow
  - runner-deployment
  - cutover-handoff
checks:
  - question: Siirrät 200 repositoriota GitHub Enterprise Importerilla. Siirtyvätkö Actionsin salaisuudet mukana?
    answer: Eivät. GEI ei siirrä Actionsin salaisuuksia, muuttujia, ympäristöjä, runnereita tai suoritushistoriaa. Luo ne uudelleen GHE.comissa, mieluiten salaisuuksien hallintajärjestelmästäsi.
  - question: Palomuuritiimisi ei voi sallia jokerimerkkiä osoitteelle blob.core.windows.net. Estääkö tämä GHE.comin käytön?
    answer: Ei. Voit hakea yrityskohtaiset tallennuksen isäntänimet komennolla `gh api /meta --hostname SUBDOMAIN.ghe.com --jq '.domains.storage[]'` ja sallia ne sen sijaan.
  - question: Suuri GHES-monorepositorio ei voi olla pitkään jäädytettynä. Mikä migraatiopolku kannattaa arvioida ensin?
    answer: Enterprise Live Migrations, joka on ollut yleisesti saatavilla 1. syyskuuta 2026 lähtien GHESistä GHE.comiin. Se on suunniteltu lähes katkoksettomaksi ja siirtää yhden repositorion kerrallaan. Organisaatiotason tiedot eivät sisälly siihen.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud
  - https://github.blog/changelog/2025-05-16-github-enterprise-cloud-with-data-residency-now-available-for-self-service-trial/
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom
  - https://docs.github.com/en/enterprise-cloud@latest/actions/reference/runners/self-hosted-runners
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-in-your-ide/set-up-copilot/authenticate-to-ghecom
  - https://docs.github.com/en/enterprise-cloud@latest/github-cli/github-cli/using-multiple-accounts
  - https://docs.github.com/en/enterprise-cloud@latest/migrations/overview/migration-paths-to-github
  - https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/understanding-github-enterprise-importer/about-github-enterprise-importer
  - https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/migrating-between-github-products/about-migrations-between-github-products
  - https://docs.github.com/en/enterprise-cloud@latest/migrations/elm/about-live-migrations
  - https://github.blog/changelog/2026-09-01-enterprise-live-migrations-from-ghes-to-ghe-com-generally-available/
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Tekemään käyttöönoton järjestyksessä, joka välttää pysyvät virheet.
- Antamaan verkko- ja työasematiimeille täsmälleen niiden tarvitsemat tiedot.
- Valitsemaan oikean migraatiotyökalun ja tietämään, mitä on luotava käsin uudelleen.

<a id="1-start-the-enterprise"></a>
## 1. Perusta yritysympäristö

[Omatoiminen 30 päivän kokeilu](https://github.blog/changelog/2025-05-16-github-enterprise-cloud-with-data-residency-now-available-for-self-service-trial/) on ollut saatavilla toukokuusta 2025 lähtien. Se sallii enintään kolme uutta organisaatiota. Kun [rekisteröidyt](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud), valitset kaksi asiaa:

- **Datan isännöintialue:** valitse **EU**.
- **Alitoimialue:** tästä tulee `SUBDOMAIN.ghe.com`, eikä sitä **voi muuttaa myöhemmin**. Käytä tuotantokäytön nimeä ensimmäisestä päivästä alkaen.

Määritä sitten IdP. Käytä Entra ID:n kanssa OIDC:tä, jota GitHub suosittelee. Muut IdP:t käyttävät SAMLia. Provisiointi käyttää SCIMiä tunnuksella, jolla on `scim:enterprise`-oikeusalue. Jos yksi Entra-vuokraaja provisioi useita yritysympäristöjä, vain ensimmäinen voi käyttää OIDC:tä. Muiden on käytettävä SAMLia.

<a id="2-open-the-network"></a>
## 2. Avaa verkkoyhteydet

Lähetä palomuuritiimille itse [verkkotietojen sivu](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom), ei kopiota: IP-alueet muuttuvat. Sivulla on:

- **Isäntänimet:** `*.SUBDOMAIN.ghe.com`, `*.pages.SUBDOMAIN.ghe.com`, `*.actions.SUBDOMAIN.ghe.com`, `*.githubassets.com`, `*.githubusercontent.com`, `*.blob.core.windows.net` ja `auth.ghe.com`.
- **EU:n saapuvan ja lähtevän liikenteen IP-alueet** sallittujen luetteloita ja webhookeja vastaanottavia järjestelmiä varten.
- **Ilman jokerimerkkejä:** suorita `gh api /meta --hostname SUBDOMAIN.ghe.com --jq '.domains.storage[]'` tallennuksen isäntänimien luetteloimiseksi.

<a id="3-point-every-client-at-ghecom"></a>
## 3. Kohdista jokainen asiakasohjelma GHE.comiin

Asiakasohjelmat, jotka osoittavat edelleen `github.com`iin, on määritettävä uudelleen. Julkaise tämä taulukko sisäisesti:

| Asiakasohjelma | Asetus |
| --- | --- |
| Git | Kloonaa osoitteesta `https://SUBDOMAIN.ghe.com/...`. SSH-käyttäjä on alitoimialueesi, ei `git`. |
| GitHub CLI | Suorita `gh auth login --hostname SUBDOMAIN.ghe.com` tai aseta `GH_HOST` ([ohjeet](https://docs.github.com/en/enterprise-cloud@latest/github-cli/github-cli/using-multiple-accounts)). |
| VS Code + Copilot | Aseta `github-enterprise.uri` arvoon `https://SUBDOMAIN.ghe.com` ja `"github.copilot.advanced": { "authProvider": "github-enterprise" }` ja kirjaudu sitten sisään ([ohjeet](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-in-your-ide/set-up-copilot/authenticate-to-ghecom)). |
| JetBrains, Visual Studio, Xcode, Eclipse | Aseta yrityksen URL tai tunnistautumispalveluntarjoaja alitoimialueeseesi. JetBrains tarvitsee laajennuksen 1.4.11 tai uudemman. |
| Copilot CLI | Suorita `copilot login --host SUBDOMAIN.ghe.com`. |
| GitHub Desktop | Valitse **Sign in to GitHub Enterprise** ja anna GHE.comin URL. |

**Guide advice (oppaan suositus):** jaa nämä asetukset mahdollisuuksien mukaan laitehallinnan (MDM tai Intune) kautta. Ota sitten [auditointilokin suoratoisto](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) EU-kohteeseen käyttöön ennen ensimmäistä aaltoa. Tuettuja kohteita ovat Azure Blob Storage, Azure Event Hubs, Splunk ja Datadog. Suoratoisto S3:een OIDC:llä ei ole saatavilla GHE.comissa.

<a id="4-choose-the-migration-tool"></a>
## 4. Valitse migraatiotyökalu

| Lähde | Työkalu GHE.comiin |
| --- | --- |
| github.com, toinen GHE.com-yritysympäristö, GHES 3.4.1+, Azure DevOps Services, Bitbucket Server/Data Center 5.14+, GitLab | [GitHub Enterprise Importer (GEI)](https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/understanding-github-enterprise-importer/about-github-enterprise-importer) |
| GHES, mahdollisimman lyhyellä katkolla | [Enterprise Live Migrations](https://docs.github.com/en/enterprise-cloud@latest/migrations/elm/about-live-migrations), [yleisesti saatavilla 1. syyskuuta 2026 lähtien](https://github.blog/changelog/2026-09-01-enterprise-live-migrations-from-ghes-to-ghe-com-generally-available/) |
| Bitbucket Cloud | Git CLI: vain lähdekoodi ja historia |
| Azure DevOps Server | Siirry ensin Azure DevOps Servicesiin, sitten GEI:llä |

GHE.comista takaisin github.comiin ei ole tuettua polkua virallisilla työkaluilla ([migraatiopolut](https://docs.github.com/en/enterprise-cloud@latest/migrations/overview/migration-paths-to-github)). Huomioi tämä irtautumissuunnitelmassasi.

<details>
<summary>Mitä GEI siirtää ja mitä sinun on luotava uudelleen</summary>

[GitHub-tuotteiden välillä](https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/migrating-between-github-products/about-migrations-between-github-products) GEI siirtää Git-historian, pull requestit, issuet, virstanpylväät, wikit, Actions-työnkulkutiedostot, commit-kommentit, julkaisut, aiheet, asetukset ja useimmat haarasuojaukset. Webhookit siirtyvät, mutta ne on otettava uudelleen käyttöön.

Se **ei** siirrä auditointilokeja, code scanning -tuloksia, Dependabot-hälytyksiä tai -salaisuuksia eikä commitien tilatarkistuksia. Se ohittaa myös Actionsin salaisuudet, muuttujat, ympäristöt, runnerit ja suoritushistorian. GitHub Apps, Packages, uudet Projectsit, sääntöjoukot, repositorion keskustelut, ala-issuet, mukautetut ominaisuudet, Git LFS -objektit, tähdet, seuraajat, käyttäjäavaimet, henkilökohtaiset käyttöoikeustunnukset ja tiimijäsenyydet on myös luotava uudelleen.

Pidä lähdejärjestelmä vain luku -tilassa auditointikäytäntösi edellyttämän säilytysajan, koska auditointilokit eivät siirry.

</details>

<a id="5-move-in-waves"></a>
## 5. Siirrä aalloissa

**Guide advice (oppaan suositus), ei GitHubin vaatimus:**

1. **Pilotti:** yksi tai kaksi tiimiä, aidot putket ja Copilot käytössä alueellisen sijainnin käytännöllä. Päätä pilotti, kun asiakasohjelmataulukko ja verkkosäännöt toimivat poikkeuksetta.
2. **Aallot:** ryhmittele repositoriot tiimin ja riippuvuuden mukaan. Jäädytä, siirrä, luo salaisuudet uudelleen, ota webhookit uudelleen käyttöön ja varmista koonti.
3. **Siirtymä:** aseta lähde vain luku -tilaan, ohjaa dokumentaatiolinkit uudelleen ja sulje vanhat organisaatiot säilytysajan jälkeen.
