import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main3.mp4";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "CURRENT", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PAST",    color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "EXTRA",   color: "#ff4a8f", bg: "rgba(255,74,143,0.12)", border: "rgba(255,74,143,0.5)" },
];

// Added the "descriptions" arrays so the expanding box has text!
const ITEMS = [
  {
    id: "university", label: "UNIVERSITY", icon: "🎓", barIcon: icon1, bars: 4, newBars: [0], 
    dates: ["2023", "2023", "2022", "2022"],
    achievements: [
      "Dean's List / First Class Honours", 
      "Engineering Society Project Lead", 
      "Robotics Competition Finalist", 
      "Top Grade in Kinematics Module"
    ],
    descriptions: [
      "Awarded for maintaining a top-tier GPA across all core Mechatronics modules.",
      "Led a team of 15 students to build a fully autonomous line-following robot.",
      "Placed in the top 10 out of 50+ university teams in the national robotics arena.",
      "Achieved 98% in the final examination for complex kinematic equations."
    ],
    stats: [
      { tag: "YEAR", value: "3RD", color: "#9147ff" },
      { tag: "AWDS", value: "04",  color: "#bf94ff" },
    ],
  },
  {
    id: "secondary", label: "SECONDARY", icon: "🏫", barIcon: icon2, bars: 3, newBars: [], 
    dates: ["2021", "2021", "2019"],
    achievements: [
      "A* A A in Advanced Levels", 
      "Head Boy / Student Prefect", 
      "Gold in National Math Challenge"
    ],
    descriptions: [
      "Achieved top grades in Mathematics, Physics, and Further Mathematics.",
      "Elected by peers and teachers to represent the student body and lead assemblies.",
      "Scored in the top 1% nationally in the UKMT Senior Mathematical Challenge."
    ],
    stats: [
      { tag: "ALVL", value: "03", color: "#e1306c" },
      { tag: "GCSE", value: "13", color: "#f77737" },
    ],
  },
  {
    id: "misc", label: "MISC", icon: "🏆", barIcon: icon3, bars: 4, newBars: [0, 1], 
    dates: ["2024", "2023", "2021", "2019"],
    achievements: [
      "AWS Cloud Practitioner Cert", 
      "SolidWorks CSWA Certified", 
      "Duke of Edinburgh Gold Award", 
      "Grade 8 Piano Examination"
    ],
    descriptions: [
      "Certified in foundational cloud concepts, security, and AWS infrastructure.",
      "Passed the Certified SolidWorks Associate exam for 3D mechanical design.",
      "Completed a 4-day wilderness expedition and 12 months of community volunteering.",
      "Achieved distinction in the ABRSM Grade 8 practical piano assessment."
    ],
    stats: [
      { tag: "CERT", value: "02", color: "#00f2ea" },
      { tag: "XTRA", value: "04", color: "#ff0050" },
    ],
  },
];

export default function Achievements() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); 
  const [isExpanded, setIsExpanded]       = useState(false); // Tracks if the accordion is open
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Reset the expansion state if you switch the main left category
  useEffect(() => {
    setIsExpanded(false);
    setActiveInfoBar(0);
  }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      // 1. If Accordion is open, Left Arrow or Esc closes the accordion ONLY.
      if (focus === "right" && isExpanded && (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace")) {
        setIsExpanded(false);
        return; // Stops execution so it doesn't navigate away
      }

      // 2. Main Navigation Logic
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        // Left/Esc backs out of the page completely
        if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") navigate(-1);
      
      } else if (focus === "right") {
        const barCount = ITEMS[active].bars;
        // Navigating up and down works whether expanded or closed!
        if (e.key === "ArrowUp")    setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        
        if (!isExpanded) {
          if (e.key === "ArrowLeft") setFocus("left");
          if (e.key === "Enter") setIsExpanded(true); // Open the accordion
          if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
        } else {
          // If already expanded, hitting Enter again closes it
          if (e.key === "Enter") setIsExpanded(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, focus, isExpanded, navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');
        
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        
        .sc-root.unfocused {
          opacity: 0.4;
          filter: grayscale(60%);
        }

        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .sc-info-panel {
          position: fixed;
          top: 132px;
          right: 0;
          left: 55%; 
          bottom: 84px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px 8px 8px 0;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: none;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .sc-info-panel.unfocused {
          opacity: 0.35;
          filter: grayscale(60%);
        }

        /* --- THE ACCORDION BOX STYLES --- */
        .sc-info-bar-wrap {
          position: relative;
          width: 100%;
          height: 46px; /* Default collapsed height */
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 1;
          padding: 0;
          overflow: hidden;
          /* Smooth accordion opening */
          transition: height 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, padding 0.3s;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        
        /* The Expanded State */
        .sc-info-bar-wrap.expanded {
          height: 140px; /* Opens up the box */
        }

        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          flex-direction: column; /* Stack the top row and description */
          align-items: flex-start;
          overflow: hidden;
        }
        
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: 7px;
        }

        /* The Top Row of the Accordion */
        .sc-info-bar-top {
          display: flex;
          align-items: center;
          width: 100%;
          height: 43px; /* Keeps the title locked to the top */
          flex-shrink: 0;
        }

        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }

        /* The Description Text */
        .sc-info-bar-desc {
          width: 100%;
          padding: 6px 20px 10px 54px; /* Lines up exactly with the title text */
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 21px;
          color: #444;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Fade the text in when expanded */
        .sc-info-bar-wrap.expanded .sc-info-bar-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 21px; 
          letter-spacing: 1.5px;
          color: #111;
          padding: 0 14px;
          user-select: none;
        }
        
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          border-radius: 6px;
          margin-right: 4px;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          margin-left: 14px;
          object-fit: contain;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 60px; 
        }

        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
        }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        @media (max-width: 768px) {
          .sc-info-bar-wrap:not(.expanded) {
            height: 38px !important;
          }
          .sc-info-bar-wrap.expanded {
            height: 160px !important; /* Mobile needs more height for text */
          }
          .sc-info-panel {
            top: min(47vh, 320px);
            left: 8px; right: 8px; bottom: 58px;
          }
        }
      `}</style>

      {/* LEFT PANEL */}
      <div className={`sc-root ${focus === "right" ? "unfocused" : ""}`} role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(i);
              setFocus("left");
            }} 
            onMouseEnter={() => {
              setActive(i);
              setFocus("left");
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL - ACCORDION STYLE */}
      {mounted && (
        <div className={`sc-info-panel ${focus === "left" ? "unfocused" : ""}`} key={`panel-${active}`}>
          {Array.from({ length: ITEMS[active].bars }).map((_, i) => {
            const isSelected = activeInfoBar === i;
            // The box only shows as "expanded" if it is currently selected AND the accordion is open
            const showExpanded = isSelected && isExpanded;

            return (
              <div
                className={`sc-info-bar-wrap ${isSelected ? "selected" : ""} ${showExpanded ? "expanded" : ""}`}
                key={`bar-${active}-${i}`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => {
                  if (isSelected) {
                    // If you click the one that's already selected, toggle it open/closed
                    setIsExpanded(!isExpanded); 
                  } else {
                    // If you click a different one, select it and auto-open it
                    setActiveInfoBar(i);
                    setIsExpanded(true);
                  }
                  setFocus("right");
                }} 
                onMouseEnter={() => {
                  // Hovering just highlights it, it doesn't auto-expand to prevent jarring jumps
                  setActiveInfoBar(i);
                  setFocus("right");
                }}
              >
                <div className="sc-info-bar">
                  {/* The Top Row (Icon, Title, Year) */}
                  <div className="sc-info-bar-top">
                    <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
                    <span className="sc-info-bar-text">{ITEMS[active].achievements[i]}</span>
                    <span className="sc-info-bar-box">YEAR</span>
                    <span className="sc-info-bar-count">{ITEMS[active].dates[i]}</span>
                  </div>
                  
                  {/* The Expanded Description */}
                  <div className="sc-info-bar-desc">
                    {ITEMS[active].descriptions[i]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER HINTS */}
      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>NAVIGATE</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>{isExpanded ? "CLOSE" : "INSPECT"}</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">{isExpanded ? "◄" : "ESC"}</span><span>BACK</span></div>
      </div>
    </div>
  );
}
