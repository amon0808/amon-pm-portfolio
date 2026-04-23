import { useState } from "react";
const PHASES = ["Discovery","Configuration","Training","Go-Live","Post-Launch"];
const ICONS = ["🔍","⚙️","🎓","🚀","📈"];

const DEMO = {
  title: "Canvas LMS Implementation — Dallas ISD (16 Weeks)",
  executive_summary: "This playbook outlines a 16-week phased rollout of Canvas LMS across 87 Dallas ISD campuses serving 145,000 students and 9,800 educators. The implementation prioritizes change management, tiered training, and data-driven adoption tracking to achieve 85%+ platform engagement by Go-Live.",
  success_metrics: [
    "85%+ teacher login rate within 30 days of Go-Live",
    "70%+ course content migrated from legacy LMS by Week 10",
    "Net Promoter Score ≥ 40 from end-user training surveys",
    "Zero Tier-1 support incidents unresolved beyond 24 hours post-launch"
  ],
  risks: [
    { risk: "Legacy SIS integration delays impacting rostering", mitigation: "Engage Infinite Campus API team in Week 1; build manual CSV fallback", level: "High" },
    { risk: "Low teacher adoption in Title I campuses with limited tech access", mitigation: "Deploy campus tech coaches; provide offline-capable training materials", level: "High" },
    { risk: "SSO configuration variance across 12 network zones", mitigation: "IT discovery sprint in Week 2; unified SAML config template", level: "Medium" }
  ],
  phases: [
    { name:"Discovery", duration:"Weeks 1–2", objective:"Establish project infrastructure, validate technical environment, and align all stakeholders on scope and success criteria.", tasks:["Conduct stakeholder kickoff with Cabinet, IT, and Curriculum leads","Complete infrastructure audit across all 87 campuses","Document current LMS usage patterns and content inventory","Finalize integration requirements with SIS, SSO, and Google Workspace"], deliverables:["Signed Project Charter","Technical Environment Report","Stakeholder RACI Matrix"], milestones:"Executive kickoff complete; technical risks identified" },
    { name:"Configuration", duration:"Weeks 3–7", objective:"Build, configure, and validate the Canvas environment including all integrations, branding, and role structures.", tasks:["Configure Canvas sub-accounts for Elementary, Middle, and High School tiers","Complete SIS roster sync via Infinite Campus integration","Implement DISD branding, grading schemes, and notification policies","UAT with 15 pilot teachers across 3 campus types"], deliverables:["Configured Canvas Production Environment","Integration Test Report","UAT Sign-Off Document"], milestones:"Production environment approved by IT and Curriculum" },
    { name:"Training", duration:"Weeks 8–12", objective:"Deliver role-based training to all 9,800 educators using a train-the-trainer model supplemented by self-paced resources.", tasks:["Train 87 Campus Technology Coaches (8-hour certification program)","Deliver teacher training cohorts (3-hour sessions, 25 per cohort)","Launch Canvas self-paced course library for async learning","Conduct admin training for 43 campus principals"], deliverables:["Trained Campus Coach Cohort","Teacher Training Completion Report (target: 90%)","Self-Paced Course Library (24 modules)"], milestones:"90% of teachers complete foundational training" },
    { name:"Go-Live", duration:"Weeks 13–14", objective:"Execute phased campus activation with real-time support coverage and rapid issue resolution.", tasks:["Activate campuses in 3 waves: Pilots → Elementary → Secondary","Staff command center with 12 support agents for first 5 days","Monitor adoption dashboard hourly; escalate blockers within 2 hours","Send daily Go-Live status reports to Superintendent's office"], deliverables:["Go-Live Readiness Checklist (87 campuses)","Daily Adoption Dashboard","Incident Log & Resolution Report"], milestones:"All 87 campuses active; adoption ≥ 75% in Week 1" },
    { name:"Post-Launch", duration:"Weeks 15–16", objective:"Stabilize the platform, celebrate wins, document lessons learned, and transition to steady-state operations.", tasks:["Conduct 30-day adoption analysis by campus and grade band","Deliver executive summary report to Cabinet","Hold retrospective with project team and campus coaches","Publish Canvas governance model and ongoing support SLA"], deliverables:["30-Day Adoption Report","Executive Summary Presentation","Lessons Learned Document","Steady-State Support Playbook"], milestones:"85% adoption achieved; project formally closed" }
  ]
};

export default function PlaybookGenerator() {
  const [step, setStep] = useState("form");
  const [activePhase, setActivePhase] = useState(0);
  const [form, setForm] = useState({ product:"", industry:"", clientSize:"", timeline:"", stakeholders:"", complexity:"medium" });
  const rC = l => l==="High"?"#e94560":l==="Medium"?"#ffd460":"#00b4d8";

  if (step === "form") return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontSize:11,letterSpacing:"0.3em",color:"#e94560",textTransform:"uppercase",marginBottom:12}}>Tool 1 of 4</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:40,fontWeight:400,color:"#e8e4d9",margin:"0 0 12px"}}>Implementation <em style={{color:"#e94560"}}>Playbook Generator</em></h1>
        <p style={{color:"#8a8478",fontSize:15,maxWidth:520,margin:"0 auto"}}>Fill in your project details and generate a complete 5-phase implementation playbook — the same methodology used across $500K+ EdTech programs.</p>
      </div>
      <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:40,maxWidth:680,margin:"0 auto"}}>
        <div style={{display:"grid",gap:20}}>
          {[{k:"product",l:"Platform / Product Name",ph:"e.g. Canvas LMS, Salesforce, Instructure"},{k:"industry",l:"Industry / Sector",ph:"e.g. K-12 EdTech, Healthcare SaaS"},{k:"clientSize",l:"Client Organization Size",ph:"e.g. 500-person school district"},{k:"timeline",l:"Implementation Timeline",ph:"e.g. 16 weeks"},{k:"stakeholders",l:"Key Stakeholders",ph:"e.g. CTO, District Admin, IT Team"}].map(({k,l,ph})=>(
            <div key={k}><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:7}}>{l}</label>
            <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"11px 14px",color:"#e8e4d9",fontSize:14,outline:"none"}}/></div>
          ))}
          <div><label style={{display:"block",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:8}}>Complexity</label>
          <div style={{display:"flex",gap:8}}>{["low","medium","high"].map(l=><button key={l} onClick={()=>setForm(f=>({...f,complexity:l}))} style={{flex:1,padding:10,border:form.complexity===l?"1px solid #e94560":"1px solid #ffffff15",borderRadius:8,background:form.complexity===l?"#e9456015":"#0a0a0f",color:form.complexity===l?"#e94560":"#8a8478",fontSize:13,textTransform:"capitalize",cursor:"pointer"}}>{l}</button>)}</div></div>
        </div>
        <div style={{marginTop:20,padding:"12px 16px",background:"#e9456008",border:"1px solid #e9456025",borderRadius:8,fontSize:12,color:"#8a8478"}}>
          💡 <span style={{color:"#e8e4d9"}}>Sample output:</span> Canvas LMS · Dallas ISD · 16-week rollout across 87 campuses
        </div>
        <button onClick={()=>{setStep("result");setActivePhase(0);}} style={{width:"100%",marginTop:20,padding:15,background:"linear-gradient(135deg,#e94560,#c73652)",border:"none",borderRadius:10,color:"#fff",fontSize:14,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>
          Generate Implementation Playbook →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{fontSize:11,color:"#e94560",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Generated Playbook</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:400,color:"#e8e4d9",margin:"0 0 8px"}}>{DEMO.title}</h2>
          <p style={{color:"#8a8478",fontSize:13,maxWidth:640,margin:0,lineHeight:1.6}}>{DEMO.executive_summary}</p>
        </div>
        <button onClick={()=>setStep("form")} style={{padding:"9px 18px",background:"transparent",border:"1px solid #e9456040",borderRadius:8,color:"#e94560",cursor:"pointer",fontSize:13}}>← New Playbook</button>
      </div>
      <div style={{padding:"10px 14px",background:"#ffd46010",border:"1px solid #ffd46030",borderRadius:8,fontSize:12,color:"#ffd460",marginBottom:24}}>
        ⚡ Sample output based on real Canvas LMS implementation methodology — contact Amon for custom generation
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,marginBottom:24}}>
        {DEMO.success_metrics.map((m,i)=><div key={i} style={{background:"#111118",border:"1px solid #e9456020",borderRadius:10,padding:"14px 16px",borderLeft:"3px solid #e94560"}}><div style={{fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>KPI {i+1}</div><div style={{fontSize:13,color:"#e8e4d9",lineHeight:1.4}}>{m}</div></div>)}
      </div>
      <div style={{display:"flex",marginBottom:16,background:"#111118",borderRadius:12,border:"1px solid #ffffff10",overflow:"hidden"}}>
        {PHASES.map((p,i)=><button key={i} onClick={()=>setActivePhase(i)} style={{flex:1,padding:"13px 6px",background:activePhase===i?"#e94560":"transparent",border:"none",borderRight:i<4?"1px solid #ffffff10":"none",color:activePhase===i?"#fff":"#8a8478",cursor:"pointer",fontSize:11,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:14}}>{ICONS[i]}</span>{p}</button>)}
      </div>
      {(()=>{const p=DEMO.phases[activePhase]; return (
        <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,overflow:"hidden",marginBottom:24}}>
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderBottom:"1px solid #e9456030",padding:"20px 28px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,marginBottom:4}}>{ICONS[activePhase]} {p.name} Phase</div><div style={{color:"#8a8478",fontSize:13}}>{p.objective}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase"}}>Duration</div><div style={{fontSize:16,color:"#ffd460",marginTop:2,fontFamily:"'DM Mono',monospace"}}>{p.duration}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            <div style={{padding:"20px 24px",borderRight:"1px solid #ffffff10"}}>
              <div style={{fontSize:10,color:"#e94560",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>Tasks</div>
              {p.tasks.map((t,i)=><div key={i} style={{display:"flex",gap:9,marginBottom:10,alignItems:"flex-start"}}><div style={{width:18,height:18,minWidth:18,border:"1px solid #e9456060",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#e94560"}}>{i+1}</div><div style={{color:"#c8c4b9",fontSize:13,lineHeight:1.5}}>{t}</div></div>)}
            </div>
            <div style={{padding:"20px 24px"}}>
              <div style={{fontSize:10,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>Deliverables</div>
              {p.deliverables.map((d,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:10,alignItems:"flex-start"}}><span style={{color:"#ffd460",fontSize:10,marginTop:3}}>◆</span><div style={{color:"#c8c4b9",fontSize:13,lineHeight:1.5}}>{d}</div></div>)}
              <div style={{marginTop:16,background:"#e9456010",border:"1px solid #e9456030",borderRadius:8,padding:"10px 14px"}}><div style={{fontSize:10,color:"#e94560",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>Milestone</div><div style={{color:"#e8e4d9",fontSize:13}}>{p.milestones}</div></div>
            </div>
          </div>
        </div>
      );})()}
      <div><div style={{fontSize:10,color:"#e94560",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Risk Register</div>
      <div style={{display:"grid",gap:8}}>{DEMO.risks.map((r,i)=><div key={i} style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:10,padding:"14px 18px",display:"grid",gridTemplateColumns:"75px 1fr 1fr",gap:14,alignItems:"center"}}><span style={{padding:"3px 7px",background:rC(r.level)+"15",border:"1px solid "+rC(r.level)+"40",borderRadius:4,fontSize:10,color:rC(r.level),textAlign:"center"}}>{r.level}</span><div style={{color:"#c8c4b9",fontSize:13}}>{r.risk}</div><div style={{color:"#8a8478",fontSize:12}}><span style={{color:"#e94560",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:2}}>Mitigation</span>{r.mitigation}</div></div>)}</div></div>
    </div>
  );
}