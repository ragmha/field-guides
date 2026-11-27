---
title: Kokoa tietoturvan todistusaineisto
section: Tietoturva ja varmentaminen
order: 6
description: Yhdistä yrityksen hallintakeinot, auditointiaineisto ja selkeä jäännösriskin arviointi.
verified: "2026-11-13"
diagram: security-layers
additionalDiagrams:
  - audit-flow
  - assurance-evidence
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency
  - https://github.com/customer-terms/github-data-protection-agreement
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Hankkimaan varmentavaa aineistoa ja tarkistamaan sen soveltamisalan.
- Suoratoistamaan auditointitapahtumat hallitsemaasi kohteeseen.
- Tunnistamaan hallintakeinot, jotka on validoitava GHE.comissa.

<a id="evidence-is-more-than-a-badge"></a>
## Todistusaineisto on enemmän kuin merkki

Yrityksen omistajat voivat käyttää [vaatimustenmukaisuusraportteja](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise). **Guide advice (oppaan suositus):** säilytä raportti ja sen soveltamisala, tarkista poikkeukset ja dokumentoi, kuka hyväksyi mahdollisen jäljelle jäävän riskin. [DPA](https://github.com/customer-terms/github-data-protection-agreement) kuvaa auditointi- ja tiedonsaantioikeudet; allekirjoitettu sopimuksesi on määräävä.

<a id="observe-activity"></a>
## Seuraa toimintaa

Suunnittele [auditointilokin suoratoisto](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) ennen migraatiota. Valitset kohteen itse, ja se on osa datasi hallintarajaa. Testaa toimitus, säilytys, käyttöoikeudet ja hälytysten omistajuus; varmista ajantasaisesta [ominaisuuksien yleiskatsauksesta](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency), että valitsemasi kohde ja tunnistautumistapa ovat tuettuja.

<a id="layer-controls"></a>
## Kerrosta hallintakeinot

**Guide advice (oppaan suositus):** yhdistä IdP-käytännöt, vähimpien oikeuksien mukainen pääsy, repositorioiden säännöt, salaisuuksien suojaus, koodin tarkistus, integraatioiden arviointi ja häiriötilanteiden toimintasuunnitelma. Saatavuus voi vaihdella käyttöönottojen välillä; tarkista ominaisuuksien yleiskatsaus ja testaa jokainen hallintakeino edustavissa repositorioissa. Älä pidä yksittäistä ominaisuutta tai sertifiointia todisteena koko järjestelmän turvallisuudesta.

<a id="worked-example-an-audit-request"></a>
## Esimerkki: auditointipyyntö

**Hypothetical scenario (hypoteettinen tilanne):** Tietoturvatarkastaja pyytää näyttöä siitä, että erityisoikeuksilla tehdyt muutokset ovat näkyvissä. Alustatiimi toimittaa soveltuvan raportin soveltamisalan, testiluonteisesta käytäntömuutoksesta syntyneen auditointitapahtuman, todisteen tapahtuman saapumisesta valittuun lokikohteeseen sekä hälytyksen omistajan.
