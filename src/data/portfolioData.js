export const slides = [
  {
    id: 1,
    title: "About Me",
    html: `
      <p>I'm <strong>Dehan</strong>, a <strong>Fullstack Developer</strong> & <strong>Security Specialist</strong> based in Indonesia.</p>
      <p>My work sits at the intersection of <strong>high-performance engineering</strong> and <strong>offensive security</strong>. I don't just build systems; I fortify them.</p>
      <p>Currently architecting <strong>Chat-Lite</strong>, a zero-trust communication platform.</p>
    `,
    photo: "/images/profile.png",
    hobbies: [
      "Cybersecurity Research",
      "Open Source Contribution",
      "IoT Architecture",
      "Drumming / Deathcore",
    ]
  },
  {
    id: 2,
    title: "Technical Stack",
    skills: {
      technical: [
        { label: "Frontend", value: "React, Vue, Tailwind, Framer Motion" },
        { label: "Backend", value: "Node.js, PHP (CI4), PostgreSQL" },
        { label: "Infrastructure", value: "Linux (Debian), Docker, Nginx" },
        { label: "Security", value: "Penetration Testing, OWASP Top 10" },
      ],
    },
  },
  {
    id: 3,
    title: "Core Competencies",
    skills: {
      soft: [
        { label: "Problem Solving", value: "Analytical approach to complex system failures." },
        { label: "Communication", value: "Translating technical constraints to business value." },
        { label: "Teamwork", value: "Collaborative development in agile environments." },
      ]
    }
  },
  {
    id: 4,
    title: "Education History",
    history: [
      {
        logo: "/images/stmik.jpg",
        title: "STMIK AMIK Bandung",
        role: "Bachelor of Informatics",
        period: "2025 – Present",
        details: "Focus: Cryptography, Network Security, AI."
      },
      {
        logo: "/images/smk4.jpg",
        title: "SMKN 4 PADALARANG",
        role: "Network Engineering",
        period: "2022 – 2025",
        details: "Focus: System Admin, Cisco Networking."
      }
    ]
  },
  {
    id: 5,
    title: "Certifications",
    certs: [
      { img: "/images/ccna.jpg", title: "Cisco CCNA", desc: "Network Fundamentals & Security" },
      { img: "/images/mtcna.jpg", title: "MTCNA", desc: "MikroTik Certified Network Associate" }
    ]
  },
  {
    id: 6,
    title: "Featured Projects",
    projects: [
      {
        id: "chat-lite",
        title: "Chat-Lite",
        repo: "https://github.com/h4nzs/chat-lite",
        img: "/images/project-chat-lite.png",
        short: "End-to-End Encrypted Communication Platform.",
        status: 'Active Dev',
        tags: ['React', 'Node.js', 'Sodium', 'Socket.io'],
        long: "A zero-trust architecture chat application. Features double-ratchet encryption, ephemeral messaging, and device-agnostic performance optimization."
      },
      {
        id: "anniv",
        title: "Anniv Platform",
        repo: "https://github.com/h4nzs/anniv",
        img: "/images/project-anniv.png",
        short: "Social Event Management System.",
        status: 'Archived',
        tags: ['Vue.js', 'CI4', 'MySQL'],
        long: "Full-stack platform for community event management with role-based access control and anonymous interaction layers."
      },
      {
        id: "input-data",
        title: "POS System",
        repo: "https://github.com/kenziyy/input-data",
        img: "/images/project-input.png",
        short: "High-Efficiency Transaction Tracker.",
        status: 'Live',
        tags: ['Vanilla JS', 'PWA', 'Offline-First'],
        long: "Minimalist Point-of-Sale interface designed for zero-latency input and elimination of manual entry errors."
      },
    ],
  },
  {
    id: 7,
    title: "Experience",
    history: [
      {
        logo: "/images/ruangdata.jpg",
        title: "Ruang Data Telemedia",
        role: "Freelance Technician",
        period: "2024 – Present",
        details: "Network infrastructure maintenance and custom software solutions."
      },
      {
        logo: "/images/bit.png",
        title: "PT. Bentang Inspira",
        role: "IT Support Intern",
        period: "6 Months",
        details: "Vulnerability assessment and firewall configuration."
      }
    ]
  },
  {
    id: 8,
    title: "Vision",
    html: `<p>To build <strong>resilient systems</strong> that protect user autonomy and data integrity in an increasingly hostile digital landscape.</p>`
  },
  {
    id: 9,
    title: "Connect",
    html: ""
  }
];
