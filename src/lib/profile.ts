/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT YOUR PORTFOLIO HERE
 * ─────────────────────────────────────────────────────────────────────────────
 *  This file is the single source of truth for everything shown on the site.
 *  Change the text below and the whole page updates. No design changes needed.
 *  Placeholder copy is marked with  // TODO  — replace it with your real info.
 */

export const profile = {
  // — Identity ————————————————————————————————————————————————
  name: "Antonio Rawad Nassar",
  // Short role / headline shown under your name and in the browser tab
  role: "Founder & AI Product Builder", // TODO: refine to your exact title
  // One-line tagline for the hero
  tagline: "I build AI products for Arabic-speaking professionals.", // TODO
  // 1–3 sentence intro paragraph for the hero
  summary:
    "Founder of Fikra AI — an Arabic-first AI platform spanning automations, an academy, and brand intelligence. I work across product, design, and engineering to turn ambitious ideas into shipped software.", // TODO
  location: "Israel", // TODO
  email: "rawadnassar2016@gmail.com", // TODO: the address you want people to use
  // Optional: link to a downloadable CV/résumé (drop the PDF in /public)
  resumeUrl: "", // e.g. "/antonio-rawad-nassar-cv.pdf" — leave "" to hide the button

  // — Links ——————————————————————————————————————————————————
  links: [
    { label: "GitHub", href: "https://github.com/AntonioRawad" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO: your profile URL
    // { label: "X / Twitter", href: "https://x.com/yourhandle" },
  ] as { label: string; href: string }[],

  // — About ——————————————————————————————————————————————————
  about: [
    "I'm a builder at heart. Over the past few years I've gone deep on AI product development — designing systems, shipping interfaces, and figuring out how to make powerful models genuinely useful for everyday work.", // TODO
    "My current focus is Fikra AI: a production-grade SaaS that combines AI automations, a learning academy, credit-based usage, and a brand-intelligence engine — built Arabic-first with full RTL support.", // TODO
  ] as string[],

  // Quick facts shown in the About sidebar
  facts: [
    { label: "Based in", value: "Israel" }, // TODO
    { label: "Currently", value: "Building Fikra AI" }, // TODO
    { label: "Focus", value: "AI products · Product design · Full-stack" }, // TODO
    { label: "Languages", value: "Arabic · Hebrew · English" }, // TODO
  ] as { label: string; value: string }[],

  // — Experience ————————————————————————————————————————————————
  // Most recent first.
  experience: [
    {
      role: "Founder", // TODO
      company: "Fikra AI",
      period: "2024 — Present", // TODO
      location: "Remote", // TODO
      summary:
        "Building an Arabic-first AI platform from the ground up — product strategy, system architecture, design system, and the web app.", // TODO
      highlights: [
        "Designed a monorepo architecture (web · brain · exchange · factory) for AI automations and an academy.", // TODO
        "Built a brand-intelligence engine and a multi-room advisor workspace with governed brand memory.", // TODO
        "Shipped a credit-based usage and billing model with full activity logging.", // TODO
      ],
    },
    {
      role: "Your previous role", // TODO
      company: "Company name", // TODO
      period: "20XX — 20XX", // TODO
      location: "Location", // TODO
      summary: "What you did there, in one or two lines.", // TODO
      highlights: [
        "A concrete result or thing you shipped.", // TODO
        "Another concrete result.", // TODO
      ],
    },
  ] as {
    role: string;
    company: string;
    period: string;
    location: string;
    summary: string;
    highlights: string[];
  }[],

  // — Projects ———————————————————————————————————————————————————
  projects: [
    {
      title: "Fikra AI",
      tagline: "Arabic-first AI platform",
      description:
        "A production SaaS combining AI automations, an AI academy, credit-based billing, and a brand-intelligence engine — built with Next.js, Supabase, and a provider-agnostic AI layer.", // TODO
      tags: ["Next.js", "TypeScript", "Supabase", "AI"],
      href: "", // TODO: live URL when public
      repo: "", // TODO: repo URL if public
      featured: true,
    },
    {
      title: "Project two", // TODO
      tagline: "Short descriptor",
      description: "What it is, what problem it solves, and your role on it.", // TODO
      tags: ["Tag", "Tag"],
      href: "",
      repo: "",
      featured: false,
    },
    {
      title: "Project three", // TODO
      tagline: "Short descriptor",
      description: "What it is, what problem it solves, and your role on it.", // TODO
      tags: ["Tag", "Tag"],
      href: "",
      repo: "",
      featured: false,
    },
  ] as {
    title: string;
    tagline: string;
    description: string;
    tags: string[];
    href: string;
    repo: string;
    featured: boolean;
  }[],

  // — Skills —————————————————————————————————————————————————————
  skills: [
    {
      group: "Product & Design",
      items: ["Product strategy", "UX / UI design", "Design systems", "Prototyping"],
    },
    {
      group: "Engineering",
      items: ["TypeScript", "React / Next.js", "Node.js", "Tailwind CSS", "PostgreSQL / Supabase"],
    },
    {
      group: "AI",
      items: ["LLM application design", "Prompt & context engineering", "Agentic workflows", "RAG"],
    },
    {
      group: "Ways of working",
      items: ["Founder operating", "Spec-driven delivery", "Documentation", "Arabic / Hebrew / English"],
    },
  ] as { group: string; items: string[] }[],
};

export type Profile = typeof profile;
