---
title: Ylläpidä käyttöoikeuden elinkaarta
section: Käyttöoikeuksien hallinta
order: 3
description: Selvitä jäsenyys, toiminta ja tuen tarve ennen käyttöoikeuden muuttamista.
verified: "2026-11-12"
diagram: access-lifecycle
checks:
  - question: Selittääkö vähäinen havaittu toiminta yksin, miksi henkilö ei käytä Copilotia?
    answer: Ei. Asennus, verkkoyhteys, koulutus tai perusteltu poissaolo voivat vaikuttaa asiaan; selvitä tilanne ennen toimenpiteitä.
  - question: Mitä tapahtuu, kun henkilö poistuu suoraan lisensoidusta yritystiimistä?
    answer: Tiimin kautta tehty määritys muuttuu; tarkista palvelupaketin poistamisen ajoitus ja antaako jokin muu määritystapa myös käyttöoikeuden.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users
---

## Mitä opit

- Yhdistämään määrityksen, käyttöönoton, tarkastelun ja poistamisen.
- Käyttämään toimintatietoa selvityksen lähtökohtana, ei todisteena suorituskyvystä.

## Määrityksestä tarkasteluun

Suoraan käyttöoikeuden saaneissa yritystiimeissä jäsenen lisääminen tai poistaminen vaikuttaa tiimin kautta myönnettyyn käyttöpaikkaan. Enterprise Managed Users -ominaisuutta käyttävät yritykset voivat synkronoida tiimin identiteettipalvelun ryhmän kanssa. Muut määritystavat ja palvelupaketin mukainen poistamisen ajoitus on edelleen tarkistettava erikseen; älä oleta, että kaikki poistot tulevat voimaan välittömästi. Katso [yrityksen tekemä määritys](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access).

[Passiivisten käyttäjien ohjeessa](https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users) kuvataan, miten organisaation käyttöpaikkamääritysten toimintatietojen avulla voi tunnistaa henkilöitä, jotka saattavat tarvita apua. Toimintatiedolla on rajattu kattavuus: se ei mittaa henkilön suorituskykyä eikä todista, että käyttöpaikka on tarpeeton.

## Esimerkki: passiivinen käyttöpaikka

**Kuvitteellinen lähtötilanne:** Äskettäin lisensoitu kehittäjä näkyy passiivisena organisaatiotason käyttöpaikkaraportissa. Hän oli poissa osan tarkastelujaksosta, ja myös toinen organisaatio saattaa myöntää hänelle käyttöoikeuden.

Vastuuhenkilö varmistaa raportin kattavuuden ja määrityspäivän ja tarjoaa sitten käyttöönottoapua sen sijaan, että olettaisi käyttöpaikan tarpeettomaksi. Kehittäjä tarvitsee edelleen käyttöoikeuden ja ilmoittaa verkon määritysongelmasta. Vastuuhenkilö ohjaa ongelman tukipalveluun ja kirjaa myöhemmän tarkastelun. Mahdollinen toinen määritys on edelleen avoin kysymys, ei todiste päällekkäisestä käyttöoikeudesta.

**Lopputulos:** Käyttöpaikka säilytetään ongelman selvittämisen ajan. Toimintaraportti tunnisti tukitarpeen mahdollisuuden; se ei mitannut suorituskykyä eikä varmistanut käyttöä kaikissa asiakasohjelmissa.

## Harjoitus: selvitä käyttöpaikan tilanne

**Edellytykset:** Käytä yllä olevaa kuvitteellista tietuetta. Todellinen raportti on valinnainen, ja sitä tulee tarkastella vain luvan kanssa.

1. Luettele tunnetut tosiasiat, puuttuva määrityksen lähde ja yksi mahdollinen syy passiivisuuteen.
2. Kirjoita kannustava seurantaviesti ja nimeä verkkohäiriön ratkaisemisesta vastaava henkilö.
3. Jos käytössäsi on valtuutettu testiympäristön raportti lukuoikeuksin, vertaa testikäyttäjän määritystä ja viimeisintä toimintaa jäsenyystietoihin. Muussa tapauksessa keskustele siitä, miten toinen määritys voisi muuttaa poistosuunnitelmaa.

**Odotettu tulos:** Tarkastelumuistiinpano erottaa raportoidun passiivisuuden sen tuntemattomasta syystä ja nimeää seuraavan toimenpiteen. Käyttöpaikkaa ei ole poistettu.

<details>
<summary>Mallivastaus</summary>

Säilytä käyttöpaikka tukitoimien ajaksi; pyydä käyttöoikeuksista vastaavaa henkilöä varmistamaan kaikki määritystavat ennen poiston ehdottamista. Aseta organisaatiokohtainen seurantapäivä. Raportti, ilmoitus tai harjoitus ei yksin todista, että käyttäjä voi muodostaa yhteyden tai että käyttöoikeus on poistettu.

</details>
