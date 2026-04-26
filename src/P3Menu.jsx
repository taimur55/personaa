import { useState, useEffect } from "react";

const ITEMS = [
  { id: "about",  label: "ABOUT ME",    href: "about",    fontSize: 130, offsetX: 0,  offsetY: 0  },
  { id: "resume", label: "RESUME",      href: "resume",   fontSize: 108, offsetX: 38, offsetY: -8 },
  { id: "socials", label: "GITHUB LINK", href: "socials",  fontSize: 88, offsetX: 14, offsetY: -6 },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px ${h*0.06}px, ${w - h*0.55}px 0px, ${w}px ${h*0.42}px, ${w - h*0.18}px ${h}px, 0px ${h*0.94}px)`,
  (w, h) => `polygon(${h*0.12}px 0px, ${w - h*0.3}px ${h*0.04}px, ${w}px ${h*0.5}px, ${w - h*0.08}px ${h}px, 0px ${h*0.88}px)`,
  (w, h) => `polygon(0px ${h*0.1}px, ${w - h*0.4}px 0px, ${w}px ${h*0.45}px, ${w - h*0.25}px ${h}px, ${h*0.05}px ${h*0.9}px)`,
];

export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter")     onNavigate(ITEMS[active].href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onNavigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .p3-menu-container {
          position: relative;
          z-index: 20;
          padding-left: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 0.8;
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
          margin-bottom: 10px;
        }

        .p3-row.mounted { opacity: 1; transform: translateX(0); }

        .p3-highlight {
          position: absolute;
          left: -48px;
          background: #f38493;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .p3-row.active .p3-highlight { transform: scaleX(1); }

        .p3-label {
          font-family: 'Bebas Neue', sans-serif;
          color: #2a5ca8;
          transition: color 0.2s ease;
        }

        .p3-row.active .p3-label { color: #ffffff; }
      `}</style>

      {/* The Name Tag - Fixed zIndex here */}
      <div className="p3-name-tag" style={{ 
        position: 'absolute', 
        top: '40px', 
        left: '40px', 
        color: 'white', 
        fontFamily: 'Bebas Neue', 
        fontSize: '80px', 
        zIndex: 30 
      }}>
        PERSONA
      </div>

      <nav className="p3-menu-container">
        {ITEMS.map((item, i) => {
          const isActive = active === i;
          const estW = item.label.length * item.fontSize * 0.55 + 60;
          const estH = item.fontSize * 0.9;
          const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

          return (
            <div
              key={item.id}
              className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
              style={{ 
                marginLeft: item.offsetX, 
                marginTop: item.offsetY,
                transitionDelay: `${i * 80}ms` 
              }}
              onMouseEnter={() => setActive(i)}
              onClick={() => onNavigate(item.href)}
            >
              <div 
                className="p3-highlight" 
                style={{ 
                  width: estW, 
                  height: estH, 
                  clipPath: clipFn(estW, estH) 
                }} 
              />
              <span className="p3-label" style={{ fontSize: item.fontSize }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
    </>
  );
}
