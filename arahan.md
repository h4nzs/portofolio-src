Tujuan:
Ubah proporsi tampilan section Education dan Professional Experience agar tampil zigzag kiri–kanan bergantian seperti pada section Projects, tanpa mengubah warna tema, gradient, shadow, atau animasi card.

Instruksi Spesifik:
1. Jangan ubah variabel tema dan warna di App.css (seperti --accent, --text, --bg-gradient, dsb). Semua efek visual dan animasi tetap dipertahankan.
2. Fokus hanya pada layout untuk dua bagian:
   - .slide-education (Education)
   - .slide-experience atau bagian dengan title: 'Professional Experience' (Experience)
3. Terapkan layout zigzag dengan pendekatan serupa .projects-zigzag:
   - Card pertama rata kiri, card kedua rata kanan, bergantian ke bawah.
   - Gunakan flexbox atau grid agar responsif di desktop dan mobile.
   - Pastikan alignment, gap, dan spacing tetap harmonis dengan layout global.
4. Jangan ubah tampilan, warna, animasi, atau efek hover pada .timeline-content, .experience-card, maupun card lainnya.
5. Gunakan class existing (.timeline-entry, .timeline-content, .experience-card, dst) dan tambahkan selector nth-child untuk posisi zigzag, tanpa membuat class baru yang berlebihan.
6. Pastikan hasilnya ringan untuk GitHub Pages, responsif di layar kecil, dan tampilan tetap profesional.

Output yang diharapkan:
- Kode CSS dan/atau JSX yang menghasilkan tampilan zigzag untuk Education dan Professional Experience.
- Semua efek warna, hover, animasi, dan tema (dark/light) tetap identik.
- Hasil akhir tampak halus, seimbang, dan elegan di semua resolusi layar.

Referensi:
Gunakan pola layout dari .projects-zigzag dan .project-card-zigzag di App.css sebagai acuan utama untuk membangun tampilan zigzag baru.
"