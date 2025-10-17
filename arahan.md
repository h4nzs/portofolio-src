ai coder edit src/App.jsx --prompt "
Tujuan:
Tambahkan fitur navigasi halus (smooth scroll) dan highlight otomatis pada link navbar sesuai section yang sedang terlihat di layar. Efek ini meningkatkan UX dan memberi kesan sistem aktif seperti antarmuka cyber.

Instruksi Detail:

1. Aktifkan scroll halus global dengan CSS:
   Tambahkan di App.css atau style global:
   html {
     scroll-behavior: smooth;
   }

2. Di App.jsx (atau komponen navbar utama):
   - Pastikan setiap link navigasi menuju section menggunakan href dengan id section, contoh:
     <a href='#about' className='nav-link'>About</a>
     <a href='#projects' className='nav-link'>Projects</a>
     <a href='#contact' className='nav-link'>Contact</a>

   - Tambahkan useEffect baru untuk IntersectionObserver:
     useEffect(() => {
       const sections = document.querySelectorAll('section[id]');
       const navLinks = document.querySelectorAll('.nav-link');

       const observer = new IntersectionObserver(
         (entries) => {
           entries.forEach((entry) => {
             if (entry.isIntersecting) {
               navLinks.forEach((link) => link.classList.remove('active'));
               const activeLink = document.querySelector(
                 \`a[href='#\${entry.target.id}']\`
               );
               activeLink?.classList.add('active');
             }
           });
         },
         { threshold: 0.5 }
       );

       sections.forEach((section) => observer.observe(section));
       return () => observer.disconnect();
     }, []);

3. Tambahkan CSS untuk efek highlight di App.css:
   .nav-link {
     position: relative;
     color: var(--text);
     text-decoration: none;
     transition: color 0.3s ease;
   }

   .nav-link.active {
     color: var(--accent-1);
     text-shadow: 0 0 8px var(--accent-1);
   }

   .nav-link.active::after {
     content: '';
     position: absolute;
     bottom: -4px;
     left: 0;
     width: 100%;
     height: 2px;
     background: var(--accent-1);
     border-radius: 2px;
     animation: glowBar 1.2s ease-in-out infinite alternate;
   }

   @keyframes glowBar {
     0% { box-shadow: 0 0 4px var(--accent-1); opacity: 0.7; }
     100% { box-shadow: 0 0 10px var(--accent-1); opacity: 1; }
   }

4. Pastikan threshold di IntersectionObserver (0.5) menandakan 50% bagian section sudah terlihat di layar, baru dianggap aktif.
   - Nilai ini bisa diubah untuk menyesuaikan sensitivitas highlight.

Output:
- Website memiliki efek smooth scroll bawaan (tanpa JS tambahan).
- Saat user scroll halaman, navbar otomatis menyorot (highlight) link section yang sedang aktif di viewport.
- Warna highlight mengikuti var(--accent-1) dan tampil dengan efek neon glow lembut.
- Tidak mengganggu animasi atau layout lain.
"