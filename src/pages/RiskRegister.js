import { useState } from "react";
const CATEGORIES = ["Risks","Assumptions","Issues","Dependencies"];
const CAT_ICONS = ["⚠️","💭","🔴","🔗"];
const CAT_COLORS = ["#e94560","#ffd460","#ff6b6b","#00b4d8"];

const DEMO = {
  project_summary: "16-week Canvas LMS implementation across 87 Dallas ISD campuses serving 145,000 students — high complexity, multi-stakeholder environment with SIS and SSO integration dependencies.",
  risks: [
    {id:"R01",description:"Infinite Campus SIS API latency causing roster sync failures for 12,000+ secondary students",probability:"High",impact:"High",score:"High",mitigation:"Build CSV fallback pipeline; schedule daily reconciliation jobs with IT",owner:"Amon Murray",status:"Open"},
    {id:"R02",description:"Low digital literacy among Title I campus teachers reducing adoption below 70% threshold",probability:"High",impact:"High",score:"High",mitigation:"Deploy dedicated campus tech coaches; offer in-person office hours 3x/week",owner:"Training Lead",status:"Open"},
    {id:"R03",description:"SAML SSO misconfiguration across 3 legacy network zones blocking teacher login",probability:"Medium",impact:"High",score:"High",mitigation:"IT discovery sprint Week 2; unified config template; test across all 12 zones",owner:"IT Director",status:"In Progress"},
    {id:"R04",description:"Legacy LMS content export format incompatible with Canvas import tool",probability:"Medium",impact:"Medium",score:"Medium",mitigation:"Manual migration for top 200 courses; build conversion script for SCORM packages",owner:"Curriculum Team",status:"Open"}
  ],
  assumptions: [
    {id:"A01",description:"All 87 campuses have reliable broadband (min 100Mbps) for Canvas video streaming",impact_if_wrong:"High",validation_date:"Week 1",owner:"IT Director"},
    {id:"A02",description:"Infinite Campus will provide dedicated API support engineer for integration sprint",impact_if_wrong:"High",validation_date:"Week 2",owner:"Vendor Manager"},
    {id:"A03",description:"Campus principals will mandate teacher training attendance (90%+ completion required)",impact_if_wrong:"High",validation_date:"Week 6",owner:"Amon Murray"}
  ],
  issues: [
    {id:"I01",description:"Reagan HS LDAP authentication failing — 340 students cannot log into staging environment",priority:"High",raised_by:"Campus Tech Coach",resolution:"IT applying manual AD sync; ticket #4872 open; target resolution May 3",status:"In Progress"},
    {id:"I02",description:"Canvas mobile app not approved on DISD MDM policy — blocking 2,100 student devices",priority:"Medium",raised_by:"IT Help Desk",resolution:"MDM policy update submitted to Security team; approval expected by April 30",status:"Open"}
  ],
  dependencies: [
    {id:"D01",description:"Infinite Campus API credentials and sandbox access required before SIS integration can begin",dependent_on:"Infinite Campus Vendor",due_date:"Week 1",risk_if_late:"High"},
    {id:"D02",description:"District SSO certificate renewal needed for SAML configuration across all campuses",dependent_on:"IT Security Team",due_date:"Week 2",risk_if_late:"High"},
    {id:"D03",description:"Superintendent approval of Canvas governance policy required before Go-Live announcement",dependent_on:"Cabinet Office",due_date:"Week 11",risk_if_late:"Medium"}
  ]
};

export default function RiskRegister() {
  const [step, setStep] = useState("form");
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({project:"",type:"",timeline:"",team:"",context:""});
  const lC = l => l==="High"?"#e94560":l==="Medium"?"#ffd460":"#00b4d8";
  const sC = s => s==="Resolved"?"#00ff88":s==="In Progress"?"#ffd460":"#e94560";

  if (step==="form") return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:11,letterSpacing:"0.3em",color:"#ffd460",textTransform:"uppercase",marginBottom:12}}>Tool 3 of 4</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,color:"#e8e4d9",margin:"0 0 10px"}}>AI Risk Register <em style={{color:"#ffd460"}}>(RAID Log)</em></h1>
        <p style={{color:"#8a8478",fontSize:14,margin:0}}>Describe your project and generate a full RAID log with risks, assumptions, issues, and dependencies.</p>
      </div>
      <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:40,maxWidth:680,margin:"0 auto"}}>
        <div style={{display:"grid",gap:20}}>
          {[{k:"project",l:"Project / Platform Name",ph:"e.g. Salesforce CRM Implementation — KIPP Texas"},{k:"type",l:"Project Type",ph:"e.g. SaaS Implementation, Digital Transformation"},{k:"timeline",l:"Project Timeline",ph:"e.g. 16 weeks"},{k:"team",l:"Team / Stakeholders",ph:"e.g. 8-person cross-functional team"}].map(({k,l,ph})=>(
            <div key={k}><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7}}>{l}</label>
            <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none"}}/></div>
          ))}
          <div><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7}}>Additional Context (optional)</label>
          <textarea value={form.context} onChange={e=>setForm(f=>({...f,context:e.target.value}))} rows={3} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none",resize:"vertical"}}/></div>
        </div>
        <div style={{marginTop:20,padding:"10px 14px",background:"#ffd46008",border:"1px solid #ffd46025",borderRadius:8,fontSize:12,color:"#8a8478"}}>
          💡 <span style={{color:"#e8e4d9"}}>Sample:</span> Canvas LMS · DISD · 4 risks, 3 assumptions, 2 issues, 3 dependencies
        </div>
        <button onClick={()=>setStep("result")} style={{width:"100%",marginTop:16,padding:15,background:"linear-gradient(135deg,#ffd460,#f0b800)",border:"none",borderRadius:10,color:"#0a0a0f",fontSize:14,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>Generate RAID Log →</button>
      </div>
    </div>
  );

  const counts = [DEMO.risks,DEMO.assumptions,DEMO.issues,DEMO.dependencies];
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div><div style={{fontSize:11,color:"#ffd460",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6}}>RAID Log Generated</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#e8e4d9"}}>Canvas LMS — Dallas ISD Implementation</div>
        <div style={{fontSize:13,color:"#8a8478",marginTop:4}}>{DEMO.project_summary}</div></div>
        <button onClick={()=>setStep("form")} style={{padding:"9px 18px",background:"transparent",border:"1px solid #ffd46040",borderRadius:8,color:"#ffd460",cursor:"pointer",fontSize:13}}>← New RAID Log</button>
      </div>
      <div style={{padding:"10px 14px",background:"#ffd46010",border:"1px solid #ffd46030",borderRadius:8,fontSize:12,color:"#ffd460",marginBottom:20}}>
        ⚡ Sample based on real Canvas LMS DISD implementation — contact Amon for custom generation
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        {CATEGORIES.map((cat,i)=><div key={i} onClick={()=>setActiveTab(i)} style={{background:"#111118",border:"1px solid "+(activeTab===i?CAT_COLORS[i]:"#ffffff10"),borderRadius:12,padding:"16px 20px",cursor:"pointer"}}>
          <div style={{fontSize:20,marginBottom:6}}>{CAT_ICONS[i]}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:24,color:CAT_COLORS[i]}}>{counts[i].length}</div>
          <div style={{fontSize:11,color:"#8a8478",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:3}}>{cat}</div>
        </div>)}
      </div>
      <div style={{display:"flex",marginBottom:16,background:"#111118",borderRadius:10,border:"1px solid #ffffff10",overflow:"hidden"}}>
        {CATEGORIES.map((cat,i)=><button key={i} onClick={()=>setActiveTab(i)} style={{flex:1,padding:"11px 6px",background:activeTab===i?CAT_COLORS[i]:"transparent",border:"none",borderRight:i<3?"1px solid #ffffff10":"none",color:activeTab===i?(i===1?"#0a0a0f":"#fff"):"#8a8478",cursor:"pointer",fontSize:12}}>{CAT_ICONS[i]} {cat}</button>)}
      </div>
      {activeTab===0&&<div style={{display:"grid",gap:10}}>{DEMO.risks.map(r=><div key={r.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"16px 20px"}}><div style={{display:"grid",gridTemplateColumns:"60px 1fr 100px 100px 100px",gap:14,alignItems:"center"}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#e94560",background:"#e9456015",padding:"3px 8px",borderRadius:4,textAlign:"center"}}>{r.id}</span><div><div style={{color:"#e8e4d9",fontSize:13,marginBottom:4}}>{r.description}</div><div style={{fontSize:11,color:"#8a8478"}}>Mitigation: {r.mitigation}</div></div>{["probability","impact","score"].map(f=><div key={f} style={{textAlign:"center"}}><div style={{fontSize:9,color:"#8a8478",textTransform:"uppercase",marginBottom:3}}>{f}</div><span style={{fontSize:11,color:lC(r[f]),background:lC(r[f])+"15",padding:"2px 8px",borderRadius:4}}>{r[f]}</span></div>)}</div><div style={{marginTop:8,display:"flex",gap:16,fontSize:11,color:"#8a8478"}}><span>Owner: <span style={{color:"#c8c4b9"}}>{r.owner}</span></span><span>Status: <span style={{color:sC(r.status)}}>{r.status}</span></span></div></div>)}</div>}
      {activeTab===1&&<div style={{display:"grid",gap:10}}>{DEMO.assumptions.map(a=><div key={a.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ffd460",background:"#ffd46015",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{a.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:6}}>{a.description}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",flexWrap:"wrap"}}><span>If Wrong: <span style={{color:lC(a.impact_if_wrong)}}>{a.impact_if_wrong}</span></span><span>Validate: <span style={{color:"#c8c4b9"}}>{a.validation_date}</span></span><span>Owner: <span style={{color:"#c8c4b9"}}>{a.owner}</span></span></div></div></div>)}</div>}
      {activeTab===2&&<div style={{display:"grid",gap:10}}>{DEMO.issues.map(iss=><div key={iss.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ff6b6b",background:"#ff6b6b15",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{iss.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:4}}>{iss.description}</div><div style={{fontSize:11,color:"#8a8478",marginBottom:6}}>{iss.resolution}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",flexWrap:"wrap"}}><span>Priority: <span style={{color:lC(iss.priority)}}>{iss.priority}</span></span><span>Raised by: <span style={{color:"#c8c4b9"}}>{iss.raised_by}</span></span><span>Status: <span style={{color:sC(iss.status)}}>{iss.status}</span></span></div></div></div>)}</div>}
      {activeTab===3&&<div style={{display:"grid",gap:10}}>{DEMO.dependencies.map(d=><div key={d.id} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:12,padding:"14px 16px",display:"flex",gap:14}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#00b4d8",background:"#00b4d815",padding:"3px 8px",borderRadius:4,height:"fit-content"}}>{d.id}</span><div style={{flex:1}}><div style={{color:"#e8e4d9",fontSize:13,marginBottom:6}}>{d.description}</div><div style={{display:"flex",gap:16,fontSize:11,color:"#8a8478",flexWrap:"wrap"}}><span>Depends on: <span style={{color:"#c8c4b9"}}>{d.dependent_on}</span></span><span>Due: <span style={{color:"#c8c4b9"}}>{d.due_date}</span></span><span>Risk if late: <span style={{color:lC(d.risk_if_late)}}>{d.risk_if_late}</span></span></div></div></div>)}</div>}
    </div>
  );
}