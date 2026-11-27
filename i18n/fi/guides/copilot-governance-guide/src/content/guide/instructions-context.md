---
title: Anna hyödyllisiä ohjeita
section: Kontekstin hallinta
order: 2
description: Rajaa kehitystyön ohjeistus sekoittamatta sitä käyttöoikeuksien hallintaan.
verified: "2026-11-12"
diagram: instructions-context
checks:
  - question: Takaavatko mukautetut ohjeet, että jokainen vastaus noudattaa niitä?
    answer: Eivät. Vastaukset eivät ole deterministisiä, joten tuotokset on edelleen tarkastettava.
  - question: Ovatko kaikki ohjetyypit tuettuja jokaisessa asiakasohjelmassa ja ominaisuudessa?
    answer: Eivät. Tarkista aiotun asiakasohjelman ja ominaisuuden ajantasainen tukitaulukko.
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
---

## Mitä opit

- Valitsemaan jaettujen ohjeiden laajuuden.
- Arvioimaan, auttaako ohjeistus tehtävässä todella.

## Ohjeistus on kontekstia, ei käyttöoikeus

[Mukautetut ohjeet](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) voivat olla henkilökohtaisia, repositoriokohtaisia tai organisaatiokohtaisia. Tuetut ohjetyypit vaihtelevat asiakasohjelman ja ominaisuuden mukaan. Tekoälyn vastaukset eivät ole deterministisiä: ohjeita ei välttämättä noudateta johdonmukaisesti, eivätkä ne korvaa repositorion käyttöoikeuksia tai tarkastusta.

Kohdenna ohjeistus sen käyttäjille. Koko repositoriota koskevat käytännöt kuuluvat repositorion yhteyteen; rajatummat ohjeet voivat tuetuissa tapauksissa välttää tarpeetonta kuormitusta asiaan liittymättömissä tehtävissä. Vältä ristiriitaisia ohjeita.

## Esimerkki: repositorion käytäntö

**Kuvitteellinen lähtötilanne:** Esimerkkirepositorion ylläpitäjät haluavat muutosten sisältävän projektin olemassa olevat testit. Ensimmäinen vastaus ehdottaa koodia mutta jättää testiohjeet pois. Tiimi laatii tämän koko repositoriota koskevan ohjeistuksen: ”Tunnista ja suorita tähän projektiin tehtävien muutosten kannalta olennaiset olemassa olevat testit; ilmoita, jos joitakin ei voi suorittaa.”

Tiimi toistaa saman ei-arkaluonteisen tehtävän uudessa istunnossa tuetulla asiakasohjelmalla ja vertaa vastausta ja todellista testitulostetta. Jos toisessa vastauksessa on testikomento mutta sitä ei koskaan suoriteta, ohje on vaikuttanut suunnitelmaan todistamatta testien menneen läpi. Tarkastaja tarkistaa edelleen muutoksen ja suoritusnäytön.

**Lopputulos:** Luonnos tarjoaa arvioitavaksi täsmällisen käytännön. Yksi vertailu ei takaa tulevaa noudattamista eikä myönnä käyttöoikeuksia.

## Harjoitus: arvioi ehdotettua ohjetta

**Edellytykset:** Yllä oleva kuvitteellinen ohje ja paikallinen muistiinpano. Ei-arkaluonteinen testiympäristön repositorio ja tuettu Copilot-asiakasohjelma ovat valinnaisia; mallin käyttö voi aiheuttaa maksuja, joten hanki nimenomainen hyväksyntä ennen todellista testiä.

1. Kirjaa tehtävä, odotettu toiminta ja näyttö, joka osoittaisi testin todella suoritetuksi.
2. Vertaa näitä kuvitteellisia vastauksia: A sanoo ”suorita testit” ilman tulosta; B antaa komennon ja onnistuneen suorituslokin. Kirjaa, mitä kumpikin osoittaa.
3. Jos valtuutettu, ei-arkaluonteinen testiympäristö ja mallin käyttö on hyväksytty, vertaa uusia istuntoja ohjeen kanssa ja ilman sitä. Muussa tapauksessa keskustele kuvitteellisista vastauksista; älä muuta repositorion asetuksia.

**Odotettu tulos:** Tarkastelumuistiinpano erottaa ehdotetun komennon suoritusnäytöstä ja nimeää ohjeen omistajan. Se ei väitä jokaisen vastauksen noudattavan ohjetta.

<details>
<summary>Mallivastaus</summary>

A osoittaa vain ehdotuksen; B raportoi suorituksen, josta tarkastajan tulee tarkistaa olennainen testi ja tulos. Kumpikaan ei takaa tulevaa noudattamista. Repositorion omistaja ylläpitää ohjeistusta; repositorion käyttöoikeudet ja vaaditut tarkistukset ovat erillisiä.

</details>
