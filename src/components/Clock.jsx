import React from "react";
import { styles } from "../styles/theme";
export default function Clock({ now }) {
  const d = new Date(now);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return (
    <div style={styles.clock}>
      {hh}:{mm}:{ss}
    </div>
  );
}
