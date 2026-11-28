---
title: Määritä mallien ja ominaisuuksien perusasetukset
section: Käyttäjien hallinta
order: 3
description: Tasapainota tarkastettu saatavuus, uudet julkaisut ja delegoidut päätökset.
verified: "2026-11-12"
diagram: model-feature-baseline
checks:
  - question: Onko käyttöön otetuilla ominaisuuksilla ja malleilla yhteinen oletuskäytäntö?
    answer: Ei. Erilliset oletukset hallitsevat määrittämättömiä yleisesti saatavilla olevia ominaisuuksia ja malleja.
  - question: Voivatko organisaation ja yritystiimin mallihallintakeinot molemmat hallita yksityiskohtaista käyttöoikeutta erikseen käyttöön otettavassa tiimitilassa?
    answer: Eivät. Yritystiimien mallikäyttöoikeus on yksinomainen erikseen käyttöön otettava tila; tarkista siirtymä ja ajantasainen dokumentaatio ennen vaihtoa.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
---

## Mitä opit

- Erottamaan mallipäätöksen ominaisuuspäätöksestä.
- Valitsemaan, kuka arvioi uudet saatavilla olevat kyvykkyydet.

## Kaksi päätöstä, kaksi oletusta

[Käytäntödokumentaatio](https://docs.github.com/en/copilot/concepts/enterprise/policies) kuvaa erilliset hallintakeinot määrittämättömien yleisesti saatavilla olevien mallien ja ominaisuuksien oletussaatavuudelle. Nimenomaiset asetukset ja delegoidut päätökset ovat edelleen tärkeitä: automaattinen saatavuus suosii nopeutta, kun taas ensin tehtävä tarkastus suosii harkittua arviointia.

[Oletussaatavuusohje](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) erottaa mallin saatavuuden istunnossa oletuksena valitusta mallista. Esiversiomallit eivät noudata GA-oletusta; ohjeessa luetellaan myös poikkeukset avoimien painojen malleille, GitHubin tietojen säilytyssopimuksen ulkopuolisille malleille sekä sijainti- tai FedRAMP-käytännöillä rajoitetuille malleille. Tarkista ajantasainen mallikohtainen tila ja soveltuvat rajoitukset.

Yrityksen omistajat voivat nimenomaisesti ottaa mallien saatavuuden käyttöön, poistaa sen käytöstä tai delegoida sen. Yksityiskohtaiset käyttöoikeudet toimivat normaalisti organisaatioiden kautta; yritystiimien mallikäyttöoikeus on erikseen käyttöön otettava **julkinen esiversio – käytä harkiten**, ja se käyttää yksinomaista tiimipohjaista tilaa. Tutustu [mallien saatavuuteen](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) ennen tilan vaihtamista.

## Esimerkki: uusi malli

**Kuvitteellinen lähtötilanne:** Yritys haluaa tarkastaa yleisesti saatavilla olevat mallit ennen laajaa käyttöä, mutta haluaa yleisesti saatavilla olevat ominaisuudet oletuksena saataville. Uutta mallia ehdotetaan yhdelle organisaatiolle; sen tuotteen julkaisutilaa ei ole selvitetty.

Hallintatiimi kirjaa mallin oletuksen erillään ominaisuuden oletuksesta, delegoi ehdotetun mallin vain siellä, missä nykyinen hallintatila sen sallii, ja pyytää organisaation omistajaa arvioimaan mallin. Ehdotetun mallin **tilaa ei ole varmennettu**, ennen kuin sen oma dokumentaatio määrittää julkaisuvaiheen. Yritystiimien mallikäyttöoikeustila on edelleen **julkinen esiversio – käytä harkiten**; siihen vaihtaminen on erillinen päätös.

**Lopputulos:** Tiimillä on tarkastuspäätös ja vastuuhenkilö, mutta mallia ei ole otettu käyttöön kirjaamalla asia. Asiakasohjelmassa valittu malli ei todista, että käytäntöä valvotaan kaikkien osalta.

## Harjoitus: laadi kyvykkyyskirjaus

**Edellytykset:** Käytä yllä olevia kuvitteellisia oletuksia ja [mallien saatavuusopasta](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models).

1. Kirjaa erilliset oletukset määrittämättömille yleisesti saatavilla oleville malleille ja ominaisuuksille.
2. Lisää ehdotetun mallin kohderyhmä, vastuuhenkilö, julkaisutila ja tarvittava päätös.
3. Jos käytettävissä on valtuutettu testiympäristö, tarkastele sen nykyistä hallintatilaa ja asetuksia tallentamatta muutoksia. Muussa tapauksessa käytä esimerkkiä ja keskustele todellisen käyttöönoton tarvitsemasta näytöstä.

**Odotettu tulos:** Kirjaus erottaa kaksi oletusta, nimenomaisen mallipäätöksen ja selvittämättömän julkaisutilan; se ei väitä kokoonpanoa määritetyksi.

<details>
<summary>Mallivastaus</summary>

Pyydetyissä perusasetuksissa määrittämättömät yleisesti saatavilla olevat mallit ovat pois käytöstä ja ominaisuudet käytössä. Organisaation omistaja arvioi ehdotetun mallin soveltuvassa delegoidussa tilassa; sen **tilaa ei ole varmennettu**, ennen kuin julkaisuvaiheelle on lähde. Ylläpitäjän on tarkasteltava todellisia asetuksia ja kelpoisen testikäyttäjän kokemusta mahdollisen myöhemmän muutoksen varmentamiseksi.

</details>
