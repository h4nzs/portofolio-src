ai coder edit src/App.css --prompt "
Tujuan:
Tingkatkan tampilan visual dengan dua perbaikan:
1. Tambahkan efek hover glow halus pada ikon Eye (lucide-react) di overlay project card.
2. Perhalus animasi bola-bola neon (glowing dots) agar memiliki efek parallax lembut dan depth visual yang menarik, tanpa mengganggu performa.

Instruksi Spesifik:

1. Efek Hover Glow pada Icon Eye:
   - Target elemen: .project-overlay svg (ikon Eye)
   - Tambahkan properti berikut:
     transition: transform 0.3s ease, filter 0.4s ease;
   - Saat hover di .project-overlay:
     transform: scale(1.1);
     filter: drop-shadow(0 0 6px var(--accent-1));
   - Efek ini hanya aktif saat hover pada area overlay project.

2. Efek Parallax Floating pada Bola Neon:
   - Target elemen: .floating-dot, .floating-dot-bg, atau elemen bola neon lain yang digunakan.
   - Tambahkan animasi keyframes baru:
     @keyframes parallaxFloat {
       0% { transform: translateY(0) translateX(0); opacity: 0.9; }
       50% { transform: translateY(-12px) translateX(6px); opacity: 1; }
       100% { transform: translateY(0) translateX(0); opacity: 0.9; }
     }
   - Terapkan animasi ini pada bola neon dengan variasi acak menggunakan variabel custom CSS:
     animation: parallaxFloat 10s ease-in-out infinite;
     animation-delay: calc(var(--i) * -1s);
   - Gunakan beberapa bola dengan properti --i berbeda untuk menghasilkan gerakan dinamis alami.
   - Pastikan posisi bola di belakang teks (z-index: -1) dan tidak memengaruhi interaksi (pointer-events: none).

3. Pastikan:
   - Tidak ada perubahan warna tema (gunakan var(--accent-1) dan var(--accent-2)).
   - Tidak menambah jumlah elemen bola berlebihan (maks. 8–10 per section).
   - Animasi ringan dan halus di GitHub Pages.

Output yang diharapkan:
- Ikon Eye di overlay project card menampilkan efek glow lembut saat hover.
- Bola-bola neon bergerak lembut dengan variasi arah seperti efek parallax, menciptakan depth realistis.
- Tidak ada perubahan layout, warna, atau performa keseluruhan.
"