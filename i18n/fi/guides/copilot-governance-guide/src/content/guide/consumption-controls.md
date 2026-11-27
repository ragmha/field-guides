---
title: Valitse kulutuksen suojarajat
section: Laskutus ja kustannusten hallinta
order: 3
description: Erota käyttäjän kulutusrajat mitattujen veloitusten hallintakeinoista.
verified: "2026-11-12"
diagram: consumption-controls
scenarioDiagram: budget-scenario
checks:
  - question: Voiko kustannuspaikan mitatun kulutuksen budjetti jatkaa käyttäjän loppuun käytettyä käyttäjäkohtaista budjettia?
    answer: Ei. Käyttäjäkohtaisen budjetin ehdoton pysäytys estää edelleen käyttäjän käytön, vaikka kustannuspaikan mitattua budjettia olisi jäljellä.
  - question: Mitä eroa on vain hälyttävällä kynnysarvolla ja täytäntöön pannulla pysäytyksellä?
    answer: Vain hälyttävä kynnys ilmoittaa vastuuhenkilölle menojen mahdollisesti jatkuessa; täytäntöön pantu raja estää soveltuvan mitatun käytön sen täyttyessä.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## Mitä opit

- Erottamaan eri budjetit ja niiden laajuudet.
- Valitsemaan toimintatavan hälytykselle tai täytäntöön pannulle pysäytykselle.

## Hallintakeinot eivät ole keskenään vaihdettavia

[Budjettien hallintakeinot](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) erottavat käyttäjäkohtaiset budjetit, jotka rajoittavat yksilön kokonaiskrediittikulutusta ja pysäyttävät käytön aina ehdottomasti, kustannuspaikan, organisaation ja yrityksen mitattujen menojen hallintakeinoista. Kustannuspaikan mitatun kulutuksen budjetti ei rajoita sen osuutta mukana tulevasta käytöstä eikä ohita loppuun käytettyä käyttäjäkohtaista budjettia.

Ratkaise käyttäjäkohtaisen budjetin (ULB) etusija tarkkuuden perusteella, älä valitsemalla pienintä summaa: henkilökohtainen ULB, sitten kustannuspaikan ULB ja lopuksi yleinen ULB. Ensimmäinen määritetty soveltuva arvo voittaa. Kustannuspaikan mukana tulevan käytön hallintakeino rajoittaa erikseen sen käyttöä yhteisestä mukana tulevasta kiintiöstä; kustannuspaikan mitatun kulutuksen budjetti rajoittaa veloituksia mitatun käytön vaiheessa. [Budjettidokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) selittää, että nämä hallintakeinot ovat toisistaan riippumattomia ja menojen rajat pysäyttävät käytön vain, kun ne on määritetty tekemään niin.

## Esimerkki: estetty käyttäjä

**Kuvitteellinen lähtötilanne:** Käyttäjällä on yleinen ULB $20, kustannuspaikan ULB $10 ja henkilökohtainen ULB $15. Käyttäjä on kuluttanut kuluvalla jaksolla krediittejä $15:n arvosta. Sekä yhteisessä mukana tulevan käytön kiintiössä että kustannuspaikan mitatun kulutuksen budjetissa on tilaa. Summat havainnollistavat sääntöjä eivätkä ole suositeltuja rajoja.

Henkilökohtainen ULB on tarkin, joten $15 pätee, vaikka kustannuspaikan oletus on pienempi. Käyttäjän soveltuva ULB on käytetty loppuun, joten uusi krediittejä kuluttava pyyntö estetään. Kiintiön tai mitatun budjetin jäljellä oleva tila ei ohita ehdotonta pysäytystä. Vastuuhenkilön on selvitettävä tilanne ja hankittava hyväksyntä ennen hallintakeinojen muuttamista.

**Lopputulos:** Tuloksena on ULB-esto, ei todiste siitä, että yhteinen kiintiö tai mitatun kulutuksen budjetti on loppunut. Täytäntöön pantu mitatun kulutuksen raja voisi erikseen estää mitatun käytön, vaikka ULB:ssä olisi tilaa.

## Harjoitus: seuraa pyynnön kulkua

**Edellytykset:** Käytä yllä olevia kuvitteellisia budjetteja ja [budjettiohjetta](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets). Todellista budjettia tai kulutusta ei tarvita.

1. Kirjoita kaikki kolme ULB:tä ja ympyröi tarkkuuden perusteella voimassa oleva.
2. Vertaa käyttäjän kulutusta kyseiseen ULB:hen. Päätä, saavutetaanko tämän pyynnön kohdalla kiintiön ja mitatun käytön hallintakeinot.
3. Jos sinulla on valtuutettu lukuoikeus testiympäristöön, vertaa olemassa olevia testiasetuksia ja soveltuvaa etusijajärjestystä. Muussa tapauksessa käy esimerkki läpi ilman verkkoyhteyttä. Älä muuta rajoja tai aiheuta laskutettavaa käyttöä.

**Odotettu tulos:** Seuranta tunnistaa henkilökohtaisen $15:n ULB:n ja ehdottoman pysäytyksen ennen jäljellä olevaan kiintiöön tai mitattuun budjettiin tukeutumista. Tämä laskelma ei ole todellinen varmennus.

<details>
<summary>Mallivastaus</summary>

Henkilökohtainen ULB ohittaa kustannuspaikan $10:n ja yleisen $20:n oletukset. Kun kulutus on $15, se on käytetty loppuun; pyyntö estetään. Erilliset mukana tulevan käytön ja mitattujen menojen hallintakeinot ovat edelleen tärkeitä, kun ULB sallii pyynnön. Yksityiskohtainen budjetointi on oppaassa [AI Credits Learning Guide](https://ragmha.github.io/field-guides/ai-credits-guide/).

</details>
