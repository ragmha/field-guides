---
title: Yhteenveto
section: Käsitteet
order: 104
description: Kokoa rahoitusmalli ja toisistaan riippumattomat budjettirajoitukset yhteen ennen suunnittelua.
verified: "2026-11-10"
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
---

Tässä osassa erotettiin krediittien lähde niiden käyttöä koskevista rajoituksista. Copilot Business- ja Enterprise-lisenssit kasvattavat yhteistä sisältyvien krediittien varantoa. Sen loputtua lisäkäyttö laskutetaan mittariperusteisesti, jos käytäntö sallii sen ja sovellettavissa pakottavissa rajoissa on tilaa. Copilot access ei sisällä krediittivarantoa.

Keksipurkki havainnollisti toista rajoitetta: yhteinen varanto ei ohita henkilökohtaista rajaa. Sovellettava käyttäjätason budjetti laskee yhteen sisältyvän ja mittariperusteisen kulutuksen ja pysäyttää käytön aina rajan täyttyessä. Organisaation tai yrityksen mittariperusteinen budjetti ei voi täydentää loppuun käytettyä ULB:tä.

Lisäksi erotimme tiukan taloudellisen katon jatkuvuutta painottavasta seurannasta. Mittariperusteinen kynnysarvo, jonka pakottava pysäytys on poistettu käytöstä, voi lähettää ilmoituksia maksujen jatkuessa. Ilmoitus tai ennuste ei ole lupa käyttää rahaa.

<a id="key-takeaways"></a>

## Keskeiset opit

- Sisältyvät krediitit ovat yhteisiä; niitä ei ole varattu käyttäjäpaikkakohtaisiin lompakoihin.
- ULB rajoittaa yhden henkilön krediittien kokonaiskulutusta, myös sisältyvää käyttöä.
- Mittariperusteiset budjetit ohjaavat lisämaksuja, eivät sisältyvää varantoa tai lisenssimaksuja.
- Pelkkiä ilmoituksia lähettävä kynnysarvo ei ole menokatto eikä hyväksyntä kuluille.
- Agenttityökuormat voivat kuluttaa Actions-minuutteja AI-krediittien lisäksi; AI-krediittien katto ei rajoita molempia.

Osassa 2 sovellat tätä mallia yrityksen tarpeiden tunnistamiseen ja vastuullisen päätöksen kirjaamiseen ennen budjettisummien valintaa.
