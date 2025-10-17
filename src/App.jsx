import React, { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./App.css";

// Data definitions moved outside component for optimization
const skillRatings = {
  technical: [
    { category: "Frontend", level: "Intern", percentage: 35 },
    { category: "Backend", level: "Intermediate", percentage: 60 },
    { category: "Database", level: "Intermediate", percentage: 60 },
    { category: "Sysadmin", level: "Expert", percentage: 95 },
    { category: "Security", level: "Intermediate", percentage: 60 },
    { category: "Tools", level: "Expert", percentage: 95 },
    { category: "Other", level: "Intermediate", percentage: 60 }
  ],
  soft: [
    { category: "Problem Solving", level: "Quite Good", percentage: 75 },
    { category: "Communication", level: "Good", percentage: 85 },
    { category: "Teamwork", level: "Good", percentage: 85 },
    { category: "Time Management", level: "Good", percentage: 85 },
    { category: "Adaptability", level: "Pretty Good", percentage: 75 },
    { category: "English", level: "Very Good", percentage: 95 }
  ]
};

const slides = [
  {
    id: 1,
    title: "About Me",
    html: `
      <p>My name is <strong>Dehan</strong>, or just call me <em>Han</em>, a passionate <strong>Fullstack Developer</strong> and <strong>Cybersecurity Enthusiast</strong> currently pursuing a <strong>Bachelor's Degree in Informatics Engineering</strong> at <strong>STMIK AMIK Bandung</strong>.</p>
      <p>I have a strong interest in <strong>web development</strong>, <strong>network systems</strong>, and <strong>cybersecurity</strong>, with hands-on experience in building and securing digital systems.</p>
      <p>Currently developing <strong>Chat-Lite</strong>, a lightweight chat application designed for optimal performance on low-end devices.</p>
    `,
    photo: "/portofolio/images/profile.png",
    hobbies: `
      <div class="hobbies-text">
        <h3 style="color: var(--accent-1); margin-bottom: 1rem; text-align: right;">Hobby and Interest</h3>
        <div style="text-align: right; color: var(--text-weak);">
          <p><strong>Cybersecurity Research</strong> - Exploring the latest vulnerabilities and defense mechanisms</p>
          <p><strong>Open Source Contribution</strong> - Contributing to various community projects</p>
          <p><strong>IoT Projects</strong> - Building innovative connected devices</p>
          <p><strong>Learning New Technologies</strong> - Always expanding my skill set</p>
          <p><strong>Playing Drum</strong> - Sometimes i do drum cover and learning new trick, technique and much more</p>
          <p><strong>Listening Music</strong> - I love listening to music and enjoying it, and my fav genre are deathcore and deathmetal</p>
        </div>
      </div>
    `,
  },
  {
    id: 2,
    title: "Technical Skills",
    skills: {
      technical: [
        { label: "Frontend", value: "HTML, CSS, JavaScript, Vue.js, React.js" },
        { label: "Backend", value: "PHP (CodeIgniter 4), Node.js" },
        { label: "Database", value: "MySQL, MariaDB, PostgreSQL" },
        { label: "System Administration", value: "Linux (Debian/Ubuntu), Firewall Management" },
        { label: "Security", value: "Web Penetration Testing, Network Security" },
        { label: "Tools", value: "Git, GitHub, VS Code" },
        { label: "Other", value: "API Integration (OpenAI, HuggingFace, TMDb), RESTful API" },
      ],
      soft: [
        { label: "Soft Skill", value: "Bekerja sama dengan tim" },
        { label: "Soft Skill", value: "English aktif" },
      ],
    },
  },
  {
    id: 3,
    title: "Soft Skill",
    skills: {
      soft: [
        { label: "Problem Solving", value: "Ability to analyze complex issues and develop effective solutions." },
        { label: "Communication", value: "Clear and effective verbal and written communication skills." },
        { label: "Teamwork", value: "Ability to collaborate effectively with diverse teams." },
        { label: "Time Management", value: "Efficiently prioritize tasks and manage time for optimal productivity." },
        { label: "Adaptability", value: "Flexibility to adjust and thrive in changing environments." },
        { label: "English Active", value: "Fluent in verbal and written communication." },
      ]
    }
  },
  {
    id: 4,
    title: "Education",
    html: `
      <div class="education-entry-card">
        <img src="/portofolio/images/smk4.jpg" alt="SMKN 4 Padalarang Logo" class="institution-logo" />
        <div class="education-details">
          <p><strong>SMKN 4 PADALARANG</strong> — <em>Network and Computer Engineering</em></p>
          <p>📅 2022-2025</p>
          <div class="education-highlights">
            <p><strong>Key Projects:</strong></p>
            <ul>
              <li>Creating and configuring monitoring system in company server using zabbix agent.</li>
              <li>Configured a small office network with Cisco Packet Tracer.</li>
            </ul>
            <p><strong>Achievements:</strong></p>
            <ul>
              <li>To be one of the best students in implementing field work practice in companies from among the many other students at school in 2025.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="education-entry-card">
        <img src="/portofolio/images/stmik.jpg" alt="STMIK AMIK Bandung Logo" class="institution-logo" />
        <div class="education-details">
          <p><strong>STMIK AMIK Bandung</strong> — <em>Bachelor of Informatics Engineering (Ongoing)</em></p>
          <p>📅 2025 – Present</p>
          <div class="education-highlights">
            <p><strong>Focus Areas:</strong></p>
            <ul>
              <li>Cybersecurity, Programming, Network Administration, Database Management, Web Development, AI/ML.</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 5,
    title: "Professional Certifications",
    html: `
      <div class="certifications-grid">
        <div class="certification-card card-container">
          <img src="/portofolio/images/ccna.jpg" alt="Cisco CCNA Certificate Preview" class="cert-preview-img" />
          <h3 style="color: var(--accent-1);">Cisco CCNA</h3>
          <p>Associate-level certification covering networking fundamentals, IP services, security fundamentals, and automation and programmability.</p>
          <button class="view-cert-btn" data-certificate="/portofolio/images/ccna.jpg">View Certificate</button>
        </div>
        <div class="certification-card card-container">
          <img src="/portofolio/images/mtcna.jpg" alt="MTCNA Certificate Preview" class="cert-preview-img" />
          <h3 style="color: var(--accent-2);">MTCNA</h3>
          <p>MikroTik Certified Network Associate, covering the basics of MikroTik RouterOS and RouterBOARD hardware.</p>
          <button class="view-cert-btn" data-certificate="/portofolio/images/mtcna.jpg">View Certificate</button>
        </div>
      </div>
    `,
  },
  {
    id: 6,
    title: "Projects",
    projects: [
      {
        id: "chat-lite",
        title: "Chat-Lite (Internal Secure Comms App)",
        repo: "https://github.com/h4nzs/chat-lite",
        img: "/portofolio/images/project-chat-lite.png",
        short: "Lightweight real-time chat web app (fast + E2E encryption).",
        status: '(work in progress)',
        tags: ['Fullstack', 'React', 'Node.js', 'Socket.io', 'Security'],
        long: `Chat-Lite is a modern real-time chat web app built with React + Socket.IO (frontend) and Express + Prisma (backend). Features: secure auth with JWT & httpOnly cookies, real-time messaging, message history, end-to-end encryption with libsodium, reactions, message status indicators, file/image upload, push notifications, dark/light theme, and a responsive UI optimized for low-end devices.
        <br><br>
        <h4>I. The Challenge</h4>
  <p>A client required a <strong>100% secure, internal web-based communication tool</strong> for their existing web ecosystem, demanding complete data control and trust beyond third-party platforms.</p>
  <h4>II. My Role & Solution</h4>
  <p>Designed and developed <strong>Chat-Lite</strong>: a minimalist, secure, and feature-rich chat application. Key focus: strict security with <strong>JWT authentication protocol</strong> and implementation of <strong>end-to-end or at-rest encryption</strong> to meet client privacy standards.</p>
  <h4>III. Impact / Results</h4>
  <p>Successfully integrated a <strong>zero-trust, highly secure communication tool</strong>, significantly <strong>reducing data leak risk</strong> and enhancing real-time team efficiency.</p>
  <br>
  <p><strong><i class="fas fa-microchip"></i> Technology Stack:</strong></p>
  <ul>
      <li><strong>Node.js, Express.js (API Backend)</strong></li>
      <li><strong>Socket.io (Real-time Communication)</strong></li>
      <li><strong>React.js, Vite (Frontend Framework)</strong></li>
      <li><strong>Libsodium (Encryption Library)</strong></li>
      <li><strong>PostgreSQL (Database)</strong></li>
  </ul>`,
      },
      {
        id: "anniv",
        title: "Anniv (Fullstack Social & Anonymous Platform)",
        repo: "https://github.com/h4nzs/anniv",
        img: "/portofolio/images/project-anniv.png",
        short: "Event/anniversary posting system built with CodeIgniter 4.",
        status: 'Private',
        tags: ['Fullstack', 'CodeIgniter 4', 'PHP', 'Vue.js'],
        long: `Anniv is a web app (CodeIgniter 4) for creating, displaying, and managing anniversary/event posts. Supports auth, role-based access, admin dashboard, posting & commenting, user profiles, and migration/seeders. Designed for internal events or community showcases.
        <br><br>
        <h4>I. The Challenge</h4>
  <p>The initial request for a simple online anniversary letter website was expanded into a unique platform opportunity combining <strong>personal emotion</strong> with <strong>community interaction</strong>.</p>
  <h4>II. My Role & Solution</h4>
  <p>Took on the full role of a Fullstack Developer, building <strong>Anniv</strong>. Integrated <strong>custom letter creation</strong> with a <strong>social media posting system</strong> supporting both <strong>Anonymous and Non-Anonymous comments</strong>, fostering a unique interaction environment.</p>
  <h4>III. Impact / Results</h4>
  <p>Successfully created a niche platform, proving my ability to <strong>develop complex fullstack systems</strong> from concept to live implementation with user-oriented community features.</p>
  <br>
  <p><strong><i class="fas fa-microchip"></i> Technology Stack:</strong></p>
  <ul>
      <li><strong>Codeigniter4 (PHP Framework)</strong></li>
      <li><strong>MySQL (Database)</strong></li>
      <li><strong>Vue.js (Frontend Library)</strong></li>
  </ul>`,
      },
      {
        id: "input-data",
        title: "Simple Data Input System (Counter Efficiency)",
        repo: "https://github.com/kenziyy/input-data",
        img: "/portofolio/images/project-input.png",
        short: "Simple transaction input system to reduce manual errors.",
        status: 'Live',
        tags: ['Frontend', 'JavaScript', 'HTML', 'CSS', 'UI/UX'],
        long: `Input Data is a lightweight system focused on simplifying transaction input for small businesses — streamlines data collection and minimizes manual entry errors. Built with basic web stack and easy to deploy.
        <br><br>
        <h4>I. The Challenge</h4>
  <p>Counter owner faced high human error rates (inputting customer numbers, transaction details), resulting in slow service and inaccurate data. The need was for a <strong>minimalist, zero-cost operational tool</strong>.</p>
  <h4>II. My Role & Solution</h4>
  <p>Developed a <strong>Simple Data Input System</strong> using <strong>Vanilla HTML, CSS, and JavaScript</strong>. Designed for <strong>maximum intuition</strong> to minimize errors and accelerate input. Implemented on <strong>GitHub Pages</strong> for free hosting.</p>
  <h4>III. Impact / Results</h4>
  <p>The tool successfully <strong>reduced transaction input errors to zero</strong> and <strong>accelerated average service time by 20%</strong>, improving bookkeeping accuracy and customer satisfaction.</p>
  <br>
  <p><strong><i class="fas fa-microchip"></i> Technology Stack:</strong></p>
  <ul>
      <li><strong>HTML, CSS, Vanilla JavaScript (Frontend)</strong></li>
      <li><strong>GitHub Pages (Zero-cost Hosting)</strong></li>
  </ul>`,
      },
    ],
  },
  {
    id: 7,
    title: "Professional Experience",
    html: `
      <div class="experience-entry-card">
        <img src="/portofolio/images/bit.png" alt="PT. Bentang Inspira Teknologi Logo" class="company-logo" />
        <div class="experience-details">
          <p><strong>PT. Bentang Inspira Teknologi — IT Support Intern</strong> (📅 6 Months)</p>
          <ul>
            <li>Identified and helped remediate 5+ critical vulnerabilities through penetration testing on internal web projects.</li>
            <li>Managed and configured firewall systems, resulting in a 15% reduction in detected malicious traffic.</li>
            <li>Administered Linux servers and performed network troubleshooting to maintain 99% uptime.</li>
          </ul>
          <p class="tech-stack"><strong>Technologies:</strong> <span>Linux</span> <span>pfSense</span> <span>Nmap</span> <span>Metasploit</span> <span>SQLmap</span></p>
        </div>
      </div>
      <div class="experience-entry-card">
        <img src="/portofolio/images/ruangdata.jpg" alt="Ruang Data Telemedia Logo" class="company-logo" />
        <div class="experience-details">
          <p><strong>Ruang Data Telemedia — Freelance Technician</strong> (📅 2024 – Present)</p>
          <ul>
            <li>Assisted customers with network & mobile issues.</li>
            <li>Built custom input data system to simplify transactions.</li>
          </ul>
          <p class="tech-stack"><strong>Technologies:</strong> <span>Mikrotik RouterOS</span> <span>HTML</span> <span>CSS</span> <span>JavaScript</span></p>
        </div>
      </div>
      <div class="experience-entry-card">
        <img src="/portofolio/images/dme.jpg" alt="PT. Dwimitra Ekatama Mandiri Logo" class="company-logo" />
        <div class="experience-details">
          <p><strong>PT. Dwimitra Ekatama Mandiri — Electrical Engineer (Huawei)</strong> (📅 1 Month)</p>
          <ul>
            <li>Participated in Huawei Data Center setup at GIIC Cikarang; wiring & infra prep.</li>
          </ul>
          <p class="tech-stack"><strong>Technologies:</strong> <span>Datacenter Infrastructure</span> <span>Wiring</span></p>
        </div>
      </div>
      <div class="experience-entry-card">
        <img src="/portofolio/images/freelance.png" alt="Freelance Logo" class="company-logo" />
        <div class="experience-details">
          <p><strong>Freelance Web Developer</strong> (📅 Ongoing)</p>
          <ul>
            <li>Currently developing Chat-Lite; handling small-mid web projects independently.</li>
          </ul>
          <p class="tech-stack"><strong>Technologies:</strong> <span>React</span> <span>Node.js</span> <span>PHP</span> <span>Vue.js</span></p>
        </div>
      </div>
    `,
  },
  {
    id: 8,
    title: "Career Objectives: Cyber & Dev Focus",
    html: `
      <div class="vision-background" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20vw; font-weight: 900; font-family: 'Orbitron', 'monospace'; color: transparent; background: var(--bg-name-gradient); -webkit-background-clip: text; background-clip: text; opacity: 0.1; white-space: nowrap; z-index: 1; line-height: 0.9; text-shadow: 0 0 5px rgba(0, 255, 204, 0.2), 0 0 10px rgba(0, 204, 255, 0.2), 0 0 20px rgba(204, 0, 255, 0.2), 0 0 40px rgba(255, 0, 204, 0.1); letter-spacing: -0.05em; pointer-events: none; max-width: 100vw; overflow: hidden; width: 100vw; text-align: center;">VISION</div>
      <div class="growth-background" style="position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); font-size: 12vw; font-weight: 900; font-family: 'Orbitron', 'monospace'; color: transparent; background: var(--accent-1); -webkit-background-clip: text; background-clip: text; opacity: 0.08; white-space: nowrap; z-index: 2; line-height: 0.9; text-shadow: 0 0 3px rgba(102, 204, 255, 0.15), 0 0 6px rgba(102, 204, 255, 0.15), 0 0 12px rgba(102, 204, 255, 0.15); letter-spacing: -0.05em; pointer-events: none; max-width: 100vw; overflow: hidden; width: 100vw; text-align: center;">GROWTH</div>
      <div class="career-objectives-layout">
        <div class="career-objectives-left">
          <h3 style="color: var(--accent-1);">[01] Cybersecurity: Zero-Trust Implementation</h3>
          <p>Mencari peran di bidang Keamanan Siber yang memungkinkan saya untuk berkontribusi pada strategi keamanan <em>zero-trust</em>, melakukan audit kerentanan, dan merancang protokol pertahanan yang kuat. Fokus utama adalah pada keamanan aplikasi web (AppSec) dan melindungi infrastruktur digital dari ancaman siber yang berkembang.</p>
          <br>
          <h3 style="color: var(--accent-2);">[02] Web Development: Fullstack & Secure</h3>
          <p>Berkeinginan untuk bergabung dengan tim pengembangan web di mana saya dapat menerapkan keterampilan Fullstack saya (Node.js/React/Vue) untuk membangun aplikasi web yang berkinerja tinggi, terukur, dan, yang paling penting, aman (Security by Design). Ingin mengkhususkan diri dalam pengembangan backend yang resisten terhadap serangan.</p>
          <br>
          <h3 style="color: var(--accent-3);">[03] Continuous Learning & Innovation</h3>
          <p>Selalu berkomitmen untuk mengadopsi teknologi keamanan dan pengembangan terbaru (seperti AI/ML dalam pertahanan siber atau framework modern) untuk memastikan solusi yang saya berikan tetap mutakhir dan efisien.</p>
        </div>
        <div class="career-objectives-center">
          <img src="/portofolio/images/career.png" alt="Career Growth" style="max-width: 100%; height: auto; border-radius: 0; box-shadow: none;" class="contact-photo" />
        </div>
        <div class="career-objectives-right">
          <blockquote style="margin: 0; padding: 1.5rem; font-style: italic; color: var(--text-weak); border-left: 3px solid var(--accent-1); background: rgba(255,255,255,0.05); border-radius: 0 8px 8px 0;">
            <p>\"Building secure, innovative solutions that make a lasting impact on the digital world.\"</p>
          </blockquote>
        </div>
      </div>
    `,
  },
  {
    id: 9,
    title: "Contact",
    html: `
      <div class="connect-background" style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); font-size: 15vw; font-weight: 900; font-family: 'Orbitron', 'monospace'; color: transparent; background: var(--bg-name-gradient); -webkit-background-clip: text; background-clip: text; opacity: 0.1; white-space: nowrap; z-index: 1; line-height: 0.9; text-shadow: 0 0 5px rgba(0, 255, 204, 0.2), 0 0 10px rgba(0, 204, 255, 0.2), 0 0 20px rgba(204, 0, 255, 0.2), 0 0 40px rgba(255, 0, 204, 0.1); letter-spacing: -0.05em; pointer-events: none; max-width: 100vw; overflow: hidden; width: 100vw; text-align: center;">CONNECT</div>
      
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1.2rem; width: 100%; position: relative; z-index: 3;">
        <div class="contact-node">
          <a href="mailto:sayadehan134@gmail.com" class="contact-link" style="display: flex; align-items: center; gap: 0.8rem; padding: 12px 24px; border: 2px solid transparent; border-image: linear-gradient(90deg, var(--accent-1), var(--accent-2)); border-image-slice: 1; color: var(--accent-1); border-radius: 8px; text-decoration: none; font-weight: 500; width: 100%; max-width: 300px; justify-content: center; transition: all 0.3s ease;">
            <span>📧</span>
            <span>Email Me</span>
          </a>
        </div>
        <div class="contact-node">
          <a href="https://github.com/h4nzs" target="_blank" rel="noreferrer" class="contact-link" style="display: flex; align-items: center; gap: 0.8rem; padding: 12px 24px; border: 2px solid transparent; border-image: linear-gradient(90deg, var(--accent-1), var(--accent-2)); border-image-slice: 1; color: var(--text-light); border-radius: 8px; text-decoration: none; width: 100%; max-width: 300px; justify-content: center; transition: all 0.3s ease;">
            <span>💻</span>
            <span>GitHub</span>
          </a>
        </div>
        <div class="contact-node">
          <a href="https://www.instagram.com/h4nzss/" target="_blank" rel="noreferrer" class="contact-link" style="display: flex; align-items: center; gap: 0.8rem; padding: 12px 24px; border: 2px solid transparent; border-image: linear-gradient(90deg, var(--accent-1), var(--accent-2)); border-image-slice: 1; color: var(--text-light); border-radius: 8px; text-decoration: none; width: 100%; max-width: 300px; justify-content: center; transition: all 0.3s ease;">
            <span>📱</span>
            <span>Instagram</span>
          </a>
        </div>
        <div class="contact-node">
          <a href="#" class="contact-link cta-button" style="display: flex; align-items: center; gap: 0.8rem; padding: 14px 32px; border: 2px solid transparent; border-image: linear-gradient(90deg, var(--accent-1), var(--accent-2)); border-image-slice: 1; color: var(--accent-1); border-radius: 8px; text-decoration: none; font-weight: 600; width: 100%; max-width: 300px; justify-content: center; transition: all 0.3s ease; font-size: 18px; margin-top: 1rem;">
            <span>👋</span>
            <span>GET IN TOUCH</span>
          </a>
        </div>
      </div>
    `,
  },
];

const profileImages = [
  "/portofolio/images/profile.png",
  "/portofolio/images/profile-1.png",
  "/portofolio/images/profile-2.png",
  "/portofolio/images/profile-3.png"
];

const App = React.memo(() => {
  // theme + 3D toggle (keadaan preserved)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [is3D, setIs3D] = useState(localStorage.getItem("is3D") === "true");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("is3D", is3D ? "true" : "false");
  }, [is3D]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggle3D = () => requestAnimationFrame(() => setIs3D((v) => !v)); // safe toggle

  // scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // project expanded state
  const [openProject, setOpenProject] = useState(null);
  const handleOpenProject = (id) => {
    setOpenProject((prev) => (prev === id ? null : id));
    setTimeout(() => {
      const el = document.getElementById(`project-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  // profile carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // certificate modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState('');
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? profileImages.length - 1 : prevIndex - 1
    );
  };

  // function to open certificate modal
  const openCertificateModal = (certificatePath) => {
    setCurrentCertificate(certificatePath);
    setModalOpen(true);
  };

  // event listener for certificate buttons
  useEffect(() => {
    const handleCertButtonClick = (e) => {
      if (e.target.classList.contains('view-cert-btn')) {
        const certPath = e.target.getAttribute('data-certificate');
        if (certPath) {
          openCertificateModal(certPath);
        }
      }
    };

    document.addEventListener('click', handleCertButtonClick);
    
    return () => {
      document.removeEventListener('click', handleCertButtonClick);
    };
  }, []);

  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const currentSlideIndex = Array.from(document.querySelectorAll(".slide")).findIndex(
          slide => slide.getBoundingClientRect().top >= 0 && slide.getBoundingClientRect().top <= 100
        );
        if (currentSlideIndex !== -1 && currentSlideIndex < slides.length - 1) {
          document.querySelectorAll(".slide")[currentSlideIndex + 1].scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const currentSlideIndex = Array.from(document.querySelectorAll(".slide")).findIndex(
          slide => slide.getBoundingClientRect().top >= 0 && slide.getBoundingClientRect().top <= 100
        );
        if (currentSlideIndex > 0) {
          document.querySelectorAll(".slide")[currentSlideIndex - 1].scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // render helpers
  const renderSkillsSection = (skills) => {
    // two separate cards: technical & soft
    return (
      <div className="skills-wrap" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
        <motion.div
          className="skill-card-large"
          whileHover={{ 
            y: -5, 
            scale: 1.03,
            boxShadow: "0 10px 30px rgba(102,204,255,0.2), 0 0 20px rgba(102,204,255,0.1)" 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            minWidth: 300,
            maxWidth: 520,
            padding: 18,
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
          }}
        >
          <h3 style={{ color: "var(--accent-1)", marginBottom: 8, fontWeight: 700 }}>Technical Skills</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-muted)" }}>
            {skills.technical.map((s, i) => (
              <li key={i} style={{ padding: "6px 0", borderBottom: i < skills.technical.length - 1 ? "1px dashed rgba(255,255,255,0.03)" : "none" }}>
                <strong style={{ color: "var(--accent-2)" }}>{s.label}:</strong> <span style={{ marginLeft: 6 }}>{s.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="skill-card-large soft"
          whileHover={{ 
            y: -5, 
            scale: 1.03,
            boxShadow: "0 10px 30px rgba(102,204,255,0.2), 0 0 20px rgba(102,204,255,0.1)" 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            minWidth: 260,
            maxWidth: 380,
            padding: 18,
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.03)",
            boxShadow: "0 8px 20px rgba(2,6,23,0.5)",
          }}
        >
          <h3 style={{ color: "var(--accent-1)", marginBottom: 8, fontWeight: 700 }}>Soft Skills</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-muted)" }}>
            {skills.soft.map((s, i) => (
              <li key={i} style={{ padding: "8px 0" }}>
                <strong>{s.value}</strong>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    );
  };

  const renderProjectsSection = (projects) => {
    return (
      <div className="projects-grid">
        {projects.map((p) => {
          const opened = openProject === p.id;
          return (
            <motion.div
              id={`project-${p.id}`}
              key={p.id}
              layout
              onClick={() => handleOpenProject(p.id)}
              initial={{ borderRadius: 12 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(102,204,255,0.3), 0 0 20px rgba(102,204,255,0.2)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`project-card ${opened ? 'expanded' : ''}`}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="project-thumb"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/400x250?text=Preview";
                  }}
                />
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column", gap: 4 }}>
                    <div>
                      <div className="project-title">{p.title}</div>
                      <div className="project-short-desc">{p.short}</div>
                    </div>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="repo-link">
                      Repo
                    </a>
                  </div>
                </div>
              </div>

              <motion.div
                className="project-desc"
                animate={opened ? { height: "auto", opacity: 1, marginTop: 10 } : { height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.36 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ color: "var(--text-weak)", fontSize: 14, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: `<p>${p.long}</p>` }} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // New render functions for specific slide layouts
  const renderSkillsSectionAsymmetrical = (skills) => {
    return (
      <div className="skills-technical-list">
        {skills.technical.map((skill, index) => (
          <div key={index} className="skill-item">
            <h4 style={{ color: "var(--accent-1)", marginBottom: 8, fontWeight: 600 }}>{skill.label}</h4>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>{skill.value}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderProjectsSectionZigZag = (projects) => {
    return (
      <div className="projects-zigzag">
        {projects.map((p, index) => {
          const opened = openProject === p.id;
          const isEven = index % 2 === 0;
          
          // Determine status class based on status value
          const getStatusClass = (status) => {
            if (status.toLowerCase().includes('live')) return 'status-live';
            if (status.toLowerCase().includes('wip') || status.toLowerCase().includes('work')) return 'status-wip';
            if (status.toLowerCase().includes('private')) return 'status-private';
            return 'status-unknown'; // fallback class
          };
          
          return (
            <motion.div
              id={`project-${p.id}`}
              key={p.id}
              layout
              onClick={() => handleOpenProject(p.id)}
              initial={{ borderRadius: 12 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(102,204,255,0.3), 0 0 20px rgba(102,204,255,0.2)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`project-card-zigzag ${isEven ? 'right' : 'left'} ${opened ? 'expanded' : ''}`}
            >
              <div className="project-card-zigzag-content" style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: isEven ? 'row' : 'row-reverse' }}>
                <div className="project-thumb-container">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="project-thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/400x250?text=Preview";
                    }}
                  />
                  <div className="image-overlay">
                    <span className="overlay-icon">👁️</span>
                  </div>
                </div>
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column", gap: 4 }}>
                    <div>
                      <div className="project-title">{p.title}</div>
                      <div className="project-short-desc">{p.short}</div>
                      {/* Project tags */}
                      <div className="project-tags-container">
                        {p.tags && p.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Repo link */}
                      {opened && (
                        <a href={p.repo} target="_blank" rel="noreferrer" className="repo-link">
                          Repo
                        </a>
                      )}
                      {/* Status badge */}
                      <span className={`status-badge ${getStatusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="project-desc"
                initial={false}
                animate={{ 
                  height: opened ? "auto" : 0,
                  opacity: opened ? 1 : 0,
                  marginTop: opened ? "12px" : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ color: "var(--text-weak)", fontSize: 14, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: `<p>${p.long}</p>` }} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Render education timeline with zigzag layout
  const renderEducationTimeline = (html) => {
    // Parse the HTML to extract individual education entries
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Select all the education entry cards
    const entries = Array.from(tempDiv.querySelectorAll('.education-entry-card'));
    
    return (
      <div className="education-zigzag-container">
        {entries.map((entry, index) => {
          const isEven = index % 2 === 0;
          const entryHtml = entry.outerHTML;
          
          return (
            <div 
              key={index} 
              className={`education-card-zigzag ${isEven ? 'left' : 'right'}`}
            >
              <div 
                className="education-entry-card-zigzag-content"
                dangerouslySetInnerHTML={{ __html: entryHtml }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Render experience timeline with zigzag layout
  const renderExperienceTimeline = (html) => {
    // Parse the HTML to extract individual experience entries
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Select all the experience entry cards
    const entries = Array.from(tempDiv.querySelectorAll('.experience-entry-card'));
    
    return (
      <div className="experience-zigzag-container">
        {entries.map((entry, index) => {
          const isEven = index % 2 === 0;
          const entryHtml = entry.outerHTML;
          
          return (
            <div 
              key={index} 
              className={`experience-card-zigzag ${isEven ? 'left' : 'right'}`}
            >
              <div 
                className="experience-entry-card-zigzag-content"
                dangerouslySetInnerHTML={{ __html: entryHtml }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderProjectsSectionCompact = (projects) => {
    return (
      <div className="projects-compact-grid">
        {projects.map((p) => {
          const opened = openProject === p.id;
          return (
            <motion.div
              id={`project-${p.id}`}
              key={p.id}
              layout
              onClick={() => handleOpenProject(p.id)}
              initial={{ borderRadius: 12 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(102,204,255,0.3), 0 0 20px rgba(102,204,255,0.2)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`project-card-compact ${opened ? 'expanded' : ''}`}
            >
              <div className="project-card-compact-content">
                <div className="project-thumb-container">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="project-thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/400x250?text=Preview";
                    }}
                  />
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <div className="project-title">{p.title}</div>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="repo-link">
                      Repo
                    </a>
                  </div>
                  <div className="project-short-desc">{p.short}</div>
                </div>
              </div>

              <motion.div
                className="project-desc"
                initial={false}
                animate={{ 
                  height: opened ? "auto" : 0,
                  opacity: opened ? 1 : 0,
                  marginTop: opened ? "16px" : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div 
                  style={{ 
                    color: "var(--text-weak)", 
                    fontSize: 14, 
                    lineHeight: 1.6 
                  }} 
                  dangerouslySetInnerHTML={{ __html: `<p>${p.long}</p>` }} 
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`app-root ${theme === "dark" ? "theme-dark" : "theme-light"} animated-bg`}>
      {/* top progress */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* certificate modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setModalOpen(false)}>&times;</span>
            <img src={currentCertificate} alt="Certificate" className="modal-image" />
          </div>
        </div>
      )}

      {/* navbar */}
      <header className="navbar">
        <div className="nav-left">
          <div className="brand">h4n.dev</div>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            {slides.map((s) => (
              <button key={s.id} onClick={() => document.getElementById(`slide-${s.id}`)?.scrollIntoView({ behavior: "smooth" })} className="nav-btn">
                {s.title}
              </button>
            ))}
          </div>

          <div className="nav-controls">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className={`icon-btn ${is3D ? "on" : ""}`} onClick={toggle3D} title="Toggle 3D">
              🌀
            </button>
          </div>
        </div>
      </header>

      {/* content: hero + slides laid out vertical with new compositions */}
      <main className="scroll-container">
        {/* About Me - Cyberpunk layered composition */}
        <section id="slide-1" className="slide slide-about">
          <div className="background-name">DEHAN</div>
          <motion.div 
            className="slide-content about-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="about-columns-container">
              <div className="about-text-container">
                <h2 className="slide-title">{slides[0].title}</h2>
                <div className="about-text" dangerouslySetInnerHTML={{ __html: slides[0].html }} />
              </div>
              <div className="hobbies-container">
                <div className="hobbies-content" dangerouslySetInnerHTML={{ __html: slides[0].hobbies }} />
              </div>
            </div>
            <div 
              className="profile-container"
              onMouseEnter={() => {}} // Hover glow is handled via CSS
            >
              <div className="carousel-container">
                <div className="carousel-track" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                  {profileImages.map((imgSrc, index) => (
                    <div key={index} className="carousel-slide">
                      <img
                        src={imgSrc}
                        alt={`profile ${index + 1}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/400x400?text=Profile";
                        }}
                        className="profile-image carousel-item"
                      />
                    </div>
                  ))}
                </div>
                <button 
                  className="carousel-arrow carousel-prev" 
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button 
                  className="carousel-arrow carousel-next" 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                >
                  &gt;
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Skills - Asymmetrical column layout */}
        <section id="slide-2" className="slide slide-skills">
          <motion.div 
            className="slide-content skills-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="skills-column-left">
              <h2 className="slide-title">{slides[1].title}</h2>
              <div className="skills-categories">
                {slides[1].skills.technical.map((skill, index) => {
                  // Find the corresponding rating from skillRatings - more specific matching
                  let skillRating;
                  if (skill.label.toLowerCase().includes('sysadmin') || skill.label.toLowerCase().includes('system administration')) {
                    skillRating = skillRatings.technical.find(rating => rating.category === 'Sysadmin');
                  } else if (skill.label.toLowerCase().includes('security')) {
                    skillRating = skillRatings.technical.find(rating => rating.category === 'Security');
                  } else if (skill.label.toLowerCase().includes('tools')) {
                    skillRating = skillRatings.technical.find(rating => rating.category === 'Tools');
                  } else if (skill.label.toLowerCase().includes('other')) {
                    skillRating = skillRatings.technical.find(rating => rating.category === 'Other');
                  } else {
                    skillRating = skillRatings.technical.find(rating => 
                      rating.category.toLowerCase().includes(skill.label.toLowerCase()) || 
                      skill.label.toLowerCase().includes(rating.category.toLowerCase())
                    );
                  }
                  
                  return (
                    <div key={index} className="skill-category">
                      {skill.label}
                      {skillRating && (
                        <div className="skill-progress-container" style={{ marginTop: '8px' }}>
                          <div className="skill-progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${skillRating.percentage}%`,
                                backgroundColor: 'var(--accent-1)',
                                height: '6px',
                                borderRadius: '3px'
                              }}
                            ></div>
                          </div>
                          <div style={{ 
                            fontSize: '0.7rem', 
                            marginTop: '2px',
                            color: 'var(--text-weak)',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <span>{skillRating.level}</span>
                            <span>{skillRating.percentage}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="skills-column-right">
              {renderSkillsSectionAsymmetrical(slides[1].skills)}
            </div>
          </motion.div>
        </section>

        {/* Soft Skills - Mirrored asymmetrical layout */}
        <section id="slide-3" className="slide slide-soft-skills">
          <motion.div 
            className="slide-content soft-skills-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="soft-skills-content-wrapper">
              <div className="soft-skills-left">
                <div className="soft-skills-cards-container">
                  {slides[2].skills.soft.map((skill, index) => {
                    // Find the corresponding rating from skillRatings
                    const skillRating = skillRatings.soft.find(rating => 
                      rating.category.toLowerCase().includes(skill.label.toLowerCase()) || 
                      skill.label.toLowerCase().includes(rating.category.toLowerCase())
                    );
                    
                    return (
                      <div key={index} className="soft-skill-card">
                        <h4 style={{ color: 'var(--accent-2)', marginBottom: 8, fontWeight: 600 }}>{skill.label}</h4>
                        {skill.value && <p style={{ color: 'var(--text-weak)', margin: 0, fontSize: '0.9rem' }}>{skill.value}</p>}
                        {skillRating && (
                          <div className="skill-progress-container" style={{ marginTop: '12px' }}>
                            <div className="skill-progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ 
                                  width: `${skillRating.percentage}%`,
                                  backgroundColor: 'var(--accent-2)',
                                  height: '8px',
                                  borderRadius: '4px'
                                }}
                              ></div>
                            </div>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              fontSize: '0.7rem', 
                              marginTop: '4px',
                              color: 'var(--text-weak)'
                            }}>
                              <span>{skillRating.level}</span>
                              <span>{skillRating.percentage}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="soft-skills-right">
                <h2 className="slide-title soft-skills-title" style={{ textAlign: 'right' }}>{slides[2].title}</h2>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education - Timeline layout */}
        <section id="slide-4" className="slide slide-education">
          <motion.div 
            className="slide-content education-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="slide-title education-title">{slides[3].title}</h2>
            <div className="education-timeline-container">
              <div className="timeline-line"></div>
              <div className="timeline-entries">
                {renderEducationTimeline(slides[3].html)}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Professional Certifications - Grid layout */}
        <section id="slide-5" className="slide">
          <motion.div 
            className="slide-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="slide-title">{slides[4].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: slides[4].html }} />
          </motion.div>
        </section>

        {/* Projects - Zig-zag layout */}
        <section id="slide-6" className="slide slide-projects">
          <motion.div 
            className="slide-content projects-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="slide-title">{slides[5].title}</h2>
            <div className="projects-container">
              {renderProjectsSectionZigZag(slides[5].projects)}
            </div>
          </motion.div>
        </section>

        {/* Professional Experience - Timeline layout */}
        <section id="slide-7" className="slide slide-experience">
          <motion.div 
            className="slide-content experience-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="slide-title">{slides[6].title}</h2>
            <div className="experience-timeline-container">
              <div className="experience-timeline-line"></div>
              <div className="experience-entries">
                {renderExperienceTimeline(slides[6].html)}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Career Objectives - Two-column layout */}
        <section id="slide-8" className="slide slide-objectives">
          <motion.div 
            className="slide-content objectives-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="objectives-left">
              <h2 className="slide-title">{slides[7].title}</h2>
            </div>
            <div className="objectives-right" dangerouslySetInnerHTML={{ __html: slides[7].html }} />
          </motion.div>
        </section>

        {/* Contact - Centered layout with floating artifacts */}
        <section id="slide-9" className="slide slide-contact">
          <motion.div 
            className="slide-content contact-content" 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="slide-title">{slides[8].title}</h2>
            <div className="contact-details" dangerouslySetInnerHTML={{ __html: slides[8].html }} />
            <div className="digital-artifact-3d-1">
              <div className="console-log-box">
                <div className="console-line">$ PING 172.253.118.100</div>
                <div className="console-line">STATUS: ONLINE</div>
                <div className="console-line">INITIATE::HANDSHAKE_PROTOCOL_V4</div>
                <div className="console-line">&gt;&gt; DATA_STREAM_READY_FOR_CONN</div>
                <div className="console-line">SUCCESS: AUTH_TOKEN_RECEIVED</div>
              </div>
            </div>
            <div className="digital-artifact-3d-2">
              <div className="console-log-box">
                <div className="console-line">$ SYSTEM STATUS</div>
                <div className="console-line">CPU: 67% | MEM: 42%</div>
                <div className="console-line">DISK: 73% | NET: 12.4 KB/s</div>
                <div className="console-line">&gt;&gt; SECURITY_SCAN_ACTIVE</div>
                <div className="console-line">THREAT_LEVEL: LOW</div>
              </div>
            </div>
            <div className="digital-artifact-3d-3">
              <div className="console-log-box">
                <div className="console-line">$ HEX_DUMP a7b2c9d4</div>
                <div className="console-line">0000: a7 b2 c9 d4 1f 8a 3e 7c</div>
                <div className="console-line">0008: 55 6f 23 8b 9c 4d 1e 6a</div>
                <div className="console-line">&gt;&gt; ENCRYPTION_KEY_VALID</div>
                <div className="console-line">CHKSUM: 3a4b2c1d</div>
              </div>
            </div>
            <div className="digital-artifact-3d-4">
              <div className="console-log-box">
                <div className="console-line">$ ROUTE 192.168.1.0/24</div>
                <div className="console-line">GATEWAY: 192.168.1.1</div>
                <div className="console-line">DNS: 8.8.8.8, 8.8.4.4</div>
                <div className="console-line">&gt;&gt; VPN_TUNNEL_ESTABLISHED</div>
                <div className="console-line">ENCRYPT: AES-256</div>
              </div>
            </div>
          </motion.div>
          <div className="outer-artifacts-container">
            <div className="digital-artifact-3d outer-1">
              <div className="console-log-box">
                <div className="console-line">$ NSLOOKUP github.com</div>
                <div className="console-line">140.82.114.4</div>
                <div className="console-line">&gt;&gt; CACHED: 0.2s</div>
              </div>
            </div>
            <div className="digital-artifact-3d outer-2">
              <div className="console-log-box">
                <div className="console-line">$ TRACEROUTE 8.8.8.8</div>
                <div className="console-line">HOP 3: 192.168.1.1</div>
                <div className="console-line">HOP 4: 203.0.113.5</div>
              </div>
            </div>
            <div className="digital-artifact-3d outer-3">
              <div className="console-log-box">
                <div className="console-line">$ IFCONFIG eth0</div>
                <div className="console-line">inet 192.168.1.105</div>
                <div className="console-line">netmask 255.255.255.0</div>
              </div>
            </div>
            <div className="digital-artifact-3d outer-4">
              <div className="console-log-box">
                <div className="console-line">$ IPTABLES -L</div>
                <div className="console-line">INPUT: ACCEPT</div>
                <div className="console-line">OUTPUT: ACCEPT</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Dehan — built with ❤️</div>
      </footer>
    </div>
  );
});

export default App;