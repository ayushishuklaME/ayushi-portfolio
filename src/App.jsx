import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Contributions", "GSoC", "Skills", "Certificates", "Contact"];

const PR_DATA = [
  { id: "PR #28457", status: "Merged", color: "#00ff9d", title: "Fixed undefined variable 'i' in moveViews.py", desc: "Fixed runtime NameError affecting TechDraw conversion utilities using enumerate()", repo: "FreeCAD/FreeCAD" },
  { id: "PR #29118", status: "Merged", color: "#00ff9d", title: "Removed duplicate moveViews.py", desc: "Cleaned src/Mod/TechDraw/ as suggested by TechDraw maintainer WandererFan", repo: "FreeCAD/FreeCAD" },
  { id: "PR #29646", status: "Draft", color: "#ffcc00", title: "Automated GD&T Annotation Tool prototype", desc: "GDTFeatureDetector.py using Part.Shape geometry to detect cylinders, planes, cones — maps to ASME Y14.5 symbols", repo: "FreeCAD/FreeCAD" },
];

const SKILLS = [
  { category: "Programming", items: ["Python (OOP)", "C++ (basics)", "HTML/CSS"] },
  { category: "CAD & Engineering", items: ["FreeCAD", "AutoCAD", "GD&T (ASME Y14.5)", "3D Modeling"] },
  { category: "Frameworks & Tools", items: ["PySide2/Qt", "FreeCAD Python API", "Git", "GitHub"] },
  { category: "Standards", items: ["ASME Y14.5-2018", "ISO GPS", "Engineering Drawing"] },
];

const ACHIEVEMENTS = [
  "2 PRs merged into FreeCAD main branch within first month of open source contribution",
  "Draft PR #29646 received direct technical feedback from TechDraw maintainer WandererFan",
  "Personally contacted by FreeCAD core maintainer chennes regarding GSoC presentation opportunity",
  "Active contributor on FreeCAD Forum (GSoC 2026 section) and official FreeCAD Discord server",
  "Submitted agenda item to FreeCAD Developer Meeting repository for project presentation",
];

const GSOC_FEATURES = [
  { icon: "⬡", title: "Feature Detector", desc: "Part.Shape geometry analysis — classifies cylinders, planes, cones, holes" },
  { icon: "◈", title: "PySide2 Task Panel", desc: "Filtered symbol selector, tolerance input, datum reference fields" },
  { icon: "◻", title: "SVG Symbol Library", desc: "14-symbol ASME Y14.5-2018 path-based library for cross-platform rendering" },
  { icon: "⊞", title: "JSON Exporter", desc: "Structured annotation data output for engineering drawings" },
];

const CERT_DATA = [
  {
    id: 1, icon: "🐍", color: "#0062ff", accent: "#4d9fff",
    title: "Python 101 for Data Science",
    issuer: "IBM · Cognitive Class",
    date: "May 10, 2026",
    bg: "linear-gradient(135deg, #00070f 0%, #001233 60%, #0062ff18 100%)",
    logo: "IBM",
    logoColor: "#4d9fff",
  },
  {
    id: 2, icon: "☁️", color: "#4285f4", accent: "#a8c7fa",
    title: "Digital Transformation with Google Cloud",
    issuer: "Google Cloud · SimpliLearn",
    date: "May 9, 2026",
    bg: "linear-gradient(135deg, #020810 0%, #0a1628 60%, #4285f418 100%)",
    logo: "Google Cloud",
    logoColor: "#4285f4",
  },
  {
    id: 3, icon: "▶", color: "#34a853", accent: "#81c995",
    title: "Play Store Listing Certificate",
    issuer: "Google Play Academy",
    date: "Apr 25, 2026",
    valid: "Valid · Apr 25, 2029",
    bg: "linear-gradient(135deg, #020d05 0%, #0a2010 60%, #34a85318 100%)",
    logo: "Google Play",
    logoColor: "#34a853",
  },
  {
    id: 4, icon: "🤖", color: "#cc785c", accent: "#e8a98e",
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    bg: "linear-gradient(135deg, #0d0804 0%, #1a0e09 60%, #cc785c18 100%)",
    logo: "ANTHROPIC",
    logoColor: "#cc785c",
  },
  {
    id: 5, icon: "🛡", color: "#00b4d8", accent: "#90e0ef",
    title: "Advanced Cybersecurity Awareness",
    issuer: "IIT Kanpur · #CyberJagritBharat",
    date: "Dec 13, 2025",
    bg: "linear-gradient(135deg, #020a0d 0%, #071c22 60%, #00b4d818 100%)",
    logo: "IIT KANPUR",
    logoColor: "#00b4d8",
  },
  {
    id: 6, icon: "🗣", color: "#f4a261", accent: "#fcd5ae",
    title: "Spoken English Course",
    issuer: "SimpliLearn SkillUp",
    date: "Dec 4, 2025",
    bg: "linear-gradient(135deg, #0d0800 0%, #1f1000 60%, #f4a26118 100%)",
    logo: "simplilearn",
    logoColor: "#f4a261",
  },
  {
    id: 7, icon: "💻", color: "#9b5de5", accent: "#c77dff",
    title: "Certificate of Participation — Quiz",
    issuer: "DigiCoders · VIT Kanpur",
    date: "Nov 24, 2025",
    bg: "linear-gradient(135deg, #070210 0%, #130520 60%, #9b5de518 100%)",
    logo: "DigiCoders",
    logoColor: "#9b5de5",
  },
  {
    id: 8, icon: "📝", color: "#ff6b35", accent: "#ffb599",
    title: "Internship Common Aptitude Test",
    issuer: "ICAT",
    date: "Nov 13, 2025",
    bg: "linear-gradient(135deg, #0d0300 0%, #1f0800 60%, #ff6b3518 100%)",
    logo: "ICAT",
    logoColor: "#ff6b35",
  },
];

function CertCard({ cert }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: cert.bg,
      borderRadius: 12,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Corner decoration */}
      <div style={{ position:"absolute", top:0, right:0, width:80, height:80, background:`radial-gradient(circle at top right, ${cert.color}22, transparent 70%)` }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:60, height:60, background:`radial-gradient(circle at bottom left, ${cert.color}15, transparent 70%)` }} />

      {/* Top border line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />

      {/* Watermark seal */}
      <div style={{
        position:"absolute", right:14, bottom:14,
        width:48, height:48, borderRadius:"50%",
        border:`2px solid ${cert.color}33`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"1.3rem", opacity:0.4,
      }}>✦</div>

      {/* Logo / Issuer */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:".72rem", letterSpacing:".1em",
          color: cert.logoColor, textTransform:"uppercase",
          background:`${cert.color}18`, padding:"3px 10px",
          borderRadius:4, border:`1px solid ${cert.color}33`,
        }}>{cert.logo}</span>
        <span style={{ fontSize:"1.4rem" }}>{cert.icon}</span>
      </div>

      {/* Center content */}
      <div style={{ margin:"14px 0 8px" }}>
        <p style={{ fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", color:cert.accent, opacity:0.7, marginBottom:6 }}>
          CERTIFICATE OF COMPLETION
        </p>
        <p style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:".88rem", color:"#ffffff", lineHeight:1.35,
          marginBottom:6,
        }}>{cert.title}</p>
        <p style={{ fontSize:".7rem", color: cert.accent, opacity:0.85 }}>
          Ayushi Shukla
        </p>
      </div>

      {/* Bottom */}
      <div style={{ borderTop:`1px solid ${cert.color}22`, paddingTop:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <p style={{ fontSize:".65rem", color:"#ffffff55", letterSpacing:".04em" }}>{cert.issuer}</p>
          {cert.valid && <p style={{ fontSize:".6rem", color:cert.accent, marginTop:3 }}>{cert.valid}</p>}
        </div>
        <span style={{
          fontSize:".62rem", color:cert.color,
          background:`${cert.color}15`, border:`1px solid ${cert.color}33`,
          borderRadius:4, padding:"2px 8px", whiteSpace:"nowrap",
        }}>{cert.date}</span>
      </div>
    </div>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(38px)", transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${delay}s, transform .75s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [typed, setTyped] = useState("");
  const [flipped, setFlipped] = useState(null);
  const fullTitle = "Open Source Contributor · GSSoC '26 · Mechanical Engineer";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setTyped(fullTitle.slice(0, i + 1)); i++; if (i >= fullTitle.length) clearInterval(t); }, 36);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY + 120;
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) setActiveNav(id);
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { setActiveNav(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div style={{ fontFamily: "'DM Mono',monospace", background: "#020c08", color: "#d4f5e0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        ::selection{background:#00ff9d22;color:#00ff9d}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#020c08}::-webkit-scrollbar-thumb{background:#00ff9d44;border-radius:2px}
        .nl{cursor:pointer;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#4d8a68;transition:color .2s;padding-bottom:3px;border-bottom:1px solid transparent}
        .nl:hover,.nl.on{color:#00ff9d;border-color:#00ff9d55}
        .card{background:#040f09;border:1px solid #0b2718;border-radius:14px;padding:22px 24px;transition:border-color .3s,transform .3s}
        .card:hover{border-color:#00ff9d33;transform:translateY(-4px)}
        .btn{display:inline-block;border:1px solid #00ff9d44;color:#00ff9d;padding:11px 26px;border-radius:6px;font-family:inherit;font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .2s,border-color .2s;text-decoration:none}
        .btn:hover{background:#00ff9d12;border-color:#00ff9d99}
        .pill{background:#040f09;border:1px solid #0b2718;border-radius:20px;padding:5px 14px;font-size:.71rem;letter-spacing:.04em;color:#7ab894;transition:border-color .2s,color .2s}
        .pill:hover{border-color:#00ff9d44;color:#00ff9d}
        .ach{display:flex;gap:14px;align-items:flex-start;padding:15px 0;border-bottom:1px solid #0b2718}
        .ach:last-child{border-bottom:none}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes glow{0%,100%{box-shadow:0 0 6px #00ff9d,0 0 14px #00ff9d44}50%{box-shadow:0 0 12px #00ff9d,0 0 28px #00ff9d77}}
        .dot{width:7px;height:7px;border-radius:50%;background:#00ff9d;animation:glow 2s infinite;flex-shrink:0}
        .gbg{position:absolute;inset:0;background-image:linear-gradient(#00ff9d07 1px,transparent 1px),linear-gradient(90deg,#00ff9d07 1px,transparent 1px);background-size:64px 64px}
        .sl{font-size:.65rem;letter-spacing:.24em;text-transform:uppercase;color:#00ff9d;margin-bottom:10px}
        .badge{display:inline-flex;align-items:center;gap:5px;padding:2px 10px;border-radius:4px;font-size:.67rem;letter-spacing:.06em;font-weight:500}
        .flip-card{cursor:pointer;perspective:1000px;height:200px}
        .flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.16,1,.3,1)}
        .flip-inner.flipped{transform:rotateY(180deg)}
        .flip-front,.flip-back{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px}
        .flip-back{transform:rotateY(180deg)}
        .cert-hover{transition:transform .3s,box-shadow .3s}
        .cert-hover:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,background:"#020c08f0",backdropFilter:"blur(16px)",borderBottom:"1px solid #0b2718" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5vw",height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"1.05rem",letterSpacing:"-.03em" }}>
            <span style={{ color:"#00ff9d" }}>A</span>yushi<span style={{ color:"#00ff9d" }}>.</span>
          </span>
          <div style={{ display:"flex",gap:22,flexWrap:"wrap" }}>
            {NAV_LINKS.map(l => <span key={l} className={`nl${activeNav===l?" on":""}`} onClick={() => go(l)}>{l}</span>)}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="About" style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",padding:"0 5vw" }}>
        <div className="gbg" />
        <div style={{ position:"absolute",top:"15%",right:"5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,#00ff9d08 0%,transparent 68%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1100,margin:"0 auto",width:"100%",paddingTop:80,position:"relative",zIndex:1 }}>
          <Reveal>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:30 }}>
              <div className="dot" />
              <span style={{ fontSize:".67rem",letterSpacing:".2em",color:"#00ff9d",textTransform:"uppercase" }}>Open for GSoC 2026 · FreeCAD</span>
            </div>
            <p className="sl">B.Tech Mechanical Engineering · VIT Kanpur · AKTU · 2024–2028</p>
            <h1 style={{ fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"clamp(3rem,8vw,5.8rem)",lineHeight:1.02,letterSpacing:"-.04em",marginBottom:18 }}>
              Ayushi<br /><span style={{ color:"#00ff9d" }}>Shukla</span>
            </h1>
            <p style={{ fontSize:"clamp(.78rem,1.4vw,.92rem)",color:"#4d8a68",maxWidth:560,lineHeight:1.75,marginBottom:38,fontStyle:"italic",minHeight:"1.75em" }}>
              {typed}<span style={{ animation:"blink 1s infinite",color:"#00ff9d" }}>▋</span>
            </p>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <a href="https://github.com/ayushishuklaMe" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="https://linkedin.com/in/ayushi-shukla-9b1402385" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
              <a href="mailto:ayushishukla775@gmail.com" className="btn">Email</a>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:14,marginTop:60,maxWidth:600 }}>
              {[["2","PRs Merged"],["8","Certificates"],["GSSoC '26","Contributor"],["FreeCAD","Core Project"]].map(([v,l]) => (
                <div key={l} className="card" style={{ padding:"18px 20px" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.55rem",color:"#00ff9d",lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:".68rem",color:"#4d8a68",marginTop:7,letterSpacing:".06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTRIBUTIONS */}
      <section id="Contributions" style={{ padding:"100px 5vw" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <Reveal>
            <p className="sl">Open Source · FreeCAD</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:10 }}>Pull Requests</h2>
            <p style={{ color:"#4d8a68",fontSize:".83rem",marginBottom:52,maxWidth:480,lineHeight:1.7 }}>Contributing to FreeCAD — Open Source Parametric CAD software (freecad.org)</p>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:18 }}>
            {PR_DATA.map((pr, i) => (
              <Reveal key={pr.id} delay={i * 0.1}>
                <div className="card" style={{ height:"100%" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                    <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".9rem",color:"#00ff9d" }}>{pr.id}</span>
                    <span className="badge" style={{ background:pr.status==="Merged"?"#00ff9d15":"#ffcc0015",color:pr.color,border:`1px solid ${pr.color}33` }}>
                      {pr.status==="Merged"?"✓":"◎"} {pr.status}
                    </span>
                  </div>
                  <p style={{ fontSize:".82rem",fontWeight:500,color:"#c4ebd4",marginBottom:10,lineHeight:1.5 }}>{pr.title}</p>
                  <p style={{ fontSize:".75rem",color:"#4d8a68",lineHeight:1.65 }}>{pr.desc}</p>
                  <div style={{ marginTop:16,fontSize:".67rem",color:"#2d6048",letterSpacing:".06em" }}>⊞ {pr.repo}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="card" style={{ marginTop:36 }}>
              <p className="sl" style={{ marginBottom:4 }}>Community Impact</p>
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} className="ach">
                  <span style={{ color:"#00ff9d",fontSize:".7rem",marginTop:3,flexShrink:0 }}>◆</span>
                  <span style={{ fontSize:".8rem",color:"#7ab894",lineHeight:1.65 }}>{a}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GSOC */}
      <section id="GSoC" style={{ padding:"100px 5vw",background:"#030e07" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <Reveal>
            <p className="sl">GSSoC '26 Project</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:8 }}>Automated GD&T<br />Annotation Tool</h2>
            <p style={{ color:"#4d8a68",fontSize:".83rem",marginBottom:14,maxWidth:560,lineHeight:1.7 }}>
              A FreeCAD Python module to automate GD&T annotation in engineering drawings — estimated 60–70% reduction in manual annotation steps.
            </p>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:52 }}>
              {["FreeCAD","Python","PySide2","ASME Y14.5","TechDraw Workbench"].map(t => (
                <span key={t} style={{ background:"#00ff9d12",border:"1px solid #00ff9d2a",color:"#00ff9d",borderRadius:4,padding:"2px 10px",fontSize:".68rem",letterSpacing:".06em" }}>{t}</span>
              ))}
            </div>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16 }}>
            {GSOC_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.09}>
                <div className="card">
                  <div style={{ fontSize:"1.5rem",marginBottom:12,color:"#00ff9d" }}>{f.icon}</div>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",color:"#c4ebd4",marginBottom:8 }}>{f.title}</p>
                  <p style={{ fontSize:".75rem",color:"#4d8a68",lineHeight:1.65 }}>{f.desc}</p>
                </div>
          </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" style={{ padding:"100px 5vw" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <Reveal>
            <p className="sl">Technical</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:52 }}>Skills & Tools</h2>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20 }}>
            {SKILLS.map((s, i) => (
              <Reveal key={s.category} delay={i * 0.1}>
                <div className="card">
                  <p style={{ fontSize:".68rem",letterSpacing:".18em",textTransform:"uppercase",color:"#00ff9d",marginBottom:16 }}>{s.category}</p>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {s.items.map(item => <span key={item} className="pill">{item}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="card" style={{ marginTop:20 }}>
              <p className="sl">Education</p>
              <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
                <div>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"#c4ebd4" }}>B.Tech — Mechanical Engineering</p>
                  <p style={{ fontSize:".78rem",color:"#4d8a68",marginTop:5 }}>Vision Institute of Technology · AKTU · Uttar Pradesh</p>
                  <p style={{ fontSize:".74rem",color:"#2d6048",marginTop:8 }}>Engineering Drawing · GD&T · Manufacturing Processes · CAD · Python</p>
                </div>
                <span style={{ fontSize:".75rem",color:"#2d6048",whiteSpace:"nowrap" }}>2024 — 2028</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="Certificates" style={{ padding:"100px 5vw", background:"#030e07" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <Reveal>
            <p className="sl">Achievements</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:10 }}>
              Licenses & Certificates
            </h2>
            <p style={{ color:"#4d8a68",fontSize:".83rem",marginBottom:52,maxWidth:480,lineHeight:1.7 }}>
              8 certifications across Cloud, AI, Cybersecurity, Data Science & more
            </p>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:18 }}>
            {CERT_DATA.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.07}>
                <div className="flip-card cert-hover" onClick={() => setFlipped(flipped === cert.id ? null : cert.id)}>
                  <div className={`flip-inner${flipped === cert.id ? " flipped" : ""}`}>

                    {/* FRONT — designed certificate */}
                    <div className="flip-front">
                      <CertCard cert={cert} />
                    </div>

                    {/* BACK — details */}
                    <div className="flip-back" style={{
                      background: cert.bg,
                      border:`1px solid ${cert.color}44`,
                      padding:"20px",
                      display:"flex", flexDirection:"column",
                      justifyContent:"center", alignItems:"center", gap:12,
                      textAlign:"center",
                    }}>
                      <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${cert.color},transparent)` }} />
                      <span style={{ fontSize:"2rem" }}>{cert.icon}</span>
                      <div>
                        <p style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"#fff",lineHeight:1.4,marginBottom:6 }}>{cert.title}</p>
                        <p style={{ fontSize:".72rem",color:cert.accent,marginBottom:4 }}>{cert.issuer}</p>
                        <p style={{ fontSize:".68rem",color:`${cert.color}bb` }}>{cert.date}</p>
                        {cert.valid && <p style={{ fontSize:".65rem",color:cert.accent,marginTop:4,opacity:.8 }}>{cert.valid}</p>}
                      </div>
                      <div style={{
                        marginTop:6, padding:"5px 14px",
                        background:`${cert.color}15`, border:`1px solid ${cert.color}44`,
                        borderRadius:20, fontSize:".64rem", color:cert.color, letterSpacing:".08em",
                      }}>VERIFIED ✦</div>
                    </div>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats row */}
          <Reveal delay={0.25}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14,marginTop:48 }}>
              {[["8","Total Certs"],["3","Google · IBM"],["1","IIT Kanpur"],["1","Anthropic"]].map(([v,l]) => (
                <div key={l} className="card" style={{ padding:"16px 20px",textAlign:"center" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#00ff9d" }}>{v}</div>
                  <div style={{ fontSize:".68rem",color:"#4d8a68",marginTop:6,letterSpacing:".06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={{ padding:"100px 5vw 80px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <Reveal>
            <p className="sl">Get in touch</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.8rem)",marginBottom:12 }}>Let's Connect</h2>
            <p style={{ color:"#4d8a68",fontSize:".85rem",maxWidth:460,lineHeight:1.7,marginBottom:44 }}>Open to open source collaboration, GSoC mentorship, and engineering opportunities.</p>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <a href="mailto:ayushishukla775@gmail.com" className="btn">ayushishukla775@gmail.com</a>
              <a href="https://github.com/ayushishuklaMe" target="_blank" rel="noreferrer" className="btn">github.com/ayushishuklaMe</a>
              <a href="https://linkedin.com/in/ayushi-shukla-9b1402385" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #0b2718",padding:"22px 5vw",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
        <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".9rem" }}><span style={{ color:"#00ff9d" }}>A</span>yushi<span style={{ color:"#00ff9d" }}>.</span></span>
        <span style={{ fontSize:".68rem",color:"#2d6048",letterSpacing:".08em" }}>GSSoC '26 · FreeCAD Contributor · Kanpur, India</span>
      </footer>
    </div>
  );
                }
    
