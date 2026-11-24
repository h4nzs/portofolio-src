export const slideById = (id) => slides.find(s => s.id === id)

export const slides = [
  {
    id: 1,
    title: "About Me",
    html: `
      <p>I'm <strong>Dehan</strong>, a <strong>Fullstack Developer</strong> from Bandung, Indonesia, working across <strong>infrastructure, DevOps and security</strong>.</p>
      <p>Since August 2026 I'm the web developer at <strong>PT Ono Voda Pro</strong>, where I build and maintain the company's web ecosystem, and also run the servers, pipelines and security hardening behind it.</p>
      <p>On my own time I build <strong>Nyx Chat</strong>, a post-quantum, zero-knowledge messenger whose server is designed to learn as little as possible, even from a stolen database dump. Lately I've also been building <strong>AI agents and LLM features</strong>.</p>
    `,
    photo: "/portofolio/images/career.webp",
    hobbies: [
      "Cybersecurity Research",
      "Applied Cryptography",
      "AI & LLM Agents",
      "Open Source Contribution",
      "Drumming / Deathcore",
    ]
  },
  {
    id: 2,
    title: "Specialties",
    specialties: [
      {
        icon: "ShieldAlert",
        title: "Security & Privacy Engineering",
        desc: "Threat modeling, applied cryptography and privacy-by-architecture. Post-quantum E2EE, key transparency, unlinkable metadata, plus penetration testing and OWASP-driven reviews."
      },
      {
        icon: "Code2",
        title: "Fullstack Engineering",
        desc: "Type-safe monorepos with Astro, React, Hono, Express and PostgreSQL. Services in Rust and Go where performance or isolation matters."
      },
      {
        icon: "Bot",
        title: "AI & LLM Engineering",
        desc: "LLM-backed agents with tool calling and a deterministic fallback, exposed over the A2A protocol so visitors and other agents can ask about real services."
      },
      {
        icon: "Server",
        title: "Infrastructure & DevSecOps",
        desc: "Docker, Nginx, Cloudflare and Linux hosts with CI/CD, CVE scanning, file-integrity monitoring and intrusion detection (CrowdSec) wired into alerting."
      }
    ]
  },
  {
    id: 3,
    title: "Technical Stack",
    skills: {
      technical: [
        { label: "Languages", value: " TypeScript, Rust, Go, Python, PHP, SQL" },
        { label: "Frontend", value: " Astro, React, Vue, Tailwind CSS, Vite, Tauri" },
        { label: "Backend & Data", value: " Node.js (Express, Hono), Django, CodeIgniter 4, PostgreSQL, Redis, SQLite, Prisma, Drizzle" },
        { label: "AI & LLM", value: " Gemini API, Cloudflare AI, LLM tool calling, A2A protocol, MCP tools" },
        { label: "Infrastructure & DevOps", value: " Linux, Docker, Nginx, Cloudflare (R2, Tunnels, Workers), GitHub Actions, Prometheus, systemd" },
        { label: "Security", value: " Applied Cryptography (PQC, E2EE), Key Transparency, PIR / OHTTP / OPRF, CrowdSec, Trivy, Pentesting, OWASP" },
      ],
    },
  },
  {
    id: 4,
    title: "Core Competencies",
    skills: {
      soft: [
        { label: "Problem Solving", value: "Analytical approach to complex system failures and security breaches." },
        { label: "Communication", value: "Translating technical constraints and security risks to business value." },
        { label: "Adaptability", value: "Rapidly learning new stacks and pivoting strategies in agile environments." },
      ]
    }
  },
  {
    id: 5,
    title: "Education History",
    history: [
      {
        logo: "/portofolio/images/stmik.webp",
        title: "STMIK AMIK Bandung",
        role: "Bachelor of Informatics",
        period: "2025 – 2026",
        details: "Focus: Cryptography, Network Security, AI."
      },
      {
        logo: "/portofolio/images/smk4.webp",
        title: "SMKN 4 PADALARANG",
        role: "Network Engineering",
        period: "2022 – 2025",
        details: "Focus: System Admin, Cisco Networking."
      }
    ]
  },
  {
    id: 6,
    title: "Certifications",
    certs: [
      { img: "/portofolio/images/ccna.webp", title: "Cisco CCNA", desc: "Network Fundamentals & Security" },
      { img: "/portofolio/images/mtcna.webp", title: "MTCNA", desc: "MikroTik Certified Network Associate" }
    ]
  },
  {
    id: 7,
    title: "Featured Projects",
    projects: [
      {
        id: "nyx-chat",
        title: "Nyx Chat",
        repo: "https://github.com/h4nzs/nyx-chat",
        live: "https://nyx-app.my.id/",
        img: "/portofolio/images/nyx.webp",
        wide: true,
        short: "Post-quantum, zero-knowledge messenger. No phone, no email, blind-relay server.",
        status: 'Active Dev',
        tags: ['TypeScript', 'Rust', 'Go', 'Post-Quantum', 'WebAssembly', 'PostgreSQL'],
        long: "A messenger built around one question: what can the server learn if its database is stolen? There is no phone number, email or plaintext username. Message history lives on the device, and the server relays ciphertext only briefly. Cryptography follows Signal's design (PQXDH with ML-KEM-768 via X-Wing, Double Ratchet, the SPQR ML-KEM Braid ratchet, sender-key groups) and adds extra metadata-privacy layers on top.",
        challenge: "Signal-grade end-to-end encryption still leaves a lot in the database: social graph, usernames, timing and network identifiers. A database dump (backup leak, VPS takeover) is treated as a first-class threat, so every table was audited for what it would reveal.",
        impact: "Identity is unlinkable: usernames are Argon2id blind indexes with a pepper kept outside the DB, sender and receipt metadata are opaque domain-separated tags, and group senders use pseudonyms. Separate services keep the blast radius small: a Rust WebTransport sidecar, a Go Key Transparency log with an independent auditor (ML-DSA-65, verified client-side in WASM), two-server XOR PIR, an OHTTP relay and OPRF-based user discovery. Open source under AGPLv3 with a public threat model."
      },
      {
        id: "ahli-panggilan",
        title: "Ahli Panggilan Platform",
        img: "/portofolio/images/ahlipanggilan.svg",
        short: "On-demand service platform with an AI agent that speaks the A2A protocol.",
        status: 'Offline (by owner)',
        tags: ['Astro', 'Hono', 'PostgreSQL', 'A2A', 'LLM', 'Docker'],
        long: "A headless platform for on-demand professional services (technicians, cleaning, CCTV and more) that connects customers, partners, corporate clients and admins. Astro 7 and React islands for the frontend, a Hono API with around 200 endpoints, PostgreSQL with Drizzle, Cloudflare R2 for storage, all in a Turborepo monorepo deployed with Docker Compose and Nginx. Built for PT Ono Voda Pro; the site is currently switched off by the owner (private repository).",
        challenge: "Visitors ask the same questions about services, coverage area, prices and booking status, and the platform needed to answer them around the clock without exposing anything it shouldn't, including to other AI agents.",
        impact: "Added an A2A v1.0 agent (JSON-RPC, REST and SSE streaming, with a JWS-signed agent card) that answers questions through tool calling against the real service catalogue, coverage and FAQ data, and falls back to a deterministic rule router when the LLM is unavailable. Security is layered: RBAC with 8 roles, Argon2id and cookie-only auth, an immutable audit log, and CrowdSec, Trivy, file-integrity and auditd monitoring feeding one alert channel."
      },
      {
        id: "pixcode-studio",
        title: "Pixcode Studio",
        repo: "https://github.com/h4nzs/pixcode",
        live: "https://pixcode.my.id",
        img: "/portofolio/images/pixcode.svg",
        short: "Company site for a Bandung studio building websites and apps for SMEs.",
        status: 'Live',
        tags: ['Astro 7', 'Tailwind 4', 'Cloudflare Workers'],
        long: "Company profile and portfolio site for Pixcode Studio, which builds websites and apps for small businesses. I handle the technical delivery. Fully static Astro 7 with Tailwind CSS v4, served from Cloudflare Workers static assets, zero-JS by default with a few small scripts where they pay off.",
        challenge: "SME owners compare studios on a phone, and the studio's own site is the first proof of its work, so it has to be fast, clear about scope and pricing, and easy to turn into a WhatsApp conversation.",
        impact: "Content-driven pages (packages, process, portfolio case studies, template demos) from typed data files, with sitemap and IndexNow submission for search visibility."
      },
      {
        id: "MirAI",
        title: "mirAI — AI Movie Advisor",
        repo: "https://github.com/h4nzs/mirAI-django",
        img: "/portofolio/images/mirai.webp",
        wide: true,
        short: "Conversational movie picker powered by Gemini and TMDB.",
        status: 'Archived',
        tags: ['Django', 'PostgreSQL', 'Gemini', 'Tailwind'],
        long: "A chatbot that helps people find a movie from a mood, a vibe or a half-remembered description. Gemini asks follow-up questions, collects taste signals and returns recommendations as structured JSON that the app resolves against TMDB. Includes accounts, favourites and watchlists. It started as a university project, and I first built it in Node/React before rewriting it in Django.",
        challenge: "People often forget titles or search by feeling rather than keywords, which classic filter-based search handles poorly.",
        impact: "An end-to-end LLM integration: prompt design for structured output, a service layer around the model and TMDB APIs, and a Django 5 + PostgreSQL app around them."
      },
      {
        id: "trashtalk-app",
        title: "Trashtalk",
        repo: "https://github.com/h4nzs/trashtalk",
        img: "/portofolio/images/trashtalk.webp",
        wide: true,
        short: "Desktop tool that nudges you to clean stale files out of Downloads.",
        status: 'Active',
        tags: ['Rust', 'Tauri', 'TypeScript', 'SQLite'],
        long: "A lightweight Tauri app with a Rust core (also usable from the command line) that ages and categorizes files in a folder, reminds you to clean up, and keeps deletions reversible with a ghost folder. Cross-platform for Windows and Linux, with i18n and a system tray icon.",
        challenge: "Digital hoarding: the Downloads folder fills up because people are afraid to delete something they might need later.",
        impact: "A background-friendly tool with a small footprint, where deleting is safe to undo, so cleaning up stops feeling risky."
      },
      {
        id: "input-data",
        title: "Customer Number Input",
        repo: "https://github.com/h4nzs/input",
        img: "/portofolio/images/project-input.webp",
        short: "Fast number-entry helper for a phone counter's front line.",
        status: 'Delivered',
        tags: ['HTML', 'CSS', 'JavaScript'],
        long: "A small static web app made at the request of the owner of the Ruang Data Telemedia counter. One field to enter a customer number, a short recent history, one-tap copy, and sound cues for success and warnings.",
        challenge: "Front-liners were retyping customer numbers during transactions, which was slow and error-prone.",
        impact: "A zero-install tool that opens in any browser on the counter PC and keeps the entry flow to a single field."
      },
    ],
  },
  {
    id: 8,
    title: "Experience",
    history: [
      {
        title: "PT. Ono Voda Pro",
        role: "Web Developer (Infrastructure, DevOps & Security)",
        period: "Aug 2026 – Present",
        details: "Build and maintain the group's web properties (Profesional Indonesia, Voda Level Up, Voda Trip and the Ahli Panggilan platform) and own the infrastructure, CI/CD and security hardening behind them, including an AI agent for visitor Q&A. The company runs tours and events, multimedia production and organisational assessments."
      },
      {
        logo: "/portofolio/images/freelance.webp",
        title: "Freelance",
        role: "Security Consultant, Network Engineer, and Fullstack Developer",
        period: "2025 – Present",
        details: "Providing tailored security assessments, network architecture design, and custom web application development for small businesses and individual clients whether creating from zero or maintaining established systems. Also delivers websites for SMEs through Pixcode Studio."
      },
      {
        logo: "/portofolio/images/ruangdata.webp",
        title: "Ruang Data Telemedia",
        role: "Freelance Technician",
        period: "1 Year",
        details: "Network infrastructure maintenance and custom software solutions."
      },
      {
        logo: "/portofolio/images/bit.webp",
        title: "PT. Bentang Inspira",
        role: "IT Support Intern",
        period: "6 Months",
        details: "Vulnerability assessment and firewall configuration."
      },
      {
        logo: "/portofolio/images/dwimitra.webp",
        title: "PT. Dwimitra Ekatama Mandiri",
        role: "Electrical Engineer",
        period: "1 Month",
        details: "Configuring and maintaining electrical wiring at Huawei data center."
      }
    ]
  },
  {
    id: 9,
    title: "Vision",
    html: `<p>To build <strong>resilient, privacy-first systems</strong> that protect user autonomy, and to put <strong>AI</strong> to work in them without giving up control of the data.</p>`
  },
  {
    id: 10,
    title: "Connect",
    html: ""
  }
];
