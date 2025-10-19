```
Tugasmu: tingkatkan bagian Hero Section pada file `App.jsx` agar terlihat lebih cinematic dan interaktif tanpa memengaruhi struktur section lain.

🎯 Tujuan:
Tambahkan tiga fitur berikut ke Hero Section:
1. Animated Tagline Rotation (text berganti otomatis)
2. Animated System Messages (log acak muncul di background)
3. Parallax Depth Effect (objek hero bergerak halus berdasarkan scroll)

🧩 Detail Implementasi:

1️⃣ **Animated Tagline Rotation**
- Tambahkan array teks seperti:
  [
    "Building Secure Systems.",
    "Exploring Cyber Frontiers.",
    "Developing with Precision.",
    "Ethical Hacker in Progress."
  ]
- Ganti isi tagline hero (`typing effect`) setiap 3–4 detik dengan efek fade atau ketik cepat (gunakan `useState` + `useEffect`).
- Jangan gunakan library berat seperti `typed.js`, cukup buatan sendiri dengan interval + animasi CSS.

2️⃣ **Animated System Messages**
- Buat komponen kecil `<SystemLog />` yang menampilkan pesan-pesan terminal acak seperti:
```

[SYS] Initializing AI core...
[NET] Connection established to remote node.
[AUTH] User verified successfully.
[SCAN] Running background threat analysis...
[INFO] Updating security modules.

```
- Muncul 1 pesan setiap 10 detik dengan efek `fadeIn/fadeOut`.
- Pesan muncul di bagian background bawah kanan hero section dengan opacity rendah (misal `opacity: 0.4`).

3️⃣ **Parallax Depth Hero**
- Tambahkan efek parallax pada elemen hero (text utama, tombol, terminal box) dengan CSS `transform: translateY()` yang berubah sedikit saat scroll.
- Gunakan event listener `window.addEventListener('scroll', ...)` dan simpan nilai scrollY untuk mengatur depth movement.
- Contoh:
```

transform: translateY(${scrollY * 0.1}px);

```
- Pastikan smooth dan ringan (gunakan `requestAnimationFrame` agar tidak lag).

🎨 **Tambahan Styling di App.css:**
- Tambahkan animasi halus:
```

@keyframes fadeInOut {
0% { opacity: 0; transform: translateY(10px); }
20%, 80% { opacity: 0.6; transform: translateY(0); }
100% { opacity: 0; transform: translateY(-10px); }
}

```
- Gunakan font monospaced untuk system log agar tampak seperti terminal.
- Tambahkan z-index dan position absolute agar system log tidak mengganggu teks utama.

⚙️ **Catatan:**
- Jangan ubah struktur section lain di bawah hero.
- Pastikan animasi bekerja di desktop & mobile (gunakan `useEffect` dengan cleanup).
- Efek tetap halus meskipun GitHub Pages reload.

💾 Output akhir:
- Hero section terasa hidup, ada teks yang berganti otomatis, background ada pesan sistem muncul hilang secara acak, dan elemen bergerak halus saat scroll.
```