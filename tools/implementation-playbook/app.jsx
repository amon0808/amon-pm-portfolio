import { useState } from "react";

const PHASES = ["Discovery", "Configuration", "Training", "Go-Live", "Post-Launch"];
const PHASE_ICONS = ["🔍", "⚙️", "🎓", "🚀", "📈"];

export default function App() {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [playbook, setPlaybook] = useState(null);
  const [error, setError] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [form, setForm] = useState({
    product: "", industry: "", clientSize: "",
    timeline: "", stakeholders: "", complexity: "medium",
  });

  const generatePlaybook = async () => {
    setLoading(true); setError(null);
    try {
      const prompt = `You are a senior SaaS Implementation Program Manager with 10+ years of experience.
Generate a detailed implementation playbook for:
Product/Platform: ${form.product}
Industry/Sector: ${form.industry}
Client Size: ${form.clientSize}
Timeline: ${form.timeline}
Key Stakeholders: ${form.stakeholders}
Complexity Level: ${form.complexity}

Return ONLY valid JSON (no markdown, no backticks):
{"title":"...","executive_summary":"...","success_metrics":["...","...","...","..."],"risks":[{"risk":"...","mitigation":"...","level":"High"}],"phases":[{"name":"Discovery","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Configuration","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Training","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Go-Live","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."},{"name":"Post-Launch","duration":"X weeks","objective":"...","tasks":["...","...","...","..."],"deliverables":["...","...","..."],"stakeholders":["...","..."],"milestones":"..."}]}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setPlaybook(parsed); setStep("playbook"); setActivePhase(0);
    } catch (err) { setError("Failed to generate. Please try again."); }
    setLoading(false);
  };

  const riskColor = l => l === "High" ? "#e94560" : l === "Medium" ? "#ffd460" : "#00b4d8";

  if (step === "form") return (
    <div style={{ minHeight:"100vh", background:"#0a0a0f", fontFamily:"Georgia,serif", color:"#e8e4d9" }}>
      <div style={{ background:"linear-gradient(135deg,#1a1a2e,#0f3460)", borderBottom:"1px solid #e9456020", padding:"24px 40px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:36,height:36,background:"#e94560",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:"#fff",fontFamily:"monospace" }}>AM</div>
        <div>
          <div style={{ fontSize:18,fontWeight:"bold" }}>AMON MURRAY · PM PORTFOLIO</div>
          <div style={{ fontSize:11,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase" }}>Implementation Playbook Generator</div>
        </div>
      </div>
      <div style={{ maxWidth:720,margin:"60px auto",padding:"0 24px" }}>
        <h1 style={{ fontSize:40,fontWeight:"normal",textAlign:"center",marginBottom:8 }}>
          Generate a Full SaaS <em style={{ color:"#e94560" }}>Implementation Playbook</em>
        </h1>
        <p style={{ textAlign:"center",color:"#8a8478",marginBottom:48 }}>Enter project details — get a complete phase-by-phase plan with tasks, deliverables, risks, and KPIs instantly.</p>
        <div style={{ background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:40 }}>
          <div style={{ display:"grid",gap:20 }}>
            {[
              {key:"product",label:"Platform / Product Name",ph:"e.g. Canvas LMS, Salesforce"},
              {key:"industry",label:"Industry / Sector",ph:"e.g. K-12 EdTech, Healthcare SaaS"},
              {key:"clientSize",label:"Client Organization Size",ph:"e.g. 500-person school district"},
              {key:"timeline",label:"Implementation Timeline",ph:"e.g. 12 weeks, 6 months"},
              {key:"stakeholders",label:"Key Stakeholders",ph:"e.g. CTO, District Admin, IT Team"},
            ].map(({key,label,ph}) => (
              <div key={key}>
                <label style={{ display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:6 }}>{label}</label>
                <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}
                  style={{ width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none" }}/>
              </div>
            ))}
            <div>
              <label style={{ display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:8 }}>Complexity</label>
              <div style={{ display:"flex",gap:8 }}>
                {["low","medium","high"].map(l=>(
                  <button key={l} onClick={()=>setForm(f=>({...f,complexity:l}))}
                    style={{ flex:1,padding:10,border:form.complexity===l?"1px solid #e94560":"1px solid #ffffff15",borderRadius:8,background:form.complexity===l?"#e9456015":"#0a0a0f",color:form.complexity===l?"#e94560":"#8a8478",fontSize:13,textTransform:"capitalize",cursor:"pointer" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {error && <div style={{ marginTop:16,color:"#e94560",fontSize:13,textAlign:"center" }}>{error}</div>}
          <button onClick={generatePlaybook} disabled={loading||!form.product||!form.industry}
            style={{ width:"100%",marginTop:28,padding:15,background:loading||!form.product?"#ffffff10":"linear-gradient(135deg,#e94560,#c73652)",border:"none",borderRadius:10,color:loading||!form.product?"#8a8478":"#fff",fontSize:15,fontWeight:"bold",letterSpacing:"0.1em",textTransform:"uppercase",cursor:loading||!form.product?"not-allowed":"pointer" }}>
            {loading ? "⏳ Generating..." : "Generate Implementation Playbook →"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh",background:"#0a0a0f",fontFamily:"Georgia,serif",color:"#e8e4d9" }}>
      <div style={{ background:"linear-gradient(135deg,#1a1a2e,#0f3460)",borderBottom:"1px solid #e9456020",padding:"24px 40px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:36,height:36,background:"#e94560",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:"#fff",fontFamily:"monospace" }}>AM</div>
          <div>
            <div style={{ fontSize:18,fontWeight:"bold" }}>AMON MURRAY · PM PORTFOLIO</div>
            <div style={{ fontSize:11,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase" }}>Implementation Playbook Generator</div>
          </div>
        </div>
        <button onClick={()=>{setStep("form");setPlaybook(null);}}
          style={{ padding:"8px 18px",background:"transparent",border:"1px solid #e9456040",borderRadius:8,color:"#e94560",cursor:"pointer",fontSize:13 }}>
          ← New Playbook
        </button>
      </div>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"40px 24px" }}>
        <h2 style={{ fontSize:26,fontWeight:"normal",marginBottom:6 }}>{playbook.title}</h2>
        <p style={{ color:"#8a8478",marginBottom:32,maxWidth:680 }}>{playbook.executive_summary}</p>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:32 }}>
          {playbook.success_metrics?.map((m,i)=>(
            <div key={i} style={{ background:"#111118",border:"1px solid #e9456020",borderRadius:10,padding:16,borderLeft:"3px solid #e94560" }}>
              <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5 }}>KPI {i+1}</div>
              <div style={{ fontSize:13,color:"#e8e4d9" }}>{m}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",marginBottom:24,background:"#111118",borderRadius:12,border:"1px solid #ffffff10",overflow:"hidden" }}>
          {PHASES.map((phase,i)=>(
            <button key={i} onClick={()=>setActivePhase(i)}
              style={{ flex:1,padding:"13px 6px",background:activePhase===i?"#e94560":"transparent",border:"none",borderRight:i<4?"1px solid #ffffff10":"none",color:activePhase===i?"#fff":"#8a8478",cursor:"pointer",fontSize:11,display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
              <span style={{ fontSize:15 }}>{PHASE_ICONS[i]}</span>{phase}
            </button>
          ))}
        </div>

        {playbook.phases?.[activePhase] && (() => {
          const p = playbook.phases[activePhase];
          return (
            <div style={{ background:"#111118",border:"1px solid #ffffff10",borderRadius:16,overflow:"hidden",marginBottom:32 }}>
              <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderBottom:"1px solid #e9456030",padding:"22px 30px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12 }}>
                <div>
                  <div style={{ fontSize:20,marginBottom:5 }}>{PHASE_ICONS[activePhase]} {p.name} Phase</div>
                  <div style={{ color:"#8a8478",fontSize:13 }}>{p.objective}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase" }}>Duration</div>
                  <div style={{ fontSize:17,color:"#ffd460",marginTop:2 }}>{p.duration}</div>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr" }}>
                <div style={{ padding:"22px 28px",borderRight:"1px solid #ffffff10" }}>
                  <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:14 }}>Tasks</div>
                  {p.tasks?.map((t,i)=>(
                    <div key={i} style={{ display:"flex",gap:9,marginBottom:11,alignItems:"flex-start" }}>
                      <div style={{ width:19,height:19,minWidth:19,border:"1px solid #e9456060",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#e94560" }}>{i+1}</div>
                      <div style={{ color:"#c8c4b9",fontSize:13,lineHeight:1.4 }}>{t}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"22px 28px" }}>
                  <div style={{ fontSize:10,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:14 }}>Deliverables</div>
                  {p.deliverables?.map((d,i)=>(
                    <div key={i} style={{ display:"flex",gap:8,marginBottom:9,alignItems:"flex-start" }}>
                      <span style={{ color:"#ffd460" }}>◆</span>
                      <div style={{ color:"#c8c4b9",fontSize:13,lineHeight:1.4 }}>{d}</div>
                    </div>
                  ))}
                  <div style={{ fontSize:10,color:"#00b4d8",letterSpacing:"0.15em",textTransform:"uppercase",margin:"18px 0 10px" }}>Stakeholders</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {p.stakeholders?.map((s,i)=>(
                      <span key={i} style={{ padding:"3px 9px",background:"#00b4d810",border:"1px solid #00b4d840",borderRadius:4,fontSize:11,color:"#00b4d8" }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ marginTop:18,background:"#e9456010",border:"1px solid #e9456030",borderRadius:8,padding:"11px 15px" }}>
                    <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3 }}>Milestone</div>
                    <div style={{ color:"#e8e4d9",fontSize:12 }}>{p.milestones}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {playbook.risks?.length > 0 && (
          <div>
            <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:14 }}>Risk Register</div>
            <div style={{ display:"grid",gap:9 }}>
              {playbook.risks.map((r,i)=>(
                <div key={i} style={{ background:"#111118",border:"1px solid #ffffff10",borderRadius:10,padding:"14px 18px",display:"grid",gridTemplateColumns:"75px 1fr 1fr",gap:14,alignItems:"center" }}>
                  <span style={{ padding:"3px 7px",background:riskColor(r.level)+"15",border:"1px solid "+riskColor(r.level)+"40",borderRadius:4,fontSize:10,color:riskColor(r.level),textAlign:"center" }}>{r.level}</span>
                  <div style={{ color:"#c8c4b9",fontSize:13 }}>{r.risk}</div>
                  <div style={{ color:"#8a8478",fontSize:12 }}>
                    <span style={{ color:"#e94560",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:2 }}>Mitigation</span>
                    {r.mitigation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}