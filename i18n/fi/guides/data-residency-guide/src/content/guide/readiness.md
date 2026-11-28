---
title: Valmiuden tarkistuslista
section: Ota käyttöön luottavaisin mielin
order: 8
description: Kutsu oikeat ihmiset mukaan, kokoa todistusaineisto, tee käyttöönottopäätös ja kirjoita irtautumissuunnitelma ennen kuin tarvitset sitä.
verified: "2026-11-12"
diagram: adoption-path
additionalDiagrams:
  - exit-states
  - support-blueprint
  - go-no-go
checks:
  - question: CISO pyytää GitHubin SOC 2 -raporttia ennen GHE.comin hyväksymistä. Mistä saat sen?
    answer: Yrityksen omistaja voi ladata SOC 1 ja SOC 2 Type 2-, ISO/IEC 27001:2022-, CSA STAR- ja muita raportteja yritysasetusten Compliance-välilehdeltä. Tarkista, että kunkin raportin soveltamisala kattaa GHE.comin; Microsoft Product Terms ilmoittaa SOC 1 ja SOC 2 Type II -vaatimustenmukaisuuden GitHub Enterpriselle, jossa alueellinen sijainti on käytössä.
  - question: Kenen tulisi vastata päätöksestä ottaa Copilotin alueellisen sijainnin käytäntö käyttöön?
    answer: Alustatiimi ottaa asetuksen käyttöön, mutta tietosuojavastaavan ja budjetista vastaavan tulee ensin hyväksyä se. Käytäntö muuttaa tekoälykäsittelyn sijaintia ja lisää AI Credits -kulutusta 10 %.
  - question: Miksi irtautumissuunnitelma kannattaa kirjoittaa ennen migraatiota eikä sen jälkeen?
    answer: Koska alitoimialue on pysyvä eikä GHE.comista takaisin github.comiin ole virallista reittiä. Vietävissä olevien tietojen tunteminen ja viennin testaaminen ovat osa alustan valintaa. Myös DORA:n 28 artiklan 8 kohta edellyttää irtautumisstrategioita kriittisiä toimintoja tukeville ICT-palveluille.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud
  - https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise
  - https://www.microsoft.com/licensing/terms/productoffering/GitHubOfferings/MCA
  - https://ghec.github.trust.page/
  - https://eu.githubstatus.com/
  - https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors
  - https://github.com/customer-terms/github-data-protection-agreement
  - https://github.com/customer-terms/general-terms
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://eur-lex.europa.eu/eli/reg/2022/2554/oj
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Antamaan jokaiselle sidosryhmälle selkeän roolin ja vastattavan kysymyksen.
- Kokoamaan todistusaineiston, joka vastaa tavallisiin vastaväitteisiin.
- Tekemään käyttöönottopäätöksen arvioinnin ja kirjoittamaan testattavan irtautumissuunnitelman.

<a id="who-decides-what"></a>
## Kuka päättää mistäkin

| Rooli | Kysymys | Vastuu |
| --- | --- | --- |
| Tietosuojavastaava | Käsitelläänkö henkilötietoja laillisesti ja mitä poistuu EU:sta? | Käsittelytoimien rekisteri, tarvittaessa DPIA, tiedonsiirron vaikutustenarviointi |
| CISO tai tietoturvasta vastaava | Onko alusta turvallinen ja näemmekö, mitä siinä tapahtuu? | Toimittajan riskinarviointi, auditointilokin suoratoisto, häiriötilanteiden toimintasuunnitelma |
| Lakiasiat | Mitkä ehdot soveltuvat ja täyttävätkö ne toimialamme säännöt? | Sopimuksen arviointi, DPA:n versio, DORA:n 30 artiklan puuteanalyysi |
| Hankinta | Keneltä ostamme ja millä lisenssillä? | Ostoreitti (GitHub tai Microsoft), ympäristökohtaiset lisenssit, alikäsittelijöiden ilmoitukset |
| Alustatekniikka | Voimmeko käyttää alustaa ja siirtyä siihen turvallisesti? | Kokeilu, identiteetti, verkon sallittujen luettelot, migraatio, Copilot-käytäntö |
| Kehitysjohdon edustajat | Pysyvätkö kehittäjät tuottavina? | Käyttöönottosuunnitelma, koulutus, Copilotin käyttöönotto |
| Budjetista vastaava | Mitä tämä maksaa Copilotin alueellinen sijainti mukaan lukien? | Lisenssit ja Copilotin alueellisen sijainnin 10 %:n lisäkulutus |

**Guide advice (oppaan suositus):** nimeä yksi henkilö käyttöönoton omistajaksi. Alueellisen sijainnin hankkeet pysähtyvät, kun jokainen tiimi odottaa toisen hyväksyntää.

<a id="the-evidence-pack"></a>
## Todistusaineisto

Kokoa nämä ennen käyttöönottopäätöksen kokousta. Useimmat ovat julkisia tai ladattavissa.

| Todistusaineisto | Mistä se saadaan | Mihin se vastaa |
| --- | --- | --- |
| Datakartta | [Luku 3.1](/part-3/1-data-map/) ja GitHubin [tallennusdokumentaatio](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency) | Mikä pysyy GitHubin EU-alueella ja mikä ei |
| Vaatimustenmukaisuusraportit | Yritysasetukset ja sitten **Compliance** ([ohje](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise)) | SOC 1 ja 2 Type 2, ISO 27001, CSA STAR, jatkuvuussuunnitelma |
| Luottamuskeskus | [GitHub Enterprise Cloud -luottamusportaali](https://ghec.github.trust.page/) | Tietoturvan hallintakeinot ja pyydettävät asiakirjat |
| Allekirjoitettu sopimus ja DPA | Oma sopimuksesi; julkinen [DPA](https://github.com/customer-terms/github-data-protection-agreement) | Käsittelijän ehdot, tiedonsiirrot ja auditointioikeudet |
| Alikäsittelijäluettelo | [GitHubin alikäsittelijät](https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors) | Kuka muu käsittelee tietoja |
| Palvelun tila | [GitHub Enterprise Cloudin EU-tilasivu](https://eu.githubstatus.com/) | EU-alueen häiriöhistoria ja ajantasainen tila |
| Copilot-asetukset | Kuvakaappaus alueellisen sijainnin käytännöstä ja sen auditointilokimerkintä | Että tuettu päättely pysyy valitulla alueella |
| Irtautumissuunnitelma | Oma asiakirjasi (katso alla) | Että voit irtautua |

Tarkista jokaisen vaatimustenmukaisuusraportin soveltamisalaa koskeva lausuma. [Microsoft Product Terms for GitHub Offerings](https://www.microsoft.com/licensing/terms/productoffering/GitHubOfferings/MCA) ilmoittaa SOC 1 ja SOC 2 Type II -vaatimustenmukaisuuden tuotteelle ”GitHub Enterprise (with data residency enabled)”.

<a id="go-or-no-go-checklist"></a>
## Käyttöönottopäätöksen tarkistuslista

Merkitse jokainen kohta ennen tuotantotyön siirtämistä:

- [ ] Ostoreitti vahvistettu ja DPA:n versio kirjattu.
- [ ] Tietosuojavastaava on tarkistanut datakartan ja alueen ulkopuolisille luokille on tehty tiedonsiirron vaikutustenarviointi.
- [ ] Kokeiluyritysympäristö testattu: identiteetintarjoaja, Enterprise Managed Users, SCIM ja ehdollinen käyttö.
- [ ] Verkon sallittujen luettelot osoitteelle `SUBDOMAIN.ghe.com` ja siihen liittyville isäntäkoneille ovat käytössä ([verkkotiedot](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom)).
- [ ] Auditointilokin suoratoisto SIEMiin toimii ([suoratoisto](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise)).
- [ ] Copilotin alueellisen sijainnin käytäntö käytössä ja malliluettelo hyväksytty.
- [ ] Esiversio-ominaisuudet poistettu käytöstä arviointiin asti (DPA §2.A).
- [ ] Alikäsittelijöiden ilmoitukset tilattu ja lukija nimetty.
- [ ] Häiriötilanteiden toimintasuunnitelmaan lisätty GitHubin yhteystiedot ja EU-tilasivu.
- [ ] Migraatio suunniteltu ja pilottirepositoriot valittu ([luku 9.1](/part-9/1-migrate/)).
- [ ] Irtautumissuunnitelma kirjoitettu ja testattu.

<a id="write-the-exit-plan-now"></a>
## Kirjoita irtautumissuunnitelma nyt

Irtautumissuunnitelmasi tulisi vastata neljään kysymykseen:

1. **Mitä meidän on säilytettävä?** Koodi ja historia, issuet ja pull requestit, Actions-työnkulut ja lokit, paketit, wikit ja julkaisuun liittyvät tiedostot.
2. **Miten saamme ne ulos?** Git-kloonit säilyttävät koko historian. Migraatio- ja vientityökalut kattavat enemmän, mutta tarkista, mitä kukin ei siirrä. Säilytä salaisuudet ja muuttujat omassa säilössäsi, jotta niitä ei tarvitse koskaan viedä.
3. **Kuinka paljon aikaa meillä on?** [General Termsin §9.5](https://github.com/customer-terms/general-terms) sallii enintään 90 päivää sopimuksen päättymisen jälkeen repositoriodatan siirtämiseen tai siirtopyynnön tekemiseen ilman tuotantokäyttöä tuona aikana. DPA:n §8 antaa mahdollisuuden valita poiston tai palautuksen. Varmista, mitkä ehdot soveltuvat sopimukseesi.
4. **Olemmeko testanneet sen?** Vie edustava repositorio vähintään kerran vuodessa ja kirjaa tulos.

**Guide advice (oppaan suositus):** pidä kriittisistä repositorioista ajastettu peili GitHubin ulkopuolella. Se on edullinen, todistaa siirrettävyyden auditoijille ja toimii varasuunnitelmana, jos pääsy joskus keskeytetään.

<a id="worked-example-a-two-week-readiness-sprint"></a>
## Esimerkki: kahden viikon valmiussprintti

**Hypothetical scenario (hypoteettinen tilanne):** Saksalainen valmistaja haluaa päätöksen kahdessa viikossa.

- **Viikko 1:** alustatiimi kokeilee kolmea organisaatiota ja yhdistää Entra ID:n ja SIEMin. Tietosuojavastaava tarkistaa datakartan; lakitiimi varmistaa, että yritys ostaa Microsoft-sopimuksensa kautta, ja kirjaa DPA:n version.
- **Viikko 2:** tietoturvatiimi lataa raportit ja tarkistaa niiden soveltamisalan. Taloushallinto hyväksyy Copilotin lisäkulutuksen. Alustatiimi vie pilottirepositorion itse ylläpidetylle Git-palvelimelle irtautumistestinä.

Käyttöönottopäätöksen kokouksessa kaikki kohdat alikäsittelijöiden seurantaa lukuun ottamatta on merkitty. He nimeävät sille vastuuhenkilön saman tien ja hyväksyvät migraation.
