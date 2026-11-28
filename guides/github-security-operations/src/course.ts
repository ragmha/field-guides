export const parts = [
  { title: 'The operating model', pages: ['operating-model', 'route'] },
  { title: 'Coverage before findings', pages: ['coverage'] },
  { title: 'Triage and priority', pages: ['triage'] },
  { title: 'Secret scanning response', pages: ['secrets'] },
  { title: 'Code scanning response', pages: ['code'] },
  { title: 'Dependency response', pages: ['dependencies'] },
  { title: 'Exceptions and evidence', pages: ['exceptions', 'audit'] },
  { title: 'Measure and improve', pages: ['measure', 'weekly-review'] },
];

export function chapterNumber(part: number, section: number, sectionCount: number) {
  return sectionCount === 1 ? `Part ${part}:` : `${part}.${section}`;
}

export const chapters = parts.flatMap((part, partIndex) => part.pages.map((id, index) => ({
  id, kind: 'lesson', part: partIndex + 1, partTitle: part.title,
  number: chapterNumber(partIndex + 1, index + 1, part.pages.length),
  path: `part-${partIndex + 1}/${index + 1}-${id}`,
})));

export function coursePath(id: string) {
  if (id === 'start') return '';
  if (id === 'sources') return 'sources';
  const chapter = chapters.find(entry => entry.id === id);
  if (!chapter) throw new Error(`Unknown course page: ${id}`);
  return chapter.path;
}
