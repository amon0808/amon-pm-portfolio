import { useState } from "react";
const CATEGORIES = ["Risks", "Assumptions", "Issues", "Dependencies"];
const CAT_ICONS = ["⚠️", "💭", "🔴", "🔗"];
const CAT_COLORS = ["#e94560", "#ffd460", "#ff6b6b", "#00b4d8"];
export default function RiskRegister() {
  const [loading, setLoading] = useState(false);
  const [raid, setRaid] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ project: "", type: "", timeline: "", team: "", context: "" });
  const generate = async () => {
    setLoading(true); setError(null);
    try {
      const prompt = `You are a senior PM. Generate a RAID log for: Project: ${form.project}, Type: ${form.type}, Timeline: ${form.timeline}, Team: ${form.team}, Context: ${form.context||"None"}. Return ONLY valid JSON: {"project_summary":"...","risks":[{"id":"R01","description":"...","probability":"High","impact":"High","score":"High","mitigation":"...","owner":"...","status":"Open"},{"id":"R02","description":"...","probability":"Medium","impact":"High","score":"High","mitigation":"...","owner":"...","status":"Open"},{"id":"R03","description":"...","probability":"Low","impact":"Medium","score":"Low","mitigation":"...","owner":"...","status":"Open"}],"assumptions":[{"id":"A01","description":"...","impact_if_wrong":"High","validation_date":"Week 2","owner":"..."},{"id":"A02","description":"...","impact_if_wrong":"Medium","validation_date":"Week 1","owner":"..."}],"issues":[{"id":"I01","description":"...","priority":"High","raised_by":"...","resolution":"...","status":"Open"}],"dependencies":[{"id":"D01","description":"...","dependent_on":"...","due_date":"Week 2","risk_if_late":"High"},{"id":"D02","description":"...","dependent_on":"...","due_date":"Week 3","risk_if_late":"Medium"}]}`;
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data = await res.json(); const text = data.content.map(i=>i.text||"").join("");
      setRaid(JSON.parse(text.replace(/```json|```/g,"").trim())); setActiveTab(0);
    } catch { setError("Generation failed — please try again."); }
    setLoading(false);
  };
  const lC = l => l==="High"?"#e94560":l==="Medium"?"#ffd460":"#00b4d8";
  const sC = s => s==="Resolved"?"#00ff88":s==="In Progress"?"#ffd460":"#e94560";
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:11,letterSpacing:"0.3em",color:"#ffd460",textTransform:"uppercase",marginBottom:12}}>Tool 3 of 4</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,color:"#e8e4d9",margin:"0 0 10px"}}>AI Risk Register <em style={{color:"#ffd460"}}>(RAID Log)</em></h1>
        <p style={{color:"#8a8478",fontSize:14,margin:0}}>Describe your project — get a fully populated RAID log with mitigation strategies.</p>
      </div>
      {!raid ? (
        <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:40,maxWidth:680,margin:"0 auto"}}>
          <div style={{display:"grid",gap:20}}>
            {[{k:"project",l:"Project / Platform Name"},{k:"type",l:"Project Type"},{k:"timeline",l:"Timeline"},{k:"team",l:"Team / Stakeholders"}].map(({k,l})=>(
              <div key={k}><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7}}>{l}</label>
              <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none"}}/></div>
            ))}
            <div><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7}}>Additional Context (optional)</label>
            <textarea value={form.context} onChange={e=>setForm(f=>({...f,context:e.target.value}))} rows={3} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none",resize:"vertical"}}/></div>
          </div>
          {error && <div style={{marginTop:14,color:"#e94560",fontSize:13,textAlign:"center"}}>{error}</div>}
          <button onClick={generate} disabled={loading||!form.project||!form.type} style={{width:"100%",marginTop:28,padding:15,background:loading||!form.project?"#ffffff10":"linear-gradient(135deg,#ffd460,#f0b800)",border:"none",borderRadius:10,color:loading||!form.project?"#8a8478":"#0a0a0f",fontSize:14,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",cursor:loading||!form.project?"not-allowed":"pointer"}}>
            {loading?"⏳ Building RAID Log...":"Generate RAID Log →"}
          </button>
        </div>
      ) : (
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12}}>
            <div><div style={{fontSize:11,color:"#ffd460",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6}}>RAID Log Generated</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#e8e4d9"}}>{form.project}</div>
            <div style={{fontSize:13,color:"#8a8478",marginTop:4}}>{raid.project_summary}</div></div>
            <button onClick={()=>setRaid(null)} style={{padding:"9px 18px",background:"transparent",border:"1px solid #ffd46040",borderRadius:8,color:"#ffd460",cursor:"pointer",fontSize:13}}>← New RAID Log</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
            {CATEGORIES.map((cat,i)=>{const d=[raid.risks,raid.assumptions,raid.issues,raid.dependencies][i]; return(
              <div key={i} onClick={()=>setActiveTab(i)} style={{background:"#111118",border:`1px solid ${activeTab===i?CAT_COLORS[i]:"#ffffff10"}`,borderRadius:12,padding:"16px 20px",cursor:"pointer"}}>
                <div style={{fontSize:20,marginBottom:6}}>{CAT_ICONS[i]}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:24,color:CAT_COLORS[i]}}>{d?.length||0}</div>
                <div style={{fontSize:11,color:"#8a8478",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:3}}>{cat}</div>
              </div>
            );})}
          </div>
          <div style={{display:"flex",marginBottom:16,background:"#111118",borderRadius:10,border:"1px solid #ffffff10",overflow:"hidden"}}>
            {CATEGORIES.map((cat,i)=><button key={i} onClick={()=>setActiveTab(i)} style={{flex:1,padding:"11px 6px",background:activeTab===i?CAT_COLORS[i]:"transparent",border:"none",borderRight:i<3?"1px solid #ffffff10":"none",color:activeTab===i?(i===1?"#0a0a0f":"#fff"):"#8a8478",cursor:"pointer",fontSize:12}}>{CAT_ICONS[i]} {cat}</button>)}
          </div>
          {activeTab===0&&<div style={{display:"grid",gap:10}}>{raid.risks?.map(r=><div key={r.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"16px 20px"}}><div style={{display:"grid",gridTemplateColumns:"60px 1fr 90px 90px 90px",gap:14,alignItems:"center"}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#e94560",background:"#e9456015",padding:"3px 8px",borderRadius:4,textAlign:"center"}}>{r.id}</span><div><div style={{color:"#e8e4d9",fontSize:13,marginBottom:5}}>{r.description}</div><div style={{fontSize:11,color:"#8a8478"}}>Mitigation: {r.mitigation}</div></div><div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#8a8478",textTransform:"uppercase",marginBottom:3}}>Probability</div><span style={{fontSize:11,color:lC(r.probability),background:lC(r.probability)+"15",padding:"2px 8px",borderRadius:4}}>{r.probability}</span></div><div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#8a8478",textTransform:"uppercase",marginBottom:3}}>Impact</div><span style={{fontSize:11,color:lC(r.impact),background:lC(r.impact)+"15",padding:"2px 8px",borderRadius:4}}>{r.impact}</span></div><div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#8a8478",textTransform:"uppercase",marginBottom:3}}>Score</div><span style={{fontSize:11,color:lC(r.score),fontWeight:600,padding:"2px 8px",borderRadius:4,background:lC(r.score)+"20"}}>{r.score}</span></div></div><div style={{marginTop:10,display:"flex",gap:16,fontSize:11,color:"#8a8478"}}><span>Owner: <span style={{color:"#c8c4b9"}}>{r.owner}</span></span><span>Status: <span style={{color:sC(r.status)}}>{r.status}</span></span></div></div>)}</div>}
          {activeTab===1&&<div style={{display:"grid",gap:10}}>{raid.assumptions?.map(a=><div key={a.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ffd460",background:"#ffd46015",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{a.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:6}}>{a.description}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",flexWrap:"wrap"}}><span>If Wrong: <span style={{color:lC(a.impact_if_wrong)}}>{a.impact_if_wrong}</span></span><span>Validate: <span style={{color:"#c8c4b9"}}>{a.validation_date}</span></span><span>Owner: <span style={{color:"#c8c4b9"}}>{a.owner}</span></span></div></div></div>)}</div>}
          {activeTab===2&&<div style={{display:"grid",gap:10}}>{raid.issues?.map(iss=><div key={iss.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ff6b6b",background:"#ff6b6b15",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{iss.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:5}}>{iss.description}</div><div style={{fontSize:11,color:"#8a8478"}}>Resolution: {iss.resolution}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",marginTop:8,flexWrap:"wrap"}}><span>Priority: <span style={{color:lC(iss.priority)}}>{iss.priority}</span></span><span>Raised by: <span style={{color:"#c8c4b9"}}>{iss.raised_by}</span></span><span>Status: <span style={{color:sC(iss.status)}}>{iss.status}</span></span></div></div></div>)}</div>}
          {activeTab===3&&<div style={{display:"grid",gap:10}}>{raid.dependencies?.map(d=><div key={d.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#00b4d8",background:"#00b4d815",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{d.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:6}}>{d.description}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",flexWrap:"wrap"}}><span>Depends on: <span style={{color:"#c8c4b9"}}>{d.dependent_on}</span></span><span>Due: <span style={{color:"#c8c4b9"}}>{d.due_date}</span></span><span>Risk if late: <span style={{color:lC(d.risk_if_late)}}>{d.risk_if_late}</span></span></div></div></div>)}</div>}
        </>
      )}
    </div>
  );
}
