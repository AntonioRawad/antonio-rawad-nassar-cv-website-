"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { content, type Lang } from "@/lib/content";

/* ─────────────────────────────────────────────────────────────────────────
   Antonio Rawad Nassar — portfolio.
   Ported from the Claude Design handoff (biography-portfolio/project/app.jsx).
   Content lives in src/lib/content.ts · styles in src/app/{tokens,design}.css
   ───────────────────────────────────────────────────────────────────────── */

const SOC = content.social.links;

const RTL = (lang: Lang) => lang === "ar" || lang === "he";

/* ─── Social icons (single-stroke, Lucide-style) ─── */
function SocIcon({ k }: { k: string }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  if (k === "linkedin")
    return (
      <svg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="11" x2="8" y2="17" />
        <circle cx="8" cy="7.5" r="1" />
        <path d="M12 17v-4a2 2 0 0 1 4 0v4M12 11v6" />
      </svg>
    );
  if (k === "github")
    return (
      <svg {...p}>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  if (k === "fikra")
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M8 12h7" opacity=".7" />
        <circle cx="17" cy="6" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  if (k === "x")
    return (
      <svg {...p}>
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    );
  if (k === "mail")
    return (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </svg>
    );
  if (k === "phone")
    return (
      <svg {...p}>
        <path d="M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    );
  return null;
}

/* 3D tilt hook (desktop only, respects reduced-motion) */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-x", `${-y * intensity}deg`);
        el.style.setProperty("--tilt-y", `${x * intensity}deg`);
        el.style.setProperty("--pt-x", `${(x + 0.5) * 100}%`);
        el.style.setProperty("--pt-y", `${(y + 0.5) * 100}%`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", `0deg`);
      el.style.setProperty("--tilt-y", `0deg`);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);
  return ref;
}

/* IntersectionObserver reveal */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

function TiltCard({
  children,
  className = "",
  intensity = 8,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}) {
  const ref = useTilt(intensity);
  return (
    <div ref={ref} className={`tilt ${className}`} style={style}>
      <div className="tilt__inner">{children}</div>
    </div>
  );
}

/* ─── Glyphs ─── */
function Glyph({ kind }: { kind: string }) {
  const props = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  const map: Record<string, React.ReactElement> = {
    core: (
      <svg {...props}>
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="18" opacity=".5" />
        <circle cx="32" cy="32" r="26" opacity=".25" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
    finance: (
      <svg {...props}>
        <path d="M8 52 L20 36 L30 44 L44 24 L56 14" />
        <path d="M44 14h12v12" opacity=".6" />
        <line x1="8" y1="58" x2="56" y2="58" opacity=".3" />
      </svg>
    ),
    ai: (
      <svg {...props}>
        <circle cx="20" cy="20" r="3" />
        <circle cx="44" cy="20" r="3" />
        <circle cx="20" cy="44" r="3" />
        <circle cx="44" cy="44" r="3" />
        <circle cx="32" cy="32" r="3" />
        <path d="M20 20 L32 32 M44 20 L32 32 M20 44 L32 32 M44 44 L32 32" opacity=".5" />
      </svg>
    ),
    arch: (
      <svg {...props}>
        <rect x="8" y="38" width="14" height="18" />
        <rect x="25" y="22" width="14" height="34" />
        <rect x="42" y="32" width="14" height="24" />
        <line x1="8" y1="56" x2="56" y2="56" />
      </svg>
    ),
    node: (
      <svg {...props}>
        <circle cx="14" cy="14" r="4" />
        <circle cx="50" cy="14" r="4" />
        <circle cx="14" cy="50" r="4" />
        <circle cx="50" cy="50" r="4" />
        <circle cx="32" cy="32" r="5" />
        <path d="M14 14 L32 32 L50 14 M14 50 L32 32 L50 50" opacity=".4" />
      </svg>
    ),
    data: (
      <svg {...props}>
        <rect x="8" y="8" width="48" height="48" rx="2" />
        <line x1="8" y1="22" x2="56" y2="22" opacity=".4" />
        <line x1="22" y1="8" x2="22" y2="56" opacity=".4" />
        <rect x="26" y="28" width="8" height="20" opacity=".6" />
        <rect x="38" y="34" width="8" height="14" opacity=".4" />
      </svg>
    ),
    ship: (
      <svg {...props}>
        <path d="M10 28 L32 14 L54 28 L54 50 L10 50 Z" />
        <path d="M22 50 L22 36 L42 36 L42 50" opacity=".5" />
        <circle cx="32" cy="42" r="2" />
      </svg>
    ),
    edu: (
      <svg {...props}>
        <path d="M8 24 L32 14 L56 24 L32 34 Z" />
        <path d="M16 28 L16 42 Q32 50 48 42 L48 28" opacity=".5" />
        <line x1="56" y1="24" x2="56" y2="40" opacity=".4" />
      </svg>
    ),
    leaf: (
      <svg {...props}>
        <path d="M12 52 Q20 22 52 14 Q50 38 28 50 Q18 52 12 52 Z" />
        <path d="M30 30 L18 50" opacity=".5" />
      </svg>
    ),
    startup: (
      <svg {...props}>
        <path d="M32 6 C42 16 44 30 44 40 L20 40 C20 30 22 16 32 6 Z" />
        <circle cx="32" cy="23" r="4" />
        <path d="M20 40 L12 52 L20 47 M44 40 L52 52 L44 47" />
        <path d="M28 47 L28 56 M36 47 L36 56" opacity=".5" />
      </svg>
    ),
    lang: (
      <svg {...props}>
        <text x="6" y="28" fontSize="18" fill="currentColor" stroke="none" fontFamily="Outfit, sans-serif" fontWeight="600">
          Aa
        </text>
        <text x="6" y="56" fontSize="18" fill="currentColor" stroke="none" fontFamily="Cairo, sans-serif" fontWeight="600">
          عبر
        </text>
        <text x="36" y="28" fontSize="18" fill="currentColor" stroke="none" fontWeight="600">
          א
        </text>
      </svg>
    ),
  };
  return map[kind] || map.core;
}

/* ─── Hero Identity Panel — executive signature module ─── */
function HeroIdentityPanel({ lang }: { lang: Lang }) {
  const m = {
    en: {
      eyebrow: "Executive Profile",
      title: "C-Level Strategy & AI Transformation Advisor",
      meta: ["25+ years", "Israel", "International"],
      langs: ["AR", "EN", "HE", "IT"],
    },
    ar: {
      eyebrow: "الملف التنفيذي",
      title: "مستشار استراتيجية تنفيذية وتحوّل بالذكاء الاصطناعي",
      meta: ["+25 سنة", "إسرائيل", "دولي"],
      langs: ["AR", "EN", "HE", "IT"],
    },
    he: {
      eyebrow: "פרופיל מנהלים",
      title: "יועץ אסטרטגיה והובלת טרנספורמציה בבינה מלאכותית ברמת הנהלה",
      meta: ["+25 שנים", "ישראל", "בינלאומי"],
      langs: ["AR", "EN", "HE", "IT"],
    },
  }[lang];
  return (
    <div className="hero-identity">
      <div className="hero-identity__rim" aria-hidden="true" />
      <div className="hero-identity__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/antonio-portrait.png" alt="Antonio Rawad Nassar — C-Level Strategy & AI Transformation Advisor" loading="eager" />
        <div className="hero-identity__photo-grad" aria-hidden="true" />
        <div className="hero-identity__photo-edge hero-identity__photo-edge--cyan" aria-hidden="true" />
        <div className="hero-identity__photo-edge hero-identity__photo-edge--warm" aria-hidden="true" />
      </div>
      <div className="hero-identity__body">
        <span className="hero-identity__eyebrow">{m.eyebrow}</span>
        <p className="hero-identity__name display-face">Antonio Rawad Nassar</p>
        <p className="hero-identity__title">{m.title}</p>
        <div className="hero-identity__divider" aria-hidden="true" />
        <div className="hero-identity__meta">
          {m.meta.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
        <div className="hero-identity__langs" aria-label="Languages: Arabic, English, Hebrew, Italian">
          {m.langs.map((x, i) => (
            <b key={i}>{x}</b>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Clarity Engine (HTML pills + SVG curves; RTL-native) ─── */
function ClarityEngine({
  t,
  lang,
}: {
  t: { diagramTitle: string; diagramId: string; inputsLabel: string; outputsLabel: string; coreLabel: string; inputs: string[]; outputs: string[] };
  lang: Lang;
}) {
  const isRTL = RTL(lang);
  const inputs = t.inputs.slice(0, 5);
  const outputs = t.outputs.slice(0, 5);
  const N = 5;
  const yFor = (i: number) => 36 + i * 72;
  return (
    <div className="engine engine--v2" data-dir={isRTL ? "rtl" : "ltr"}>
      <div className="engine__head">
        <span>{t.diagramTitle}</span>
        <span className="engine__id mono">{t.diagramId}</span>
      </div>
      <div className="engine__body">
        <svg className="engine__connections" viewBox="0 0 400 360" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-flow-in" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(184,115,51,0)" />
              <stop offset="50%" stopColor="rgba(184,115,51,0.55)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0.7)" />
            </linearGradient>
            <linearGradient id="g-flow-out" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(0,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0)" />
            </linearGradient>
          </defs>
          <g opacity="0.10" stroke="#2A3548" strokeWidth="1">
            {[...Array(8)].map((_, i) => (
              <line key={"h" + i} x1="0" x2="400" y1={i * 45} y2={i * 45} />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={"v" + i} x1={i * 40} x2={i * 40} y1="0" y2="360" />
            ))}
          </g>
          {[...Array(N)].map((_, i) => (
            <path
              key={"ic" + i}
              d={`M 0 ${yFor(i)} C 120 ${yFor(i)}, 160 180, 200 180`}
              stroke="url(#g-flow-in)"
              strokeWidth="1.25"
              fill="none"
              className="engine__line"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
          {[...Array(N)].map((_, i) => (
            <path
              key={"oc" + i}
              d={`M 200 180 C 240 180, 280 ${yFor(i)}, 400 ${yFor(i)}`}
              stroke="url(#g-flow-out)"
              strokeWidth="1.25"
              fill="none"
              className="engine__line"
              style={{ animationDelay: `${i * 0.12 + 0.3}s` }}
            />
          ))}
        </svg>
        <div className="engine__grid">
          <div className="engine__col engine__col--in" aria-label={t.inputsLabel}>
            {inputs.map((label, i) => (
              <div key={i} className="engine__pill engine__pill--in" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="engine__dot engine__dot--warm" aria-hidden="true" />
                <span className="engine__label">{label}</span>
              </div>
            ))}
          </div>
          <div className="engine__core" aria-hidden="true">
            <div className="engine__halo" />
            <div className="engine__ring engine__ring--1" />
            <div className="engine__ring engine__ring--2" />
            <div className="engine__nucleus" />
            <div className="engine__core-label">{t.coreLabel}</div>
          </div>
          <div className="engine__col engine__col--out" aria-label={t.outputsLabel}>
            {outputs.map((label, i) => (
              <div key={i} className="engine__pill engine__pill--out" style={{ animationDelay: `${i * 70 + 300}ms` }}>
                <span className="engine__label">{label}</span>
                <span className="engine__dot engine__dot--cyan" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="engine__legend">
        <span className="engine__legend-k engine__legend-k--in">
          <span className="engine__legend-dot engine__legend-dot--warm" />
          {t.inputsLabel}
        </span>
        <span className="engine__legend-divider" aria-hidden="true" />
        <span className="engine__legend-k engine__legend-k--out">
          <span className="engine__legend-dot engine__legend-dot--cyan" />
          {t.outputsLabel}
        </span>
      </div>
    </div>
  );
}

/* ─── Nav ─── */
function Nav({ lang, setLang, onMenuOpen }: { lang: Lang; setLang: (l: Lang) => void; onMenuOpen: () => void }) {
  const c = content.nav[lang];
  const lbl = content.social.labels[lang];
  const items: [string, string][] = [
    ["#home", c.home],
    ["#about", c.about],
    ["#advisory", c.advisory],
    ["#projects", c.projects],
    ["#timeline", c.timeline],
    ["#contact", c.contact],
  ];
  return (
    <header className="nav">
      <div className="shell nav__inner">
        <a className="nav__brand" href="#home">
          <span className="nav__brand-mark">A·</span>
          <span>Antonio Rawad Nassar</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {items.map(([h, label]) => (
            <a key={h} href={h}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__soc" aria-label="Social links">
          <a href={SOC.linkedin} target="_blank" rel="noopener noreferrer" aria-label={lbl.linkedin}>
            <SocIcon k="linkedin" />
          </a>
          <a href={SOC.github} target="_blank" rel="noopener noreferrer" aria-label={lbl.github}>
            <SocIcon k="github" />
          </a>
          <a href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer" aria-label={lbl.fikra}>
            <SocIcon k="fikra" />
          </a>
          <a href={SOC.fikraX} target="_blank" rel="noopener noreferrer" aria-label={lbl.x}>
            <SocIcon k="x" />
          </a>
        </div>
        <div className="lang-switcher" role="tablist" aria-label="Language">
          {(["en", "ar", "he"] as const).map((code) => (
            <button
              key={code}
              data-lang={code}
              className={code === lang ? "is-active" : ""}
              onClick={() => setLang(code)}
              role="tab"
              aria-selected={code === lang}
            >
              {code === "en" ? "EN" : code === "ar" ? "عربي" : "עברית"}
            </button>
          ))}
        </div>
        <a className="nav__cta" href="#contact">
          {c.book}
        </a>
        <button className="nav__menu-btn" onClick={onMenuOpen} aria-label={c.menu}>
          ☰
        </button>
      </div>
    </header>
  );
}

function MobileDrawer({ open, onClose, lang, setLang }: { open: boolean; onClose: () => void; lang: Lang; setLang: (l: Lang) => void }) {
  const c = content.nav[lang];
  const lbl = content.social.labels[lang];
  const items: [string, string][] = [
    ["#home", c.home],
    ["#about", c.about],
    ["#advisory", c.advisory],
    ["#projects", c.projects],
    ["#ai", c.ai],
    ["#timeline", c.timeline],
    ["#contact", c.contact],
  ];
  return (
    <>
      <div className={"drawer-backdrop" + (open ? " is-open" : "")} onClick={onClose} />
      <aside className={"drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
        <button className="drawer__close" onClick={onClose}>
          ✕ {c.menu}
        </button>
        <nav className="drawer__links">
          {items.map(([h, label]) => (
            <a key={h} href={h} onClick={onClose}>
              {label}
            </a>
          ))}
        </nav>
        <div className="drawer__soc">
          <a href={SOC.linkedin} target="_blank" rel="noopener noreferrer" aria-label={lbl.linkedin}>
            <SocIcon k="linkedin" />
            LinkedIn
          </a>
          <a href={SOC.github} target="_blank" rel="noopener noreferrer" aria-label={lbl.github}>
            <SocIcon k="github" />
            GitHub
          </a>
          <a href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer" aria-label={lbl.fikra}>
            <SocIcon k="fikra" />
            Fikra AI
          </a>
          <a href={SOC.fikraX} target="_blank" rel="noopener noreferrer" aria-label={lbl.x}>
            <SocIcon k="x" />X
          </a>
          <a href={SOC.emailPrimary} aria-label={lbl.email}>
            <SocIcon k="mail" />
            Email
          </a>
        </div>
        <div className="lang-switcher" style={{ alignSelf: "flex-start", marginInlineStart: 0 }}>
          {(["en", "ar", "he"] as const).map((code) => (
            <button key={code} data-lang={code} className={code === lang ? "is-active" : ""} onClick={() => setLang(code)}>
              {code === "en" ? "EN" : code === "ar" ? "عربي" : "עברית"}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

/* ─── Floating Social Dock ─── */
function SocialDock({ lang }: { lang: Lang }) {
  const lbl = content.social.labels[lang];
  const items = [
    { k: "linkedin", href: SOC.linkedin, label: lbl.linkedin },
    { k: "github", href: SOC.github, label: lbl.github },
    { k: "fikra", href: SOC.fikraWebsite, label: lbl.fikra },
    { k: "x", href: SOC.fikraX, label: lbl.x },
    { k: "mail", href: SOC.emailPrimary, label: lbl.email },
  ];
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <aside className={"dock" + (shown ? " is-in" : "")} aria-label="Social dock">
      {items.map((it) => (
        <a
          key={it.k}
          href={it.href}
          target={it.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={it.label}
          data-tip={it.label}
        >
          <SocIcon k={it.k} />
        </a>
      ))}
    </aside>
  );
}

/* ─── Hero ─── */
function Hero({ lang }: { lang: Lang }) {
  const t = content.hero[lang];
  const trust = content.trust[lang];
  const lbl = content.social.labels[lang];
  return (
    <section className="hero shell" id="home">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__grid">
        <div>
          <span className="eyebrow">
            <span className="eyebrow__dot" />
            {t.eyebrow}
          </span>
          <h1 className="display-face">
            {t.h1Pre}
            <span className="accent">{t.h1Mid}</span>
            {t.h1Bridge}
            <span className="warm">{t.h1Tail}</span>
            {t.h1End}
          </h1>
          <p className="hero__sub">{t.sub}</p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#contact">
              {t.ctaPrimary}
              <span className="btn__arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="#advisory">
              {t.ctaSecondary}
            </a>
            <a className="btn btn--warm" href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer">
              {t.ctaTertiary}
            </a>
          </div>
          <div className="hero__soc">
            <a href={SOC.linkedin} target="_blank" rel="noopener noreferrer" aria-label={lbl.linkedin}>
              <SocIcon k="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a href={SOC.github} target="_blank" rel="noopener noreferrer" aria-label={lbl.github}>
              <SocIcon k="github" />
              <span>GitHub</span>
            </a>
            <a href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer" aria-label={lbl.fikra}>
              <SocIcon k="fikra" />
              <span>Fikra AI</span>
            </a>
            <a href={SOC.fikraX} target="_blank" rel="noopener noreferrer" aria-label={lbl.x}>
              <SocIcon k="x" />
              <span>@Fikra_ai</span>
            </a>
            <a href={SOC.emailPrimary} aria-label={lbl.email}>
              <SocIcon k="mail" />
              <span>rawadnassar@fikra-ai.net</span>
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <HeroIdentityPanel lang={lang} />
          <ClarityEngine t={t} lang={lang} />
        </div>
      </div>
      <div className="trust">
        {trust.map((it, i) => (
          <div key={i} className="trust__item">
            <span className="trust__k">{it.k}</span>
            <span className="trust__v">{it.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section head ─── */
function SectionHead({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <Reveal as="div" className="section-head">
      <div>
        <div className="section-head__kicker">{kicker}</div>
        <h2 className="section-head__title display-face">{title}</h2>
      </div>
      <p className="section-head__lead">{lead}</p>
    </Reveal>
  );
}

function Positioning({ lang }: { lang: Lang }) {
  const t = content.positioning[lang];
  return (
    <section className="section shell" id="about">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
    </section>
  );
}

/* ─── Four Questions — diagnostic path ─── */
function FourQuestions({ lang }: { lang: Lang }) {
  const t = content.four[lang];
  return (
    <section className="section shell">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
      <div className="four-path">
        <svg className="four-path__line" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="four-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#B87333" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 30 40 Q 200 0, 400 40 T 800 40 T 1170 40" fill="none" stroke="url(#four-grad)" strokeWidth="1.5" strokeDasharray="2 6" />
        </svg>
        <div className="four-path__row">
          {t.items.map((it, i) => (
            <Reveal key={i} delay={i * 120} as="article" className="four-step">
              <span className="four-step__num mono">0{i + 1}</span>
              <span className="four-step__pip" />
              <h3 className="four-step__q display-face">{it.q}</h3>
              <p className="four-step__a">{it.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Advisory Operating System ─── */
function AdvisoryOS({ lang }: { lang: Lang }) {
  const t = content.advisory[lang];
  return (
    <section className="section shell" id="advisory">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
      <div className="aos">
        <div className="aos__core" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <defs>
              <radialGradient id="aos-glow">
                <stop offset="0%" stopColor="rgba(0,255,255,0.45)" />
                <stop offset="60%" stopColor="rgba(0,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(0,255,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#aos-glow)" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(0,255,255,.10)" strokeDasharray="3 8" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(184,115,51,.18)" strokeDasharray="2 5" />
            <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(0,255,255,.35)" />
            <circle cx="200" cy="200" r="38" fill="rgba(4,7,13,.85)" stroke="#00FFFF" strokeWidth="1.2" />
            <circle cx="200" cy="200" r="4" fill="#00FFFF" className="engine__pulse" />
            <text x="200" y="195" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="#00FFFF">
              ADVISORY
            </text>
            <text x="200" y="212" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="#A0AAB8">
              OS
            </text>
          </svg>
        </div>
        <div className="aos__cards">
          {t.items.map((it, i) => (
            <Reveal key={i} delay={i * 60} as="div" className={"aos__cell aos__cell--" + (i % 5)}>
              <TiltCard className="aos-card" intensity={6}>
                <div className="aos-card__top">
                  <span className="aos-card__num mono">{it.i}</span>
                  <span className="aos-card__glyph">
                    <Glyph kind={it.glyph} />
                  </span>
                </div>
                <h3 className="aos-card__title display-face">{it.t}</h3>
                <p className="aos-card__body">{it.b}</p>
                <div className="aos-card__tags">
                  {it.tags.map((tg, j) => (
                    <span key={j} className={"tag " + (j === 0 ? "tag--accent" : j === 1 ? "tag--warm" : "")}>
                      {tg}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects — editorial featured + story rail ─── */
function Projects({ lang }: { lang: Lang }) {
  const t = content.projects[lang];
  const k = t.keys;
  const featured = t.items.slice(0, 2);
  const rest = t.items.slice(2);
  return (
    <section className="section shell" id="projects">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />

      <div className="proj-featured">
        {featured.map((p, i) => (
          <Reveal key={p.i} delay={i * 120} as="div">
            <TiltCard className={"proj-hero " + (i === 0 ? "proj-hero--cyan" : "proj-hero--warm")} intensity={5}>
              <div className="proj-hero__index mono">FLAGSHIP · {p.i}</div>
              <h3 className="proj-hero__name display-face">{p.name}</h3>
              <p className="proj-hero__role">{p.role}</p>
              <div className="proj-hero__story">
                <div>
                  <span className="proj-hero__k">{k.challenge}</span>
                  <p>{p.challenge}</p>
                </div>
                <div>
                  <span className="proj-hero__k">{k.outputs}</span>
                  <p>{p.outputs}</p>
                </div>
                <div>
                  <span className="proj-hero__k">{k.value}</span>
                  <p className="proj-hero__value">{p.value}</p>
                </div>
              </div>
              <div className="proj-hero__foot">
                <div className="proj-hero__tags">
                  {p.tags.map((tg, j) => (
                    <span key={j} className={"tag " + (j === 0 ? "tag--accent" : j === 1 ? "tag--warm" : "tag--gold")}>
                      {tg}
                    </span>
                  ))}
                </div>
                {p.name.toLowerCase().includes("fikra") && (
                  <a className="proj-hero__cta" href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer">
                    Visit Fikra AI →
                  </a>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <ProjectMotionRail items={rest} valueLabel={k.value} lang={lang} />
    </section>
  );
}

/* ─── Project Motion Rail — drag carousel: active card forward, others fog ─── */
type ProjItem = { i: string; name: string; role: string; challenge: string; value: string; tags: string[] };

function ProjectMotionRail({ items, valueLabel, lang }: { items: ProjItem[]; valueLabel: string; lang: Lang }) {
  const reduce = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: "trimSnaps",
    direction: RTL(lang) ? "rtl" : "ltr",
    skipSnaps: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [dragging, setDragging] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    const onDown = () => setDragging(true);
    const onUp = () => setDragging(false);
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    embla.on("pointerDown", onDown);
    embla.on("pointerUp", onUp);
    embla.on("settle", onUp);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
      embla.off("pointerDown", onDown);
      embla.off("pointerUp", onUp);
      embla.off("settle", onUp);
    };
  }, [embla, onSelect]);

  const scrollPrev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);
  const scrollTo = useCallback(
    (i: number) => {
      embla?.scrollTo(i);
    },
    [embla]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (RTL(lang)) scrollPrev();
        else scrollNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (RTL(lang)) scrollNext();
        else scrollPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollTo(items.length - 1);
      }
    },
    [lang, scrollPrev, scrollNext, scrollTo, items.length]
  );

  const stateFor = (i: number) => {
    const d = Math.abs(i - selected);
    if (reduce) return { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 };
    if (d === 0) return { scale: 1.055, opacity: 1, filter: "blur(0px)", y: -8 };
    if (d === 1) return { scale: 0.945, opacity: 0.78, filter: "blur(1px)", y: 0 };
    return { scale: 0.9, opacity: 0.45, filter: "blur(3px)", y: 0 };
  };

  return (
    <div className="proj-motion">
      <div
        className={"proj-motion__viewport" + (dragging ? " is-dragging" : "")}
        ref={emblaRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects — drag, swipe, or use arrow keys"
        onKeyDown={onKeyDown}
      >
        <div className="proj-motion__track">
          {items.map((p, i) => {
            const active = i === selected;
            return (
              <div
                className="proj-motion__slide"
                key={p.i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}: ${p.name}`}
                aria-current={active ? "true" : undefined}
              >
                <motion.article
                  className={"proj-motion-card" + (active ? " is-active" : "")}
                  animate={stateFor(i)}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 32, mass: 0.7 }}
                >
                  <div className="proj-card__head">
                    <span className="proj-card__idx mono">{p.i}</span>
                    <h3 className="proj-card__name display-face">{p.name}</h3>
                    <p className="proj-card__role">{p.role}</p>
                  </div>
                  <p className="proj-card__challenge">{p.challenge}</p>
                  <div className="proj-card__value">
                    <span className="mono">{valueLabel.toUpperCase()}</span>
                    <p>{p.value}</p>
                  </div>
                  <div className="proj-card__tags">
                    {p.tags.slice(0, 2).map((tg, j) => (
                      <span key={j} className={"tag " + (j === 0 ? "tag--accent" : "tag--warm")}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
      <div className="proj-motion__controls">
        <button className="proj-motion__arrow" onClick={scrollPrev} disabled={!canPrev} aria-label="Previous project" type="button">
          ‹
        </button>
        <div className="proj-motion__dots" role="tablist" aria-label="Project navigation">
          {items.map((p, i) => (
            <button
              key={p.i}
              className="proj-motion__dot"
              data-active={i === selected}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to project ${i + 1}`}
              type="button"
            />
          ))}
        </div>
        <button className="proj-motion__arrow" onClick={scrollNext} disabled={!canNext} aria-label="Next project" type="button">
          ›
        </button>
      </div>
    </div>
  );
}

/* ─── Audience constellation ─── */
function Audiences({ lang }: { lang: Lang }) {
  const t = content.audiences[lang];
  const n = t.items.length;
  const cx = 50,
    cy = 50,
    r = 36;
  return (
    <section className="section shell">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
      <div className="amap">
        <svg className="amap__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="amap-core">
              <stop offset="0%" stopColor="rgba(0,255,255,0.5)" />
              <stop offset="60%" stopColor="rgba(0,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r="24" fill="url(#amap-core)" className="amap__breathe" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeDasharray="0.5 1.5" className="amap__ring" />
          <circle cx={cx} cy={cy} r={r - 14} fill="none" stroke="rgba(0,255,255,.07)" strokeDasharray="0.4 2.4" className="amap__ring amap__ring--rev" />
          {t.items.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = cx + r * Math.cos(a),
              y = cy + r * Math.sin(a);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,255,255,.16)" strokeWidth="0.25" />;
          })}
          <circle cx={cx} cy={cy} r="6" fill="rgba(4,7,13,.9)" stroke="#00FFFF" strokeWidth="0.4" />
          <circle cx={cx} cy={cy} r="1.8" fill="#00FFFF" className="engine__pulse" />
        </svg>
        <div className="amap__core">
          <span className="mono">ANTONIO</span>
        </div>
        {t.items.map((a, i) => {
          const ang = (i / n) * 360 - 90;
          const rad = (ang * Math.PI) / 180;
          const x = 50 + 36 * Math.cos(rad);
          const y = 50 + 36 * Math.sin(rad);
          return (
            <Reveal key={i} delay={i * 90} as="div" className="amap__node" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className="amap__orbit" style={{ animationDelay: `${-i * 1.6}s`, animationDuration: `${8 + (i % 3)}s` }}>
                <div className="amap__card" tabIndex={0} role="group" aria-label={a.t}>
                  <span className="amap__t">{a.t}</span>
                  <span className="amap__d">{a.d}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Career arc timeline ─── */
function Timeline({ lang }: { lang: Lang }) {
  const t = content.timeline[lang];
  const statusLabels = {
    en: { current: "Active", edu: "Credential", past: "Past role" },
    ar: { current: "نشط", edu: "شهادة", past: "سابق" },
    he: { current: "פעיל", edu: "הסמכה", past: "תפקיד עבר" },
  };
  const labels = statusLabels[lang];
  return (
    <section className="section shell" id="timeline">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
      <div className="arc">
        <div className="arc__spine" aria-hidden="true">
          <svg viewBox="0 0 60 1000" preserveAspectRatio="xMidYMin meet">
            <defs>
              <linearGradient id="arc-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity=".7" />
                <stop offset="55%" stopColor="#00FFFF" stopOpacity=".25" />
                <stop offset="100%" stopColor="#B87333" stopOpacity=".4" />
              </linearGradient>
            </defs>
            <path d="M 30 0 Q 0 250, 30 500 T 30 1000" fill="none" stroke="url(#arc-grad)" strokeWidth="1.5" />
          </svg>
        </div>
        {t.groups.map((g, gi) => (
          <div key={gi} className="arc__phase">
            <Reveal as="div" className="arc__phase-title">
              <span className="mono">PHASE {gi + 1}</span>
              <h3 className="display-face">{g.label}</h3>
            </Reveal>
            <div className="arc__items">
              {g.items.map((it, i) => {
                const isHist = !!it.title && /historical|تاريخي|היסטורי/i.test(it.title);
                const side = i % 2 === 0 ? "arc__item--l" : "arc__item--r";
                const label = it.flag === "current" ? labels.current : it.flag === "edu" ? labels.edu : labels.past;
                return (
                  <Reveal key={i} delay={i * 90} as="div" className={"arc__item " + side + (isHist ? " arc__item--historical" : "")}>
                    <span
                      className={"arc__node " + (it.flag === "current" ? "arc__node--current" : it.flag === "edu" ? "arc__node--edu" : "")}
                      aria-hidden="true"
                    />
                    <TiltCard
                      className={"arc__card " + (it.flag === "current" ? "arc__card--current" : it.flag === "edu" ? "arc__card--edu" : "")}
                      intensity={5}
                    >
                      <div className="arc__card-head">
                        <span className="mono arc__yr">{it.yr}</span>
                        <span className="mono arc__stat">{label}</span>
                      </div>
                      <h4 className="arc__title display-face">{it.title}</h4>
                      <p className="arc__org">{it.org}</p>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Tools / Knowledge Ecosystem ─── */
function Ecosystem({ lang }: { lang: Lang }) {
  const t = content.ecosystem[lang];
  const [active, setActive] = useState(0);
  const n = t.groups.length;
  return (
    <section className="section shell" id="ecosystem">
      <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
      <div className="eco">
        <div className="eco__stage" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <defs>
              <radialGradient id="eco-core">
                <stop offset="0%" stopColor="rgba(0,255,255,0.45)" />
                <stop offset="60%" stopColor="rgba(0,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(0,255,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#eco-core)" />
            {[160, 130, 100, 70].map((rr, i) => (
              <circle key={i} cx="200" cy="200" r={rr} fill="none" stroke="rgba(0,255,255,.10)" strokeDasharray={i % 2 ? "1 4" : "2 6"} />
            ))}
            <circle cx="200" cy="200" r="50" fill="rgba(4,7,13,.85)" stroke="rgba(0,255,255,.45)" />
            {t.groups.map((_, i) => {
              const a = (i / n) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + 160 * Math.cos(a),
                y = 200 + 160 * Math.sin(a);
              return (
                <g key={i}>
                  <line
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke={active === i ? "rgba(0,255,255,.65)" : "rgba(0,255,255,.15)"}
                    strokeWidth={active === i ? 0.9 : 0.4}
                    className="eco__spoke"
                  />
                  <circle cx={x} cy={y} r={active === i ? 6 : 4} fill={active === i ? "#00FFFF" : "rgba(4,7,13,.9)"} stroke="#00FFFF" strokeWidth="1.2" />
                </g>
              );
            })}
            <text x="200" y="196" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="#00FFFF">
              KNOWLEDGE
            </text>
            <text x="200" y="212" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="#A0AAB8">
              ECOSYSTEM
            </text>
          </svg>
        </div>
        <div className="eco__panel">
          <div className="eco__tabs" role="tablist">
            {t.groups.map((g, i) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={active === i}
                className={"eco__tab " + (active === i ? "is-active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{g.t}</span>
              </button>
            ))}
          </div>
          <TiltCard className="eco__detail" intensity={4}>
            <p className="eco__h">{t.groups[active].h}</p>
            <div className="eco__chips">
              {t.groups[active].items.map((x, j) => (
                <span key={j} className="eco__chip" style={{ animationDelay: `${j * 30}ms` }}>
                  {x}
                </span>
              ))}
            </div>
            <a className="eco__cta" href={SOC.github} target="_blank" rel="noopener noreferrer">
              {t.ctaGithub}
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ─── Leadership ─── */
function Leadership({ lang }: { lang: Lang }) {
  const t = content.leadership[lang];
  return (
    <section className="section section--warm">
      <div className="shell">
        <SectionHead kicker={t.kicker} title={t.title} lead={t.lead} />
        <div className="manifesto">
          {t.items.map((it, i) => (
            <Reveal key={i} delay={i * 80} as="div" className="manifesto__p">
              <span className="manifesto__n mono">— {it.n}</span>
              <h3 className="manifesto__t display-face">{it.t}</h3>
              <p className="manifesto__d">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCta({ lang }: { lang: Lang }) {
  const t = content.finalCta[lang];
  const lbl = content.social.labels[lang];
  const [revealed, setRevealed] = useState(false);
  const tiles = [
    { k: "linkedin", label: lbl.linkedin, value: "linkedin.com/in/rawadnassar", href: SOC.linkedin },
    { k: "github", label: lbl.github, value: "github.com/AntonioRawad", href: SOC.github },
    { k: "fikra", label: lbl.fikra, value: "fikra-ai.net", href: SOC.fikraWebsite },
    { k: "x", label: lbl.x, value: "x.com/Fikra_ai", href: SOC.fikraX },
    { k: "mail", label: "rawadnassar@fikra-ai.net", value: lbl.email, href: SOC.emailPrimary },
    { k: "mail", label: "rawadnassar2016@gmail.com", value: "Personal email", href: SOC.emailSecondary },
  ];
  return (
    <section className="section shell" id="contact">
      <Reveal as="div" className="cta-panel">
        <div className="cta-panel__border" aria-hidden="true" />
        <div className="cta-panel__inner">
          <div className="cta-panel__lead">
            <span className="section-head__kicker">{lbl.book}</span>
            <h2 className="display-face">{t.title}</h2>
            <p>{t.body}</p>
            <div className="hero__ctas" style={{ marginTop: 22 }}>
              <a className="btn btn--primary" href={SOC.emailPrimary}>
                {t.ctaPrimary}
                <span className="btn__arrow">→</span>
              </a>
              <button className="btn btn--ghost" onClick={() => setRevealed(true)}>
                {revealed ? t.revealedLabel + ": " + t.phoneHidden : t.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="cta-panel__grid">
            {tiles.map((c, i) => (
              <TiltCard key={i} className="cta-tile" intensity={5}>
                <a className="cta-tile__link" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <span className="cta-tile__icon">
                    <SocIcon k={c.k} />
                  </span>
                  <span className="cta-tile__k mono">{c.label}</span>
                  <span className="cta-tile__v">{c.value}</span>
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ─── */
function Footer({ lang }: { lang: Lang }) {
  const t = content.footer[lang];
  const lbl = content.social.labels[lang];
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__brand">
          <div className="footer__name">Antonio Rawad Nassar</div>
          <p className="footer__role">C-Level Strategy &amp; AI Transformation Advisor</p>
          <p className="footer__loc">{t.line}</p>
        </div>
        <div className="footer__col">
          <h4 className="mono">Connect</h4>
          <a href={SOC.linkedin} target="_blank" rel="noopener noreferrer">
            {lbl.linkedin}
          </a>
          <a href={SOC.github} target="_blank" rel="noopener noreferrer">
            {lbl.github}
          </a>
          <a href={SOC.fikraWebsite} target="_blank" rel="noopener noreferrer">
            {lbl.fikra}
          </a>
          <a href={SOC.fikraX} target="_blank" rel="noopener noreferrer">
            {lbl.x}
          </a>
        </div>
        <div className="footer__col">
          <h4 className="mono">Direct</h4>
          <a href={SOC.emailPrimary}>rawadnassar@fikra-ai.net</a>
          <a href={SOC.emailSecondary}>rawadnassar2016@gmail.com</a>
          <a href={"tel:" + SOC.phone.replace(/\s/g, "")}>{SOC.phone}</a>
        </div>
      </div>
      <div className="shell footer__row">
        <span>{t.line}</span>
        <span className="mono">{t.note}</span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("arn-lang");
    if (saved === "en" || saved === "ar" || saved === "he") setLang(saved);
  }, []);

  useEffect(() => {
    const m = content.meta[lang];
    document.documentElement.lang = m.htmlLang;
    document.documentElement.dir = m.dir;
    document.title = m.title;
    try {
      localStorage.setItem("arn-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <Nav lang={lang} setLang={setLang} onMenuOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} lang={lang} setLang={setLang} />
      <SocialDock lang={lang} />
      <main>
        <Hero lang={lang} />
        <Positioning lang={lang} />
        <FourQuestions lang={lang} />
        <AdvisoryOS lang={lang} />
        <Projects lang={lang} />
        <Audiences lang={lang} />
        <Timeline lang={lang} />
        <Ecosystem lang={lang} />
        <Leadership lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
