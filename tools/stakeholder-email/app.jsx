import { useState } from "react";

const STATUS_TYPES = ["On Track", "At Risk", "Delayed", "Completed"];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ project:"", update:"", status:"On Track", milestone:"", blocker:"", nextSteps:"" });

  const generateEmails = async () => {
    setLoading(true); setError(null);
    try {
      const prompt = `You are a senior Program Manager. Generate tailored stakeholder emails for this update:
Project: ${form.project} | Status: ${form.status}
Update: ${form.update}
Milestone: ${form.milestone} | Blocker: ${form.blocker||"None"} | Next Steps: ${form.nextSteps}

Return ONLY valid JSON (no markdown, no backticks):
{"emails":[{"audience":"Executive / C-Suite","subject":"...","body":"...","tone":"Strategic"},{"audience":"District Administrator","subject":"...","body":"...","tone":"Operational"},{"audience":"IT Team","subject":"...","body":"...","tone":"Technical"},{"audience":"End Users / Staff","subject":"...","body":"...","tone":"Supportive"}]}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }),
      });
      const data = await response.json();
      const text = data.content.map(i=>i.text||"").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setEmails(parsed.emails); setActiveTab(0);
    } catch(err) { setError("Failed to generate. Please try again."); }
    setLoading(false);
  };

  const copyEmail = () => { navigator.clipboard.writeText(emails[activeTab].body); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const statusColor = s => s==="On Track"?"#00b4d8":s==="At Risk"?"#ffd460":s==="Delayed"?"#e94560":"#00ff88";

  return (
    <div style={{ minHeight:"100vh",background:"#0a0a0f",fontFamily:"Georgia,serif",color:"#e8e4d9" }}>
      <div style={{ background:"linear-gradient(135deg,#1a1a2e,#0f3460)",borderBottom:"1px solid #e9456020",padding:"24px 40px",display:"flex",alignItems:"center",gap:12 }}>
        <div style={{ width:36,height:36,background:"#e94560",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:"#fff",fontFamily:"monospace" }}>AM</div>
        <div>
          <div style={{ fontSize:18,fontWeight:"bold" }}>AMON MURRAY · PM PORTFOLIO</div>
          <div style={{ fontSize:11,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase" }}>Stakeholder Email Generator</div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"40px 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start" }}>
        <div>
          <div style={{ fontSize:11,letterSpacing:"0.2em",color:"#e94560",textTransform:"uppercase",marginBottom:12 }}>Project Update Details</div>
          <div style={{ background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:32 }}>
            <div style={{ display:"grid",gap:18 }}>
              {[{key:"project",label:"Project / Platform Name",ph:"e.g. Canvas LMS Rollout - DISD"},{key:"milestone",label:"Key Milestone Hit",ph:"e.g. UAT sign-off complete for Phase 1"},{key:"blocker",label:"Blockers / Risks (optional)",ph:"e.g. IT credentials pending for 2 sites"},{key:"nextSteps",label:"Next Steps",ph:"e.g. Begin Phase 2 training week of April 28"}].map(({key,label,ph})=>(
                <div key={key}>
                  <label style={{ display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:5 }}>{label}</label>
                  <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}
                    style={{ width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"10px 13px",color:"#e8e4d9",fontSize:13,outline:"none" }}/>
                </div>
              ))}
              <div>
                <label style={{ display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:5 }}>Weekly Update Summary</label>
                <textarea value={form.update} onChange={e=>setForm(f=>({...f,update:e.target.value}))} placeholder="What happened this week? Key wins, progress, decisions..." rows={3}
                  style={{ width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"10px 13px",color:"#e8e4d9",fontSize:13,outline:"none",resize:"vertical",fontFamily:"Georgia,serif" }}/>
              </div>
              <div>
                <label style={{ display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7 }}>Project Status</label>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {STATUS_TYPES.map(s=>(
                    <button key={s} onClick={()=>setForm(f=>({...f,status:s}))}
                      style={{ padding:"5px 12px",border:form.status===s?"1px solid "+statusColor(s):"1px solid #ffffff15",borderRadius:6,background:form.status===s?statusColor(s)+"15":"#0a0a0f",color:form.status===s?statusColor(s):"#8a8478",fontSize:12,cursor:"pointer" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {error && <div style={{ marginTop:12,color:"#e94560",fontSize:12 }}>{error}</div>}
            <button onClick={generateEmails} disabled={loading||!form.project||!form.update}
              style={{ width:"100%",marginTop:22,padding:13,background:loading||!form.project?"#ffffff10":"linear-gradient(135deg,#e94560,#c73652)",border:"none",borderRadius:10,color:loading||!form.project?"#8a8478":"#fff",fontSize:13,fontWeight:"bold",letterSpacing:"0.1em",textTransform:"uppercase",cursor:loading||!form.project?"not-allowed":"pointer" }}>
              {loading?"⏳ Generating Emails...":"Generate Stakeholder Emails →"}
            </button>
          </div>
        </div>
        <div>
          <div style={{ fontSize:11,letterSpacing:"0.2em",color:"#e94560",textTransform:"uppercase",marginBottom:12 }}>Generated Emails</div>
          {!emails ? (
            <div style={{ background:"#111118",border:"1px dashed #ffffff15",borderRadius:16,padding:60,textAlign:"center",color:"#8a8478" }}>
              <div style={{ fontSize:38,marginBottom:14 }}>📧</div>
              <div style={{ fontSize:14,marginBottom:6 }}>4 tailored emails, instantly</div>
              <div style={{ fontSize:12 }}>Executive · Admin · IT · End Users — each with the right tone</div>
            </div>
          ) : (
            <div style={{ background:"#111118",border:"1px solid #ffffff10",borderRadius:16,overflow:"hidden" }}>
              <div style={{ display:"flex",borderBottom:"1px solid #ffffff10" }}>
                {emails.map((e,i)=>(
                  <button key={i} onClick={()=>setActiveTab(i)}
                    style={{ flex:1,padding:"11px 5px",background:activeTab===i?"#e94560":"transparent",border:"none",borderRight:i<3?"1px solid #ffffff10":"none",color:activeTab===i?"#fff":"#8a8478",cursor:"pointer",fontSize:9,letterSpacing:"0.05em",textTransform:"uppercase" }}>
                    {e.audience.split(" / ")[0]}
                  </button>
                ))}
              </div>
              <div style={{ padding:22 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                  <div>
                    <div style={{ fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:3 }}>{emails[activeTab].audience}</div>
                    <div style={{ fontSize:11,color:"#8a8478" }}>Tone: <span style={{ color:"#ffd460" }}>{emails[activeTab].tone}</span></div>
                  </div>
                  <button onClick={copyEmail}
                    style={{ padding:"7px 15px",background:copied?"#00b4d820":"transparent",border:"1px solid "+(copied?"#00b4d8":"#ffffff20"),borderRadius:6,color:copied?"#00b4d8":"#8a8478",cursor:"pointer",fontSize:11 }}>
                    {copied?"✓ Copied!":"Copy"}
                  </button>
                </div>
                <div style={{ background:"#0a0a0f",borderRadius:9,padding:14,marginBottom:10 }}>
                  <div style={{ fontSize:10,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5 }}>Subject Line</div>
                  <div style={{ color:"#e8e4d9",fontSize:13,fontWeight:"bold" }}>{emails[activeTab].subject}</div>
                </div>
                <div style={{ background:"#0a0a0f",borderRadius:9,padding:14 }}>
                  <div style={{ fontSize:10,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8 }}>Email Body</div>
                  <div style={{ color:"#c8c4b9",fontSize:13,lineHeight:1.75,whiteSpace:"pre-wrap" }}>{emails[activeTab].body}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}