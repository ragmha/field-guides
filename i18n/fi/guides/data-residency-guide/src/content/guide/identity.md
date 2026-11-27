---
title: Hallitse identiteettiä ja käyttöoikeuksia
section: Identiteetti ja käyttöoikeudet
order: 5
description: Yhdistä identiteetintarjoaja, provisioi hallitut käyttäjät ja tee käyttöoikeuspäätökset ennen kehittäjien saapumista.
verified: "2026-11-13"
diagram: identity-sequence
additionalDiagrams:
  - identity-controls
  - developer-endpoints
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom
---

<a id="what-you-will-learn"></a>
## Mitä opit

- Erottamaan yrityksen hallinnoimat tilit henkilökohtaisista GitHub-tileistä.
- Suunnittelemaan identiteettien provisioinnin, tunnistautumisen ja käyttöoikeuksien hallinnan.
- Testaamaan kehittäjän yhteyden laitteelta yritysympäristöön.

<a id="identity-belongs-to-your-organisation"></a>
## Identiteetit kuuluvat organisaatiollesi

GHE.com käyttää [Enterprise Managed Users -käyttäjiä](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users). Identiteetintarjoajasi provisioi hallitut tilit SCIMillä ja hallitsee niiden käyttöoikeuksia. Nämä tilit ovat erillisiä henkilökohtaisista github.com-tileistä; julkisiin projekteihin osallistuvat kehittäjät tarvitsevat erillisen tilin.

GitHub suosittelee OIDC:tä Microsoft Entra ID:n kanssa; tuetut vaihtoehdot ja käyttöönoton vaatimukset löytyvät [aloitusohjeista](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud). Varmista IdP:n määritykset ja provisiointipolku kokeilun aikana.

<a id="define-the-boundaries"></a>
## Määritä rajat

**Guide advice (oppaan suositus):** nimeä yrityksen omistajia harkiten, päätä, mitkä tiimit voivat hallinnoida organisaatioita, ja sovella IdP:n kirjautumis- ja ehdollisen käytön käytäntöjä. Testaa käyttäjien käyttöönotto, käyttöoikeuksien muutokset ja käytöstä poistaminen edustavilla käyttäjillä. Ylläpidä hätäkäyttömenettelyä, nimeä sille omistaja ja testaa se ennen tuotantokäyttöä.

Tarkista verkkorajoitukset ja IP-sallittujen luettelot verkkotiimisi kanssa. GitHub julkaisee asiaankuuluvat [isäntänimet ja verkkotiedot](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom); älä oleta, että github.comin päätepisteet toimivat muuttumattomina.

<a id="developer-endpoints-and-tokens"></a>
## Kehittäjien päätepisteet ja tunnukset

Kehittäjät tunnistautuvat osoitteeseen `SUBDOMAIN.ghe.com`; API-asiakkaat käyttävät osoitetta `api.SUBDOMAIN.ghe.com`. Tarkista jokainen IDE, Git-asiakasohjelma ja automaatio yrityksen isäntänimeä vasten. **Guide advice (oppaan suositus):** kartoita tunnukset ja tunnistetiedot, tallenna automaation salaisuudet hallittuun säilöön, sovella vähimpien oikeuksien periaatetta ja kierrätä tunnistetietoja tietoturvakäytäntösi mukaisesti.

<a id="worked-example-leaving-the-company"></a>
## Esimerkki: työntekijän lähtö yrityksestä

**Hypothetical scenario (hypoteettinen tilanne):** Työntekijä lähtee yrityksestä. Identiteettitiimi poistaa käyttöoikeuden IdP:ssä, minkä jälkeen alustatiimi tarkistaa, ettei hallitulla tilillä voi enää kirjautua, että omistajuudet on siirretty ja ettei automaatio ole riippuvainen lähtevän työntekijän tunnistetiedoista.
