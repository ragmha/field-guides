---
title: Kartoita, missä datasi sijaitsee
section: Mitä GHE.com tarjoaa
order: 4
description: Erota GitHubin EU-alueella tallentamat tiedot dokumentoiduista poikkeuksista ja päätä, mitkä poikkeukset tarvitsevat hallintakeinon.
verified: "2026-11-12"
diagram: data-map
additionalDiagrams:
  - exceptions-flow
  - data-lifecycle
checks:
  - question: Tietosuojavastaavasi kysyy, ilmoittaako GitHub joka kerta, kun dataa poistuu EU-alueelta. Mikä on vastaus?
    answer: Ei. GitHub dokumentoi syyt tiedonsiirroille alueen ulkopuolelle, mutta ei ilmoita siirron tapahtuessa. Arvioi dokumentoidut luokat kerran ja tarkista sivu sen jälkeen säännöllisesti.
  - question: Insinööri liittää viallisen lähdetiedoston tukipyyntöön. Onko tiedoston pysyminen EU-alueella taattu?
    answer: Ei. Tukipyynnöt ja tapausmuistiinpanot luetellaan tietoina, joita voidaan tallentaa alueen ulkopuolella. Määritä sääntö siitä, mitä tukipyyntöihin saa sisällyttää.
  - question: Copilot on käytössä oletusasetuksilla. Onko kehotteiden ja vastausten pysyminen EU-alueella taattu?
    answer: Ei. Copilotin tietoja voidaan oletusarvoisesti tallentaa alueen ulkopuolelle. Ota käyttöön "Restrict Copilot to data residency compliant models" -käytäntö ja käytä tuettuja asiakasohjelmia ja ominaisuuksia alueellisen rajoituksen täytäntöönpanemiseksi.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency
  - https://github.com/customer-terms/github-data-protection-agreement
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Luettelemaan, mitä GitHub tallentaa EU-alueella, käyttäen GitHubin omia luokkia.
- Muuttamaan jokaisen dokumentoidun poikkeuksen hyväksymistä, määritystä tai käytäntöä koskevaksi päätökseksi.
- Selittämään, miksi myös integraatiot ovat osa datasi hallintarajaa.

<a id="stored-in-the-eu-region"></a>
## Tallennetaan EU-alueella

GitHubin [tallennusta käsittelevä sivu](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency) sijoittaa kolme luokkaa alueelle:

- **Asiakassisältö:** repositoriot, mukaan lukien nimet ja lähdekoodi; pull requestit, kommentit, tiedostopolut, raaka-URL-osoitteet ja tiedostonimet; rakenteinen tallennus ja blob-tallennus.
- **Yrityksesi tunnistavat tiedot tai lokit:** GitHub Actionsin tiedot ja lokit sekä liiketoiminnan jatkuvuuden ja häiriöstä palautumisen (BCDR) tiedot.
- **Henkilön tunnistavat tiedot tai lokit:** sähköpostiosoite, käyttäjänimi, etu- ja sukunimi sekä IP-osoite.

Myös varmuuskopiot ja häiriöstä palautuminen pysyvät alueella. Tämä kattaa koodin, yhteistyöhistorian ja soveltuvat henkilötiedot GitHubin EU-alueella, johon kuuluvat myös Norja ja Sveitsi.

<a id="the-documented-exceptions-and-what-to-do-with-each"></a>
## Dokumentoidut poikkeukset ja niiden käsittely

Samalla sivulla luetellaan tiedot, joita GitHub ”voi tallentaa valitsemasi alueen ulkopuolella” [Data Protection Agreementin](https://github.com/customer-terms/github-data-protection-agreement) mukaisiin tarkoituksiin. **Päätöksesi-sarake sisältää oppaan suosituksia.**

| Luokka (GitHubin sanamuoto) | Mitä se on | Päätöksesi |
| --- | --- | --- |
| Telemetria tai lokit, joissa on pysyviä tunnisteita | Käyttäjätunnukset tai GUID-tunnisteet, sähköpostin, käyttäjänimen, nimen tai IP-osoitteen suolaamattomat tiivisteet | **Hyväksy.** Pseudonymisoitua operatiivista dataa, jota DPA koskee. Kirjaa se tiedonsiirron arviointiin. |
| Maksullisen tilauksen hallinnointitiedot | Yhteys-, laskutus-, osto-, maksu- ja lisenssitiedot | **Hyväksy ja minimoi.** Käytä mahdollisuuksien mukaan yhteistä laskutuksen sähköpostilaatikkoa nimetyn henkilön sijaan. |
| Tuki- ja palautetiedot | Tukipyynnöt, tapausmuistiinpanot, puhelut, keskustelut, etäistunnot | **Käytäntö.** Ei salaisuuksia, henkilötietoja tai säänneltyä koodia tukipyyntöihin, ellei arviointisi salli sitä. |
| GitHub Copilotin tiedot | Copilotin tiedot ja lokit **voivat oletusarvoisesti olla alueen ulkopuolella** | **Määritä.** Ota Copilotin alueellisen sijainnin käytäntö käyttöön. Katso [luku 6.1](/part-6/1-copilot/). |
| Salaisuuksien tarkistuksen tiedot | Kelpoisuustarkistukset ja laajennetut metatietotarkistukset vain, jos otat ne käyttöön | **Päätä.** Nämä tarkistukset ottavat yhteyttä tunnuksen myöntäjään. Ota ne käyttöön repositorion riskin perusteella. |
| TLS-varmenteen tiedot | Varmennetiedot, jotka lähetetään varmenneviranomaisille ja läpinäkyvyyslokeihin | **Hyväksy.** Tarkoituksellisesti julkisia ja rajattuja alitoimialueesi nimeen. |

Kaksi muuta lausetta on tärkeää. Ensinnäkin: ”GitHub dokumentoi syyt tiedonsiirroille yrityksesi alueen ulkopuolelle, mutta ei ilmoita siirtojen tapahtuessa.” Toiseksi rekisteröityjen pyynnöt menevät [GitHub Supportiin](https://support.github.com). Jos joku rekisteröidyistäsi ottaa suoraan yhteyttä GitHubiin, GitHub ohjaa hänet sinulle.

<a id="your-perimeter-includes-your-integrations"></a>
## Hallintarajaasi kuuluvat myös integraatiot

Alueellinen sijainti kuvaa, missä **GitHub** tallentaa dataa. Muualle lähettämäsi data menee sinne, minne sen lähetät. **Guide advice (oppaan suositus):** lisää nämä datakarttaasi:

- **Itse ylläpidetyt runnerit** toimivat siellä, missä niitä ylläpidät. Azure-yksityisverkotus GitHubin ylläpitämille runnereille tarjoaa [EU:n runner-alueita](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom), kuten France Central ja Sweden Central x64:lle. Runner-alueet ovat erillisiä datan isännöinnistä.
- **Webhookit, GitHub Apps ja OAuth-sovellukset** lähettävät dataa päätepisteisiinsä. Tarkista, missä kukin toimittaja isännöi sitä.
- **Auditointilokin suoratoisto** lähettää tapahtumat valitsemaasi tallennus-, SIEM- tai lokipalveluun. Valitse EU-kohde.
- **Kehittäjien laitteet ja kloonit** sisältävät koodin kopioita. Alueellinen sijainti ei korvaa päätelaitteiden hallintakeinoja.

<a id="worked-example-the-dpos-one-page-answer"></a>
## Esimerkki: yhden sivun vastaus tietosuojavastaavalle

**Hypothetical scenario (hypoteettinen tilanne):** Julkisen sektorin viraston tietosuojavastaava kysyy: ”Missä koodimme sijaitsee?” Alustasta vastaava henkilö vastaa yhdellä sivulla:

1. Koodi, issuet, pull requestit, Actions-lokit, varmuuskopiot ja käyttäjien identiteettitiedot tallennetaan EU-alueella, johon kuuluvat Norja ja Sveitsi. Linkki: GitHubin tallennusta käsittelevä sivu.
2. GitHub dokumentoi viisi tietoluokkaa, joita voidaan tallentaa alueen ulkopuolella, sekä TLS-varmenteiden tiedot. Jokaisesta on tehty päätös: hyväksyminen (telemetria, laskutus, TLS), käytäntö (tukipyynnöt) tai määritys (Copilot-käytäntö käytössä, salaisuuksien tarkistuksen kelpoisuustarkistukset käytössä vain valituissa repositorioissa).
3. Integraatioluettelossa näkyy kaksi EU:ssa isännöityä SaaS-työkalua ja auditointilokin suoratoisto EU:n tallennustilille.

Tietosuojavastaava voi hyväksyä vastauksen, koska jokaiselle poikkeukselle on nimetty päätös. Sivulla ei väitetä, että ”mitään ei koskaan poistu EU:sta”. Dokumentaatio ei tue tätä väitettä, ja auditoija havaitsisi puutteen.
