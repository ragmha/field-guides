---
title: Valitse määritystapa
section: Käyttöoikeuksien hallinta
order: 2
description: Päätä, kuka määrittää käyttöpaikat ja mitä kukin määritystapa tarkoittaa käytäntöjen ja vastuiden kannalta.
verified: "2026-11-12"
diagram: access-assignment
checks:
  - question: Saavatko kaikki organisaation jäsenet automaattisesti käyttöpaikan, kun Copilot otetaan organisaatiossa käyttöön?
    answer: Eivät. Organisaation omistajan on valittava, miten käyttöoikeus myönnetään ja saavatko käyttöpaikan kaikki jäsenet vai vain valitut jäsenet.
  - question: Mitä yrityksen pitäisi tarkistaa ennen käyttöpaikkojen suoraa määritystä?
    answer: Tarkista, että palvelupaketti tukee suoraa määritystä, määritä suoraan yritykseltä käyttöoikeuden saaneiden käyttäjien käytännöt sekä tarkista budjetit ja verkkovaatimukset.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access
---

## Mitä opit

- Erottamaan yrityksen tekemän määrityksen organisaation tekemästä määrityksestä.
- Valitsemaan vastuuhenkilön ja tarkistamaan käyttöpaikkaan liittyvät käytännöt.

## Päätös

Henkilö tarvitsee määritetyn käyttöpaikan. Käytettävissä olevat määritystavat riippuvat palvelupaketista: yrityksen omistaja voi määrittää käyttöpaikkoja suoraan yksittäisille henkilöille tai yritystiimeille, kun käytössä on Copilot access tai Copilot Business. Copilot Business- tai Copilot Enterprise -paketissa yritys voi vaihtoehtoisesti sallia organisaatioiden määrittää käyttöpaikkoja. Tällöin organisaation omistaja valitsee, ketkä saavat käyttöoikeuden. Katso [yrityksen tekemä määritys](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access) ja [organisaation tekemä määritys](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access).

Copilotin käyttöoikeus on eri päätös kuin repositorion käyttöoikeudet. Ennen määritystä GitHub suosittelee tarkistamaan käytännöt, budjetit ja verkkovaatimukset. Määritä suoraan yritykseltä käyttöoikeuden saaneille henkilöille **Policies for enterprise-assigned users**: erillinen oletusasetus määrää lopputuloksen, kun käytännön asetuksena on ”Let organizations decide”.

## Esimerkki: hallittu pilotti

**Kuvitteellinen lähtötilanne:** Copilot Business -yritys suunnittelee pilottia neljän hengen tiimille. Yrityksen omistaja voi tehdä määrityksen suoraan; myös tiimin organisaatio voi määrittää käyttöpaikkoja. Yhdeltä pilotin jäseneltä puuttuu käyttöoikeus tarkoitettuun repositorioon.

Käyttöoikeuksista vastaava henkilö valitsee suoraan käyttöoikeuden saavan yritystiimin, koska nimetty omistaja voi ylläpitää sen jäsenyyttä. Ennen määritystä vastuuhenkilö tarkistaa suoraan yritykseltä käyttöoikeuden saaneiden käytäntöoletuksen ja hankkii taloushallinnon hyväksynnän pilotille. Repositorion omistaja tarkistaa erikseen jäsenen repositorion käyttöoikeudet. Organisaation määrittämä käyttöpaikka olisi vaihtoehto, mutta silloin organisaation omistaja ylläpitäisi määritystä.

**Lopputulos:** Dokumentoidussa ehdotuksessa on määritystapa, jäsenyyden omistaja, käytäntöoletus ja rahoituksen hyväksyjä. Henkilö, jolla ei ole repositorion käyttöoikeutta, tarvitsee edelleen erillisen päätöksen siitä. Ehdotus ei itsessään määritä käyttöpaikkaa eikä osoita henkilön tosiasiallista käyttöoikeutta.

## Harjoitus: selvitä kaksi käyttöoikeuskysymystä

**Edellytykset:** Paperi tai paikallinen muistiinpano ja yllä kuvattu kuvitteellinen pilotti. GitHub-oikeuksia tai tuotantomuutoksia ei tarvita.

1. Tee kaksi saraketta: ”Copilot-käyttöpaikka” ja ”repositorion käyttöoikeus”. Luettele kummankin päätöksen vastuuhenkilö ja tarvittava näyttö.
2. Kirjaa asetus, joka määrittää delegoitujen käytäntöjen oletukset suoraan käyttöoikeuden saaneelle pilotille.
3. Jos sinulla on **lukuoikeus valtuutettuun testiympäristöön**, vertaa olemassa olevan testikäyttäjän määrityksen lähdettä repositorion käyttöoikeuteen. Älä määritä käyttöpaikkaa tai muuta oikeuksia. Muussa tapauksessa keskustele kahdesta sarakkeesta kuvitteellisen tilanteen pohjalta.

**Odotettu tulos:** Kaksisarakkeinen kirjaus erottaa käyttöpaikkaa ja repositorion käyttöoikeutta koskevan näytön; keskustelu ei yksin osoita, että kumpaakaan on määritetty.

<details>
<summary>Mallivastaus</summary>

Yrityksen määritystieto osoittaa Copilot-käyttöpaikan, ja yrityksen omistaja vastaa tästä määritystavasta. Repositorion käyttöoikeustieto ja repositorion omistaja ovat erillisiä. Tarkista delegoitujen käytäntöjen oletukset kohdasta **Policies for enterprise-assigned users**. Todellinen varmennus edellyttää valtuutettua testitiliä ja havaittuja asetuksia tai toimintaa, ei tätä harjoitusta.

</details>
