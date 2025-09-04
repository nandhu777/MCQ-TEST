import React, { useState, useEffect } from "react";
import { styles } from "../styles/theme";
import ConfirmDialog from "../components/ConfirmDialog";
import Timer from "../components/Timer";
import QuestionPalette from "../components/QuestionPalette";

function useMedia(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);
  return matches;
}

export default function TestPage({
  active,
  idx,
  setIdx,
  answers,
  choose,
  onSubmit,
  moduleName,
  onBack,
  timerMs,
  onExit,
}) {
  const [askExit, setAskExit] = useState(false);
  const isMobile = useMedia("(max-width: 900px)");

  const Main = (
    <section style={{ flex: 1, minWidth: 0 }}>
      <div style={styles.titleRow}>
        <h2 style={styles.moduleName}>{moduleName}</h2>
        {timerMs != null && (
          <span style={styles.timerPill}>
            <Timer ms={timerMs} />
          </span>
        )}
      </div>

      {active.questions.length === 0 ? (
        <div style={styles.empty}>No questions</div>
      ) : (
        <div>
          <div style={styles.meta}>
            Question {idx + 1} / {active.questions.length}
          </div>

          <div style={styles.qCard}>
            <p style={styles.q}>{active.questions[idx].question}</p>
            <div style={{ display: "grid", gap: 12 }}>
              {active.questions[idx].options.map((opt, i) => (
                <label
                  key={i}
                  style={{
                    ...styles.opt,
                    ...(answers[idx] === i ? styles.optActive : {}),
                  }}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    checked={answers[idx] === i}
                    onChange={() => choose(i)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={styles.navRow}>
            <button
              style={styles.btn}
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
            >
              Prev
            </button>
            <button
              style={styles.btn}
              onClick={() =>
                setIdx((v) => Math.min(active.questions.length - 1, v + 1))
              }
            >
              Next
            </button>
            <button style={styles.success} onClick={onSubmit}>
              Submit
            </button>
            <button
              style={styles.dangerOutline}
              onClick={() => setAskExit(true)}
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </section>
  );

  const Palette = (
    <aside
      style={{
        ...styles.sidebar,
        ...(isMobile ? { position: "static", marginTop: 12 } : null),
      }}
    >
      <QuestionPalette
        total={active.questions.length}
        answers={answers}
        currentIdx={idx}
        onJump={setIdx}
      />
    </aside>
  );

  return (
    <div style={{ maxWidth: 1100, width: "100%" }}>
      {isMobile ? (
        <>
          {Main}
          {Palette} {/* palette AFTER questions on mobile */}
        </>
      ) : (
        <div style={styles.testWrap}>
          {Palette} {/* left on desktop */}
          {Main}
        </div>
      )}

      {askExit && (
        <ConfirmDialog
          title="Exit the test?"
          message="Your current answers will be lost. Are you sure you want to leave this test?"
          confirmLabel="Leave test"
          cancelLabel="Stay"
          onConfirm={() => {
            setAskExit(false);
            onExit && onExit();
          }}
          onCancel={() => setAskExit(false)}
        />
      )}
    </div>
  );
}
