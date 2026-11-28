---
title: Anna tiimeille tilaa säilyttäen hallinta
section: Budjettien suunnittelu
order: 4
description: Vertaa yhteistä sisältyvää varantoa tiimitason rajoituksiin ja muunna valinta hyväksytyksi päätösmuistioksi.
verified: "2026-11-10"
diagram: cost-center-controls
checks:
  - question: Kahdella tiimillä on mittariperusteiset budjetit. Omistaako kumpikin nyt varatun osuuden sisältyvistä krediiteistä?
    answer: Ei. Sisältyvä varanto on edelleen yhteinen. Arvioi erillinen kustannuspaikan sisältyvän käytön rajoitus, jos niiden käyttöä tästä varannosta on rajoitettava.
  - question: Pilotilla ei ole luotettavaa kulutuksen lähtötasoa. Hyväksyykö väljä alustava ULB rajattomat lisämaksut?
    answer: Ei. Pidä maksullisen käytön käytäntö ja mittariperusteinen pakottaminen hyväksytyn taloudellisen vastuun mukaisina, seuraa todellisia työkuormia ja tarkista sitten lähtötaso sen omistajien kanssa.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat valita oikean rajoituksen yhteisille krediiteille ja maksulliselle ylityskäytölle.
- Osaat sopia omistajuudesta ennen summien valintaa.

<a id="worked-scenario-two-cost-centers-one-shared-pool"></a>

## Esimerkkitilanne: kaksi kustannuspaikkaa, yksi yhteinen varanto

**Hypoteettinen käyttötapaus:** Alustatiimi suorittaa pitkiä agenttitehtäviä; tukitiimi käyttää chatia satunnaisesti. Niiden Business- tai Enterprise-lisenssit rahoittavat samaa sisältyvää varantoa. Kummankaan tiimin mittariperusteinen budjetti **ei** varaa sille sisältyviä krediittejä.

Jos tasapuolisuus edellyttää kummankin tiimin käytön rajoittamista, arvioi **erillinen kustannuspaikan sisältyvän käytön rajoitus**. GitHub laskee katon kustannuspaikalle määritetyistä lisensseistä. Valitse rajan täyttyessä joko esto tai sallittu maksullinen ylityskäyttö. Käytä lisämaksuihin mittariperusteisia budjetteja. Nämä ovat erillisiä päätöksiä, eivät siirtoja tiimien lompakoiden välillä.

Tarkastele kaaviota kahtena erillisenä hallintapintana. Yhteisen varannon puoli koskee sitä, kuinka paljon sisältyvää käyttöä kustannuspaikka voi ottaa varannosta. Mittariperusteinen puoli koskee lisämaksuja. Kustannuspaikan ympärille piirretty raja ei muuta sen lisenssejä yksityiseksi krediittitiliksi.

Jatketaan hypoteettista esimerkkiä. Niin kauan kuin sisältyviä krediittejä on jäljellä, alustatiimin pitkät tehtävät voivat kuluttaa yhteistä varantoa kuluttamatta sen mittariperusteista budjettia loppuun. Tukitiimin omistaja huomaa varannon pienenevän ja pyytää alentamaan alustatiimin mittariperusteista kynnysarvoa. Pelkkä muutos ei ratkaise esitettyä tasapuolisuusongelmaa: se koskee myöhempää maksullista vaihetta, ei sisältyvien krediittien nykyistä käyttöä.

Sen sijaan omistajat tekevät kaksi päätöstä. He arvioivat alustakustannuspaikan sisältyvän käytön katon ja sen esto- tai sallitun ylityskäyttötoiminnan. Erikseen he hyväksyvät kustannuspaikan mahdolliset lisämaksut ja mittariperusteisen budjetin pakottamistavan. ULB voi silti pysäyttää henkilön aiemmin; kumpikaan tiimiasetus ei takaa, että jokainen käyttäjä voi kuluttaa koko henkilökohtaisen rajansa. Siksi toteutusmuistio kirjaa summan lisäksi tarkoituksen.

Katso [viralliset budjettisäännöt](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) ja [julkaisunäyttö](/sources/) ennen käyttöönottoa.

<a id="choose-who-owns-the-decision"></a>

## Valitse päätöksen omistaja

**Keskitetty:** Taloushallinto ja alustan omistaja säilyttävät taloudellisen päätösvallan; tiimeille esitetään kustannukset. **Delegoitu:** kustannuspaikat kohdistetaan nimetyille menoista vastaaville omistajille, ja niiden sisällyttäminen yrityskattoon tai poissulku määritetään erikseen. Organisaatiorakenteen ei tarvitse olla taloudellinen hierarkiasi.

**Oppaan neuvo:** Kirjaa tämä muistio olemassa olevaan suunnitteluasiakirjaan.

| Päätä | Kirjaa |
| --- | --- |
| Kattavuus | Laskutettava taho, paketti, henkilöt ja työkuormat |
| Valtuudet | Hyväksytyt lisenssimenot ja mittariperusteiset menot erikseen |
| Jatkuvuus | Mikä työ voi pysähtyä, kuka hyväksyy sen ja kukin pakottamisasetus |
| Omistajuus | Kustannuspaikkakohdistus, hyväksyjä, ilmoituksiin reagoiva henkilö ja varahenkilö |
| Poikkeukset | Sovellettava ULB, syy, tarkistus- tai päättymispäivä ja eskalointi |

<details>
<summary>Kun luotettavaa kulutuksen lähtötasoa ei ole</summary>

[Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) ehdottaa väljää alustavaa ULB:tä ja yhden tai kahden laskutusjakson seurantaa ennen rajan tiukentamista. Väljyys ei ole rajaton kulutuslupa: sovita maksullisen käytön käytäntö ja mittariperusteinen pakottaminen hyväksyttyyn taloudelliseen vastuuseen. Mittaa todellisia työkuormia, älä työnimikkeeseen perustuvaa oletettua tuottavuutta.

Yhteenlasketut ULB:t eivät varaa varantoa. Taloudellinen katto voi estää käyttäjän ennen ULB:n saavuttamista. Väliaikaisille henkilökohtaisille ohituksille voi määrittää päättymisajan; kirjaa syy ja omistaja.

</details>

<a id="your-handoff-checklist"></a>

## Luovutustarkistuslista

Taloushallinto ja työkuormien omistajat sopivat pakottamisesta; jokaisella rajoituksella on omistaja ja varahenkilö; kohdistuksia ja poikkeuksia ylläpidetään; käyttäjät tuntevat eskalointireitin. Tarkista esiversiokäytäntö ja tuntematon julkaisutila ennen käyttöönottoa. Noudata sitten [toteutusjärjestystä](/implementation/).
