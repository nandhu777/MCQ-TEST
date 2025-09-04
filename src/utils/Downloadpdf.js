// src/utils/Downloadpdf.js

// Load jsPDF at runtime (no npm install required). If you do install it,
// replace loadJsPDF() with:  import { jsPDF } from "jspdf";
async function loadJsPDF() {
  const urls = [
    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.es.min.js",
    "https://esm.run/jspdf@2.5.1",
    "https://cdn.skypack.dev/jspdf@2.5.1",
  ];
  for (const url of urls) {
    try {
      // eslint-disable-next-line
      const mod = await import(/* @vite-ignore */ url);
      const J = mod?.jsPDF || mod?.default?.jsPDF;
      if (J) return J;
    } catch {}
  }
  throw new Error("Failed to load jsPDF");
}

/**
 * Downloadpdf(questions, answers, opts?)
 *  - questions: same shape you used for CSV (question, options[], answerIndex, explanation?)
 *  - answers:   array of selected option index or undefined
 *  - opts.title: optional string shown at top of PDF
 *  - opts.filePrefix: filename prefix (default "report")
 */
export async function Downloadpdf(questions, answers, opts = {}) {
  const jsPDF = await loadJsPDF();

  const title = opts.title ?? "Results";
  const filePrefix = opts.filePrefix ?? "report";

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 42;
  let y = margin;

  const addPageIfNeeded = (more = 140) => {
    if (y + more > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const stamp = () =>
    new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  const clean = (s) => String(s ?? "").replace(/\s+/g, " ");

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, margin, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Exported: ${new Date().toLocaleString()}`, margin, y);
  doc.setTextColor(0);
  y += 16;

  // Items
  questions.forEach((q, i) => {
    const yourIdx = answers[i];
    const your = yourIdx !== undefined ? q.options[yourIdx] : "—";
    const correct = q.options[q.answerIndex];
    const ok = yourIdx === q.answerIndex;
    const skipped = yourIdx === undefined;

    const boxW = pageW - margin * 2;

    // Estimate height & page break
    const head = doc.splitTextToSize(
      `Q${i + 1}. ${clean(q.question)}`,
      boxW - 20
    );
    const meta = doc.splitTextToSize(
      `Your: ${clean(your)}    •    Correct: ${clean(correct)}`,
      boxW - 20
    );
    const why = q.explanation
      ? doc.splitTextToSize(`Why: ${clean(q.explanation)}`, boxW - 20)
      : null;
    const needed =
      20 +
      head.length * 14 +
      10 +
      meta.length * 12 +
      (why ? why.length * 12 + 8 : 0);
    addPageIfNeeded(needed + 16);

    // Card background tint/border
    if (ok) doc.setFillColor(240, 253, 244); // green-50
    else if (skipped) doc.setFillColor(255, 251, 235); // amber-50
    else doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(
      ok ? 77 : skipped ? 180 : 185,
      ok ? 124 : skipped ? 83 : 28,
      ok ? 15 : skipped ? 9 : 28
    );

    doc.roundedRect(margin, y, boxW, needed, 10, 10, "S");
    y += 16;

    // Title + mark
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(head, margin + 10, y);
    doc.setFontSize(12);
    doc.setTextColor(ok ? 34 : skipped ? 180 : 185);
    doc.text(ok ? "✓" : "×", margin + boxW - 14, y);
    doc.setTextColor(0);
    y += head.length * 14 + 6;

    // Meta
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(meta, margin + 10, y);
    y += meta.length * 12 + 4;

    // Why
    if (why) {
      doc.setTextColor(0);
      doc.text(why, margin + 10, y);
      y += why.length * 12 + 4;
    }

    y += 6; // bottom padding inside card
  });

  // Save
  doc.save(`${filePrefix}_${stamp()}.pdf`);
}
