import React from "react";
import { styles } from "../styles/theme";

export default function ModulesPage({ modules, banks, onOpenModule }) {
  return (
    <div style={{ maxWidth: 1200, width: "100%" }}>
      <h2 style={styles.section}>Choose a module</h2>
      <div style={styles.modGrid}>
        {modules.map((m) => (
          <div key={m.id} style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <strong style={{ color: "#1e293b" }}>{m.name}</strong>
              <span style={styles.muted}>
                {(banks[m.id] || []).length} questions
              </span>
            </div>
            {(banks[m.id] || []).length === 0 ? (
              <div style={{ marginTop: 8, color: "#b45309" }}>No questions</div>
            ) : (
              <div style={{ marginTop: 8, fontSize: 14, color: "#475569" }}>
                Time limit: 2h • Questions: 100
              </div>
            )}
            <div style={{ marginTop: 12 }}>
              <button
                style={styles.secondary}
                onClick={() => onOpenModule(m.id)}
                disabled={(banks[m.id] || []).length === 0}
              >
                Begin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
