Perbarui file App.jsx dan App.css untuk hero section terbaru.

🎯 Tujuan:
1. Perbaiki latar belakang animasi di hero section agar menutupi seluruh area section secara penuh.
2. Percepat sedikit efek typing teks agar tampil lebih responsif dan ritmis.

📋 Instruksi Detail:

1. Pastikan elemen latar belakang (seperti grid, bola-bola neon, atau animasi partikel) memiliki properti berikut di CSS:
   .slide-hero {
     position: relative;
     overflow: hidden;
     width: 100%;
     height: 100vh;
   }

   .slide-hero::before {
     content: '';
     position: absolute;
     inset: 0;
     background: radial-gradient(circle at center, rgba(0,255,255,0.1) 0%, transparent 70%);
     animation: pulse-bg 8s infinite ease-in-out alternate;
     z-index: 0;
   }

   Tambahkan jika perlu lapisan tambahan partikel:
   .hero-bg-particles {
     position: absolute;
     inset: 0;
     width: 100%;
     height: 100%;
     z-index: 0;
   }

   Pastikan konten teks berada di atas animasi:
   .hero-content {
     position: relative;
     z-index: 2;
   }

2. Jika ada elemen animasi bola (div class='dot' atau partikel), pastikan posisinya absolut dan skalanya menggunakan unit relatif viewport (vh/vw), bukan pixel statis, agar menyesuaikan ukuran layar.

3. Atur ulang kecepatan efek typing di komponen React:
   - Temukan interval typing (biasanya setInterval atau delay 100ms).
   - Ubah nilai delay menjadi 60ms (atau 0.06 detik) untuk typing dan 30–40ms untuk backspace.

   Contoh:
   const TYPING_SPEED = 60;
   const DELETING_SPEED = 40;

4. Periksa juga efek fade-in atau motion dari Framer Motion (jika digunakan).
   - Pastikan delay awal animasi tidak lebih dari 0.3s agar tidak terasa lambat di awal load.

5. Jangan ubah urutan atau konten teks hero.
   - Hanya sesuaikan animasi dan styling agar tampil cinematic penuh di layar.

📦 Output:
- Hero section kini menutupi layar penuh tanpa area kosong.
- Latar animasi bergerak halus di seluruh area hero.
- Efek typing berjalan lebih cepat dan natural.