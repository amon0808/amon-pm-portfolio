import { useState } from "react";

const PHASES = ["Discovery", "Configuration", "Training", "Go-Live", "Post-Launch"];
const PHASE_ICONS = ["🔍", "⚙️", "🎓", "🚀", "📈"];

export default function PlaybookGenerator() {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [playbook, setPlaybook] = useState(null);
  const [error, setError] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [form, setForm] = useState({ product: "", industry: "", clientSize: "", timeline: "", stakeholders: "", complexity: "medium" });

  const generate = async () => {
    setLoading(true); setError(null);
    try {
      const prompt = "You are a senior SaaS Implementation Program Manager with 10+ years of experience. Generate a detailed implementation playbook for: Product: " + form.product + ", Industry: " + form.industry + ", Client Size: " + form.clientSize + ", Timeline: " + form.timeline + ", Stakeholders: " + form.stakeholders + ", Complexity: " + form.complexity + ". Return ONLY valid JSON (no markdown, no backticks): {" + '"title":"...","executive_summary":"2-3 sentences","success_metrics":["...","...","...","..."],"risks":[{"risk":"...","mitigation":"...","level":"High"},{"risk":"...","mitigation":"...","level":"Medium"},{"risk":"...","mitigation":"...","level":"Low"}],"phases":[{"name":"Discovery","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Configuration","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Training","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Go-Live","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Post-Launch","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."}]}' + "}";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("");
      setPlaybook(JSON.parse(text.replace(/```json|```/g, "").trim()));
      setStep("result"); setActivePhase(0);
    } catch (e) { setError("Generation failed — please try again."); }
    setLoading(false);
  };

  const riskColor = l => l === "High" ? "#e94560" : l === "Medium" ? "#ffd460" : "#00b4d8";

  if (step === "form") return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#e94560", textTransform: "uppercase", marginBottom: 12 }}>Tool 1 of 4</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: "#e8e4d9", margin: "0 0 12px" }}>
          Implementation <em style={{ color: "#e94560" }}>Playbook Generator</em>
        </h1>
        <p style={{ color: "#8a8478", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
          Fill in your project details and get a complete 5-phase implementation plan in seconds.
        </p>
      </div>
      <div style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 16, padding: 40, maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 20 }}>
          {[
            { key: "product", label: "Platform / Product Name", ph: "e.g. Canvas LMS, Salesforce, Instructure" },
            { key: "industry", label: "Industry / Sector", ph: "e.g. K-12 EdTech, Healthcare SaaS, Nonprofit" },
            { key: "clientSize", label: "Client Organization Size", ph: "e.g. 500-person school district" },
            { key: "timeline", label: "Implementation Timeline", ph: "e.g. 12 weeks, 6 months" },
            { key: "stakeholders", label: "Key Stakeholders", ph: "e.g. CTO, District Admin, IT Team, End Users" },
          ].map(({ key, label, ph }) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8478", marginBottom: 7 }}>{label}</label>
              <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                style={{ width: "100%", boxSizing: "border-box", background: "#0a0a0f", border: "1px solid #ffffff15", borderRadius: 8, padding: "11px 14px", color: "#e8e4d9", fontSize: 14, outline: "none" }} />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8478", marginBottom: 8 }}>Complexity</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["low", "medium", "high"].map(l => (
                <button key={l} onClick={() => setForm(f => ({ ...f, complexity: l }))}
                  style={{ flex: 1, padding: 10, border: form.complexity === l ? "1px solid #e94560" : "1px solid #ffffff15", borderRadius: 8, background: form.complexity === l ? "#e9456015" : "#0a0a0f", color: form.complexity === l ? "#e94560" : "#8a8478", fontSize: 13, textTransform: "capitalize", cursor: "pointer" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <div style={{ marginTop: 14, color: "#e94560", fontSize: 13, textAlign: "center" }}>{error}</div>}
        <button onClick={generate} disabled={loading || !form.product || !form.industry}
          style={{ width: "100%", marginTop: 28, padding: 15, background: loading || !form.product ? "#ffffff10" : "linear-gradient(135deg,#e94560,#c73652)", border: "none", borderRadius: 10, color: loading || !form.product ? "#8a8478" : "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: loading || !form.product ? "not-allowed" : "pointer" }}>
          {loading ? "⏳ Generating Playbook..." : "Generate Implementation Playbook →"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: "#e94560", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Generated Playbook</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: "#e8e4d9", margin: "0 0 8px" }}>{playbook.title}</h2>
          <p style={{ color: "#8a8478", fontSize: 14, maxWidth: 600, margin: 0 }}>{playbook.executive_summary}</p>
        </div>
        <button onClick={() => { setStep("form"); setPlaybook(null); }}
          style={{ padding: "9px 18px", background: "transparent", border: "1px solid #e9456040", borderRadius: 8, color: "#e94560", cursor: "pointer", fontSize: 13 }}>
          ← New Playbook
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10, marginBottom: 28 }}>
        {playbook.success_metrics && playbook.success_metrics.map((m, i) => (
          <div key={i} style={{ background: "#111118", border: "1px solid #e9456020", borderRadius: 10, padding: "14px 16px", borderLeft: "3px solid #e94560" }}>
            <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5 }}>KPI {i + 1}</div>
            <div style={{ fontSize: 13, color: "#e8e4d9", lineHeight: 1.4 }}>{m}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginBottom: 20, background: "#111118", borderRadius: 12, border: "1px solid #ffffff10", overflow: "hidden" }}>
        {PHASES.map((phase, i) => (
          <button key={i} onClick={() => setActivePhase(i)}
            style={{ flex: 1, padding: "13px 6px", background: activePhase === i ? "#e94560" : "transparent", border: "none", borderRight: i < 4 ? "1px solid #ffffff10" : "none", color: activePhase === i ? "#fff" : "#8a8478", cursor: "pointer", fontSize: 11, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 14 }}>{PHASE_ICONS[i]}</span>{phase}
          </button>
        ))}
      </div>

      {playbook.phases && playbook.phases[activePhase] && (
        <div style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 16, overflow: "hidden", marginBottom: 28 }}>
          <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", borderBottom: "1px solid #e9456030", padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 5 }}>{PHASE_ICONS[activePhase]} {playbook.phases[activePhase].name} Phase</div>
              <div style={{ color: "#8a8478", fontSize: 13 }}>{playbook.phases[activePhase].objective}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.15em", textTransform: "uppercase" }}>Duration</div>
              <div style={{ fontSize: 18, color: "#ffd460", marginTop: 2 }}>{playbook.phases[activePhase].duration}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "22px 26px", borderRight: "1px solid #ffffff10" }}>
              <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Tasks</div>
              {playbook.phases[activePhase].tasks && playbook.phases[activePhase].tasks.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 9, marginBottom: 11, alignItems: "flex-start" }}>
                  <div style={{ width: 19, height: 19, minWidth: 19, border: "1px solid #e9456060", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#e94560" }}>{i + 1}</div>
                  <div style={{ color: "#c8c4b9", fontSize: 13, lineHeight: 1.5 }}>{t}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "22px 26px" }}>
              <div style={{ fontSize: 10, color: "#ffd460", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Deliverables</div>
              {playbook.phases[activePhase].deliverables && playbook.phases[activePhase].deliverables.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#ffd460", fontSize: 10, marginTop: 3 }}>◆</span>
                  <div style={{ color: "#c8c4b9", fontSize: 13, lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
              <div style={{ marginTop: 18, background: "#e9456010", border: "1px solid #e9456030", borderRadius: 8, padding: "11px 14px" }}>
                <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Milestone</div>
                <div style={{ color: "#e8e4d9", fontSize: 13 }}>{playbook.phases[activePhase].milestones}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {playbook.risks && playbook.risks.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Risk Register</div>
          <div style={{ display: "grid", gap: 8 }}>
            {playbook.risks.map((r, i) => (
              <div key={i} style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 10, padding: "14px 18px", display: "grid", gridTemplateColumns: "75px 1fr 1fr", gap: 14, alignItems: "center" }}>
                <span style={{ padding: "3px 7px", background: riskColor(r.level) + "15", border: "1px solid " + riskColor(r.level) + "40", borderRadius: 4, fontSize: 10, color: riskColor(r.level), textAlign: "center" }}>{r.level}</span>
                <div style={{ color: "#c8c4b9", fontSize: 13 }}>{r.risk}</div>
                <div style={{ color: "#8a8478", fontSize: 12 }}>
                  <span style={{ color: "#e94560", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>Mitigation</span>
                  {r.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
