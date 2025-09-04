import React, { useEffect, useMemo, useState } from "react";
import { MODULES } from "./constants/modules";
import { styles, css } from "./styles/theme";
import BackgroundTrees from "./components/BackgroundTrees";
import CatTrail from "./components/CatTrails";
import Clock from "./components/Clock";
import Timer from "./components/Timer";
import Home from "./pages/Home";
import ModulesPage from "./pages/Modules";
import TestPage from "./pages/Test";
import ResultsPage from "./pages/Results";
import { computeStats } from "./utils/Stat";

export default function App() {
  // simple router: home → modules → test(moduleId) → results
  const [view, setView] = useState({ name: "home" });
  const [banks, setBanks] = useState({}); // { m1:[...], ... }
  const [loading, setLoading] = useState(true);

  // test state
  const [active, setActive] = useState(null); // { moduleId, questions, startedAt, endsAt }
  const [answers, setAnswers] = useState([]);
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // clock/timer
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);

  // load all module JSONs once
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const entries = await Promise.all(
          MODULES.map(async (m) => {
            try {
              const res = await fetch(`/banks/${m.file}`, {
                cache: "no-store",
              });
              if (!res.ok) throw new Error(res.statusText);
              const arr = (await res.json()) || [];
              const normalized = arr
                .filter(
                  (q) =>
                    q &&
                    q.question &&
                    Array.isArray(q.options) &&
                    typeof q.answerIndex === "number"
                )
                .map((q, i) => ({
                  id: q.id ?? `${m.id}-${i + 1}`,
                  module: m.id,
                  ...q,
                }));
              return [m.id, normalized];
            } catch {
              return [m.id, []];
            }
          })
        );
        setBanks(Object.fromEntries(entries));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // navigation actions
  const handleStart = () => setView({ name: "modules" });

  const openModule = (moduleId) => {
    const pool = banks[moduleId] || [];
    const questions = pool.slice(0, 100).map((q, i) => ({ ...q, _num: i + 1 }));
    const startedAt = Date.now();
    const endsAt = startedAt + 120 * 60_000; // 2 hours
    setActive({ moduleId, questions, startedAt, endsAt });
    setAnswers(Array(questions.length).fill(undefined));
    setIdx(0);
    setSubmitted(false);
    setView({ name: "test", moduleId });
  };

  const choose = (i) =>
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = i;
      return next;
    });
  const submit = () => {
    setSubmitted(true);
    setView({ name: "results", moduleId: active.moduleId });
  };

  // auto-submit on timer end
  const remainingMs = active?.endsAt ? Math.max(0, active.endsAt - now) : null;
  useEffect(() => {
    if (view.name === "test" && !submitted && remainingMs === 0) {
      submit();
      setTimeout(() => setView({ name: "modules" }), 250);
    }
  }, [remainingMs, submitted, view.name]);

  const stats = useMemo(
    () => computeStats(active?.questions || [], answers),
    [active, answers]
  );

  return (
    <div style={styles.page}>
      <BackgroundTrees />
      <CatTrail />

      <header style={styles.header}>
        <h1 style={styles.title}>MCQ Test</h1>
        <div style={styles.rightBox}>
          <Clock now={now} />
        </div>
      </header>

      <main style={styles.main}>
        {view.name === "home" && (
          <Home loading={loading} onStart={handleStart} />
        )}

        {view.name === "modules" && (
          <ModulesPage
            modules={MODULES}
            banks={banks}
            onOpenModule={openModule}
          />
        )}

        {view.name === "test" && active && (
          <TestPage
            active={active}
            idx={idx}
            setIdx={setIdx}
            answers={answers}
            choose={choose}
            onSubmit={submit}
            timerMs={remainingMs}
            moduleName={
              MODULES.find((m) => m.id === active.moduleId)?.name ||
              active.moduleId
            }
            onExit={() => {
              // leave test → back to modules; drop progress
              setActive(null);
              setAnswers([]);
              setSubmitted(false);
              setView({ name: "modules" });
            }}
          />
        )}
        {view.name === "results" && active && (
          <ResultsPage
            active={active}
            answers={answers}
            stats={stats}
            onReattempt={() => openModule(active.moduleId)}
            onBack={() => setView({ name: "modules" })}
          />
        )}
      </main>

      <style>{css}</style>
    </div>
  );
}
