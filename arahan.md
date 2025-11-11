> **Tujuan:** Menambahkan *animated tagline rotation*, *animated system messages*, dan *parallax depth effect* pada **Hero Section** baru di atas “About Me”, tanpa mengubah section lain.

---

### 🧭 **Langkah Struktur:**

#### 1️⃣ Tambahkan di `App.jsx` — Tepat **sebelum deklarasi `slides` (sekitar line 110–120)**

```jsx
// Hero tagline rotation & system log setup
const heroTaglines = [
  "Building Secure Systems.",
  "Exploring Cyber Frontiers.",
  "Developing with Precision.",
  "Ethical Hacker in Progress."
];

const systemLogs = [
  "[SYS] Initializing AI core...",
  "[NET] Connection established to remote node.",
  "[AUTH] User verified successfully.",
  "[SCAN] Running background threat analysis...",
  "[INFO] Updating security modules..."
  "[PROC] Memory allocation optimized.",
  "[LINK] Secure tunnel established.",
  "[FW] Firewall rules updated.",
  "[LOG] System integrity check passed.",
  "[PORT] Listening on port 443 (HTTPS)."
];
```

---

#### 2️⃣ Tambahkan di **dalam komponen utama `App`**, di bagian atas (sekitar line 250–260):

```jsx
// HERO animation states
const [currentTagline, setCurrentTagline] = useState(0);
const [visibleLog, setVisibleLog] = useState("");

useEffect(() => {
  const taglineInterval = setInterval(() => {
    setCurrentTagline((prev) => (prev + 1) % heroTaglines.length);
  }, 3500);

  const logInterval = setInterval(() => {
    const randomLog = systemLogs[Math.floor(Math.random() * systemLogs.length)];
    setVisibleLog(randomLog);
  }, 10000);

  return () => {
    clearInterval(taglineInterval);
    clearInterval(logInterval);
  };
}, []);
```

---

#### 3️⃣ Tambahkan **section baru** di bawah navbar (sekitar line 310–320), sebelum section *About Me*:

```jsx
{/* Hero Section */}
<section className="slide slide-hero">
  <div className="hero-content">
    <h1 className="hero-tagline">{heroTaglines[currentTagline]}</h1>
    <p className="hero-subtext">Welcome to my digital domain.</p>
    <div className="hero-system-log">{visibleLog}</div>
  </div>

  {/* Parallax Layers */}
  <div className="hero-layer layer-bg"></div>
  <div className="hero-layer layer-fg"></div>
</section>
```

---

#### 4️⃣ Tambahkan **scroll parallax effect** di dalam `useEffect()` utama (bisa di bawah section keyboard handler):

```jsx
useEffect(() => {
  const handleParallax = () => {
    const layers = document.querySelectorAll(".hero-layer");
    layers.forEach((layer, index) => {
      const speed = index === 0 ? 0.1 : 0.2;
      layer.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  };
  window.addEventListener("scroll", handleParallax);
  return () => window.removeEventListener("scroll", handleParallax);
}, []);
```

---

#### 5️⃣ Tambahkan di `App.css` — **sekitar line 1850–1900 (di bawah `.slide` base styles):**

```css
/* HERO SECTION */
.slide-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: transparent;
}

.hero-content {
  z-index: 3;
  position: relative;
  color: var(--text-light);
}

.hero-tagline {
  font-size: 2.6rem;
  font-family: 'Orbitron', monospace;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  -webkit-background-clip: text;
  color: transparent;
  animation: fadeRotate 3.5s ease-in-out infinite;
}

.hero-subtext {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-top: 12px;
}

.hero-system-log {
  position: absolute;
  bottom: 5%;
  right: 10%;
  font-family: monospace;
  font-size: 0.9rem;
  opacity: 0.5;
  animation: fadeInOut 10s infinite;
}

/* Parallax layers */
.hero-layer {
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(102,204,255,0.08), transparent 70%);
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.2s ease-out;
}

.layer-fg {
  background: radial-gradient(circle, rgba(204,102,255,0.1), transparent 80%);
  z-index: 2;
}

@keyframes fadeRotate {
  0%, 100% { opacity: 0; transform: translateY(10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10%, 90% { opacity: 0.5; }
  100% { opacity: 0; }
}
```

---

### 🧩 **Tambahan Catatan untuk AI Coder**

> * Jangan ubah atau hapus komponen lain di bawah “About Me”.
> * Pastikan `Hero Section` ditambahkan **sebelum slide About Me**.
> * Pastikan tidak menimpa efek scroll atau navbar.
> * Cek `App.css` untuk duplikasi kelas `.slide`, hanya tambahkan kode hero di bawahnya.
> * Pastikan animasi tetap ringan dan kompatibel untuk GitHub Pages.

---