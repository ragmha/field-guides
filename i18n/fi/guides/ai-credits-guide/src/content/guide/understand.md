---
title: Seuraa krediittejä
section: Laskutusmalli
order: 2
description: Katso, mistä sisältyvät krediitit tulevat, milloin maksullinen käyttö alkaa ja miksi agenttityökuormalla voi olla kaksi mittaria.
verified: "2026-11-10"
diagram: credit-lifecycle
scenarioDiagram: agent-meters
checks:
  - question: Kaksi Business-lisenssin haltijaa tuo yhteiseen varantoon 3 800 sisältyvää krediittiä. Voiko yksi henkilö kuluttaa niistä yli 1 900?
    answer: Kyllä. Krediitit ovat yhteisiä, eikä niitä ole varattu käyttäjäkohtaisesti. Henkilöön sovellettava ULB ja muut sovellettavat rajoitukset vaikuttavat silti.
  - question: Yhteinen varanto on tyhjä. Riittääkö käyttämätön organisaatiobudjetti seuraavan krediittejä kuluttavan pyynnön sallimiseen?
    answer: Ei. Maksullisen käytön on oltava sallittua ja kaikissa sovellettavissa pakottavissa rajoituksissa on oltava tilaa. ULB voi silti estää käyttäjän.
  - question: Rajoittaako AI-krediittikatto myös agenttityökuorman käyttämiä Actions-minuutteja?
    answer: Ei. Niillä on erilliset mittarit, ja ne on tarkasteltava erikseen.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents
  - https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat seurata yhteistä varantoa mittariperusteiseen vaiheeseen.
- Osaat erottaa krediittien kulutuksen lisenssimaksuista ja Actions-käytöstä.

<a id="read-the-picture"></a>

## Kuvan tulkinta

Business- ja Enterprise-lisenssit kasvattavat **yhteistä kuukausittaista varantoa**, eivät käyttäjien omia lompakoita. Kun varanto loppuu, krediittejä kuluttava työ tarvitsee **AI credits paid usage** -käytännön sekä tilaa sovellettavissa pakottavissa rajoissa.

**Copilot access ohittaa sisältyvän varannon vaiheen.** Siihen ei sisälly krediittejä; krediittejä kuluttava käyttö laskutetaan mittariperusteisesti ensimmäisestä käyttökerrasta. [28. lokakuuta tehty ilmoitus](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/) vahvistaa saatavuuden asiakastiimien kautta GitHub Enterprise Cloudille, ja itsepalvelusaatavuus otetaan käyttöön vaiheittain.

<details>
<summary>Tarkista sisältyvä määrä, nollaus ja maksullisen käytön säännöt</summary>

[Laskutusdokumentaation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) mukaan **1 AI-krediitti = 0,01 USD**. Mallin syöte-, tuloste- ja välimuistitokenit määräävät kulutuksen. Budjetit määritetään Yhdysvaltain dollareina.

| Paketti | Sisältyvät krediitit määritettyä lisenssiä kohti kuukaudessa |
| --- | --- |
| Copilot Business | 1,900 |
| Copilot Enterprise | 3,900 |

Tarkista [ajantasaiset määrät](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing#included-credits-for-copilot-business-and-copilot-enterprise) ennen niiden lainaamista. Krediitit nollautuvat **kuukauden ensimmäisenä kalenteripäivänä klo 00.00 UTC** eikä niitä siirretä seuraavaan kuukauteen. Lisenssien lisääminen kasvattaa varantoa heti; poistot pienentävät sitä seuraavassa laskutusjaksossa.

Lisäkäyttö on oletusarvoisesti käytössä Business- ja Enterprise-paketeissa. Poista maksullisen käytön käytäntö käytöstä, jos ylityskäyttöä ei ole hyväksytty. Copilot Chat, CLI, cloud agent ja Spaces kuluttavat krediittejä; kooditäydennykset ja seuraavan muokkauksen ehdotukset eivät kuluta niitä ja ovat käytettävissä krediittirajan täytyttyäkin. Katso tila [julkaisurekisteristä](/sources/).

</details>

<a id="worked-example-shared-does-not-mean-evenly-divided"></a>

## Esimerkki: yhteinen ei tarkoita tasan jaettua

**Hypoteettinen laskelma, ei budjettisuositus:** Kaksi Copilot Business -lisenssin haltijaa tuo kumpikin 1 900 krediittiä, jolloin yrityksen yhteinen sisältyvä varanto on 3 800 krediittiä. Oletetaan yksi lisensoinnista vastaava organisaatio, ei kustannuspaikkamääritystä ja riittävästi tilaa kaikissa sovellettavissa rajoituksissa.

Yksi henkilö kuluttaa 2 800 krediittiä ja toinen 1 000. Ensimmäinen ei ole lainannut toisen henkilökohtaista saldoa: molemmat käyttivät samaa varantoa. Yhteensä on kulutettu 3 800, joten sisältyviä krediittejä ei ole jäljellä. Luvut kuvaavat kulutusta, eivät kiinteää määrää kehotteita; tokenien käyttö ja mallin valinta määräävät tehtävän kulutuksen.

Seuraava krediittejä kuluttava pyyntö edellyttää, että maksullinen käyttö on sallittu ja sovellettavat pakottavat rajat sallivat sen. Jos maksullinen käyttö on poistettu käytöstä, työ ei voi jatkua pelkästään siksi, että henkilöllä on yhä lisenssi. Jos maksullinen käyttö on sallittu, sen mittariperusteiset maksut ovat erillinen asia kahden lisenssin hinnasta. Tämä on elinkaarikuvan siirtymä, ei uuden käyttäjäpaikan osto tai henkilökohtaisen lompakon täyttö.

<a id="worked-scenario-an-agent-heavy-review-day"></a>

## Esimerkkitilanne: agenttipainotteinen tarkastuspäivä

**Hypoteettinen käyttötapaus:** Tiimi ottaa Copilot-kooditarkastuksen käyttöön suurta migraatiota varten. [1. kesäkuuta julkaistu ilmoitus](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/) vahvistaa kaksi mittaria: AI-krediitit mallin käytölle ja Actions-minuutit suorittimen työlle. AI-krediittikatto ei rajoita Actionsia. Tarkista molemmat ennen laajentamista; mikään esimerkeistä ei ole menosuositus.

Tulkinta alla olevasta kahden mittarin kuvasta: kyseessä on saman työkuorman kaksi erillistä tietuetta. Mallin käyttö kuluttaa AI-krediittejä ja suorittimen työ Actions-minuutteja. Pelkän AI-krediittien kokonaismäärän tarkastelu jättää suorittimen osuuden selittämättä. Tässä esimerkissä tiimin on ymmärrettävä molemmat ennen kuin se päättää, onko suurempi migraatio taloudellisesti hyväksytty; kaavio ei väitä, että kaikki ominaisuudet käyttävät molempia mittareita.

**Kolmannen osapuolen koodausagentit — <span class="status caution">julkinen esiversio - käytä harkiten</span>** kuluttavat myös molempia mittareita. Tarkista [virallinen agenttidokumentaatio](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents) ennen käyttöönottoa.

**Pidä erillään:** ennuste arvioi menoja; katto pakottaa tuotteen rajan; ostolupa hyväksyy maksut. Mikään näistä ei korvaa muita, eivätkä mittariperusteiset budjetit rajoita lisenssimaksuja. [Siirtymäilmoitus](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) antaa laskutuksen taustatietoa, ei asiakkaan kulutusvaltuuksia.
