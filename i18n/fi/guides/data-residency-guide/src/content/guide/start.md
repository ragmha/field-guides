---
title: GitHubin EU-datasijainnin käyttöönotto
section: Kurssin sisältö
order: 0
description: Riippumaton, lähteistetty opas tiimeille, jotka ottavat käyttöön GitHub Enterprise Cloudin EU-alueen datasijainnilla. Aiheina ovat suvereniteetti, aluerajaus, Copilot, DPA, EU-lainsäädäntö ja käyttöönottovalmius.
verified: "2026-11-12"
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-github-enterprise-cloud-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency
  - https://github.com/customer-terms/github-data-protection-agreement
---

Lähdekoodisi on immateriaalioikeuksien alaista omaisuutta, ja repositoryt sisältävät paljon muutakin: nimiä, sähköpostiosoitteita, suunnittelupäätöksiä, tietoturvahavaintoja ja joskus säänneltyä tietoa. Eurooppalaisissa säännöissä kysytään yhä useammin, missä tiedot sijaitsevat, kuka voi käyttää niitä ja voiko palvelusta siirtyä pois.

Datasijaintia tukeva GitHub Enterprise Cloud, eli **GHE.com**, voi tallentaa koodisi ja sen historian GitHubin EU-alueelle, johon kuuluvat myös Norja ja Sveitsi. Tämä opas linkittää alkuperäisiin lähteisiin ja selittää sitoumuksen rajat.

## Vastaus 60 sekunnissa

- **Mikä pysyy EU-alueella:** repositoryt, pull requestit, issuet, Actions-data ja -lokit, varmuuskopiot ja käyttäjien identiteettitiedot ([GitHubin tallennusta käsittelevä sivu](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency)). Alueeseen kuuluvat myös Norja ja Sveitsi.
- **Mikä voi poistua alueelta:** dokumentoitu joukko tietoluokkia, kuten telemetria, laskutustiedot, tukitiedot ja eräät erikseen käyttöön otettavat ominaisuudet. Kustakin on tehtävä tietoinen päätös.
- **Copilot:** datasijaintikäytäntö pitää tuetun päättelykäsittelyn valitulla alueella. Se on oletusarvoisesti pois käytöstä ja lisää AI-krediittien kulutusta 10 % ([Copilot ja datasijainti](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency)).
- **Sopimus:** [GitHubin DPA](https://github.com/customer-terms/github-data-protection-agreement) tekee aluevalinnastasi käsittelyohjeen ja lisää tiedonsiirron suojatoimia.
- **Mitä tämä ei ole:** täydellistä suvereniteettia. GitHub on yhdysvaltalainen yritys, joten datasijainti tarkoittaa sijaintia ja sopimussuojaa, ei koskemattomuutta ulkomaisen lain suhteen.

## Kenelle opas on tarkoitettu

| Jos olet | Aloita tästä |
| --- | --- |
| Tietosuojavastaava tai tietosuojan vetäjä | [Miksi suvereniteetti](/part-1/1-why-sovereignty/), [tietokartta](/part-3/1-data-map/), [DPA](/part-7/1-dpa/) |
| Lakimies tai hankinnan asiantuntija | [Datasijainti ja suvereniteetti](/part-1/2-residency-vs-sovereignty/), [DPA](/part-7/1-dpa/), [sääntely](/part-8/1-regulations/) |
| Tietoturvajohtaja tai tietoturvan vetäjä | [Tietokartta](/part-3/1-data-map/), [Copilot](/part-6/1-copilot/), [valmiuden tarkistuslista](/part-10/1-readiness/) |
| Alustainsinööri | [Mikä GHE.com on](/part-2/1-ghe-com/), [käyttöönotto, yhdistäminen ja migraatio](/part-9/1-migrate/) |
| Päätöksestä vastaava | Lue kaikki järjestyksessä. Kuhunkin lukuun kuluu noin kymmenen minuuttia. |

## Näin käytät opasta

- **Jokainen tosiasiaväite on linkitetty alkuperäiseen lähteeseen:** GitHubin dokumentaatioon, GitHubin asiakasehtoihin, EUR-Lexiin tai Euroopan komission aineistoon.
- **”Guide advice”** merkitsee suosituksia. Pidä niitä lähtökohtana, ei oikeudellisena neuvona.
- **”Hypothetical scenario”** merkitsee esimerkkejä. Organisaatiot ovat kuvitteellisia.
- Jokaisen luvun lopussa on viiden kysymyksen testi. Saavuta vähintään 80 % avataksesi seuraavan luvun; uusintayrityksiä ei ole rajoitettu. Edistyminen tallennetaan vain tähän selaimeen eikä ole tietoturvakontrolli. Aloita alusta valitsemalla **Nollaa kurssin edistyminen**.
- [Lähdesivulla](/sources/) luetellaan, mitä pystyttiin ja mitä ei pystytty varmentamaan.

Tämä opas on riippumaton eikä ole oikeudellista neuvontaa. GitHubin ehdot ja ominaisuudet muuttuvat, joten tarkista kunkin sivun tarkistuspäivä ja varmista tiedot linkitetyistä lähteistä ennen kuin luotat niihin.
