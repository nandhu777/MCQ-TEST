// src/components/ConfirmDialog.jsx
import React, { useEffect, useRef } from "react";

export default function ConfirmDialog({
  title = "Are you sure?",
  message = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // focus + esc handling + prevent background scroll
  useEffect(() => {
    // focus the confirm button for quick keyboard action
    confirmBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onCancel, onConfirm]);

  return (
    <div
      style={overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      onClick={onCancel} // click backdrop = cancel
    >
      <div
        ref={dialogRef}
        style={sheet}
        onClick={(e) => e.stopPropagation()} // don’t close when clicking inside
      >
        <h3 id="confirm-title" style={titleStyle}>
          {title}
        </h3>
        {message ? (
          <p id="confirm-message" style={messageStyle}>
            {message}
          </p>
        ) : null}

        <div style={actions}>
          <button type="button" onClick={onCancel} style={btnLight}>
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmBtnRef}
            onClick={onConfirm}
            style={btnDanger}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- inline styles (keep it self-contained) ---------- */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.35)", // slate-900/35
  display: "grid",
  placeItems: "center",
  zIndex: 1000,
  padding: 16,
};

const sheet = {
  width: 460,
  maxWidth: "100%",
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid #e2e8f0",
  boxShadow: "0 24px 64px rgba(0,0,0,.2)",
  padding: 18,
};

const titleStyle = {
  margin: 0,
  fontSize: 18,
  color: "#111827",
  fontWeight: 800,
};

const messageStyle = {
  margin: "8px 0 0 0",
  color: "#475569",
  lineHeight: 1.5,
};

const actions = {
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
  marginTop: 14,
};

const btnBase = {
  borderRadius: 10,
  padding: "8px 12px",
  cursor: "pointer",
  fontWeight: 600,
};

const btnLight = {
  ...btnBase,
  background: "#ffffff",
  color: "#334155",
  border: "1px solid #cbd5e1",
};

const btnDanger = {
  ...btnBase,
  background: "#b91c1c",
  color: "#ffffff",
  border: "1px solid #991b1b",
};
