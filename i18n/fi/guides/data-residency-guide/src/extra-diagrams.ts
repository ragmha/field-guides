export const extraDiagrams: Record<string, { title: string; description: string; sources?: string[] }> = {
  "copilot-policy-delta": {
    "title": "Mikä muuttuu, kun Copilot-käytäntö otetaan käyttöön",
    "description": "Tämä käsitteellinen vertailu näyttää alueellisen rajoituksen, ei GitHubin sisäistä arkkitehtuuria. Kun käytäntö on pois käytöstä, Copilotin tietoja voidaan käsitellä tai tallentaa alueen ulkopuolella. Kun se on käytössä, tuetut pyynnöt käyttävät alueen vaatimukset täyttäviä malleja.",
    "sources": [
      "https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency",
      "https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/about-storage-of-your-data-with-data-residency"
    ]
  },
  "decision-owners": {
    "title": "Päätösten omistajat",
    "description": "Nimetty käyttöönoton omistaja koordinoi tietosuoja-, tietoturva- ja alustapäätöksiä; kukin tiimi vastaa omasta todistusaineistostaan."
  },
  "environment-choice": {
    "title": "Valitse käyttöönotto",
    "description": "Valitse itse ylläpidetty ratkaisu, kun operatiivista hallintaa tarvitaan; muussa tapauksessa arvioi pilven data-alueen ja ominaisuuksien vaatimukset."
  },
  "feature-availability": {
    "title": "GHE.comin ominaisuuksien saatavuus",
    "description": "Lähteiden tarkistuspäivänä Codespaces oli saatavilla GHE.comissa, mutta julkiset repositoriot ja GitHub Marketplace eivät olleet saatavilla. Tarkista ajantasainen ominaisuuksien yleiskatsaus ennen päätöstä.",
    "sources": [
      "https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency",
      "https://github.blog/changelog/2026-04-01-codespaces-is-now-generally-available-for-github-enterprise-with-data-residency/"
    ]
  },
  "exceptions-flow": {
    "title": "Kartoita lähtevä data",
    "description": "Tuki, integraatiot ja telemetria voivat ylittää alueellisen sijainnin rajan; luokittele kukin kohde ja arvioi asiaankuuluvat tiedonsiirron suojatoimet."
  },
  "data-lifecycle": {
    "title": "Suunnittele tietojen palautus tai poisto",
    "description": "Arvioi soveltuvan DPA:n mukainen palautus- tai poistopyyntö ja mahdolliset soveltuvat poikkeukset; varmista tulos ja säilytä todistusaineisto."
  },
  "identity-controls": {
    "title": "Hallintakeinot täytäntöönpanopisteen mukaan",
    "description": "Suositellut hallintakeinot on ryhmitelty niiden toteuttajan mukaan; niiden ei väitetä olevan oletusarvoisesti käytössä."
  },
  "developer-endpoints": {
    "title": "Kehittäjän yhteyspisteet",
    "description": "Kehittäjät tunnistautuvat yrityksen alitoimialueelle; asiakasohjelmien ja integraatioiden on käytettävä asianmukaisia GHE.comin päätepisteitä."
  },
  "audit-flow": {
    "title": "Auditoinnin todistusaineiston polku",
    "description": "Testaa, että yrityksen auditointitapahtuma saavuttaa asiakkaan valitseman kohteen ja että nimetty omistaja voi tutkia sitä."
  },
  "assurance-evidence": {
    "title": "Varmentava todistusaineisto",
    "description": "Todistusaineistopaketti kokoaa soveltuvan sopimuksen, soveltamisalaltaan rajatut varmennusraportit ja asiakkaan operatiiviset testit."
  },
  "copilot-governance": {
    "title": "Copilotin hallinta",
    "description": "Asiakkaan on päätettävä käytännöistä, mallien käytöstä, tietojen käsittelystä ja valvonnasta; saatavuus ja sopimusehdot on tarkistettava."
  },
  "ip-commitment": {
    "title": "Tarkista immateriaalioikeussitoumus",
    "description": "Ostoreitti määrää, mitkä ehdot on tarkistettava. Lakiasiantuntijoiden tulee tarkistaa soveltuva sopimus, soveltamisala ja poissulut ennen puolustussitoumukseen tukeutumista."
  },
  "contract-stack": {
    "title": "Tunnista sopimuskokonaisuus",
    "description": "Suorissa ostoissa tarkista sopimus ja tuotekohtaiset ehdot yhdessä soveltuvien tietosuoja- ja generatiivisen tekoälyn ehtojen kanssa; Microsoftin kautta ostettaessa sopimusreitti on toinen."
  },
  "government-request": {
    "title": "Viranomaispyyntöjen suojatoimet",
    "description": "DPA kuvaa pyyntöjen ohjaamista asiakkaalle mahdollisuuksien mukaan, ilmoittamista ellei laki sitä kiellä sekä pyyntöjen riitauttamista ehtojensa mukaisesti. Poikkeuksilla ja soveltuvalla lailla on merkitystä."
  },
  "privacy-assessments": {
    "title": "Arvioi tietosuoja ja tiedonsiirrot",
    "description": "Kartoita käsittely, päätä tarvitaanko DPIA, arvioi asiaankuuluvat tiedonsiirrot ja suojatoimet sekä dokumentoi oikeudellinen arviointi."
  },
  "regulation-comparison": {
    "title": "Sääntelyn painopisteet",
    "description": "Lait käsittelevät eri riskejä ja niitä sovelletaan vain, kun niiden soveltamisalan ja soveltuvien kansallisten sääntöjen ehdot täyttyvät. Opas ei ole oikeudellista neuvontaa."
  },
  "importer-flow": {
    "title": "Migraatio GEI:llä",
    "description": "Kartoita ja pilotoi migraatio; varmista tuodut tiedot ja luo uudelleen siirtämättä jäävät kohteet, kuten Actionsin salaisuudet."
  },
  "runner-deployment": {
    "title": "Esimerkki runnerin käyttöönottorajoista",
    "description": "Tässä esimerkissä itse ylläpidetty runner sijaitsee asiakkaan hallitsemalla isännällä yksityisverkossa. Asiakas valitsee sen sijainnin, verkkosäännöt ja mahdolliset työnkulkujen kohteet; GitHubin datan alueellista sijaintia koskeva sitoumus ei kata niitä automaattisesti.",
    "sources": [
      "https://docs.github.com/en/enterprise-cloud@latest/actions/reference/runners/self-hosted-runners",
      "https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom"
    ]
  },
  "cutover-handoff": {
    "title": "Siirtymän vastuunvaihdot",
    "description": "Alustatiimi valmistelee ja siirtää; repositorioiden omistajat varmistavat työkuormansa; liiketoiminnan omistaja hyväksyy siirtymän. Tämä on oppaan suositus."
  },
  "exit-states": {
    "title": "Irtautumisvalmiuden tilat",
    "description": "Testattu vientisuunnitelma etenee suunnittelusta varmistukseen; epäonnistunut testi palauttaa sen suunnitteluun. Sopimuksen mukaiset aikarajat riippuvat soveltuvasta sopimuksesta."
  },
  "support-blueprint": {
    "title": "Tuen vastuunvaihdot",
    "description": "Asiakkaan toimet ja näkyvä vuorovaikutus tuen kanssa ovat näkyvyysrajan yläpuolella. GitHubin sisäistä tukiprosessia ei ole tässä varmennettu."
  },
  "go-no-go": {
    "title": "Jatka tai älä jatka",
    "description": "Oppaan suositus: jatka vain, kun tarvittavat vastuuhenkilöt hyväksyvät näytön ja puutteet; muussa tapauksessa määritä toimenpiteet ja arvioi uudelleen."
  }
};
