---
title: Hallitse työkaluja ja verkkoyhteyksiä
section: Agenttien hallinta
order: 3
description: Tarkastele agenttien työkaluja, hyväksyntöjä ja palomuurin rajoituksia erillisinä hallintakeinoina.
verified: "2026-11-12"
diagram: agent-tools-network
checks:
  - question: Hallitseeko agentin palomuuri suoraan MCP-palvelinprosesseja?
    answer: Ei. Se koskee agentin Bash-työkalunsa kautta käynnistämiä prosesseja, ei suoraan MCP-palvelimen tai asennusvaiheen prosesseja.
  - question: Onko palomuuri täydellinen suoja tietojen ulosvientiä vastaan?
    answer: Ei. GitHub dokumentoi mahdolliset ohitukset ja muut kattavuuden rajoitukset; käytä täydentäviä hallintakeinoja.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## Mitä opit

- Erottamaan työkalujen hyväksynnän, MCP-rajoitukset ja verkkosuodatuksen.
- Tunnistamaan, missä hallintakeinoa ei sovelleta.

## Kerrosta hallintakeinot suorituspolun mukaan

[Pilvihallinnan opas](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) kuvaa työkalujen hyväksyntää koskevia hallintakeinoja. [MCP-hallinta](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) suosittelee yrityksen `managed-settings.json`-sallittujen luetteloa tuetuissa asiakasohjelmissa. Mukautettu MCP-rekisteri on **julkinen esiversio – käytä harkiten**, ja sen vastaavuuden valvonta on heikompi.

[Palomuurissa](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) on erilliset asetukset pilviagentille ja koodin tarkastukselle. Se koskee agentin Bashin kautta käynnistämiä prosesseja, ei suoraan MCP-palvelimen tai määritettyjen asennusvaiheiden prosesseja. GitHub varoittaa mahdollisista ohituksista; se ei ole kattava suoja tietojen ulosvientiä vastaan.

[Hallitun sallittujen luettelon opas](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) kattaa tuetut asiakasohjelmat ja pilven testiympäristöt, mukaan lukien käyttäjän ja repositorion asetusten palvelimet, mutta ei repositorion mukautettujen agenttiprofiilien MCP-määrityksiä. Sisäänrakennetut oletuspalvelimet sallitaan ensin; sen jälkeen estosäännöt ovat etusijalla, ja jokaisen käyttöön otetun sallittujen luettelon on täsmättävä. Ratkaisemattomat muuttujat estetään, ja virheelliset luettelot estävät muut kuin sisäänrakennetut palvelimet. Myös sallitulla palvelimella voi olla liian laajat tunnistetietojen käyttöoikeudet.

## Esimerkki: dokumentaatiotyökalu

**Kuvitteellinen lähtötilanne:** MCP on käytössä tuetussa asiakasohjelmassa. Yksi kelvollinen hallittu sallittujen luettelo vastaa käyttäjäasetusten kuvitteellista dokumentaatiopalvelinta; mikään estosääntö ei vastaa sitä. Sama palvelin esiintyy myös repositorion mukautetussa agenttiprofiilissa, ja sen tunnistetietojen oikeudet ovat tuntemattomat.

Käyttäjäasetusten merkintä vastaa sallittujen luetteloa eikä sitä estetä, joten käytäntöarvio ennustaa sen olevan sallittu tässä asiakasohjelmassa. Profiilin merkintä on dokumentoidun hallitun luettelon soveltamisalan ulkopuolella. Tiimi tarkastelee siksi sen erillisiä suoritus- ja verkkohallintakeinoja ja kysyy palvelun omistajalta tunnistetietojen oikeuksien laajuudesta. Pilvipalomuuri ei kata suoraan MCP-palvelinprosesseja.

**Lopputulos:** Ensimmäisen palvelimen ennustetaan olevan sallittu annetuilla oletuksilla; profiilimerkintä ja tunnistetiedot jäävät selvittämättä. Kumpikaan tulos ei todista todellisen palvelimen olevan turvallinen tai minkään hallintakeinon olevan määritetty.

## Harjoitus: arvioi palvelinmerkinnät ilman verkkoyhteyttä

**Edellytykset:** Paikallinen muistiinpano, [sallittujen luettelon arviointisäännöt](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) ja seuraavat kuvitteelliset tiedot: MCP on käytössä; yksi kelvollinen sallittujen luettelo sallii palvelimet A ja B; estosääntö vastaa B:tä; C on sisäänrakennettu oletus. Muita käytäntökerroksia ei ole.

1. Ennusta, ovatko A, B ja C sallittuja, ja kirjoita kunkin sääntö.
2. Lisää neljäs merkintä repositorion mukautettuun agenttiprofiiliin. Tunnista, mitä hallittu sallittujen luettelo **ei** osoita tästä merkinnästä tai sen tunnistetiedoista.
3. Jos sinulla on valtuutettu lukuoikeus testiympäristöön, vertaa käytäntöä olemassa oleviin palvelinmäärityksiin suorittamatta niitä. Muussa tapauksessa keskustele kuvitteellisista merkinnöistä. Älä asenna palvelinta, liitä tunnistetietoja tai muuta käytäntöä.

**Odotettu tulos:** Arviointikirjaus sanoo A:n olevan sallittu, B:n estetty ja C:n sallittu näillä oletuksilla; se merkitsee erikseen profiilin ja tunnistetietojen aukot. Se ei ole käyttöön otetun käytännön testi.

<details>
<summary>Mallivastaus</summary>

A vastaa sallittujen luetteloa eikä mitään estosääntöä. B vastaa estosääntöä, joka voittaa. C on sisäänrakennettu oletus, joka arvioidaan ensin. Hallitut sallittujen luettelot eivät hallitse repositorion mukautettujen agenttiprofiilien määrityksiä; tarkastele niiden kokoonpanoa, suorituspolkua ja tunnistetietoja erikseen. Tarkista todellisessa ympäristössä jokainen käyttöönottokerros ja tuettu asiakasohjelma.

</details>
