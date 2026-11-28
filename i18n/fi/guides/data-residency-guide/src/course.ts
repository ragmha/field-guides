export const parts = [
  { title: 'Miksi suvereniteetti', pages: ['why-sovereignty', 'residency-vs-sovereignty'] },
  { title: 'Alusta', pages: ['ghe-com'] },
  { title: 'Tietosi', pages: ['data-map'] },
  { title: 'Identiteetti ja käyttöoikeudet', pages: ['identity'] },
  { title: 'Tietoturva ja varmistus', pages: ['security'] },
  { title: 'Copilot', pages: ['copilot'] },
  { title: 'Sopimukset ja DPA', pages: ['dpa'] },
  { title: 'EU-sääntely', pages: ['regulations'] },
  { title: 'Migraatio', pages: ['migrate'] },
  { title: 'Ylläpito ja palvelusta poistuminen', pages: ['readiness', 'faq'] },
];

export const chapters = parts.flatMap((part, partIndex) => part.pages.map((id, index) => ({
  id, kind: 'lesson', part: partIndex + 1, partTitle: part.title,
  number: `${partIndex + 1}.${index + 1}`,
  path: `part-${partIndex + 1}/${index + 1}-${id}`,
})));

export function coursePath(id: string) {
  if (id === 'start') return '';
  if (id === 'sources') return 'sources';
  if (id === 'glossary') return 'glossary';
  const chapter = chapters.find(entry => entry.id === id);
  if (!chapter) throw new Error(`Unknown course page: ${id}`);
  return chapter.path;
}
