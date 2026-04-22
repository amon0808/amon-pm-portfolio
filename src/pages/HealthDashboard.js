import { useState } from "react";

const RAG = { Red: "#e94560", Amber: "#ffd460", Green: "#00b4d8" };

const DEFAULT_PROJECTS = [
  { id: 1, name: "Canvas LMS — DISD Rollout", phase: "Training", budget: 180000, spent: 142000, completion: 68, adoption: 71, milestones: 8, milestonesHit: 6, status: "Amber", trend: "↑", team: "Amon Murray" },
  { id: 2, name: "Salesforce CRM — KIPP Texas", phase: "Configuration", budget: 95000, spent: 41000, completion: 44, adoption: 0, milestones: 12, milestonesHit: 5, status: "Green", trend: "↑", team: "Amon Murray" },
  { id: 3, name: "LMS Migration — Great Hearts", phase: "Go-Live", budget: 62000, spent: 60500, completion: 92, adoption: 88, milestones: 6, milestonesHit: 6, status: "Amber", trend: "→", team: "Amon Murray" },
  { id: 4, name: "EdTech Platform — United to Learn", phase: "Post-Launch", budget: 210000, spent: 198000, completion: 100, adoption: 94, milestones: 10, milestonesHit: 10, status: "Green", trend: "↑", team: "Amon Murray" },
];

export default function HealthDashboard() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [selected, setSelected] = useState(null);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const avgCompletion = Math.round(projects.reduce((s, p) => s + p.completion, 0) / projects.length);
  const avgAdoption = Math.round(projects.filter(p => p.adoption > 0).reduce((s, p) => s + p.adoption, 0) / projects.filter(p => p.adoption > 0).length);
  const onTrack = projects.filter(p => p.status === "Green").length;
  const fmt = n => n >= 1000 ? "$" + (n / 1000).toFixed(0) + "K" : "$" + n;
  const up = (id, field, value) => setProjects(ps => ps.map(p => p.id === id ? { ...p, [field]: value } : p));

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#00ff88", textTransform: "uppercase", marginBottom: 12 }}>Tool 4 of 4</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 400, color: "#e8e4d9", margin: "0 0 10px" }}>
          Project Health <em style={{ color: "#00ff88" }}>Dashboard</em>
        </h1>
        <p style={{ color: "#8a8478", fontSize: 14, margin: 0 }}>Portfolio-level visibility across all active programs. Click any row to edit.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 28 }}>
        {[
          { label: "Total Budget", value: fmt(totalBudget), sub: fmt(totalSpent) + " spent", color: "#e94560" },
          { label: "Budget Used", value: Math.round(totalSpent / totalBudget * 100) + "%", sub: fmt(totalBudget - totalSpent) + " remaining", color: totalSpent / totalBudget > 0.9 ? "#e94560" : "#ffd460" },
          { label: "Avg Completion", value: avgCompletion + "%", sub: "across all programs", color: "#00b4d8" },
          { label: "Avg Adoption", value: avgAdoption + "%", sub: "active programs only", color: "#00ff88" },
          { label: "On Track", value: onTrack + "/" + projects.length, sub: "programs green status", color: "#00ff88" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 12, padding: "18px 16px" }}>
            <div style={{ fontSize: 10, color: "#8a8478", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, color: s.color, fontWeight: 500, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#8a8478" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#8a8478", letterSpacing: "0.12em", textTransform: "uppercase" }}>RAG Status:</div>
        {Object.entries(RAG).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: v }} />
            <span style={{ fontSize: 11, color: "#8a8478" }}>{k}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#8a8478" }}>Click any row to edit values</div>
      </div>

      <div style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 120px 100px 100px 90px 90px 80px 60px", background: "#0a0a0f", borderBottom: "1px solid #ffffff10", padding: "12px 20px" }}>
          {["Program", "Phase", "Budget", "Spent", "Complete", "Adoption", "Status", "Trend"].map(h => (
            <div key={h} style={{ fontSize: 9, color: "#8a8478", letterSpacing: "0.15em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {projects.map(p => (
          <div key={p.id}>
            <div onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{ display: "grid", gridTemplateColumns: "2fr 120px 100px 100px 90px 90px 80px 60px", padding: "16px 20px", borderBottom: "1px solid #ffffff08", cursor: "pointer", background: selected === p.id ? "#ffffff05" : "transparent" }}
              onMouseEnter={e => { if (selected !== p.id) e.currentTarget.style.background = "#ffffff03"; }}
              onMouseLeave={e => { if (selected !== p.id) e.currentTarget.style.background = "transparent"; }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#e8e4d9", marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: "#8a8478" }}>PM: {p.team} · {p.milestonesHit}/{p.milestones} milestones</div>
              </div>
              <div style={{ fontSize: 12, color: "#c8c4b9", display: "flex", alignItems: "center" }}>{p.phase}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c8c4b9", display: "flex", alignItems: "center" }}>{fmt(p.budget)}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: p.spent / p.budget > 0.9 ? "#e94560" : "#c8c4b9" }}>{fmt(p.spent)}</div>
                  <div style={{ width: 60, height: 3, background: "#ffffff10", borderRadius: 2, marginTop: 4 }}>
                    <div style={{ width: Math.min(100, Math.round(p.spent / p.budget * 100)) + "%", height: "100%", background: p.spent / p.budget > 0.9 ? "#e94560" : "#ffd460", borderRadius: 2 }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c8c4b9" }}>{p.completion}%</div>
                  <div style={{ width: 55, height: 3, background: "#ffffff10", borderRadius: 2, marginTop: 4 }}>
                    <div style={{ width: p.completion + "%", height: "100%", background: "#00b4d8", borderRadius: 2 }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c8c4b9" }}>{p.adoption > 0 ? p.adoption + "%" : "—"}</div>
                  {p.adoption > 0 && <div style={{ width: 55, height: 3, background: "#ffffff10", borderRadius: 2, marginTop: 4 }}><div style={{ width: p.adoption + "%", height: "100%", background: "#00ff88", borderRadius: 2 }} /></div>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <select value={p.status} onChange={e => { e.stopPropagation(); up(p.id, "status", e.target.value); }} onClick={e => e.stopPropagation()}
                  style={{ background: RAG[p.status] + "20", border: "1px solid " + RAG[p.status] + "50", borderRadius: 5, color: RAG[p.status], fontSize: 11, padding: "3px 6px", cursor: "pointer" }}>
                  {Object.keys(RAG).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: p.trend === "↑" ? "#00ff88" : p.trend === "↓" ? "#e94560" : "#ffd460" }}>{p.trend}</div>
            </div>

            {selected === p.id && (
              <div style={{ background: "#0a0a0f", borderBottom: "1px solid #ffffff10", padding: "20px 20px" }}>
                <div style={{ fontSize: 10, color: "#8a8478", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Edit Program Metrics</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
                  {[
                    { label: "Budget ($)", field: "budget", type: "number" },
                    { label: "Spent ($)", field: "spent", type: "number" },
                    { label: "Completion (%)", field: "completion", type: "number" },
                    { label: "Adoption (%)", field: "adoption", type: "number" },
                    { label: "Milestones Total", field: "milestones", type: "number" },
                    { label: "Milestones Hit", field: "milestonesHit", type: "number" },
                    { label: "Phase", field: "phase", type: "text" },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label style={{ display: "block", fontSize: 9, color: "#8a8478", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
                      <input type={type} value={p[field]} onChange={e => up(p.id, field, type === "number" ? Number(e.target.value) : e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", background: "#111118", border: "1px solid #ffffff15", borderRadius: 6, padding: "8px 10px", color: "#e8e4d9", fontSize: 13, outline: "none", fontFamily: "'DM Mono', monospace" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                  {["↑", "→", "↓"].map(t => (
                    <button key={t} onClick={() => up(p.id, "trend", t)}
                      style={{ padding: "6px 14px", background: p.trend === t ? "#ffffff15" : "transparent", border: "1px solid #ffffff15", borderRadius: 6, color: t === "↑" ? "#00ff88" : t === "↓" ? "#e94560" : "#ffd460", cursor: "pointer", fontSize: 16 }}>
                      {t}
                    </button>
                  ))}
                  <span style={{ fontSize: 11, color: "#8a8478", display: "flex", alignItems: "center", marginLeft: 6 }}>Trend direction</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: "#8a8478", textAlign: "center" }}>
        Sample data pre-loaded · All values editable · Built by Amon Murray, PMP · CSM
      </div>
    </div>
  );
}
