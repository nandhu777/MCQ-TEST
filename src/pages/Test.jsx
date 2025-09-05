// src/pages/Test.jsx
import React, { useState } from "react";
import { styles } from "../styles/theme";
import ConfirmDialog from "../components/ConfirmDialog";
import Timer from "../components/Timer";
import QuestionPalette from "../components/QuestionPalette";

export default function TestPage({
  active,
  idx,
  setIdx,
  answers,
  choose,
  onSubmit,
  moduleName,
  timerMs,
  onExit,
}) {
  const [askExit, setAskExit] = useState(false);

  return (
    <div style={{ maxWidth: 1200, width: "100%" }}>
      <div style={styles.testWrap}></div>
      <div
        className="twoColTest"
        style={{
          display: "grid",
          gridTemplateColumns: "360px minmax(0,1fr)", // palette | question
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* LEFT: palette */}
        <aside style={styles.sidebar}>
          <aside className="pane-left">
            <div style={styles.titleRow}>
              <h2 style={styles.moduleName}>{moduleName}</h2>
              {timerMs != null && (
                <span style={styles.timerPill}>
                  <Timer ms={timerMs} />
                </span>
              )}
            </div>
          </aside>

          <QuestionPalette
            total={active.questions.length}
            answers={answers}
            currentIdx={idx}
            onJump={setIdx}
          />
        </aside>

        {/* RIGHT: question */}
        <section style={{ flex: 1, minWidth: 0 }}>
          <section className="pane-right">
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
          </section>
        </section>
      </div>

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
