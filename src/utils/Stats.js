export function computeStats(questions, answers) {
  let correct = 0,
    wrong = 0,
    skipped = 0;
  questions.forEach((q, i) => {
    const a = answers[i];
    if (a === undefined) skipped++;
    else if (a === q.answerIndex) correct++;
    else wrong++;
  });
  return { correct, wrong, skipped, total: questions.length };
}
export const pct = (a, b) => `${((a / Math.max(1, b)) * 100).toFixed(1)}%`;
export const moduleName = (id, list) =>
  list.find((m) => m.id === id)?.name || id;
