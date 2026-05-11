import { profile } from "@/lib/profile";

/* ─────────────────────────────────────────────────────────────────────────
   To change the CONTENT of this page, edit  src/lib/profile.ts
   To change the LOOK, edit this file and  src/app/globals.css
   ───────────────────────────────────────────────────────────────────────── */

const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <BackgroundGlow />
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ── Background ─────────────────────────────────────────────────────────── */

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />
      <div className="absolute bottom-0 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-accent/[0.05] blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground sm:px-3"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-1 hidden rounded-md border border-accent/40 px-3 py-1.5 text-accent transition-colors hover:bg-accent hover:text-[#1a1407] sm:inline-block"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" className="reveal py-20 sm:py-28 md:py-36">
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Available for select work &amp; collaborations
      </p>
      <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-accent-soft sm:text-xl">{profile.role}</p>
      <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
        {profile.tagline} {profile.summary}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-[#1a1407] transition-transform hover:-translate-y-0.5"
        >
          View my work
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          Get in touch
        </a>
        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Download CV ↓
          </a>
        ) : null}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-faint">
        <span>📍 {profile.location}</span>
        {profile.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </section>
  );
}

/* ── Section primitives ─────────────────────────────────────────────────── */

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">{title}</h2>
    </div>
  );
}

/* ── About ──────────────────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="reveal scroll-mt-24 py-16 sm:py-20">
      <SectionHeading index="01" title="About" />
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="space-y-4 rounded-xl border border-border bg-surface p-6">
          {profile.facts.map((f) => (
            <li key={f.label} className="text-sm">
              <span className="block text-faint">{f.label}</span>
              <span className="mt-0.5 block font-medium text-foreground">{f.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Experience ─────────────────────────────────────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="reveal scroll-mt-24 py-16 sm:py-20">
      <SectionHeading index="02" title="Experience" />
      <ol className="space-y-10">
        {profile.experience.map((job, i) => (
          <li
            key={`${job.company}-${i}`}
            className="grid gap-2 border-l border-border pl-6 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:border-l-0 sm:pl-0"
          >
            <div className="text-sm text-faint sm:pt-1">{job.period}</div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {job.role} · <span className="text-accent">{job.company}</span>
              </h3>
              <p className="mt-0.5 text-sm text-faint">{job.location}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {job.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── Work ───────────────────────────────────────────────────────────────── */

function Work() {
  return (
    <section id="work" className="reveal scroll-mt-24 py-16 sm:py-20">
      <SectionHeading index="03" title="Selected work" />
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.projects.map((p) => (
          <article
            key={p.title}
            className={`group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 ${
              p.featured ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-0.5 text-sm text-accent">{p.tagline}</p>
              </div>
              <div className="flex shrink-0 gap-3 text-sm text-faint">
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Code ↗
                  </a>
                ) : null}
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Live ↗
                  </a>
                ) : null}
              </div>
            </div>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-faint"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Skills ─────────────────────────────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="reveal scroll-mt-24 py-16 sm:py-20">
      <SectionHeading index="04" title="Skills & tools" />
      <div className="grid gap-6 sm:grid-cols-2">
        {profile.skills.map((s) => (
          <div key={s.group} className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">{s.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="rounded-md bg-surface-2 px-2.5 py-1 text-sm text-muted">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Contact ────────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="reveal scroll-mt-24 py-16 sm:py-24">
      <SectionHeading index="05" title="Get in touch" />
      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-8 sm:p-12">
        <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-4xl">
          Let&apos;s build something.
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Whether it&apos;s a product, a collaboration, or just a conversation about AI — my inbox is
          open.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-[#1a1407] transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
          </a>
          {profile.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-sm text-faint sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
