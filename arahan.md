Tujuan:
Perbaiki dan optimalkan efek bola-bola neon (glowing dots) agar tidak menutupi teks dalam card, melainkan berada di belakang konten card dan juga sebagian tersebar di background untuk menambah depth dan kesan cyberpunk yang dinamis.

Instruksi Spesifik:
1. Bola-bola neon yang sebelumnya menutupi teks harus dipindahkan ke lapisan belakang:
   - Gunakan properti CSS `z-index: 0` atau `-1` (tergantung struktur elemen).
   - Pastikan elemen teks dan isi card tetap pada lapisan di atas (`z-index: 2` atau lebih tinggi).
2. Efek glowing dots harus muncul di dua lokasi:
   - **A. Di sekitar card:** beberapa bola kecil di belakang tiap card, misalnya di sudut kiri atas, kanan bawah, atau di sisi.
   - **B. Di background global:** tambahkan beberapa bola kecil yang melayang bebas (floating) di area section agar menciptakan kedalaman visual (depth).
3. Gunakan pseudo-element CSS (`::before`, `::after`) atau div khusus dengan class `.floating-dot-bg` untuk bola-bola di background section.
4. Gaya bola-bola neon:
   - Ukuran: 8px–18px, bervariasi secara acak agar natural.
   - Warna: gunakan `var(--accent-1)` untuk utama, bisa kombinasikan dengan `var(--accent-2)` untuk variasi halus.
   - Efek: gunakan `box-shadow` dan `filter: blur()` untuk efek glow lembut.
   - Animasi: gunakan keyframes lembut `float` atau `pulse` dengan durasi 6–12 detik dan easing `ease-in-out` agar terasa hidup.
5. Pastikan bola-bola:
   - Tidak memengaruhi layout card (gunakan `position: absolute` dan `pointer-events: none`).
   - Tidak menyebabkan flickering di hover animation.
6. Terapkan efek ini pada section:
   - `.slide-education`
   - `.slide-experience`
   - `.slide-projects`
7. Pertahankan performa: gunakan hanya beberapa elemen per section (maks. 5–8 bola kecil) agar tetap ringan di GitHub Pages.
8. Pastikan bola tetap terlihat di mode terang dan gelap — gunakan warna accent yang sudah ada, jangan hardcode warna baru.

Output yang diharapkan:
- Bola neon kembali muncul di belakang teks dan card.
- Beberapa bola tambahan di background memberi kesan depth dan gerakan dinamis.
- Semua teks tetap terbaca jelas, layout card tidak berubah, dan performa tetap ringan.

Catatan:
Gunakan teknik layering dengan `position: absolute; z-index: -1` di dalam container card agar efek bola berada di lapisan bawah, serta tambahkan wrapper global `.floating-dot-bg` di setiap section untuk bola bebas di background.
"