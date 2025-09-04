const TREES = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'>
     <g fill='none' stroke='white' stroke-opacity='.22'>
       <path d='M40 360 l20 -80 l20 80'/><path d='M120 360 l20 -70 l20 70'/><path d='M200 360 l20 -85 l20 85'/>
       <path d='M280 360 l20 -75 l20 75'/><path d='M360 360 l20 -90 l20 90'/><path d='M440 360 l20 -70 l20 70'/>
       <path d='M520 360 l20 -85 l20 85'/><path d='M600 360 l20 -78 l20 78'/><path d='M680 360 l20 -92 l20 92'/>
     </g>
   </svg>`
);

export const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    position: "relative",
    overflowX: "hidden",
    background: "#f7f6f3",
    color: "#1f2937",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
  },
  testWrap: {
    display: "grid",
    gridTemplateColumns: "240px 1fr", // was 220px
    gap: 24, // was 16
  },

  // Keep sticky & gently pull the palette slightly toward the page edge
  sidebar: {
    position: "sticky",
    top: 76,
    alignSelf: "start",
    height: "fit-content",
    marginLeft: -8, // nudge left
  },

  // Palette container: max height + internal scroll for long tests
  paletteBox: {
    background: "#ffffffcc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,.04)",
    maxHeight: "calc(100vh - 140px)", // so 100 Q doesn’t push page
    overflow: "auto",
  },

  paletteHead: { display: "grid", gap: 6, marginBottom: 8 },
  legendRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    color: "#64748b",
    fontSize: 12,
  },
  legendItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
    display: "inline-block",
  },
  countRow: { display: "flex", gap: 8, color: "#475569", fontSize: 12 },

  // Exactly 5 columns; rows auto-wrap as needed (works up to 100)
  testWrap: {
    display: "grid",
    gridTemplateColumns: "280px 1fr", // was 220/240px
    gap: 24,
  },

  sidebar: {
    position: "sticky",
    top: 76,
    alignSelf: "start",
    height: "fit-content",
    marginLeft: 0, // no negative nudge now
  },

  // Just a box—no internal scrollbars
  paletteBox: {
    background: "#ffffffcc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,.04)",
    overflow: "visible", // remove auto scroll
  },

  // Exactly 5 columns; fixed cell width so it never overflows
  paletteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 44px)", // 5 fixed columns
    gap: 8,
    justifyContent: "start",
  },

  // Buttons sized to the grid tracks
  paletteBtn: {
    width: 44,
    height: 36,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#334155",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  paletteBtnAnswered: {
    background: "#e8efe7",
    border: "1px solid #8aa17d",
    color: "#1f2937",
  },
  paletteBtnCurrent: {
    outline: "2px solid #8aa17d",
    outlineOffset: 1,
  },

  paletteHead: { display: "grid", gap: 6, marginBottom: 8 },
  legendRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    color: "#64748b",
    fontSize: 12,
  },
  legendItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
    display: "inline-block",
  },
  countRow: { display: "flex", gap: 8, color: "#475569", fontSize: 12 },
  legendRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    color: "#64748b",
    fontSize: 12,
  },
  legendItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
    display: "inline-block",
  },
  countRow: { display: "flex", gap: 8, color: "#475569", fontSize: 12 },

  paletteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 per row; change to 6/8 if you like
    gap: 1,
  },
  paletteBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#334155",
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
  },
  paletteBtnAnswered: {
    background: "#e8efe7",
    border: "1px solid #8aa17d",
    color: "#1f2937",
  },
  paletteBtnCurrent: {
    outline: "2px solid #8aa17d",
    outlineOffset: 1,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "0 0 10px 0",
  },
  moduleName: {
    margin: 0, // important: remove default h2 margin so it sits inline
    color: "#253b2f",
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.2,
  },
  timerPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    marginLeft: 8, // small space to the right of the title
    fontFamily: "ui-monospace, SFMono-Regular",
    fontSize: 14,
    color: "#334155",
    background: "#ffffffcc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,.04)",
  },
  danger: {
    background: "#b91c1c",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  dangerOutline: {
    background: "transparent",
    color: "#7f1d1d",
    border: "1px solid #fecaca",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,.24)",
    display: "grid",
    placeItems: "center",
    zIndex: 50,
  },
  modalCard: {
    width: "min(460px, 92vw)",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,.15)",
    padding: 16,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 28px",
    borderBottom: "1px solid #e2e8f0",
    background: "rgba(247,246,243,.85)",
    backdropFilter: "blur(6px)",
  },
  title: { margin: 0, fontSize: 24, fontWeight: 800, color: "#1e293b" },
  rightBox: { display: "flex", alignItems: "center", gap: 16 },
  clock: {
    fontFamily: "ui-monospace, SFMono-Regular",
    fontSize: 16,
    color: "#475569",
  },
  timer: { fontFamily: "ui-monospace, SFMono-Regular", fontSize: 16 },
  main: { flex: 1, display: "flex", justifyContent: "center", padding: "28px" },
  centerBox: {
    display: "grid",
    gap: 16,
    placeItems: "center",
    textAlign: "center",
  },
  primary: {
    background: "#8aa17d",
    color: "#0b1409",
    border: "none",
    borderRadius: 14,
    padding: "14px 22px",
    fontWeight: 800,
    boxShadow: "0 6px 16px rgba(27,53,33,.12)",
    cursor: "pointer",
  },
  primaryOutline: {
    background: "transparent",
    color: "#2f4f3a",
    border: "2px solid #8aa17d",
    borderRadius: 12,
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondary: {
    background: "#e8efe7",
    color: "#2f4f3a",
    border: "1px solid #cddfd0",
    borderRadius: 12,
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  btn: {
    background: "transparent",
    color: "#374151",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
  },
  success: {
    background: "#1b4332",
    color: "#e7f5e9",
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  hint: { color: "#6b7280", fontSize: 13 },
  section: { margin: "0 0 14px 0", color: "#1f2937" },
  modGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 16,
  },
  card: {
    background: "#ffffffcc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,.04)",
  },
  muted: { color: "#64748b", fontSize: 13 },
  meta: { color: "#64748b", fontSize: 13 },
  moduleName: { margin: "0 0 10px 0", color: "#253b2f" },
  moduleName: { margin: 0, color: "#253b2f" }, // remove bottom margin so the chip sits inline
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "0 0 10px 0",
  },
  timerPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 8px",
    gap: 6,
    fontFamily: "ui-monospace, SFMono-Regular",
    fontSize: 14,
    color: "#334155",
    background: "#ffffffcc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,.04)",
  },
  qCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    boxShadow: "0 6px 16px rgba(0,0,0,.04)",
  },
  q: { fontSize: 18, color: "#0f172a", margin: "0 0 10px" },
  opt: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    border: "1px solid #e5e7eb",
    background: "#fafaf9",
    padding: "10px",
    borderRadius: 12,
    cursor: "pointer",
  },
  optActive: {
    borderColor: "#8aa17d",
    boxShadow: "inset 0 0 0 2px #8aa17d33",
    background: "#f4f7f3",
  },
  navRow: { display: "flex", gap: 10, marginTop: 14 },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: 12,
  },

  stat: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    textAlign: "center",
  },
  statLabel: { color: "#6b7280", fontSize: 12 },
  statValue: { fontSize: 20, fontWeight: 800, color: "#1e293b" },
  review: { border: "1px solid", borderRadius: 12, padding: 12 },
  empty: {
    padding: 12,
    borderRadius: 12,
    background: "#fff7ed",
    color: "#b45309",
    border: "1px solid #fed7aa",
  },
};

export const bgStyles = {
  trees: {
    position: "fixed",
    inset: 0,
    background: `linear-gradient(180deg, #eef2ed 0%, #f7f6f3 40%, #f7f6f3 100%)`,
    maskImage: "linear-gradient(180deg, rgba(0,0,0,.9), rgba(0,0,0,.2))",
    WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,.9), rgba(0,0,0,.2))",
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,${TREES}")`,
    backgroundRepeat: "repeat-x",
    backgroundPosition: "bottom center",
    backgroundSize: "auto 40%",
    runnersLayer: {
      position: "fixed",
      inset: 0,
      zIndex: 2,
      pointerEvents: "none",
    },
  },
  cats: { position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" },
};
// src/styles/theme.js
export const css = `
  /* your existing global CSS (resets, radio accent-color, etc.) */

  /* --- Mobile tweaks for Modules page --- */
  @media (max-width: 900px){
    /* header */
    header{ padding:12px 16px !important; }
    header h1{ font-size:20px !important; }

    /* page title */
    [data-ui="section-title"]{ font-size:18px !important; margin-bottom:10px !important; }

    /* grid: 2 columns on phones */
    .modGrid{
      display:grid; /* safe-guard */
      grid-template-columns: repeat(2, minmax(0,1fr)) !important;
      gap: 12px !important;
    }

    /* cards + text scale down */
    .card{ padding:12px !important; border-radius:12px !important; }
    .card-title{
      font-size:14px !important;
      line-height:1.2 !important;
      word-break: break-word;
    }
    .card-meta, .muted{ font-size:12px !important; }

    /* buttons a touch smaller */
    .btn{ padding:8px 10px !important; font-size:13px !important; border-radius:10px !important; }
  }

  @media (max-width: 560px){
    /* single column on very small phones */
    .modGrid{ grid-template-columns: 1fr !important; }
    header h1{ font-size:18px !important; }
    [data-ui="section-title"]{ font-size:17px !important; }
  }
`;
