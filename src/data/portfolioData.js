export const slides = [
  {
    id: 1,
    title: "About Me",
    html: `
      <p>I'm <strong>Dehan</strong>, a <strong>Fullstack Developer</strong> & <strong>Security Specialist</strong> based in Indonesia.</p>
      <p>My work sits at the intersection of <strong>high-performance engineering</strong> and <strong>offensive security</strong>. I don't just build systems; I fortify them against real-world threats.</p>
      <p>Currently architecting <strong>Nyx Chat</strong>, a zero-trust communication platform designed to protect user autonomy and data privacy.</p>
    `,
    photo: "/portofolio/images/career.webp",
    hobbies: [
      "Cybersecurity Research",
      "Open Source Contribution",
      "IoT Architecture",
      "Drumming / Deathcore",
    ]
  },
  {
    id: 2,
    title: "Specialties",
    specialties: [
      {
        icon: "ShieldAlert",
        title: "Offensive Security",
        desc: "Identifying vulnerabilities before they are exploited. Penetration testing, secure architecture review, and zero-trust implementations."
      },
      {
        icon: "Code2",
        title: "Fullstack Engineering",
        desc: "Building scalable web applications using React, Node.js, and PHP. Focused on clean code, performance, and resilient infrastructure."
      },
      {
        icon: "TerminalSquare",
        title: "System Administration",
        desc: "Deploying and managing Linux servers, Docker containers, and robust network infrastructures optimized for maximum uptime."
      }
    ]
  },
  {
    id: 3,
    title: "Technical Stack",
    skills: {
      technical: [
        { label: "Frontend", value: "React, Vue, Tailwind CSS, Framer Motion" },
        { label: "Backend", value: "Node.js, PHP (CI4), PostgreSQL, MySQL, Django" },
        { label: "Infrastructure", value: "Linux, Docker, Nginx, CI/CD" },
        { label: "Security", value: "Penetration Testing, Cryptography, OWASP" },
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
        short: "End-to-End Encrypted Communication Platform.",
        status: 'Active Dev',
        tags: ['React', 'Node.js', 'Sodium', 'Webtransport'],
        long: "A zero-trust architecture chat application. Features double-ratchet Post-Quantum encryption, ephemeral messaging, and device-agnostic performance optimization.",
        challenge: "Standard chat apps leak metadata and leave message histories vulnerable to server-side breaches or client-side compromises.",
        impact: "Implemented client-side Post-Quantum cryptography, ensuring the server acts only as a blind relay. Reduced message latency significantly while enhancing privacy."
      },
      {
        id: "anniv",
        title: "Anniv Platform",
        repo: "https://github.com/h4nzs/anniv",
        img: "/portofolio/images/project-anniv.webp",
        short: "Social Event Management System.",
        status: 'Archived',
        tags: ['Vue.js', 'CI4', 'MySQL'],
        long: "Full-stack platform for community event management with role-based access control and anonymous interaction layers.",
        challenge: "Managing large-scale community events required a unified platform that could handle RSVP, schedules, and secure interactions.",
        impact: "Streamlined event workflows, successfully serving hundreds of concurrent users without downtime during peak engagement."
      },
      {
        id: "MirAI",
        title: "AI Movie Platform",
        repo: "https://github.com/h4nzs/mirai-django",
        img: "/portofolio/images/mirai.webp",
        short: "AI Movie Advisor and Picker.",
        status: 'Archived',
        tags: ['Tailwind', 'Django', 'MySQL'],
        long: "Full-stack platform for helping users find movies based on their mood, vibes, or vague descriptions using AI.",
        challenge: "Users often forget movie titles and struggle to discover films that fit their highly specific niche moods.",
        impact: "Integrated NLP capabilities to process vague queries, significantly increasing user engagement and discovery satisfaction."
      },
      {
        id: "input-data",
        title: "POS System",
        repo: "https://github.com/kenziyy/input-data",
        img: "/portofolio/images/project-input.webp",
        short: "High-Efficiency Transaction Tracker.",
        status: 'Live',
        tags: ['Vanilla JS', 'PWA', 'Offline-First'],
        long: "Minimalist Point-of-Sale interface designed for zero-latency input and elimination of manual entry errors.",
        challenge: "Cashiers faced slow, bloated systems that caused long checkout queues and data entry discrepancies.",
        impact: "Created an offline-first PWA that synced automatically, reducing transaction times by 40% and eliminating sync conflicts that specificly integrated to store owner devices ecosystem."
      },
    ],
  },
  {
    id: 8,
    title: "Experience",
    history: [
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
        period: "1 Months",
        details: "Configuring and maintaining electrical wiring at Huawei data center."
      },
      {
        logo: "/portofolio/images/freelance.webp",
        title: "Freelance",
        role: "Security Consultant, Network Engineer, and Fullstack Developer",
        period: "2025 – Present",
        details: "Providing tailored security assessments, network architecture design, and custom web application development for small businesses and individual clients whether creating from zero or maintaining established systems."
      }
    ]
  },
  {
    id: 9,
    title: "Vision",
    html: `<p>To build <strong>resilient systems</strong> that protect user autonomy and data integrity in an increasingly hostile digital landscape.</p>`
  },
  {
    id: 10,
    title: "Connect",
    html: ""
  }
];