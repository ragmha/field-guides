---
title: Päätä, kuka maksaa ja kuka reagoi
section: Laskutus ja kustannusten hallinta
order: 2
description: Määritä vastuut lisensseistä, mitatusta käytöstä ja talousraportoinnista.
verified: "2026-11-12"
diagram: billing-ownership
checks:
  - question: Poistaako määritetty käyttöpaikka tarpeen suunnitella mitattua kulutusta?
    answer: Ei. Käyttöpaikan käyttöoikeus ja AI-krediittien mitattu kulutus ovat erillisiä laskutuskysymyksiä.
  - question: Onko ennuste sama asia kuin lupa aiheuttaa veloituksia?
    answer: Ei. Ennuste arvioi käyttöä; organisaation hyväksymisprosessi antaa luvan menoihin.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## Mitä opit

- Erottamaan käyttöpaikkojen vastuun käytön rahoituksesta.
- Nimeämään vastuuhenkilön budjettihälytyksille ja täsmäytykselle.

## Taloudellinen päätös

[GitHubin laskutusdokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) kuvaa käyttöä AI-krediitteinä. Copilot Business ja Copilot Enterprise sisältävät yhteisen kiintiön; Copilot access ei sisällä käyttökiintiötä, ja mitattu käyttö alkaa ensimmäisestä käyttökerrasta. Tarkista palvelupaketti ja maksullisen käytön käytäntö ennen mahdollisten kustannusten arviointia.

Ennuste arvioi mahdollista kulutusta. Budjetti voi asetuksistaan riippuen hälyttää tai pysäyttää käytön. Kumpikaan ei korvaa organisaation valtuuksia hyväksyä hankintoja tai veloituksia.

## Esimerkki: yhteinen rahoitus

**Kuvitteellinen lähtötilanne:** Copilot Business -pilotilla on yhteinen mukana tulevan käytön kiintiö, käyttöpaikkoja hallitseva alustatiimi ja mitatut menot hyväksyvä taloustiimi. Pilotilla on vain hälyttävä mitatun kulutuksen kynnysarvo; hälytyksiin reagoivaa henkilöä ei ole nimetty.

Alustan vastuuhenkilö kysyy taloustiimiltä, kuka vastaanottaa hälytykset ja arvostaako liiketoiminta jatkuvuutta vai ehdotonta pysäytystä. Taloustiimi valitsee nimetyn reagoijan ja säilyttää hyväksyntävallan. Tiimi kirjaa, että vain hälyttävä kynnys voidaan ylittää veloitusten jatkuessa. Yrityksen mitatun kulutuksen budjetti ei rajoita lisenssimaksuja; [budjettidokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) selittää eron.

**Lopputulos:** Ehdotuksessa on nimetty käyttöpaikkojen vastuuhenkilö, menojen hyväksyjä ja hälytyksiin reagoija. Se ei määritä kynnysarvoa eikä hyväksy lisämenoja. Jos kiintiö loppuu, maksullisen käytön käytäntö ja sovellettavat täytäntöön pantavat rajat määräävät, voiko mitattu käyttö jatkua.

## Harjoitus: ohjaa budjettihälytys

**Edellytykset:** Paperi tai paikallinen muistiinpano. Oleta yllä kuvattu kuvitteellinen pilotti; älä tee hankintaa tai muuta budjettia.

1. Luettele, kuka vastaa käyttöpaikkojen määrityksestä, kuka hyväksyy mitatut menot ja kuka selvittää hälytyksen.
2. Kirjaa, pysäyttääkö esimerkin kynnys käyttöä, ja luettele erillinen lisenssimaksuja koskeva kysymys.
3. Jos sinulla on valtuutettu testiympäristö ja laskutuksen lukuoikeus, tarkastele olemassa olevan testibudjetin laajuutta ja pysäytysasetusta tallentamatta muutoksia. Muussa tapauksessa keskustele pelkästään hälyttävästä tilanteesta.

**Odotettu tulos:** Toimintakirjaus tunnistaa vastuuhenkilön sekä hälytyksen, pysäytyksen ja hankintahyväksynnän erot. Harjoitus ei osoita budjettia määritetyksi.

<details>
<summary>Mallivastaus</summary>

Alustatiimi vastaa käyttöpaikoista; taloustiimi hyväksyy mitatut menot ja nimeää hälytyksiin reagoijan. Esimerkki vain hälyttää, joten veloitukset voivat jatkua. Tarkastele lisenssimaksuja erikseen ja vie muutosehdotukset organisaation hyväksymisprosessiin.

</details>

Yksityiskohtaiset krediittilaskelmat ja budjetointi ovat oppaassa [AI Credits Learning Guide](https://ragmha.github.io/field-guides/ai-credits-guide/).
