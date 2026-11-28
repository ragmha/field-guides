---
title: Lähteet ja julkaisutila
section: Liite
order: 25
description: Kurssia varten tarkastellut ensisijaiset lähteet ja olennaiset julkaisutilaa koskevat rajaukset.
verified: "2026-11-12"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## Mitä opit

Alla olevat linkit ovat tässä luonnoksessa käytetyt ensisijaiset dokumentaatiolähteet. Tarkastuspäivät kertovat lähteen tarkistamisesta, eivät tuotteen hyväksynnästä tai takeesta, että asetus soveltuu ympäristöösi. Palaa lähteisiin ennen toimenpiteitä; yli 30 päivää tarkastuksesta edellyttää uutta tarkistusta.

| Aihe | Lähde | Tarkastettu |
| --- | --- | --- |
| Yrityksen tekemä määritys | [Myönnä yrityksen käyttöoikeus](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access) | 2026-11-12 |
| Organisaation tekemä määritys | [Myönnä organisaation käyttöoikeus](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access) | 2026-11-12 |
| Toiminta ja tuki | [Muistuta passiivisia käyttäjiä](https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users) | 2026-11-12 |
| Käytäntöjen laajuus | [Yrityksen käytännöt](https://docs.github.com/en/copilot/concepts/enterprise/policies) | 2026-11-12 |
| Käytäntöjen poikkeukset | [Käytäntöristiriidat](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) | 2026-11-12 |
| Mallien hallintakeinot | [Mallien saatavuus](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) | 2026-11-12 |
| Oletussaatavuus | [Ominaisuuksien ja mallien oletuskäytännöt](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) | 2026-11-12 |
| Laskutus | [Käyttöön perustuva laskutus](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) | 2026-11-12 |
| Budjetit | [Budjettien hallintakeinot](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) | 2026-11-12 |
| Pilvikäytäntö | [Hallitse Copilotia pilvessä](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) | 2026-11-12 |
| Pilvisuoritus | [Copilot GitHubissa](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) | 2026-11-12 |
| Työkalurajoitukset | [MCP-hallinta](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) | 2026-11-12 |
| Sallittujen luettelon laajuus ja arviointi | [Määritä MCP-sallittujen luettelo](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) | 2026-11-12 |
| Verkkosuodatus | [Palomuuri](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | 2026-11-12 |
| Ohjeet | [Mukautetut ohjeet](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) | 2026-11-12 |
| Poissulut | [Sisällön poissulku](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) | 2026-11-12 |
| Poissulun määritys | [Määritä sisällön poissulku](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | 2026-11-12 |
| Käyttöönotto | [Käyttömittarit](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) | 2026-11-12 |
| Agentin toiminta | [Agenttitoiminnan seuranta](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) | 2026-11-12 |

## Julkaisutila ja laajuus

- Yritystiimien mallikäyttöoikeus: **julkinen esiversio – käytä harkiten**. Vaihtaminen muuttaa mallien yksityiskohtaista hallintatilaa.
- Mukautettu MCP-rekisteri: **julkinen esiversio – käytä harkiten**. Hallittujen asetusten sallittujen luettelot ovat yleisesti saatavilla tuetuissa asiakasohjelmissa.
- Agentti-istuntojen auditoinnin suoratoisto: **julkinen esiversio – käytä harkiten**, rajoitettu seurantaoppaassa mainittuihin yritystyyppeihin.
- Muiden kyvykkyyksien tuki vaihtelee palvelupaketin, asiakasohjelman ja käyttöympäristön mukaan. Esiversiomaininnan puuttuminen ei takaa saatavuutta tai hyväksyntää.

## Alkuperä ja tekijätiedot

Kurssin taustana käytettiin [Octodemon governance-at-scale-repositoriota](https://github.com/octodemo/copilot-governance-at-scale), joka tarkastettiin commitissa `a5716db9eac7704be09beea6b520965110edf46d`. Sen oma tuotetietue kuvaa sisältöä vanhentuneeksi, tarkastamattomaksi luonnosaineistoksi nimenomaiseen ihmisen tekemään tarkastukseen asti. Tutustu viralliseen GitHub-dokumentaatioon sen sijaan, että olettaisit työpajan sisällön olevan ajantasaista. [MIT-ilmoitus](/licenses/octodemo-MIT.txt) on säilytetty.

Kaavioiden HTML perustuu [diagram-design](https://github.com/cathrynlavery/diagram-design) -pohjiin; sen [MIT-ilmoitus](/licenses/diagram-design-MIT.txt) on säilytetty.

Kuvissa käytetään päätösvuokaavioita, rinnakkaisia budjettiarvioinnin kulkuja, käyttöpaikan elinkaaren vaihekarttaa, täydentäviä suojauskerroksia, laskutusvastuiden karttaa ja käyttöönoton joukkojen päällekkäisyyttä. Niiden kuvitteelliset lähtötiedot ja rajoitukset tulevat vastaavista oppitunneista eivätkä ole uusia tuoteväitteitä. Budjettimuunnelmassa määrittelemätön mukana tulevan kiintiön tila jätetään pois sen päättelemisen sijaan; esto päättää kulun. Kaavioiden tulokset ovat selityksiä eivätkä näyttöä todellisesta määrityksestä tai täytäntöönpanosta.

Tämä riippumaton opas ei ole GitHubin tuottama eikä sen hyväksymä.
