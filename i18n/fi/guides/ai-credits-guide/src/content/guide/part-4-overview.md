---
title: Yleiskatsaus
section: Tiedon visualisointi
order: 401
description: Valitse laskutus-, käyttöönotto- tai asiakastelemetria sen mukaan, mihin kysymykseen näkymän on vastattava.
verified: "2026-11-12"
diagram: visualisation-map
sources:
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
---

Hyödyllinen koontinäyttö alkaa kysymyksestä, ei työkalusta. Käytä menojen selittämiseen GitHubin laskutustietoja. Käytä Copilot-käyttömittareita käyttöönoton ja aktiivisuuden ymmärtämiseen. Agentin vuorovaikutuksen selvittämiseen käytä telemetriaa niistä asiakkaista, joihin olet lisännyt seurannan. Kaikkien kolmen sijoittaminen samalle näytölle ei tee niistä keskenään vaihdettavia.

<a id="what-you-will-learn"></a>

## Mitä opit

- Käyttämään GitHubin sisäisiä näkymiä ennen uuden raportointiputken rakentamista.
- Muuntamaan CSV- tai REST-laskutustiedot täsmäytetyksi laskentataulukoksi, BI-raportiksi tai paikalliseksi Grafana-näkymäksi.
- Päättämään, soveltuvatko Azure-kustannustyökalut laskutusjärjestelyysi.
- Pitämään vianmääritystelemetrian erillään taloudellisesta luvusta.

<a id="read-the-picture"></a>

## Kuvan tulkinta

Seuraa yhtä riviä lähteestä näkymään ja kysymykseen. Laskutusrivi voi tuottaa tietoa GitHubiin, BI:hin tai paikalliseen Grafanaan, mutta työkalu ei muuta taustalla olevien tietueiden merkitystä. Käyttöönottorivi vastaa siihen, ketkä käyttävät Copilotia. Asiakastelemetriarivi auttaa selittämään tokenien käyttöä, viivettä ja työkalujen suoritusta vain siellä, missä seuranta on havainnut niitä.

Esimerkiksi kysymys ”Mikä malli aiheutti tämän kuukauden maksut?” tarvitsee laskutusnäyttöä. ”Miksi tämä agentti oli hidas?” tarvitsee jäljitystietoja tai suorituskykymittareita. Token-histogrammi ei vastaa ensimmäiseen kysymykseen eikä lasku selitä toista.

Seuraavat luvut alkavat sisäisistä analyysinäkymistä ja käsittelevät sitten vientiin perustuvaa raportointia, ehdollista Azure-kustannusanalyysiä ja paikallista Grafana-suunnitelmaa. Kurssi ei asenna koontinäyttöpalvelua.
