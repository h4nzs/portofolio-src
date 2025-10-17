ai coder edit src/App.jsx --prompt "
Tujuan:
Tambahkan easter egg cinematic yang muncul setiap kali pengguna masuk ke mode fullscreen (menekan F11 atau melalui requestFullscreen API). Saat diaktifkan, tampilkan tiga teks bergaya terminal:
1. ACCESS GRANTED 🔓
2. INITIALIZING CYBER CORE...
3. WELCOME, OPERATOR.

Instruksi Detail:
1. Di dalam useEffect utama App.jsx, tambahkan event listener untuk event 'fullscreenchange' dan keydown 'F11'.
2. Saat fullscreen diaktifkan, jalankan fungsi showCyberSequence() yang:
   - Membuat overlay penuh layar (div dengan class 'cyber-overlay').
   - Di dalamnya, tampilkan teks satu per satu dengan efek typing atau fade sequential.
   - Setelah semua teks selesai muncul (total ±4 detik), overlay otomatis fade out dan dihapus dari DOM.

3. Gunakan CSS animation untuk efek cinematic:
   - Ketika overlay muncul, beri background semi-transparan hitam (#000000c0).
   - Teks tampil dengan efek typing/fade (1 per 1).
   - Akhiri dengan efek glow neon biru sesuai var(--accent-1).

4. Tambahkan di App.css:
   .cyber-overlay {
     position: fixed;
     inset: 0;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     background: rgba(0, 0, 0, 0.85);
     backdrop-filter: blur(4px);
     z-index: 9999;
     animation: overlayFade 4.5s ease-in-out forwards;
     font-family: 'Share Tech Mono', monospace;
     color: var(--accent-1);
     letter-spacing: 2px;
     text-transform: uppercase;
   }
   .cyber-text {
     opacity: 0;
     font-size: 1.4rem;
     text-shadow: 0 0 10px var(--accent-1);
     animation: textFade 0.8s ease forwards;
   }
   .cyber-text:nth-child(1) { animation-delay: 0.4s; }
   .cyber-text:nth-child(2) { animation-delay: 1.4s; }
   .cyber-text:nth-child(3) { animation-delay: 2.6s; }

   @keyframes textFade {
     0% { opacity: 0; transform: translateY(10px); }
     50% { opacity: 1; transform: translateY(0); }
     100% { opacity: 0.9; }
   }

   @keyframes overlayFade {
     0% { opacity: 0; }
     10% { opacity: 1; }
     80% { opacity: 1; }
     100% { opacity: 0; }
   }

5. Jangan ganggu layout atau komponen lain, cukup tambahkan efek ini.
6. Pastikan listener dibersihkan di cleanup useEffect.

Output:
- Saat user menekan F11, layar masuk fullscreen dan animasi cyber cinematic muncul dengan 3 teks sekuensial.
- Setelah selesai, overlay menghilang otomatis.
- Warna dan font mengikuti tema (var(--accent-1)).
"