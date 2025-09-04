import React from "react";
import { styles } from "../styles/theme";

export default function Home({ loading, onStart }) {
  return (
    <div style={styles.centerBox}>
      <button style={styles.primary} onClick={onStart} disabled={loading}>
        {loading ? "Loading…" : "Start"}
      </button>
      <p style={styles.hint}>
        Questions are curated by the owner. Click Start when ready.
      </p>
    </div>
  );
}
