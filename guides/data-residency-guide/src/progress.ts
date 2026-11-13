export function scoreQuiz(answers: (string | undefined)[], correct: string[]) {
  return answers.filter((answer, index) => answer === correct[index]).length;
}

export function canOpenChapter(ids: string[], passed: string[], index: number) {
  return ids.slice(0, index).every(id => passed.includes(id));
}
