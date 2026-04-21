import { useState } from "react";
import Home from "./pages/Home";
import PlaybookGenerator from "./pages/PlaybookGenerator";
import EmailGenerator from "./pages/EmailGenerator";
import RiskRegister from "./pages/RiskRegister";
import HealthDashboard from "./pages/HealthDashboard";

const HEADER_STYLE = {
  background: "linear-gradient(135deg,#1a1a2e,#0f3460)",
  borderBottom: "1px solid #e9456020",
  padding: "18px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const NAV_TOOLS = [
  { id: "playbook", label: "Playbook" },
  { id: "email", label: "Email Gen" },
  { id: "risk", label: "Risk Register" },
  { id: "dashboard", label: "Dashboard" },
];

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif", color: "#e8e4d9" }}>
      <div style={HEADER_STYLE}>
        <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, background: "#e94560", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>AM</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.05em", color: "#e8e4d9" }}>AMON MURRAY</div>
            <div style={{ fontSize: 10, color: "#e94560", letterSpacing: "0.15em", textTransform: "uppercase" }}>PM Portfolio · AI Tools</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_TOOLS.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)}
              style={{ padding: "6px 14px", background: page === t.id ? "#e94560" : "transparent", border: page === t.id ? "1px solid #e94560" : "1px solid #ffffff15", borderRadius: 6, color: page === t.id ? "#fff" : "#8a8478", fontSize: 12, cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {page === "home" && <Home onNavigate={setPage} />}
      {page === "playbook" && <PlaybookGenerator />}
      {page === "email" && <EmailGenerator />}
      {page === "risk" && <RiskRegister />}
      {page === "dashboard" && <HealthDashboard />}
    </div>
  );
}
