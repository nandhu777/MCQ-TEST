import React, { useMemo } from "react";
import { styles } from "../styles/theme";

export default function QuestionPalette({
  total,
  answers,
  currentIdx,
  onJump,
}) {
  const { answered, unanswered } = useMemo(() => {
    const a = answers.filter((v) => v !== undefined).length;
    return { answered: a, unanswered: total - a };
  }, [answers, total]);

  return (
    <div style={styles.paletteBox}>
      <div style={styles.paletteHead}>
        <strong style={{ color: "#1e293b" }}>Question Palette</strong>
        <div style={styles.legendRow}>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: "#8aa17d" }} />{" "}
            Answered
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: "#e2e8f0" }} />{" "}
            Unanswered
          </span>
        </div>
        <div style={styles.countRow}>
          <span>
            <b>{answered}</b> answered
          </span>
          <span>•</span>
          <span>
            <b>{unanswered}</b> unanswered
          </span>
        </div>
      </div>

      <div style={styles.paletteGrid} role="list">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answers[i] !== undefined;
          const isCurrent = i === currentIdx;
          return (
            <button
              key={i}
              type="button"
              role="listitem"
              aria-label={`Go to question ${i + 1}`}
              onClick={() => onJump(i)}
              style={{
                ...styles.paletteBtn,
                ...(isAnswered ? styles.paletteBtnAnswered : {}),
                ...(isCurrent ? styles.paletteBtnCurrent : {}),
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
