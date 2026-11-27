---
title: Päätä, sopivatko Azure-kustannustyökalut
section: Tiedon visualisointi
order: 404
description: Käytä Azure-kustannusanalyysiä vain, kun GitHubin laskutusjärjestely tukee sitä, keksimättä AI-krediittien yksityiskohtia.
verified: "2026-11-12"
diagram: visualisation-map
checks:
  - question: Todistaako agenttitelemetrian yhdistäminen Application Insightsiin, että GitHubin maksut laskutetaan Azuren kautta?
    answer: Ei. Telemetrian ja laskutuksen reititys ovat eri asioita. Azure-kustannusohjeet soveltuvat, kun GitHubin laskutus on yhdistetty Azure-tilaukseen.
  - question: Todistavatko tarkastellut Azure-laskutussivut käyttäjä- ja mallikohtaisen AI-krediittien näkyvyyden Azuressa?
    answer: Eivät. Azuren AI-krediittitietojen tila on vahvistamaton. Tarkista oma Azure-näkymäsi ja käytä GitHubin AI-käyttöraporttia dokumentoituihin käyttäjä- ja mallikohtaisiin tietoihin.
  - question: Dokumentoiko tarkasteltu FinOps hubs -sivu valmiin GitHub AI-krediittiliittimen?
    answer: Ei. Se dokumentoi omien tietojen tuonnin laajennettavuuden. GitHub-tuonti on mukautettua työtä ja oppaan neuvo, jonka käyttöönotto- ja käyttökustannukset on arvioitava.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription
  - https://microsoft.github.io/finops-toolkit/hubs
  - https://docs.github.com/en/billing/reference/billing-reports
---

<a id="what-you-will-learn"></a>

## Mitä opit

- Vastaamaan kysymykseen ”Azure FinOps?” ehdollisesti lupaamatta liitintä tai koontinäyttöä.
- Tunnistamaan Azure-laskun yhdistelyn ja kohdistuksen rajat.
- Säilyttämään GitHubin käyttäjä- ja mallikohtaisen näytön, kun Azuren yksityiskohtia ei ole vahvistettu.

<a id="read-the-picture"></a>

## Kuvan tulkinta

Pysy laskutusrivillä, kun kysymys koskee taloutta. Azure kuuluu tähän polkuun **vain, jos GitHub-käyttö laskutetaan yhdistetyn Azure-tilauksen kautta**. Asiakastelemetriarivi on erillinen: havaintojen lähettäminen Application Insightsiin ei yhdistä tilin laskutusta Azureen.

<a id="establish-the-billing-connection-first"></a>

## Selvitä ensin laskutusyhteys

GitHub dokumentoi Azure-tilauksen yhdistämisen siten, että GitHub-tuotteiden maksut laskutetaan Azuren kautta suoran GitHub-laskutuksen sijaan. Käyttö välitetään **päivittäin**, ja kuukauden maksut näkyvät **Azure-laskulla seuraavan kuukauden alussa**. Tämä ei ole lupaus heti täydellisestä reaaliaikaisesta näkymästä.

Tarkasteltu [Azure-laskutussivu](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) ilmoittaa Copilotin välitetyksi käyttömittariksi **”aktiivisten käyttäjäpaikkojen määrän”**. Se ei kuvaa käyttäjä- tai mallikohtaista AI-krediittien kulutusta. **Azuren AI-krediittitietojen tila: vahvistamaton.** Tarkasta yrityksen todellinen Azure-näkymä sen sijaan, että oletat sen vastaavan GitHubin AI-käyttöraporttia.

GitHubin [tilausviite](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription) kuvaa laskurivit tuoteryhmittäin koottuina ja käytön SKU:n sekä yritys- tai kustannuspaikkatunnuksen mukaan eriteltynä. Azure näyttää sisäiset tunnukset, joiden kohdistaminen voi olla vaikeaa. Azure-laskun GitHub-tuotteet ovat MACC-kelpoisia, mutta tämä ei vahvista yksityiskohtaisempaa kulutusskeemaa.

<a id="worked-example-two-subscriptions-one-enterprise"></a>

## Esimerkki: kaksi tilausta, yksi yritys

**Hypoteettinen järjestely:** Yritys yhdistää keskitetyn Azure-tilauksensa, kun taas yksi kustannuspaikka yhdistää eri tilauksen. GitHub tukee eri kustannuspaikkojen yhdistämistä eri Azure-tilauksiin. Analyytikko tunnistaa ensin, mikä tilaus maksaa tutkittavan laajuuden.

Sen jälkeen hän yhdistää Azuren yrityksen tai kustannuspaikan sisäisen tunnuksen ja SKU:n ylläpidettyyn omistajuuskarttaan. Hän tarkistaa raportointijakson ja huomioi dokumentoidun päivittäisen siirron ja seuraavan kuukauden laskun ajoituksen. Hän ei odota Azure-rivin yksilöivän tietyn henkilön mallinkäyttöä.

Kun taloushallinto kysyy, mitkä käyttäjät tai mallit aiheuttivat AI-krediittien kulutuksen, analyytikko palaa GitHubin AI-käyttöraporttiin. Azure-näkymä vastaa laskutusreittiä koskevaan kysymykseen; GitHubin raportti tarjoaa dokumentoidun käyttäjä- ja mallikohtaisen erittelyn. Nämä ovat toisiaan täydentäviä näkymiä, eivät keskenään vaihdettavia rivijoukkoja.

<a id="where-finops-hubs-might-help"></a>

## Missä FinOps hubs voisi auttaa

[FinOps hubs](https://microsoft.github.io/finops-toolkit/hubs) on Azuressa isännöityä FOCUS-pohjaista kustannusanalytiikkaa, jossa on Fabric-, Data Explorer- ja Power BI -raportointia, usean tilauksen ja pilven yhdistelyä sekä **”Bring your own data”** -laajennettavuus. Siitä aiheutuu käyttöönotto- ja jatkuvia käyttökustannuksia.

Tarkasteltu sivu **ei dokumentoi GitHub-kohtaista AI-krediittiliitintä**. **Oppaan neuvo:** käsittele GitHub-tuontia mukautettuna integraatiotyönä. Määritä ennen sen rakentamista lähde, muunnos, omistajuuden kohdistus, päivitysväli ja täsmäytys GitHub-laskutukseen. Yhdelle pientä vientiä käsittelevälle analyytikolle hallittu laskentataulukko voi vastata kysymykseen ilman uutta alustaa.
