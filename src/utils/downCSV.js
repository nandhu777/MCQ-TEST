export function Downloadcsv(questions, answers) {
  const header = [
    "#",
    "Question",
    "Your Answer",
    "Correct Answer",
    "Correct?",
    "Explanation",
  ];
  const esc = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
  const rows = questions.map((q, i) => {
    const ya = answers[i] !== undefined ? q.options[answers[i]] : "";
    const ca = q.options[q.answerIndex];
    const ok = answers[i] === q.answerIndex ? "YES" : "NO";
    return [i + 1, q.question, ya, ca, ok, q.explanation || ""];
  });
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `report_${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[:T]/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
