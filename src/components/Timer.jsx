import React from "react";
import { styles } from "../styles/theme";
export default function Timer({ ms }) {
  if (ms == null) return null;
  const h = Math.floor(ms / 3_600_000),
    m = Math.floor((ms % 3_600_000) / 60_000),
    s = Math.floor((ms % 60_000) / 1_000);
  const danger = ms <= 60_000;
  return (
    <div style={{ ...styles.timer, color: danger ? "#b91c1c" : "#334155" }}>
      ⏱ {h}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </div>
  );
}
