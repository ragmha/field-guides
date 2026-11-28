---
title: Harjoittele ilmoituksesta päätökseen johtavaa sykliä
section: Käyttöönoton jälkeinen ylläpito
order: 6
description: Harjoittele vastaamista käyttäjän estoon, tunnista todellinen raja ja palauta toiminta vastuullisen päätöksen avulla.
verified: "2026-11-10"
diagram: operating-loop
checks:
  - question: Ilmoitus laukeaa, mutta ketään ei ole estetty. Mitä reagoinnista vastaavan pitäisi selvittää ennen budjetin muuttamista?
    answer: Tunnista laskutettava taho, jakso, laajuus ja todellinen rajoitus sekä se, lähettääkö kynnysarvo vain ilmoituksen. Menot voivat edelleen jatkua, eikä ilmoitus ole lupa kasvattaa niitä.
  - question: Tiimin mittariperusteisen budjetin korottaminen ei poistanut estoa käyttäjältä, jonka henkilökohtainen ULB on käytetty loppuun. Mitä seuraavaksi?
    answer: Lopeta asiaan liittymättömien rajoitusten muuttaminen. Ohjaa sovellettava ULB hyväksyjälleen, anna valtuutetun ylläpitäjän tehdä mahdollinen hyväksytty muutos ja varmista lopputulos.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/
  - https://learn.github.com/well-architected/governance/recommendations/governing-agents
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat tunnistaa eston tai ilmoituksen taustalla olevan rajoituksen.
- Osaat ohjata palautumisen oikealle omistajalle ohittamatta hyväksyntää.

<a id="read-the-operating-loop"></a>

## Toimintasyklin tulkinta

Nuolet palaavat varmistuksesta arviointiin, koska ilmoitus on päätöksen alku, ei sen päätös. Syyn selvittäminen tunnistaa, mitä on rajoitettu. Hyväksyntä määrittää, mitä saa muuttaa. Ylläpitäjä tekee valtuutetun toimenpiteen ja varmistaa sen vaikutuksen. Tietue tukee seuraavaa arviointia.

Vaiheiden erillään pitäminen estää yleisen oikopolun: vapaan yritysbudjetin tulkitsemisen luvaksi korottaa mitä tahansa mahdollisesti auttavaa rajaa. Vapaa liikkumavara vastaa taloudellisen laajuuden kysymykseen; se ei tunnista käyttäjää rajoittavaa tekijää eikä korvaa budjetin omistajan valtuutta.

<a id="worked-scenario-raising-the-wrong-budget-does-nothing"></a>

## Esimerkkitilanne: väärän budjetin korotus ei auta

**Hypoteettinen käyttötapaus:** Kehittäjä ilmoittaa estosta. Reagoinnista vastaava näkee vapaata yritysbudjettia ja korottaa tiimin mittariperusteista rajaa. Mikään ei muutu: sovellettava henkilökohtainen ULB on käytetty loppuun. Lopeta asiaan liittymättömien rajoitusten muuttaminen; vahvista kulutus, pyydä budjetin omistajalta päätös ja anna sitten valtuutetun ylläpitäjän tehdä ja varmistaa se.

**Oppaan neuvo:** Harjoittele kuvan sykliä olemassa olevassa ylläpitojärjestelmässä. Tunnista ensin laskutettava taho, käyttäjä, jakso ja todellinen rajoittava tekijä. Pelkän ilmoituksen lähettävä kynnysarvo voi tarkoittaa, että menot jatkuvat, ei sitä että joku on estetty.

Jatka esimerkkiä pöytäharjoituksena. Reagoinnista vastaava kirjaa henkilön ja vahvistaa, että loppuun käytetty henkilökohtainen ULB on sovellettava laajemman oletuksen sijaan. Budjetin omistaja päättää sitten, hyväksyykö poikkeuksen, muuttaako työkuormaa vai jättääkö rajan ennalleen. Jos korotus hyväksytään, valtuutettu ylläpitäjä muuttaa kyseistä ULB:tä ja varmistaa, poistuuko esto. Toinen sovellettava rajoitus voi yhä rajoittaa käyttöä; yhden muutoksen hyväksyntä ei takaa rajatonta pääsyä.

Jos omistaja kieltäytyy, oikea tulos on nimenomainen päätös olla muuttamatta asetuksia ja käyttäjälle annettu ohje, ei selittämätön häiriön sulkeminen. Harjoitus onnistuu, kun tiimi osaa selittää sekä teknisen syyn että sen, kuka hyväksyi seurauksen. Nämä ovat ehdotettuja toimintatapoja, eivät uusi automaattinen palautumisominaisuus.

Mahdollisia lopputuloksia ovat hyväksytty korotus, työkuorman mukautus, kohdistuksen korjaus tai ei muutosta. Kirjaa hyväksyjä, perustelu ja tarkistus- tai päättymispäivä. Kynnysarvo itsessään ei oikeuta mihinkään näistä.

<a id="cadence-that-fits-maturity"></a>

## Kypsyystasoon sopiva tarkistusrytmi

| Milloin | Tarkista | Tulos |
| --- | --- | --- |
| Ilmoituksen tai eston yhteydessä | Rajoittava kerros ja vaikutus | Vastuullinen päätös, varmistettu palautuminen |
| Viikoittain käyttöönoton aikana | Käyttöönotto, kohdistuspuutteet, estot ja poikkeukset | Korjatut asetukset tai ohjeistus |
| Kuukausittain toiminnan vakiinnuttua | Kulutus, mittariperusteiset kustannukset ja ennuste erikseen | Hyväksytyt muutokset ja seuraava tarkistus |

Nämä aikataulut noudattavat Well-Architectedia. Vasteajat ja ilmoituskynnykset ovat paikallisia valintoja. Pienet menot voivat tarkoittaa tehokkuutta, vähäistä käyttöönottoa tai estynyttä työtä; arvioi tuloksia ja palautetta ennen johtopäätöksiä.

Agenttityökuormille [Well-Architectedin kustannustarkistuslista](https://learn.github.com/well-architected/governance/recommendations/governing-agents#5-cost-management) yhdistää organisaation tai kustannuspaikan menorajat vastuullisiin ilmoitusten vastaanottajiin, mallikustannusten koulutukseen ja käytön seurantaan. Se edellyttää **Stop usage** -asetusta pakottavia kattoja toteutettaessa; pidä [katon ja jatkuvuuden välinen päätös](/controls/#strict-cap-or-continuity) selkeänä.

<a id="when-somebody-is-blocked"></a>

## Kun joku on estetty

Budjettirajoitukset eivät poista käyttäjäpaikkaa. Palautuminen voi tapahtua seuraavan laskutusjakson tai asianomaisen budjetin valtuutetun muutoksen kautta. Sisäinen budjetinkorotuspyyntö on [yleisesti saatavilla Business- ja Enterprise-paketeille käyttöperusteisessa laskutuksessa, mutta ei yrityksille, joilla on hallitut käyttäjät](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/). Hallittuja käyttäjiä käyttävät yritykset tarvitsevat oman eskalointireitin.

Rivinsisäiset kooditäydennykset ja seuraavan muokkauksen ehdotukset toimivat edelleen, koska ne eivät kuluta AI-krediittejä. Viesti tämä selkeästi, jotta käyttäjät eivät tulkitse budjettitapahtumaa Copilotin täydelliseksi menetykseksi.
