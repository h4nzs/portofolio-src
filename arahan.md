ai coder edit index.html --prompt "
Tujuan:
Tambahkan metadata SEO dan Open Graph (OG) lengkap agar website portofolio tampil optimal di mesin pencari dan saat dibagikan (Discord, LinkedIn, WhatsApp, Telegram, dll).

Instruksi Spesifik:
1. Tambahkan metadata berikut di dalam <head> file index.html, tanpa mengubah struktur atau script Vite:
   - <meta name='title' content='Hanif A.N. — Cyber Security & Web Developer Portfolio' />
   - <meta name='description' content='Portfolio resmi Hanif A.N., mahasiswa Teknik Informatika dengan fokus Cyber Security dan Ethical Hacking. Menampilkan proyek fullstack, pengalaman profesional, dan sertifikasi.' />
   - <meta name='keywords' content='Hanif A.N, Cyber Security, Ethical Hacking, Web Developer, React, Vite, Portfolio, JavaScript, Network Engineer' />
   - <meta name='author' content='Hanif A.N.' />
   - <meta name='robots' content='index, follow' />
   - <link rel='canonical' href='https://h4nzs.github.io/portofolio/' />

2. Tambahkan metadata Open Graph (OG) untuk preview card:
   - <meta property='og:type' content='website' />
   - <meta property='og:url' content='https://h4nzs.github.io/portofolio/' />
   - <meta property='og:title' content='Hanif A.N. — Cyber Security & Web Developer Portfolio' />
   - <meta property='og:description' content='Eksplor portofolio Hanif A.N., menampilkan karya fullstack dan pengalaman dalam dunia cyber security.' />
   - <meta property='og:image' content='https://h4nzs.github.io/portofolio/preview.png' />

3. Tambahkan metadata Twitter Card (agar tampil bagus di Twitter / X):
   - <meta name='twitter:card' content='summary_large_image' />
   - <meta name='twitter:title' content='Hanif A.N. — Cyber Security & Web Developer Portfolio' />
   - <meta name='twitter:description' content='Eksplor karya dan pengalaman profesional Hanif A.N. dalam pengembangan web dan keamanan siber.' />
   - <meta name='twitter:image' content='https://h4nzs.github.io/portofolio/preview.png' />

4. Tambahkan favicon jika belum ada:
   - <link rel='icon' type='image/png' href='/favicon.png' />

5. Pastikan tidak menghapus tag <meta charset> dan <meta viewport> yang sudah ada.

6. Pastikan semua link (canonical, OG image) menggunakan domain GitHub Pages: https://h4nzs.github.io/portofolio/

Output yang diharapkan:
- File index.html memiliki metadata SEO lengkap (title, description, keywords, canonical).
- Preview link (Discord, LinkedIn, Twitter, dll) menampilkan judul, deskripsi, dan gambar.
- Struktur HTML tidak rusak dan kompatibel dengan build Vite.
"