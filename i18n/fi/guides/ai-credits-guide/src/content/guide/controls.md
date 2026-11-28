---
title: Selvitä pyynnön pysäyttävä rajoitus
section: Budjetit ja rajoitukset
order: 3
description: Käy läpi estetyn käyttäjän esimerkki ja vertaa sitten tiukkaa taloudellista kattoa jatkuvuutta painottavaan seurantaan.
verified: "2026-11-10"
diagram: layered-guardrails
scenarioDiagram: cap-or-continuity
checks:
  - question: Henkilökohtainen ULB on yleistä ULB:tä korkeampi. Kumpaa henkilöön sovelletaan?
    answer: Henkilökohtainen ULB on etusijalla. Rajoja ei lasketa yhteen eikä pienintä arvoa valita.
  - question: Kehittäjä on kuluttanut ULB:nsä loppuun, vaikka yhteisiä krediittejä on jäljellä. Poistaako suurempi mittariperusteinen tiimibudjetti eston?
    answer: Ei. Sovellettava ULB laskee yhteen sisältyvän ja mittariperusteisen kulutuksen ja pysäyttää käytön aina. Raja on käsiteltävä valtuutetulla päätöksellä tai käyttäjän on odotettava seuraavaa jaksoa.
  - question: Mittariperusteinen kynnysarvo lähettää ilmoituksen, kun sen pakottava pysäytys on poistettu käytöstä. Onko menojen pysähdyttävä kynnysarvoon?
    answer: Ei. Maksut voivat ylittää sen. Seuranta ei ole taloudellinen katto eikä lupa käyttää rahaa.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/billing/concepts/budgets-and-alerts
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/
  - https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Osaat selvittää eston syyn korottamatta väärää budjettia.
- Osaat valita pakottamisen harkitusti ja tunnistaa vaikutukset muihin tuotteisiin.

<a id="read-the-picture-and-the-cookie-jar"></a>

## Kuvan ja keksipurkin tulkinta

Kerroskuva erottaa rajoitukset, jotka vastaavat eri kysymyksiin. Tunnista ensin yksi sovellettava henkilökohtainen raja. Erota sitten sisältyvä käyttö maksullisesta lisäkäytöstä ja selvitä sovellettavat menorajoitukset. Kerrokset eivät ole yhden lompakon osia, eikä yhden kasvattaminen poista toista.

Keksipurkki konkretisoi eron. Keksit kuvaavat yhteisiä sisältyviä krediittejä ja henkilökohtainen välipalalappu ULB:tä. Täysi purkki ei kumoa henkilön rajaa. Kun purkki on tyhjä, lisäkeksien ostaminen kuvaa mittariperusteista käyttöä: myös lupa ja sovellettava taloudellinen liikkumavara vaikuttavat. Keksi on kulutuksen vertaus, ei lupaus siitä, että jokainen todellinen pyyntö maksaa saman verran.

<a id="worked-scenario-credits-remain-but-the-developer-is-blocked"></a>

## Esimerkkitilanne: krediittejä on jäljellä, mutta kehittäjä on estetty

**Hypoteettinen, ei suositeltu budjetti:** Kehittäjään sovellettava ULB vastaa **100 krediittiä**, jotka kaikki on kulutettu. Yhteisessä varannossa on yhä **20 000 krediittiä**. Seuraava krediittejä kuluttava pyyntö estetään. Tiimin mittariperusteisen budjetin korottaminen ei korjaa tätä; valtuutetun ylläpitäjän on käsiteltävä sovellettavaa ULB:tä.

Kooditäydennykset ja seuraavan muokkauksen ehdotukset toimivat edelleen. Budjettihäiriö ei tarkoita lisenssin poistamista.

Seuraa esimerkkiä kahdessa vaiheessa. Henkilön sovellettavassa rajassa ei ole tilaa jäljellä, joten yhteinen saldo ei voi tehdä seuraavasta krediittejä kuluttavasta pyynnöstä onnistunutta. Yrityksellä on varantoa, mutta tämä henkilö on saavuttanut kulutusrajansa. Oikea eskalointi koskee siis kyseistä ULB:tä, ei sitä, pitäisikö yrityksen ostaa lisää krediittejä.

Valitse nyt kuvasta **Purkki on tyhjä; lisäkeksien ostaminen on sallittu**. Henkilökohtaisessa rajassa on tilaa, mutta sisältyvä rahoitus on loppunut. Tällöin pakottava organisaation tai yrityksen mittariperusteinen katto voi pysäyttää työn. Sama näkyvä oire, estetty pyyntö, voi siis vaatia erilaisen päätöksen. Selvitä rajoitus ennen muutoksen ehdottamista.

<a id="what-gets-checked-first"></a>

## Mitä tarkistetaan ensin

1. **Selvitä yksi ULB:** henkilökohtainen > kustannuspaikan ULB > yleinen. Tämä on etusijajärjestys, **ei pienin kolmesta summasta**. ULB:t mittaavat sisältyvää ja mittariperusteista kulutusta yhdessä ja pysäyttävät käytön aina. Jos mitään ei ole asetettu, ULB-kattoa ei sovelleta.
2. **Tarkista rahoitusvaihe:** sisältyvä varanto, sovellettava sisältyvän käytön rajoitus ja sitten sallittu maksullinen käyttö. Copilot access alkaa mittariperusteisena.
3. **Tarkista sovellettavat mittariperusteiset rajoitukset:** GitHub ohjaa kustannuspaikkaan määritetyt käyttäjät kustannuspaikan budjettien kautta, muutoin lisensoivan organisaation budjettien kautta ja yritysbudjettien kautta, kun kumpaakaan ei sovelleta. Kustannuspaikan käyttö lasketaan yleensä myös yrityksen kattoon.

Toisistaan riippumattomista sovellettavista rajoituksista pienin jäljellä oleva **pakottava** liikkumavara voi estää käytön ensin. Reititys ei oikeuta ohittamaan toista sovellettavaa kattoa. [Lähde: budjetin arviointi](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets).

<a id="strict-cap-or-continuity"></a>

## Tiukka katto vai jatkuvuus

**Hypoteettinen valinta:** Taloushallinto kieltää yhden työkuorman lisäylitysmaksut; toisen hyväksytyn työkuorman on jatkuttava samalla kun omistaja reagoi. Nämä edellyttävät erilaisia pakottavia asetuksia, eivät saman oletuksen kopioimista kaikkialle.

| Valinta | Määritys | Hyväksy ja lievennä |
| --- | --- | --- |
| Tiukka menokatto | Ota käyttöön **Stop usage when budget limit is reached** | Krediittejä kuluttava työ voi pysähtyä |
| Jatkuvuutta painottava seuranta | Jätä valitun mittariperusteisen budjetin pakottava pysäytys pois käytöstä; nimeä ilmoituksiin reagoivat henkilöt | Maksut voivat ylittää kynnysarvon |

[Budjettidokumentaatio](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) suosittelee pakottavia pysäytyksiä rajojen noudattamiseen; [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) suosittelee yrityksen pakottavan pysäytyksen jättämistä pois käytöstä jatkuvuuden vuoksi. **Oppaan neuvo:** kirjaa valinta taloushallinnon ja työkuormien omistajien kanssa. Pelkkä ilmoitus ei ole ostolupa. ULB:t pysäyttävät käytön kummassakin tapauksessa.

<details>
<summary>Tarkista poissulut ja laskutusrajat</summary>

**Kustannuspaikan poissulku** erottaa valitut kustannuspaikat yrityskaton yhteenlaskennasta, ei maksuista, ULB:istä tai hyväksyntävaatimuksista. Seuraa kokonaisvastuuta sekä pois suljetuissa että mukana olevissa kustannuspaikoissa.

Usean organisaation kautta lisensoitujen käyttäjien osalta GitHub valitsee laskuttavan organisaation kullekin jaksolle. Suosi yhtä lisensoivaa organisaatiota käyttäjää kohti tai suoraa kustannuspaikkamääritystä. GitHub App -asennuksen käyttö kuuluu sen omistavalle organisaatiolle; yksittäisiä sovellus- tai asennusbudjetteja ei ole saatavilla.

</details>

<a id="choose-budget-type-as-well-as-scope"></a>

## Valitse budjetin tyyppi ja laajuus

**Bundled AI credits budget** kattaa AI-krediittien SKU-tunnusten ylityskäytön; **SKU-tason budjetti** kohdistuu yhteen SKU:hun. Jos toinen tuote kuluttaa yhdistetyn pakottavan budjetin loppuun, **AI Scan ja agentic autofix voivat myös pysähtyä**. Code Security AI Credits -SKU:n pakottava budjetti voi estää ne erikseen. [Vältä päällekkäisiä rajoja, jotka aiheuttavat odottamattomia estoja](https://docs.github.com/en/billing/how-tos/set-up-budgets#plan-your-budget-type-and-scope).

Käyttäjäkohtaiset budjetit kattavat nykyisin **vain Copilot AI credits** -krediitit, vaikka käyttöliittymä sijoittaa **Users**-kohdan yhdistetyn budjettityypin alle. Kustannuspaikan mittariperusteinen budjetti ei jaa sisältyvää varantoa; käytä [erillistä sisältyvän käytön rajoitusta](/planning/).

ULB:iden [yleinen saatavuus ilmoitettiin 1. kesäkuuta](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/); myöhemmät [kustannuspaikan ULB:n](https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/) ja [sisältyvän käytön](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/) julkaisut eivät määritä nimenomaista yleisen saatavuuden vaihetta. Tarkista [rekisteri, ajantasainen määritysnäyttö ja Spark-käytöstäpoistoa koskeva huomautus](/sources/).
