import React, { useRef } from "react";
import { styles } from "../styles/theme";
import Stat from "../components/Stat";
import { pct } from "../utils/Stats";
import { Downloadcsv } from "../utils/downCSV";
import { downloadPdf } from "../utils/Downloadpdf";

export default function ResultsPage({
  active,
  answers,
  stats,
  onReattempt,
  onBack,
}) {
  const moduleTitle = active.moduleId;
  const printRef = useRef(null);

  const filename = `results_${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[:T]/g, "-")}.pdf`;

  return (
    <div style={{ maxWidth: 1100, width: "100%" }}>
      <h2 style={styles.section}>{moduleTitle} — Results</h2>

      <div style={styles.statsGrid}>
        <Stat label="Score" value={`${stats.correct}/${stats.total}`} />
        <Stat label="Percent" value={`${pct(stats.correct, stats.total)}`} />
        <Stat label="Wrong" value={String(stats.wrong)} />
        <Stat label="Skipped" value={String(stats.skipped)} />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          style={styles.secondary}
          onClick={() => Downloadcsv(active.questions, answers)}
        >
          Download CSV report
        </button>

        <button
          style={styles.secondary}
          type="button"
          onClick={() => downloadPdf(printRef.current, filename)}
        >
          Download PDF
        </button>

        <button style={styles.primaryOutline} onClick={onReattempt}>
          Re-attempt
        </button>
        <button style={styles.btn} onClick={onBack}>
          Back to Modules
        </button>
      </div>

      {/* PRINT WRAPPER */}
      <div
        id="results-printable"
        ref={printRef}
        className="pdf-container"
        style={{ marginTop: 18 }}
      >
        {active.questions.map((q, i) => {
          const your = answers[i];
          const ok = your === q.answerIndex;
          const state =
            your === undefined ? "skipped" : ok ? "correct" : "wrong";

          // Stronger, clearer colors
          const palette = {
            correct: { borderColor: "#16a34a", background: "#dcfce7" }, // bright green
            wrong: { borderColor: "#ef4444", background: "#fee2e2" }, // bright red
            skipped: { borderColor: "#94a3b8", background: "#f3f4f6" }, // cool gray
          };

          return (
            <div
              key={q.id}
              className={`pdf-card ${state}`}
              style={{
                ...styles.review,
                ...palette[state],
                // help pdf avoid splitting a card
                breakInside: "avoid",
                pageBreakInside: "avoid",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <strong style={{ color: "#111827" }}>
                  Q{i + 1}. {q.question}
                </strong>
                <span style={{ fontSize: 12 }}>
                  {ok ? "✓" : your === undefined ? "•" : "×"}
                </span>
              </div>

              <div style={styles.meta}>
                <em>Your:</em> {your !== undefined ? q.options[your] : "—"} •{" "}
                <em>Correct:</em> {q.options[q.answerIndex]}
              </div>

              {q.explanation && (
                <div style={{ marginTop: 4 }}>
                  <em>Why:</em> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
