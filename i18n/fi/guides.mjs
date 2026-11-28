import { guides as englishGuides, platformReferences } from './guides.en.mjs';

const translations = new Map([
  ['ai-credits-guide', {
    title: 'AI Credits',
    description: 'AI-krediittien budjetointi yrityksessä tiimeille ja alustan ylläpitäjille',
  }],
  ['data-residency-guide', {
    title: 'EU-datan sijainti',
    description: 'Riippumatonta, lähteisiin perustuvaa ohjeistusta GitHub Enterprise Cloudin käyttöönottoon EU-datasijainnilla (GHE.com): suvereniteetti, Copilot, DPA ja EU-lainsäädäntö.',
  }],
  ['copilot-governance-guide', {
    title: 'Copilot-hallinta',
    description: 'Lähteisiin perustuva kurssi GitHub Copilotin hallinnasta yritysmittakaavassa',
  }],
  ['champions-at-scale', {
    title: 'Champions-ohjelmat laajasti',
    description: 'Riippumatonta, interaktiivista ohjeistusta kestävien champion-ohjelmien rakentamiseen yrityksissä vuonna 2026 ja sen jälkeen.',
  }],
  ['github-enterprise-field-guide', {
    title: 'GitHub Enterprise',
    description: 'Mobiililähtöistä ohjeistusta GitHub Enterprise -palvelun suunnitteluun: käyttöönottovaihtoehdot, identiteetti, roolit, lisensointi ja auditointi.',
  }],
]);

export const guides = englishGuides.map(guide => ({ ...guide, ...translations.get(guide.name) }));
export { platformReferences };
