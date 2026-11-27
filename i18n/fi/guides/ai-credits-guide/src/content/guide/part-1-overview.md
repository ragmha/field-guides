---
title: Yleiskatsaus
section: Käsitteet
order: 101
description: Aloita tutustumalla yhteisten krediittien, henkilökohtaisen kulutuksen ja lisämenojen eroihin.
verified: "2026-11-10"
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms
---

AI-krediittibudjettia on helpompi hahmottaa, kun erotat kolme kysymystä: mistä käyttö rahoitetaan, kuinka paljon yksi henkilö saa kuluttaa ja kuinka paljon lisämenoja sallitaan? Tässä osassa rakennat tämän ajattelumallin ennen asetusten valitsemista.

<a id="what-you-will-learn"></a>

## Mitä opit

- Seuraamaan sisältyvien krediittien kulumista mittariperusteiseen vaiheeseen ilman, että pidät jokaista käyttäjäpaikkaa henkilökohtaisena lompakkona.
- Selittämään, miksi käyttäjän käyttö voidaan estää, vaikka yhteisiä krediittejä olisi jäljellä.
- Erottamaan pakottavan menorajan kynnysarvosta, joka vain lähettää ilmoituksia.

Seuraa ensin laskutuksen elinkaarta ja erota AI-krediitit lisenssimaksuista ja Actions-käytöstä. Tarkastele sitten keksipurkkivertauksen ja estetyn käyttäjän esimerkin avulla, miten toisistaan riippumattomat rajoitukset vaikuttavat yhdessä. Yhteenveto kokoaa erot ennen suunnitteluun siirtymistä.

<a id="how-to-read-feature-status"></a>

## Ominaisuuksien tilan tulkinta

**Julkinen esiversio – käytä harkiten** tarkoittaa ominaisuutta, jonka virallinen lähde nimenomaisesti ilmoittaa olevan esiversio. Arvioi tuki, muutosten riski ja yrityksesi esiversioita koskeva käytäntö ennen käyttöä. **Tilaa ei vahvistettu** tarkoittaa, että mainittu lähde dokumentoi ominaisuuden mutta ei määritä sen julkaisuvaihetta; se ei ole väite siitä, että ominaisuus olisi yleisesti saatavilla.

GitHubin [julkaisuvaiheiden määritelmät](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models#considering-different-release-stages) erottavat esiversiot yleisesti saatavilla olevista, tuotantoon suositelluista ominaisuuksista. [Esiversio-ominaisuuksiin osallistumisen käytäntö](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies#opting-in-to-previews-or-feedback) hallitsee esiversioita GitHub.comissa, ei kaikissa Copilot-käyttöympäristöissä. Tutustu sovellettaviin [esiversion lisenssiehtojen](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms) rajoituksiin, mukaan lukien tuotantokäytön ulkopuolista arviointia ja testausta koskevat rajoitukset, ennen esiversion käyttöönottoa; varoitusmerkintä ei ole lupa tuotantokäyttöön.

[Lähde- ja julkaisutilarekisteriin](/sources/) on koottu näyttö, myös ristiriitainen dokumentaatio. Oppaan neuvot ovat ehdotettuja toimintatapoja, eivät väitteitä tuotteen pakottamista rajoituksista tai hankintavaltuuksista.
