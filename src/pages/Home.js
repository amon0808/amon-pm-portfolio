import { useState } from "react";

const TOOLS = [
  { id: "playbook", icon: "📋", title: "Implementation Playbook Generator", desc: "Input a SaaS product, industry, timeline, and stakeholders — get a complete 5-phase implementation plan with tasks, deliverables, KPIs, risk register, and milestones.", tag: "Discovery → Go-Live", color: "#e94560" },
  { id: "email", icon: "📧", title: "Stakeholder Email Generator", desc: "Enter a project update once — get 4 tailored emails automatically: Executive, District Admin, IT Team, and End Users. Each with the right tone, detail level, and messaging.", tag: "Change Management", color: "#00b4d8" },
  { id: "risk", icon: "⚠️", title: "AI Risk Register (RAID Log)", desc: "Describe your project and get a pre-populated RAID log with risks, assumptions, issues, and dependencies — each with probability, impact score, and mitigation strategy.", tag: "Risk Management", color: "#ffd460" },
  { id: "dashboard", icon: "📊", title: "Project Health Dashboard", desc: "Track multiple programs with live RAG status, budget variance, milestone completion, and adoption metrics. The same portfolio visibility I use managing $500K+ programs.", tag: "Portfolio Oversight", color: "#00ff88" },
];

const STATS = [
  { value: "98%", label: "On-Time Delivery" },
  { value: "$500K+", label: "Budget Managed" },
  { value: "50+", label: "Concurrent Implementations" },
  { value: "10+", label: "Years EdTech PM" },
];

export default function Home({ onNavigate }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.35em", color: "#e94560", textTransform: "uppercase", marginBottom: 20 }}>
          AI-Powered PM Tooling · PMP · CSM
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 400, lineHeight: 1.15, color: "#e8e4d9", margin: "0 0 24px" }}>
          The PM Toolkit That<br />
          <em style={{ color: "#e94560" }}>Actually Works</em>
        </h1>
        <p style={{ color: "#8a8478", fontSize: 17, maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Four AI-powered tools built from 10+ years of real SaaS implementation experience.
          Not templates — working tools that solve actual PM problems.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("playbook")} style={{ padding: "14px 28px", background: "linear-gradient(135deg,#e94560,#c73652)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em" }}>
            Try the Playbook Generator →
          </button>
          <a href="https://linkedin.com/in/amonpmp" target="_blank" rel="noreferrer" style={{ padding: "14px 28px", background: "transparent", border: "1px solid #ffffff20", borderRadius: 10, color: "#8a8478", fontSize: 14, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
            LinkedIn Profile
          </a>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#ffffff10", borderRadius: 16, overflow: "hidden", marginBottom: 72 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: "#111118", padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#e94560", fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#8a8478", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "#e94560", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>
        Live AI Tools — Click to Try
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 16, marginBottom: 72 }}>
        {TOOLS.map(tool => (
          <div key={tool.id} onClick={() => onNavigate(tool.id)}
            style={{ background: "#111118", border: "1px solid #ffffff10", borderRadius: 16, padding: "28px 32px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = tool.color + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff10"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tool.color }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{tool.icon}</span>
              <span style={{ padding: "3px 10px", background: tool.color + "15", border: "1px solid " + tool.color + "40", borderRadius: 4, fontSize: 10, color: tool.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{tool.tag}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#e8e4d9", marginBottom: 10, lineHeight: 1.3 }}>{tool.title}</div>
            <div style={{ color: "#8a8478", fontSize: 13, lineHeight: 1.65 }}>{tool.desc}</div>
            <div style={{ marginTop: 20, fontSize: 12, color: tool.color, letterSpacing: "0.05em" }}>Launch tool →</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontSize: 13, color: "#8a8478" }}>
          Amon Murray · PMP · CSM · Dallas, TX · <a href="mailto:amon0808@gmail.com" style={{ color: "#e94560", textDecoration: "none" }}>amon0808@gmail.com</a>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["PMP Certified", "CSM Certified", "EdTech Specialist"].map(t => (
            <span key={t} style={{ padding: "4px 10px", border: "1px solid #ffffff10", borderRadius: 4, fontSize: 10, color: "#8a8478", letterSpacing: "0.05em" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
