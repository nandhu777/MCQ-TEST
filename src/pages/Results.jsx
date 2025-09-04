import React from "react";
import { styles } from "../styles/theme";
import Stat from "../components/Stat";
import { pct } from "../utils/Stats";
import { Downloadcsv } from "../utils/downCSV";
import { Downloadpdf } from "../utils/Downloadpdf";

export default function ResultsPage({
  active,
  answers,
  stats,
  onReattempt,
  onBack,
}) {
  const moduleTitle = active.moduleId;
  return (
    <div style={{ maxWidth: 1100, width: "100%" }}>
      <h2 style={styles.section}>{active.moduleId} — Results</h2>
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
          onClick={() =>
            Downloadpdf(active.questions, answers, {
              title: `${moduleTitle} — Results`,
              filePrefix: "results",
            })
          }
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

      <div style={{ marginTop: 18 }}>
        {active.questions.map((q, i) => {
          const your = answers[i];
          const ok = your === q.answerIndex;
          return (
            <div
              key={q.id}
              style={{
                ...styles.review,
                borderColor: ok
                  ? "#4d7c0f"
                  : your === undefined
                  ? "#b45309"
                  : "#b91c1c",
                background: ok
                  ? "#f0fdf4"
                  : your === undefined
                  ? "#fffbeb"
                  : "#fef2f2",
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
                <span style={{ fontSize: 12 }}>{ok ? "✓" : "×"}</span>
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
