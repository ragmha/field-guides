---
title: Seuraa käyttö kustannuksista vastaavalle
section: Käyttöönoton jälkeinen ylläpito
order: 7
description: Seuraa käyttötietuetta kohdistuksen ja täsmäytyksen läpi ennen kuin muutat näkyvyyden taloudelliseksi kohdistukseksi.
verified: "2026-11-10"
diagram: attribution-pipeline
checks:
  - question: Käytön kokonaissumma täsmää, mutta henkilö on vaihtanut tiimiä ja omistajuuskartta on vanhentunut. Onko raportti valmis edelleenveloitukseen?
    answer: Ei. Oikea kokonaissumma ei todista omistajuutta oikeaksi. Pidä ratkaisematon kohdistus näkyvissä, selvitä siirto ja hanki taloushallinnon hyväksyntä kohdistukselle.
  - question: Muuttaako sisäisen raportointikartoituksen korjaaminen GitHubin laskutuksen kohdistussääntöjä?
    answer: Ei. Sisäinen kustannusten esittämisen kohdistus ei voi ohittaa tuotteen laskutuskohdistusta. Käytä maksavan tilin raportointilaajuutta ja säilytä selkeä korjaustietue.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/rest/billing/usage
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat pitää tuntemattoman omistajuuden näkyvissä ja täsmäyttää raportin.
- Osaat erottaa kustannusten esittämisen hyväksytystä edelleenveloituksesta.

<a id="read-the-attribution-pipeline"></a>

## Kohdistusputken tulkinta

Putki erottaa lähdetietueen omistajaa koskevasta tulkinnastasi. Kohdistus liittää vastuullisuuden; täsmäytys tarkistaa tietueiden ja kokonaissummien yhtäpitävyyden; kustannusten esittäminen viestii käytöstä. Edelleenveloitus lisää taloudellisen kohdistuksen, josta on sovittava. Vaiheen ohittaminen voi tuottaa viimeistellyn raportin, jonka johtopäätös on väärä.

Alkuperäisen lähteen ja jakson on pysyttävä jäljitettävinä näissä luovutuksissa. Sisäinen kohdistus on hyödyllistä johtamistietoa, ei tapa muuttaa GitHubin laskuttamaa tiliä. Ero mahdollistaa tiimin raportin korjaamisen väittämättä tuotteen laskutuskohdistuksen muuttuneen.

<a id="worked-scenario-the-unmapped-team-transfer"></a>

## Esimerkkitilanne: kohdistamaton tiiminvaihto

**Hypoteettinen käyttötapaus:** Kehittäjä vaihtaa tiimiä, mutta raportointikartta pysyy muuttumattomana. Käytön kokonaissumma täsmää, mutta maksu kohdistuisi väärälle yksikölle. Pidä tietue nimenomaisesti **kohdistamattomana**, kunnes vastuullinen ylläpitäjä selvittää omistajuuden ja mahdollisen historiakorjauksen. Siisti koontinäyttö ei voi korjata virheellistä kohdistusta.

**Oppaan neuvo:** Aloita ladattavasta AI-käytön CSV-tiedostosta ja hallitusta laskentataulukosta tai olemassa olevasta raportointityökalusta. [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) pitää käyttäjä-, malli- ja päiväkohtaista käyttöä perustana. Tarkista ajantasaiset vientikentät; säilytä jakso ja lähde.

Ota **hypoteettista täsmäytysharjoitusta** varten yhden raportointijakson lähdekäytöksi 100 krediittiä. Työkarttasi kohdistaa 60 Team A:lle ja jättää 40 ratkaisematta siirron jälkeen. Raportoi 60 kohdistettua ja 40 kohdistamatonta, yhteensä 100. Älä jätä 40:tä hiljaa pois tai kohdista sitä sille tiimille, joka saa koontinäytön näyttämään täydelliseltä.

Määritysten ylläpitäjä vahvistaa myöhemmin sovitun raportointikäsittelyn ja kohdistaa 40 Team B:lle. Kokonaissumma on edelleen 100, mutta omistajuustietue on nyt korjattu ja jäljitettävä. Tämä tukee kustannusten esittämistä. Ennen edelleenveloitusta taloushallinnon on sovittava siirtopäivistä, erimielisyyksistä ja kohdistuksesta; pelkkä laskenta ei anna hyväksyntää. Nämä luvut havainnollistavat raportointimenetelmää, eivät GitHubin vientikenttien nimiä tai automaattista uudelleenkohdistusta.

<a id="check-each-handoff"></a>

## Tarkista jokainen luovutus

- **Kohdista:** nimeä määritysten ylläpitäjä ja siirtoprosessi. Sisäinen raportointi ei voi ohittaa GitHubin laskutuskohdistuksen sääntöjä.
- **Täsmäytä:** vertaa samaa jaksoa; tutki kaksoiskappaleet, puuttuvat käyttäjät ja odottamattomat kokonaissummat.
- **Esitä kustannukset:** tee käyttö ja kustannukset näkyviksi siirtämättä veloitusta.
- **Edelleenveloitus vain sopimuksesta:** taloushallinto hyväksyy kohdistuksen, erimielisyydet ja yhteisten tiimien käsittelyn.

Rajoita tunnistettavien käyttötietojen näkyvyys niitä tarvitseville ja noudata säilytys- ja tietosuojakäytäntöjä. Älä rinnasta kulutusta yksilön suoriutumiseen.

Jos automatisoit myöhemmin, organisaation ja käyttäjän **REST-laskutuksen käyttöyhteenvetopäätepisteet — <span class="status caution">julkinen esiversio - käytä harkiten</span>** on nimenomaisesti merkitty esiversioiksi [REST-viitteessä](https://docs.github.com/en/rest/billing/usage). Merkintä koskee erityisesti päätepisteitä `GET /organizations/{org}/settings/billing/usage/summary` ja `GET /users/{username}/settings/billing/usage/summary`, ei kaikkia laskutuspäätepisteitä. Henkilökohtaisten käyttäjien päätepisteet eivät sisällä organisaation tai yrityksen kautta laskutettua käyttöä; valitse maksavan tilin raportointilaajuus.
