---
title: Ymmärrä, mikä muuttuu GHE.comissa
section: Mitä GHE.com tarjoaa
order: 3
description: Ymmärrä oma alitoimialue, hallitut identiteetit ja ominaisuuksien erot ennen muiden asioiden suunnittelua.
verified: "2026-11-13"
diagram: platform-architecture
additionalDiagrams:
  - environment-choice
  - feature-availability
checks:
  - question: Voivatko kehittäjät säilyttää henkilökohtaiset github.com-tilinsä ja käyttää niitä GHE.com-yritysympäristössä?
    answer: Eivät. GHE.com-yritysympäristöt käyttävät Enterprise Managed Users -käyttäjiä. Identiteetintarjoajasi luo ja hallitsee tilit, jotka ovat erillisiä henkilökohtaisista github.com-tileistä.
  - question: Valitsit rekisteröityessäsi alitoimialueen "acme-trial". Voitko nimetä sen uudelleen muotoon "acme" ennen tuotantokäyttöä?
    answer: Et. GitHubin käyttöönotto-ohjeiden mukaan alitoimialuetta ei voi muuttaa myöhemmin. Valitse tuotantokäytön nimi ennen kokeilun aloittamista.
  - question: Työnkulku käyttää Marketplace-toimintoa, joka kutsuu suoraan api.github.comia. Toimiiko se muuttamatta?
    answer: Ei välttämättä. Toiminnot, joissa api.github.com on määritetty kiinteästi, voivat epäonnistua, koska GHE.comin API sijaitsee osoitteessa api.SUBDOMAIN.ghe.com. Testaa kriittiset toimintosi kokeilun aikana.
sources:
  - https://docs.github.com/en/enterprise-server@latest/admin/overview/about-github-enterprise-server
  - https://github.com/enterprise/data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud
  - https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users
  - https://github.blog/changelog/2024-10-29-github-enterprise-cloud-data-residency-in-the-eu-is-generally-available/
  - https://github.blog/changelog/2026-03-31-eu-data-residency-region-expanding-to-include-efta-countries/
  - https://github.blog/changelog/2026-04-01-codespaces-is-now-generally-available-for-github-enterprise-with-data-residency/
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Selittämään GHE.comin yhdellä lauseella myös henkilölle, joka ei ole insinööri.
- Nimeämään kolme kaikille käyttäjille muuttuvaa asiaa: osoite, tili ja ominaisuudet.

<a id="the-one-sentence-version"></a>
## Yhden lauseen versio

GitHub kuvaa GHE.comia ”Microsoft Azuressa toimivaksi GitHubin moniasiakaskäyttöiseksi yritysten SaaS-käyttöönottovaihtoehdoksi” ([data residency](https://github.com/enterprise/data-residency)). Se on GitHub Enterprise Cloud, ei itse ylläpidetty palvelin. Yrityksesi saa oman alitoimialueen `SUBDOMAIN.ghe.com`, ja valitset alueen, jolla sen tiedot tallennetaan.

**EU-alue** on ollut yleisesti saatavilla [29. lokakuuta 2024](https://github.blog/changelog/2024-10-29-github-enterprise-cloud-data-residency-in-the-eu-is-generally-available/) lähtien. Muut alueet ovat Australia, Yhdysvallat ja Japani. EU-alueeseen on 1. toukokuuta 2026 lähtien kuulunut myös Azure-infrastruktuuria Norjassa ja Sveitsissä, jotka molemmat ovat EFTA-maita. Se käyttää edelleen olemassa olevia EU-sijainteja Ranskassa, Ruotsissa, Saksassa ja Alankomaissa. GitHubin mukaan tämä [yhdenmukaistaa alueen Microsoftin EU Data Boundaryn kanssa](https://github.blog/changelog/2026-03-31-eu-data-residency-region-expanding-to-include-efta-countries/).

<details>
<summary>Miksi EFTA-laajennus on tärkeä tietosuojavastaavallesi</summary>

Kumpikaan maa ei ole EU:n jäsenvaltio. Norja kuuluu ETAan, jossa GDPR:ää sovelletaan suoraan. Sveitsiä koskee EU:n riittävyyspäätös. [Tallennusta käsittelevä sivu](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency) kuvaa alueen nyt näin: ”EU (sisältää Azure-alueita EFTA-maissa, tällä hetkellä Norjassa ja Sveitsissä)”. Jos sisäinen käytäntö sanoo ”vain EU:n jäsenvaltiot”, päivitä käytännön sanamuoto tai ota ero esiin asiakkuustiimisi kanssa ennen allekirjoitusta.

</details>

<a id="what-changes-for-every-user"></a>
## Mikä muuttuu jokaiselle käyttäjälle

| Käyttöönotto | Isännöinti | Keskeinen operatiivinen kompromissi |
| --- | --- | --- |
| GitHub Enterprise Cloud github.comissa | GitHubin hallinnoima SaaS | Jaetut github.comin päätepisteet; tarkista soveltuvat tallennussitoumukset. |
| GHE.com | GitHubin hallinnoima SaaS ja valittu datan alueellinen sijainti | Hallitut identiteetit ja oma yrityksen alitoimialue; tarkista dokumentoidut poikkeukset. |
| [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@latest/admin/overview/about-github-enterprise-server) | Itse ylläpidetty laiteympäristö omassa infrastruktuurissasi | Hallitset käyttöönottoa, ylläpitoa ja infrastruktuuria; julkaisut ja ominaisuudet eroavat. |

| | github.com | GHE.com |
| --- | --- | --- |
| Osoite | `github.com`, `api.github.com` | `SUBDOMAIN.ghe.com`, `api.SUBDOMAIN.ghe.com` |
| Tilit | Henkilökohtaiset tilit tai hallitut käyttäjät | Vain [Enterprise Managed Users](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency), jotka provisioidaan IdP:stäsi |
| Julkinen sisältö | Julkiset repositoriot ja gistit | Ei saatavilla (EMU-rajoitus) |
| Copilot-tilaukset | Henkilökohtaiset tilaukset, Business ja Enterprise | Vain Business tai Enterprise |

**Identiteetti on suurin muutos.** IdP:si omistaa jokaisen tilin. GitHub [tukee](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users) Microsoft Entra ID:tä OIDC:n tai SAMLin sekä SCIMin kanssa ja Oktaa tai PingFederatea SAMLin sekä SCIMin kanssa. Oktan ja Entra ID:n sekoittaminen SSO:ssa ja SCIMissä ei ole tuettua. Entra ID:n kanssa [GitHub suosittelee OIDC:tä](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud).

<a id="check-the-feature-differences-during-the-trial"></a>
## Tarkista ominaisuuserot kokeilun aikana

[Ominaisuuksien yleiskatsaus](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency) on ensisijainen luettelo. Tarkistuspäivänä siinä todettiin:

- **Ei tällä hetkellä saatavilla:** organisaatio- ja yritystason riippuvuusnäkymät, Actionsin macOS-runnerit, GitHub Packagesin Maven ja Gradle, GitHub Marketplace, jotkin esiversio-ominaisuudet sekä auditointilokin suoratoisto Amazon S3:een OIDC:llä.
- **Ei koskaan saatavilla:** julkiset repositoriot ja gistit sekä GitHub Importer.
- **Eroaa:** konttirekisteri on `containers.SUBDOMAIN.ghe.com`. Actionsin OIDC-myöntäjä on `token.actions.SUBDOMAIN.ghe.com`. Raakatiedostot tulevat osoitteesta `raw.SUBDOMAIN.ghe.com`, ja SSH-käyttäjä on alitoimialueesi. Toiminnot, joihin `api.github.com` on määritetty kiinteästi, voivat epäonnistua. Siirretyt verkkocommitit voivat näkyä tilassa ”Unverified”, koska verkkocommitien allekirjoitusavaimet eroavat.

**Codespaces** tuli [yleisesti saataville GHE.comissa](https://github.blog/changelog/2026-04-01-codespaces-is-now-generally-available-for-github-enterprise-with-data-residency/) 1. huhtikuuta 2026 kaikilla neljällä alueella. Jotta data pysyy alueella, codespacejen on oltava organisaation tai yrityksen omistamia. Käyttäjien omistamia codespaceja ei tueta.

**Guide advice (oppaan suositus):** käsittele ominaisuuksien yleiskatsausta tarkistuslistana, älä pelkkänä luettavana aineistona. Luettele 30 päivän kokeilun aikana 20 tärkeintä työnkulkuasi ja integraatiotasi, suorita jokainen ja kirjaa tulokseksi läpäisty, epäonnistunut tai kiertotapa. Lue sivu uudelleen ennen allekirjoitusta, koska ”ei tällä hetkellä saatavilla” -luettelo lyhenee ajan mittaan.

<a id="worked-example-the-marketplace-surprise"></a>
## Esimerkki: Marketplace-yllätys

**Hypothetical scenario (hypoteettinen tilanne):** Maksupalveluyritys tekee kokeilun. Alustatiimi tuo kolme edustavaa repositoriota ja suorittaa niiden putket. Kaksi kolmannen osapuolen toimintoa epäonnistuu, koska ne kutsuvat `api.github.com`ia. Kolmas riippuu Marketplace-sovelluksesta, jota ei voi asentaa.

Mikään näistä epäonnistumisista ei estä siirtymää, mutta jokainen tarvitsee vastuuhenkilön. Tiimi kiinnittää yhden toiminnon haarukan, joka lukee API-osoitteen `GITHUB_API_URL`-ympäristömuuttujasta. Se korvaa toisen toiminnon komentosarjalla. Se kysyy sovelluksen toimittajalta, tukeeko tämä GHE.comia. Ilman kokeilua nämä olisivat olleet tuotantokäyttöönoton häiriöitä.
