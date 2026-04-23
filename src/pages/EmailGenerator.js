import { useState } from "react";
const STATUS_TYPES = ["On Track","At Risk","Delayed","Completed"];

const DEMO_EMAILS = [
  { audience:"Executive / C-Suite", tone:"Strategic", subject:"Canvas LMS — Phase 1 Complete | 94% On-Time, On-Budget", body:"Dr. Patterson,\n\nI'm pleased to report that Phase 1 of the Canvas LMS implementation is complete and tracking ahead of schedule.\n\nKey Highlights:\n• 87 campuses fully configured and integration-tested\n• SIS roster sync live for 145,000 students\n• Budget utilization: $142K of $180K (79%) — $38K under forecast\n• Risk: 2 Title I campuses flagged for additional IT support pre-launch\n\nNext milestone: Teacher training cohorts begin April 28 (9,800 educators, 3-week window). We are on track for the May 19 Go-Live.\n\nI'll present the full Phase 1 report at the May 2nd Cabinet meeting.\n\nRespectfully,\nAmon Murray, PMP · CSM\nDirector of Implementation, EdTech Division" },
  { audience:"District Administrator", tone:"Operational", subject:"Canvas Rollout Update — Training Schedule Now Live", body:"Hi [Admin Name],\n\nQuick update on our Canvas LMS rollout — we're in great shape heading into the training phase.\n\nWhat's Done:\n✅ All 87 campuses configured in Canvas\n✅ Student rosters synced from Infinite Campus\n✅ Campus Technology Coaches assigned and briefed\n\nWhat's Next:\n📅 Teacher training cohorts: April 28 – May 16\n📅 Principal admin training: May 5–7\n📅 Go-Live: May 19\n\nAction needed from your campus: Please confirm your Campus Tech Coach has completed the pre-training checklist (sent via email April 18).\n\nFull training schedule is posted on the project SharePoint. Reach out if your campus needs schedule adjustments.\n\nAmon Murray | Canvas Implementation PM\namon0808@gmail.com | Teams: @amonmurray" },
  { audience:"IT Team", tone:"Technical", subject:"Canvas Phase 1 Sign-Off — Integration Status & Phase 2 Prep", body:"Team,\n\nPhase 1 technical work is complete. Here's the full status before we move into training support mode:\n\nIntegrations:\n✅ SIS Sync (Infinite Campus API) — live, 145K records synced, delta sync every 4hrs\n✅ SSO (SAML 2.0) — verified across all 12 network zones\n✅ Google Workspace LTI — configured, tested on 3 device types\n⚠️ LDAP at Reagan HS — manual workaround in place, ticket #4872 open\n\nEnvironment:\n• Production URL: disd.instructure.com\n• Sub-accounts: 3 tiers (ES/MS/HS), 87 nodes\n• Storage: 2.1TB allocated, 340GB used\n\nPhase 2 IT Tasks (April 28 – May 16):\n• Help desk coverage: 8am–6pm M–F during training\n• Monitor SSO error logs daily\n• Close ticket #4872 by May 3\n\nLet me know if anything needs re-testing before April 28.\n\nAmon" },
  { audience:"End Users / Staff", tone:"Supportive", subject:"Canvas is Coming May 19 — Here's Everything You Need to Know 🎉", body:"Hi [Teacher Name],\n\nExciting news — Canvas LMS goes live across all DISD campuses on May 19! We've been working hard behind the scenes to make this as smooth as possible for you.\n\nYour Training Session:\n📅 Date: [Your cohort date — check the schedule link below]\n⏱ Duration: 3 hours\n📍 Location: Your campus computer lab\n\nWhat You'll Learn:\n• Setting up your Canvas course shell\n• Posting assignments and grading online\n• Communicating with students and parents\n• Importing content from the old LMS\n\nResources Ready for You:\n🎥 24 self-paced video tutorials (available now in Canvas)\n📖 Quick-start guide (printed copies at your campus)\n🙋 Campus Tech Coach: [Coach Name] is your go-to person\n\nYou've got this! Canvas is designed to save you time, and our team will be right there with you every step of the way.\n\nQuestions? Email canvas-support@dallasisd.org or drop by the Help Desk.\n\nWarm regards,\nAmon Murray\nCanvas Implementation Team, DISD" }
];

export default function EmailGenerator() {
  const [step, setStep] = useState("form");
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ project:"", update:"", status:"On Track", milestone:"", blocker:"", nextSteps:"" });
  const copy = () => { navigator.clipboard.writeText(DEMO_EMAILS[activeTab].body); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const sC = s => s==="On Track"?"#00b4d8":s==="At Risk"?"#ffd460":s==="Delayed"?"#e94560":"#00ff88";

  if (step === "form") return (
    <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:11,letterSpacing:"0.3em",color:"#00b4d8",textTransform:"uppercase",marginBottom:12}}>Tool 2 of 4</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,color:"#e8e4d9",margin:"0 0 10px"}}>Stakeholder <em style={{color:"#00b4d8"}}>Email Generator</em></h1>
        <p style={{color:"#8a8478",fontSize:14,margin:0}}>Enter one project update — get 4 perfectly tailored emails for every audience instantly.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
        <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,padding:32}}>
          <div style={{display:"grid",gap:16}}>
            {[{k:"project",l:"Project / Platform Name",ph:"e.g. Canvas LMS Rollout — DISD"},{k:"milestone",l:"Key Milestone Hit",ph:"e.g. UAT sign-off complete for Phase 1"},{k:"blocker",l:"Blockers / Risks (optional)",ph:"e.g. IT credentials pending for 2 sites"},{k:"nextSteps",l:"Next Steps",ph:"e.g. Begin Phase 2 training April 28"}].map(({k,l,ph})=>(
              <div key={k}><label style={{display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:6}}>{l}</label>
              <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"10px 13px",color:"#e8e4d9",fontSize:13,outline:"none"}}/></div>
            ))}
            <div><label style={{display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:6}}>Weekly Update Summary</label>
            <textarea value={form.update} onChange={e=>setForm(f=>({...f,update:e.target.value}))} placeholder="What happened this week?" rows={3} style={{width:"100%",boxSizing:"border-box",background:"#0a0a0f",border:"1px solid #ffffff15",borderRadius:8,padding:"10px 13px",color:"#e8e4d9",fontSize:13,outline:"none",resize:"vertical"}}/></div>
            <div><label style={{display:"block",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8478",marginBottom:6}}>Project Status</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{STATUS_TYPES.map(s=><button key={s} onClick={()=>setForm(f=>({...f,status:s}))} style={{padding:"5px 12px",border:form.status===s?"1px solid "+sC(s):"1px solid #ffffff15",borderRadius:6,background:form.status===s?sC(s)+"15":"#0a0a0f",color:form.status===s?sC(s):"#8a8478",fontSize:11,cursor:"pointer"}}>{s}</button>)}</div></div>
          </div>
          <div style={{marginTop:16,padding:"10px 14px",background:"#00b4d808",border:"1px solid #00b4d825",borderRadius:8,fontSize:12,color:"#8a8478"}}>
            💡 <span style={{color:"#e8e4d9"}}>Sample:</span> Canvas LMS · Salesforce CRM · DISD stakeholder update emails
          </div>
          <button onClick={()=>setStep("result")} style={{width:"100%",marginTop:16,padding:13,background:"linear-gradient(135deg,#00b4d8,#0096c7)",border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer"}}>Generate 4 Stakeholder Emails →</button>
        </div>
        <div style={{background:"#111118",border:"1px dashed #ffffff15",borderRadius:16,padding:60,textAlign:"center",color:"#8a8478"}}>
          <div style={{fontSize:40,marginBottom:16}}>📧</div>
          <div style={{fontSize:15,marginBottom:8,color:"#c8c4b9"}}>4 tailored emails generated instantly</div>
          {["Executive / C-Suite","District Administrator","IT Team","End Users / Staff"].map((a,i)=><div key={i} style={{fontSize:12,marginBottom:4}}>· {a}</div>)}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div><div style={{fontSize:11,color:"#00b4d8",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6}}>Emails Generated</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#e8e4d9"}}>Canvas LMS — DISD Phase 1 Update</div></div>
        <button onClick={()=>setStep("form")} style={{padding:"9px 18px",background:"transparent",border:"1px solid #00b4d840",borderRadius:8,color:"#00b4d8",cursor:"pointer",fontSize:13}}>← New Email Set</button>
      </div>
      <div style={{padding:"10px 14px",background:"#ffd46010",border:"1px solid #ffd46030",borderRadius:8,fontSize:12,color:"#ffd460",marginBottom:20}}>
        ⚡ Sample output based on real DISD Canvas implementation — contact Amon for custom generation
      </div>
      <div style={{background:"#111118",border:"1px solid #ffffff10",borderRadius:16,overflow:"hidden"}}>
        <div style={{display:"flex",borderBottom:"1px solid #ffffff10"}}>
          {DEMO_EMAILS.map((e,i)=><button key={i} onClick={()=>setActiveTab(i)} style={{flex:1,padding:"12px 4px",background:activeTab===i?"#00b4d8":"transparent",border:"none",borderRight:i<3?"1px solid #ffffff10":"none",color:activeTab===i?"#fff":"#8a8478",cursor:"pointer",fontSize:9,letterSpacing:"0.05em",textTransform:"uppercase"}}>{e.audience.split(" / ")[0]}</button>)}
        </div>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div><div style={{fontSize:10,color:"#00b4d8",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:3}}>{DEMO_EMAILS[activeTab].audience}</div>
            <div style={{fontSize:11,color:"#8a8478"}}>Tone: <span style={{color:"#ffd460"}}>{DEMO_EMAILS[activeTab].tone}</span></div></div>
            <button onClick={copy} style={{padding:"7px 14px",background:copied?"#00b4d820":"transparent",border:"1px solid "+(copied?"#00b4d8":"#ffffff20"),borderRadius:6,color:copied?"#00b4d8":"#8a8478",cursor:"pointer",fontSize:11}}>{copied?"✓ Copied!":"Copy"}</button>
          </div>
          <div style={{background:"#0a0a0f",borderRadius:9,padding:14,marginBottom:10}}>
            <div style={{fontSize:9,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>Subject Line</div>
            <div style={{color:"#e8e4d9",fontSize:13,fontWeight:500}}>{DEMO_EMAILS[activeTab].subject}</div>
          </div>
          <div style={{background:"#0a0a0f",borderRadius:9,padding:14}}>
            <div style={{fontSize:9,color:"#ffd460",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>Email Body</div>
            <div style={{color:"#c8c4b9",fontSize:13,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{DEMO_EMAILS[activeTab].body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}