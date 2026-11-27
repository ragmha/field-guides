---
title: Mittaa käyttöönottoa harkiten
section: Havainnoitavuus
order: 2
description: Hyödynnä käyttöönotto- ja vaikutustietoja pitämättä korrelaatiota todisteena syy-yhteydestä.
verified: "2026-11-12"
diagram: adoption-measurement
checks:
  - question: Voiko organisaatioiden aktiivisten käyttäjien määrät laskea yhteen yrityksen kokonaismääräksi?
    answer: Ei. Sama käyttäjä voi kuulua useaan organisaatioon, joten määrät voivat mennä päällekkäin.
  - question: Todistaako käyttöönoton ja pull requestien läpimenon välinen yhteys, että Copilot aiheutti muutoksen?
    answer: Ei. Tiedot osoittavat yhteyden, jonka voivat selittää muutkin tekijät.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## Mitä opit

- Valitsemaan oikean nimittäjän ja aikavälin.
- Tulkitsemaan kattavuutta ja vaikutuksia vastuullisesti.

## Näyttö ei kerro koko tarinaa

[Copilotin käyttömittarit](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) kuvaavat käyttöönottoa, aktiivisuutta ja tuettujen työnkulkujen signaaleja. Päivän tiedot ovat saatavilla kahden täyden UTC-päivän kuluessa kyseisen päivän päättymisestä. Kattavuus riippuu mittarista ja käyttöympäristöstä. Sama käyttäjä voi esiintyä useammassa organisaatiossa, joten organisaatioiden lukujen yhteenlasku voi yliarvioida yrityksen määrän.

Vaikutusvertailut osoittavat yhteyksiä eivätkä todista syy-yhteyttä. Käyttömittarit mittaavat toimintaa, eivät lisenssimäärityksiä; käytä nimittäjänä asiaankuuluvia lisenssitietoja.

## Esimerkki: pilotin tarkastelu

**Kuvitteellinen lähtötilanne:** Pilotissa on 20 käyttöoikeuden saanutta käyttäjää. Päättyneellä raportointijaksolla kuvitteellinen yritysraportti näyttää 12 yksilöllistä aktiivista käyttäjää. Kahdessa organisaatioraportissa näkyy 8 ja 7 aktiivista käyttäjää, joista 3 kuuluu molempiin organisaatioihin. Tiimi havaitsee myös pull requestien läpimenon kasvaneen edelliseen jaksoon verrattuna.

Yrityksen käyttöönottolaskelma on 12 / 20 = 60 % kyseisellä jaksolla ja kyseisessä joukossa. Organisaatioiden lukujen summa on 15, mutta kolmen päällekkäisen henkilön vähentäminen antaa tulokseksi 12; pelkkä yhteenlasku yliarvioi määrän. Tiimi tarkistaa raportin kattavuuden ja odottaa dokumentoitua tietojen saatavuusaikaa. Se pyytää vapaaehtoista palautetta käyttöönotosta ja työnkulkujen muutoksista sen sijaan, että pitäisi vertailun perusteella Copilotia läpimenon muutoksen syynä.

**Lopputulos:** Tiimi voi raportoida rajatun käyttöönottomittarin ja havaitun läpimenon muutoksen, ei syy-yhteyteen perustuvaa tuottavuushyötyä.

## Harjoitus: tulkitse pilottiraporttia

**Edellytykset:** Yllä olevat kuvitteelliset luvut ja paikallinen muistiinpano tai laskin. Jos käytät oikeaa valtuutettua raporttia lukuoikeuksin, käytä sen todellisia päivämääriä, määritelmiä ja yksityisyyssääntöjä.

1. Laske yrityksen käyttöönottoprosentti ja organisaatioiden päällekkäisyyksistä puhdistettu käyttäjämäärä.
2. Kirjaa tuloksen yhteydessä ilmoitettavat jakso, lisenssinimittäjä, mittarin kattavuus ja julkaisuviive.
3. Kirjoita yksi lukujen tukema johtopäätös ja yksi jatkotutkimuksen kysymys. Jos raportteihin ei ole pääsyä, käytä kuvitteellisia lukuja; älä kerää yksilötietoja.

**Odotettu tulos:** Lyhyt raportti ilmoittaa 60 % ja 12 yksilöllistä organisaatiokäyttäjää, tunnistaa mahdolliset kattavuusaukot ja välttää syy-yhteysväitteen.

<details>
<summary>Mallivastaus</summary>

Kaksitoista 20 käyttöoikeuden saaneesta käyttäjästä oli aktiivisia määritetyllä jaksolla eli 60 %. Organisaatioiden luvut menevät päällekkäin: 8 + 7 − 3 = 12 yksilöllistä henkilöä. Suurempi läpimeno osui pilotin ajankohtaan, mutta sillä voi olla muita syitä. Vertaa samankaltaista työtä ja kerää vapaaehtoista palautetta ennen vaikutusten tulkintaa.

</details>
