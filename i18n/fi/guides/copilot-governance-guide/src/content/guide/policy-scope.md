---
title: Selvitä käytäntöjen laajuus
section: Käyttäjien hallinta
order: 2
description: Selvitä käyttäjän käytäntöjen lähteet ja tarkista ristiriidat ennen johtopäätöksiä.
verified: "2026-11-12"
diagram: policy-scope
checks:
  - question: Voittaako rajoittavin organisaation käytäntö aina yrityksen sisällä?
    answer: Ei. Vähiten rajoittava pätee yleensä saman yrityksen lisenssin myöntävien organisaatioiden välillä, mutta dokumentoituja poikkeuksia on.
  - question: Mikä käsittelee delegoidut käytännöt suoraan yritykseltä käyttöoikeuden saaville käyttäjille?
    answer: Erillinen Policies for enterprise-assigned users -asetus määrittää heidän oletuksensa.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
---

## Mitä opit

- Tunnistamaan käyttöpaikan lähteen ja asiaankuuluvan käytännön laajuuden.
- Tunnistamaan, milloin ristiriitaiset käytännöt vaativat ominaisuuskohtaisen tarkistuksen.

## Käytännöt seuraavat käyttöoikeutta

Yrityksen ylläpitäjät määrittävät yleensä käytännöt ensin: ottavat käyttöön, poistavat käytöstä tai delegoivat organisaatioille. Useimmat käytännöt koskevat organisaation tai yrityksen lisensoimia käyttäjiä, mutta jotkin koskevat resursseja laajemmin. Suoraan yritykseltä käyttöoikeuden saaneille käyttäjille on erillinen oletus organisaatioille delegoiduille käytännöille. Katso [GitHub Copilot -käytännöt](https://docs.github.com/en/copilot/concepts/enterprise/policies).

Kun saman yrityksen useat lisenssin myöntävät organisaatiot ovat eri mieltä, yleensä vähiten rajoittava asetus pätee, mutta poikkeuksia on. [Ristiriitaohje](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) mainitsee IDE Chat -ominaisuuden kohdalla vähiten rajoittavan ja julkista koodia vastaavien ehdotusten kohdalla rajoittavimman asetuksen. Usean yrityksen välillä lähes aina pätee rajoittavin asetus, myös poikkeuksin. Tarkista kyseinen käytäntö sen sijaan, että pitäisit kumpaakaan yhteenvetoa yleispätevänä etusija-algoritmina.

## Esimerkki: kaksi lisenssin myöntävää organisaatiota

**Kuvitteellinen lähtötilanne:** Kehittäjä saa käyttöpaikat saman yrityksen kahdelta organisaatiolta. Yritys delegoi IDE Chat -ominaisuuden ja julkista koodia vastaavat ehdotukset organisaatioille. Organisaatio A ottaa molemmat käyttöön; organisaatio B poistaa molemmat käytöstä.

Ylläpitäjä selvittää molemmat käyttöpaikan lähteet ja tarkistaa ristiriitaohjeen. IDE Chat käyttää vähiten rajoittavaa organisaatiota, joten ennuste on käytössä. Julkista koodia vastaavat ehdotukset käyttävät rajoittavinta organisaatiota, joten ennuste on pois käytöstä. Ylläpitäjä tarkistaa myös todellisen käyttöympäristön ennen voimassa olevan asetuksen väittämistä.

**Lopputulos:** Odotetut tulokset eroavat: IDE Chat on käytössä, julkista koodia vastaavat ehdotukset eivät. Nämä ovat ennusteita, eivät havaittuja testejä. Suoraan yritykseltä käyttöoikeuden saaneen käyttäjän delegoiduille käytännöille on sen sijaan tarkistettava erillinen yritysmäärityksen oletus.

## Harjoitus: selvitä delegoitu asetus

**Edellytykset:** Yllä olevat kuvitteelliset tiedot ja [käytäntödokumentaatio](https://docs.github.com/en/copilot/concepts/enterprise/policies). Asetuksia ei tarvitse muuttaa.

1. Kirjaa yrityksen päätös, kukin lisenssin myöntävä organisaatio ja sen asetus.
2. Käytä ristiriitaohjetta kunkin käytännön odotetun tuloksen määrittämiseen. Lisää erillinen tarkistus suoraan käyttöoikeuden saaneelle käyttäjälle.
3. Lue valtuutetussa testiympäristössä asiaankuuluvat asetukset ja tarkastele ominaisuutta tarkoitetussa käyttöympäristössä hyväksytyllä testitilillä. Ilman testiympäristöä vertaa ennustettasi mallivastaukseen; älä kutsu sitä havaituksi toiminnaksi.

**Odotettu tulos:** Selvitys tunnistaa molemmat lisenssilähteet, kunkin käytännön ristiriitasäännön ja varmentamattoman käyttöympäristön.

<details>
<summary>Mallivastaus</summary>

Yritys: delegoitu; A: käytössä; B: pois käytöstä. Ennusta IDE Chat käytössä olevaksi ja julkista koodia vastaavat ehdotukset pois käytöstä noudattaen niiden vähiten ja eniten rajoittavia sääntöjä. Tarkasta suoraan käyttöoikeuden saaneen henkilön kohdalla **Policies for enterprise-assigned users**. Varmista tuettu käyttöympäristö ennen kummankaan tuloksen kutsumista varmennetuksi.

</details>
