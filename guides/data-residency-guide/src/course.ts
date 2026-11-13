export const parts = [
  { title: 'Why sovereignty', pages: ['why-sovereignty', 'residency-vs-sovereignty'] },
  { title: 'The platform', pages: ['ghe-com'] },
  { title: 'Your data', pages: ['data-map'] },
  { title: 'Identity and access', pages: ['identity'] },
  { title: 'Security and assurance', pages: ['security'] },
  { title: 'Copilot', pages: ['copilot'] },
  { title: 'Contracts and DPA', pages: ['dpa'] },
  { title: 'EU regulation', pages: ['regulations'] },
  { title: 'Migration', pages: ['migrate'] },
  { title: 'Operate and exit', pages: ['readiness', 'faq'] },
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
