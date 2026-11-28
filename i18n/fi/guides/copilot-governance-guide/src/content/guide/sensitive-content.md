---
title: Suojaa arkaluonteinen konteksti
section: Kontekstin hallinta
order: 3
description: Yhdistä käyttöoikeuksien hallinta tuettuihin poissulkuihin ja ymmärrä niiden rajat.
verified: "2026-11-12"
diagram: sensitive-content
checks:
  - question: Korvaavatko sisällön poissulut repositorion käyttöoikeudet?
    answer: Eivät. Poissulut vaikuttavat tuettuihin Copilot-käyttötapauksiin mutta eivät ole tiedostojärjestelmän suojausraja.
  - question: Voiko ylläpitäjä olettaa poissulkujen kattavan kaikki mahdolliset reitit arkaluonteisiin tietoihin?
    answer: Ei. Tarkista ajantasainen tukitaulukko ja rajoitukset, mukaan lukien epäsuora pääsy ja kolmannen osapuolen työkalut.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## Mitä opit

- Erottamaan repositorion käyttöoikeudet sisällön poissuluista.
- Tarkistamaan käyttöympäristökohtaisen tuen ja rajoitukset.

## Käytä useita suojakerroksia

[Sisällön poissululla](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) voidaan sulkea tiedostoja pois tuetuista Copilot-käyttökokemuksista. Nykyinen taulukko sisältää tuen Copilot CLI:lle, Copilot appille, tuetuille IDE-agenteille ja pilvikäyttökokemuksille; tarkista taulukosta käytettävä asiakasohjelma ja tila.

Poissulut eivät ole tiedostojärjestelmän suojausraja. GitHub dokumentoi rajoituksia, kuten epäsuoran pääsyn, kolmannen osapuolen MCP-palvelimet, symboliset linkit ja etätiedostojärjestelmät. Rajoita erikseen sitä, ketkä ja mitkä voivat käyttää arkaluonteista aineistoa, ja tarkista lähde ennen poissulkuun tukeutumista.

## Esimerkki: sisäinen tiedosto

**Kuvitteellinen lähtötilanne:** Tiimillä on esimerkkirepositorio, joka sisältää ei-arkaluonteisen tiedoston nimeltä `training/canary.txt`. Tiimi haluaa oppia poissulun määrittämisen ennen todellisten arkaluonteisten tietojensa arviointia.

[Määritysohjeessa](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) kuvataan repositorion **Settings → Copilot → Content exclusion** ja YAML-muotoinen polkuluettelo. Tälle kuvitteelliselle repositoriolle ehdotettu merkintä on:

```yaml
- "/training/canary.txt"
```

Tiimi tarkistaa kohdeasiakasohjelman tukitaulukosta, tarkastelee repositorion ja käyttöjärjestelmän käyttöoikeuksia erikseen sekä kirjaa kolmannen osapuolen MCP:n ja epäsuoran pääsyn aukot. Merkintä on ehdotus, ei todiste siitä, että poissulku on tallennettu tai pantu täytäntöön.

**Lopputulos:** Tiimi voi selittää rajatun säännön ja sen rajoitukset paljastamatta todellisia arkaluonteisia tietoja. Se tarvitsee edelleen valtuutetun testiympäristön ja asianmukaisen testin ennen kuin voi väittää säännön toimivan.

## Harjoitus: kartoita suojausraja

**Edellytykset:** Yllä oleva kuvitteellinen polku ja [tuki- ja rajoitustaulukko](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion). Älä käytä arkaluonteista tiedostoa.

1. Kirjoita ehdotettu YAML-merkintä paikalliseen muistiinpanoon ja tunnista tarkoitettu repositorio ja asiakasohjelma.
2. Luettele, ketkä voivat lukea esimerkkitiedoston Copilotista riippumatta ja voiko ulkoisella työkalulla olla oma pääsy.
3. Jos sinulla on valtuutettu testiympäristö, tarkastele sen nykyisiä poissulku- ja käyttöoikeusasetuksia lukuoikeuksin. Muussa tapauksessa keskustele siitä, millaista näyttöä hallittu testisisältökoe edellyttäisi. Älä tallenna poissulkua tai lähetä testisisältöä mallille ilman testiympäristön nimenomaista hyväksyntää.

**Odotettu tulos:** Rajausmuistiinpano luettelee ehdotetun polun, asiakasohjelman, käyttöoikeuksien hallintakeinot ja vähintään yhden kattamattoman reitin. Se ei väitä sääntöä pannuksi täytäntöön.

<details>
<summary>Mallivastaus</summary>

Ehdotettu merkintä kohdistuu esimerkkirepositorion polkuun `/training/canary.txt`. Tarkista repositorion ja tiedostojärjestelmän oikeudet sekä kolmannen osapuolen työkalujen pääsy erikseen. Poissulku ei ole tiedostojärjestelmän suojausraja; epäsuoralla pääsyllä, symbolisilla linkeillä ja etätiedostojärjestelmillä on dokumentoituja rajoituksia.

</details>
