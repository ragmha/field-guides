---
title: Määritä agentin toiminta-alue
section: Agenttien hallinta
order: 2
description: Päätä, missä pilvityö on sallittua ja miten ihmiset tarkastavat sen tuotokset.
verified: "2026-11-12"
diagram: agent-operating-scope
checks:
  - question: Myöntääkö pilvikäytännön käyttöönotto automaattisesti repositorion kirjoitusoikeuden?
    answer: Ei. Repositorion käyttöoikeudet ja muut soveltuvat hallintakeinot pysyvät erillisinä.
  - question: Todistaako agentin tuottama pull request, että sen muutokset on turvallista yhdistää?
    answer: Ei. Tarkasta muutokset ja käytä repositorion edellyttämiä tarkistuksia ja ihmisten hyväksyntöjä.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
---

## Mitä opit

- Erottamaan saatavuuden, repositorion rajauksen ja tarkastuksen.
- Valitsemaan rajatun pilotin pitämättä agenttia hyväksyjänä.

## Missä työtä voidaan tehdä

[Copilot in the cloud -käytäntö](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) hallitsee yhtenäistä pilvikäyttökokemusta, mukaan lukien pilvi-istuntojen aloittamista tuetuista paikallisista asiakasohjelmista. Ylläpitäjät voivat valita organisaatioita ja estää ominaisuuden tietyissä repositorioissa. Olemassa olevilla repositorion oikeuksilla on edelleen merkitystä; [GitHub.comin yleiskuvauksen](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) mukaan istunto on vain luku -tilassa ilman kirjoitusoikeutta.

Pilven testiympäristöillä, Actions-pohjaisilla ympäristöillä ja etäympäristöillä on erilaisia ominaisuuksia. Tarkista todellinen ympäristö, repositorion suojaukset ja soveltuvat asetukset sen sijaan, että pitäisit kaikkia pilvisuorituspolkuja samanlaisina.

## Esimerkki: repositoriopilotti

**Kuvitteellinen lähtötilanne:** Organisaatio suunnittelee pilvipilottia esimerkkirepositoriolle ja sulkee arkaluonteisen repositorion pois. Yhdellä kehittäjällä on kirjoitusoikeus esimerkkirepositorioon; toisella on vain lukuoikeus. Esimerkkirepositoriossa on jo ihmisen tekemän tarkastuksen prosessi.

Pilotin vastuuhenkilö tarkistaa pilvikäytännön ja repositorion poissulun ja varmistaa sitten kummankin henkilön repositorion käyttöoikeudet. Ensimmäinen kehittäjä voi ehdottaa ei-arkaluonteista testimuutosta normaaliin tarkastukseen; toisen henkilön pilvi-istunto on vain luku -tilassa. Agentin luoma pull request käy edelleen läpi repositorion tarkistukset ja ihmisen tekemän tarkastuksen.

**Lopputulos:** Tiimi voi ennustaa erilaisia käyttökokemuksia repositorion käyttöoikeuksien perusteella. Pelkkä käytäntöpäätös ei ole myöntänyt kirjoitusoikeutta tai todistanut repositorion suojauksen toimivuutta.

## Harjoitus: selvitä toiminta-alue

**Edellytykset:** Yllä olevat kuvitteelliset tiedot tai lupa tarkastella olemassa olevaa valtuutettua testiympäristöä. Älä määrää työtä tai muuta repositorion asetuksia tuotannossa.

1. Luettele pilvikäytännön laajuus, kahden repositorion tilat ja kummankin henkilön repositorion käyttöoikeudet.
2. Ennusta, kuka voi ehdottaa muutosta ja kenen istunto on vain luku -tilassa.
3. Jos lupa on annettu, tarkastele testiympäristön nykyistä käytäntöä ja testitilien oikeuksia muuttamatta niitä. Ilman testiympäristöä keskustele näytöstä, jota tarvitaan poissulun ja tarkastusportin toimivuuden osoittamiseen.

**Odotettu tulos:** Taulukko erottaa ominaisuuden saatavuuden, repositorion käyttöoikeuden ja tarkastusvastuun. Kirjallinen taulukko on ennuste, ei määritetty tai testattu portti.

<details>
<summary>Mallivastaus</summary>

Esimerkkirepositorio kuuluu pilottiin; arkaluonteinen on suljettu pois. Kirjoitusoikeuden saanut voi ehdottaa työtä soveltuvan käytännön ja tarkastuksen mukaisesti; vain lukuoikeuden saaneen istunto on vain luku -tilassa. Ennen täytäntöönpanon väittämistä tarvitaan todellisen kokoonpanon valtuutettu testi.

</details>
