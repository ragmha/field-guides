---
title: Seuraa agenttien toimintaa vastuullisesti
section: Havainnoitavuus
order: 3
description: Valitse auditointi- ja telemetrianäyttö määrittämällä yksityisyyden ja kattavuuden rajat.
verified: "2026-11-12"
diagram: agent-activity
checks:
  - question: Välttääkö identiteettitietojen keruun käyttöönotto kaikkien henkilö- tai konetunnisteiden keräämisen?
    answer: Ei. Identiteettitietojen keruu sisältää Copilot-tilin, paikallisen käyttöjärjestelmätilin ja koneen nimen.
  - question: Onko agentti-istuntojen auditoinnin suoratoisto yleisesti kaikkien yritysten saatavilla?
    answer: Ei. Se on julkinen esiversio ja rajattu ajantasaisessa dokumentaatiossa kuvattuihin yritystyyppeihin.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
---

## Mitä opit

- Erottamaan istuntonäkymät, auditointinäytön ja asiakasohjelman telemetrian.
- Päättämään tarvittavista tiedoista ennen keruun käyttöönottoa.

## Valitse näyttö kysymyksen mukaan

[Agenttien seurantaoppaassa](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) kuvataan viimeisimmät istunnot, auditointilokit ja valinnainen OpenTelemetry. Agentti-istuntojen auditoinnin suoratoisto on **julkinen esiversio – käytä harkiten**, ja se on saatavilla Enterprise Managed Users- tai GitHub Enterprise Cloud with data residency -ratkaisua käyttäville yrityksille.

OTel-keruuluokkien oletusarvo on false. Identiteettitietojen keruu voi tunnistaa Copilot-tilin, paikallisen käyttöjärjestelmätilin ja koneen nimen keräämättä kehotteita, vastauksia tai työkalujen sisältöä; kyseessä on silti tunnistetieto. Muut keruuluokat voivat sisältää koodia, kehotteita, komentoja ja polkuja.

## Esimerkki: selvitys

**Kuvitteellinen lähtötilanne:** Tietoturvasta vastaava henkilö haluaa tietää, tapahtuiko ilmoitettu agentti-istunto, ei sitä, mitä lähdekoodia se sisälsi. Pilotissa ei ole otettu telemetriaa käyttöön, ja tiimin säilytys- ja käyttöoikeushyväksynnät ovat ratkaisematta.

Tiimi tarkistaa ensin, voiko olemassa oleva istuntonäkymä tai auditointitietue vastata kysymykseen kyseisessä käyttöympäristössä. Jos ei, se arvioi valinnaista telemetriaa ja esiversiossa olevan auditoinnin suoratoiston kelpoisuutta. Identiteettitietojen keruu sisältää henkilö- ja konetunnisteita, joten vastuuhenkilö ehdottaa käyttöoikeus- ja säilytysrajoituksia ja kuulee yksityisyyden suojan sidosryhmiä ennen muutoksia. Kehotteiden tai työkalujen sisältöjen keruu keräisi enemmän kuin kysymys edellyttää.

**Lopputulos:** Tiimillä on näyttösuunnitelma, ei määritettyä seurantajärjestelmää. Tietue voi vahvistaa toimintaa, mutta ei yksin osoita muutoksen hyväksyntää tai lopputulosta.

## Harjoitus: valitse oikeasuhtainen näyttö

**Edellytykset:** Yllä oleva tilanne ja [agenttien seurantaopas](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity). Paikallinen muistiinpano riittää.

1. Määritä kysymys ja luettele mahdollinen näyttö: istuntonäkymä, auditointitietue tai asiakasohjelman telemetria.
2. Kirjaa kunkin osalta, kattaako se kyseisen käyttöympäristön, mitä tunniste- tai sisältötietoja se voi sisältää ja kenellä pitäisi olla pääsy.
3. Kirjoita suositus ja nimeä vielä tarvittavat hyväksynnät ja varmennukset. Jos sinulla on valtuutettu pääsy, tarkastele nykyisiä asetuksia lukuoikeuksin; muussa tapauksessa käytä kuvitteellista tilannetta. Älä ota keruuta käyttöön tai vie tietueita.

**Odotettu tulos:** Suositus suosii olemassa olevaa riittävää näyttöä, tunnistaa yksityisyyden ja kattavuuden aukot eikä väitä auditoinnin tai telemetrian olevan jo käytössä.

<details>
<summary>Mallivastaus</summary>

Tarkista ensin olemassa oleva istuntonäkymä tai kelpoinen auditointinäyttö. Jos se ei riitä, arvioi asiakasohjelman telemetriaa täsmällisen kysymyksen, kohteen sekä käyttöoikeus- ja säilytyshyväksyntöjen perusteella. Identiteettitietojen keruu tunnistaa edelleen ihmisiä ja koneita; kehotteet, vastaukset ja työkalujen sisältö edellyttävät erillistä perustelua. Varmista esiversion kelpoisuus ja todellinen asiakasohjelmien kattavuus ennen lähteeseen tukeutumista.

</details>
