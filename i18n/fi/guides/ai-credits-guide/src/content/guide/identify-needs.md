---
title: Tunnista tarpeesi
section: Tarpeiden tunnistaminen
order: 8
description: Arvioi yrityksesi toimintamalli ennen budjettisumman, rajoituksen tai käyttöönottosuunnitelman valintaa.
verified: "2026-11-10"
diagram: cap-or-continuity
checks:
  - question: Taloushallinto ei salli maksullista ylityskäyttöä, mutta työkuorman omistaja edellyttää krediittejä kuluttavan työn jatkuvan keskeytyksettä varannon loputtua. Voiko yksi ilmoituskynnys täyttää molemmat vaatimukset?
    answer: Ei. Odotukset ovat ristiriidassa. Taloudellisen hyväksyjän ja työkuorman omistajan on ratkaistava pakottamisen ja jatkuvuuden välinen valinta ennen määritystä.
  - question: Tiimi pyytää budjettia suojatakseen osuutensa sisältyvistä krediiteistä. Onko mittariperusteinen budjetti oikea rajoitus?
    answer: Ei yksinään. Mittariperusteinen budjetti ohjaa lisämaksuja, ei tiimin käyttöä sisältyvästä varannosta. Arvioi erillinen sisältyvän käytön rajoitus.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat erottaa kaupallisen kysymyksen toteutuskysymyksestä.
- Osaat yhdistää kartoituksen vastaukset oikeaan rajoitukseen.
- Osaat kirjata käytännön päätökset taloushallinnon ja alustan ylläpitäjien kanssa.

Käytä tätä arviota, kun ylläpidät yritystä tai autat sitä suunnittelemaan käyttöönottoa. Sopikaa toimintamallista ennen rajoitusten valintaa.

<a id="worked-scenario-two-incompatible-expectations"></a>

## Esimerkkitilanne: kaksi yhteensopimatonta odotusta

**Hypoteettinen arvio:** Taloushallinto ei halua maksullista ylityskäyttöä. Alustan omistaja haluaa krediittejä kuluttavan työn jatkuvan sisältyvien krediittien loputtua. Ratkaise kompromissi taloudellisen hyväksyjän kanssa ennen määrityksen valintaa; kynnysarvo ei voi täyttää molempia vaatimuksia. Käytä [katon ja jatkuvuuden vertailukuvaa](/controls/#strict-cap-or-continuity) päätöksen jäsentämiseen.

Kuva esittää kaksi erilaista sitoumusta. Tiukka taloudellinen katto hyväksyy sen, että krediittejä kuluttava työ voi pysähtyä. Jatkuvuutta painottava seuranta hyväksyy sen, että maksut voivat ylittää mittariperusteisen kynnysarvon reagoinnin aikana. Se ei esitä kahta tapaa taata sekä nollaylitys että keskeytymätön palvelu.

Kysy tässä arviossa ensin taloushallinnolta, ovatko lisämaksut ylipäätään sallittuja. Jos vastaus on edelleen ei, kirjaa, ettei maksullista käyttöä saa sallia, ja selitä seuraus työkuorman omistajalle: krediittejä kuluttava työ ei voi jatkua loputtomiin sisältyvän rahoituksen loputtua. Jos taloushallinto sen sijaan hyväksyy taloudellisen vastuun määritellylle työkuormalle, kirjaa laajuus, hyväksyjä, pakottamisvalinta ja reagoinnin omistaja. Kyseessä on muuttunut liiketoimintapäätös, ei ovela kynnysarvon asetus.

Sama menetelmä pätee, kun joku pyytää ”tiimibudjettia”. Kysy, tarkoitetaanko yhden henkilön kulutusta, tasapuolista pääsyä sisältyviin krediitteihin vai lisämaksujen kattoa. Nämä tarvitsevat eri rajoituksia. Alla oleva kysymystaulukko auttaa löytämään vaatimuksen; luvun keskeinen tehtävä on muuttaa jokainen vastaus vastuulliseksi päätökseksi.

<a id="assess-before-configuring"></a>

## Arvioi ennen määritystä

Seuraava on Well-Architected-päätöskehykseen perustuvaa **oppaan neuvontaa**.

| Ratkaistava kysymys | Mitä vastaus tunnistaa | Seuraava vaihe |
| --- | --- | --- |
| Mikä paketti ja laskutettava taho rahoittavat käytön? | Sisältyvä varanto vai mittariperusteisuus ensimmäisestä käyttökerrasta | [Laskutusmalli](/understand/) |
| Vaaditaanko nollaylitystä vai voiko hyväksytty työ jatkua? | Maksullisen käytön käytäntö sekä tiukan katon ja jatkuvuuden välinen valinta | [Rajoitusten kompromissit](/controls/#strict-cap-or-continuity) |
| Kenellä on menojen hyväksymisvaltuus liiketoimintayksiköissä? | Keskitetyt vai delegoidut kustannuspaikat | [Suunnittelu](/planning/) |
| Koskeeko huoli yhden henkilön kulutusta vai tiimin maksuja? | ULB vai kustannuspaikan mittariperusteinen budjetti | [Rajoitukset](/controls/) |
| Onko tiimien sisältyvien krediittien käyttöä rajoitettava? | Erilliset sisältyvän käytön rajoitukset, eivät vain mittariperusteiset budjetit | [Rajoitukset](/controls/) |
| Voidaanko käyttö jo nyt kohdistaa vastuullisille omistajille? | Raportoinnin edellytys ja kustannusten esittämisen valmius | [Kohdistus](/reporting/) |
| Kuka reagoi ilmoitukseen tai työn pysähtymiseen? | Operatiivinen omistajuus ja eskaloinnin puute | [Ylläpito](/operate/) |
| Mitä pilotti todellisuudessa osoittaa? | Tietoihin perustuva lähtötaso vai alustavat rajat | [Toteutus](/implementation/) |

Hyväksyjää tai jatkuvuuspäätöstä ei ole? Aloita suunnittelusta. Päätöksistä on sovittu mutta kohdistus puuttuu? Aloita raportoinnista. Molemmat valmiina? Käy toteutuspilotti läpi ennen automatisointia.

<details>
<summary>Tarkista nämä oletukset</summary>

- ”Jokaisella käyttäjäpaikalla on oma saldo.” Sisältyvät krediitit ovat yhteisessä varannossa.
- ”Tämä yritysbudjetti sisältää lisenssisi.” Se rajoittaa mittariperusteisia maksuja, ei käyttäjäpaikkojen maksuja.
- ”Tiimibudjetti poistaa henkilön eston.” Loppuun käytetty ULB on ratkaistava erikseen.
- ”Ilmoitukset estävät ylityksen.” Pelkkiä ilmoituksia lähettävät kynnysarvot eivät pakota kattoa.
- ”Ennuste on hyväksytty ostosi.” Ennusteet, rajoitukset ja hankinnat ovat eri asioita.
- ”Se on dokumentoitu, joten sen täytyy olla yleisesti saatavilla.” Julkaisutila tarvitsee näyttöä.

Älä luota tuleviin tai vahvistamattomiin määriin. Linkitä ajantasaiseen hinta- tai laskutuslähteeseen, päivää oletus ja vahvista yrityksen kaupalliset ehdot asianmukaisessa prosessissa.

</details>

<a id="record-a-one-page-implementation-brief"></a>

## Kirjaa yhden sivun toteutusmuistio

Kirjaa laskutettava taho ja paketti, sisältyvän ja mittariperusteisen käytön malli, hyväksytty menoraja, jatkuvuusvalinta, ehdotetut laajuudet ja omistajat, lähteistä vahvistetut oletukset, ratkaisemattomat julkaisutilan tarkistukset ja seuraava tarkistuspäivä.

Tuloksena tulee olla toteutuskelpoinen päätöstietue nimettyine omistajineen, ei ehdotettu dollarimäärä ilman vastuuta. Käytä [suunnittelun luovutustarkistuslistaa](/planning/#your-handoff-checklist) ja [toteutustarkistuksia](/implementation/#validate-before-broad-rollout) hyväksymiskriteereinä.
