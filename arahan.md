ai coder edit src/App.jsx src/App.css --prompt "
Tujuan:
Perbaiki tata letak Hero Section:
1) Pusatkan hero-content (typing text + CTA) secara vertikal dan horizontal di tengah section (100vh). 
2) Perbaiki posisi terminal-terminal (EDU, EXP, METASPLOIT, NMAP, WIRESHARK) agar tidak saling tumpang tindih. 
3) Tambahkan set posisi & rotasi alternatif yang eksplisit untuk Desktop / Tablet / Mobile agar penempatan estetis tanpa trial. 
4) Pastikan CTA & teks dapat diklik (pointer-events auto), sementara terminal tetap pointer-events none.
5) Jangan ubah section lain pada halaman.

Instruksi detail (App.jsx):
1. Temukan node hero-content di dalam .slide-hero. Ubah/replace wrapper hero-content agar menggunakan struktur flex yang mengambil tinggi penuh hero:
   <div className='hero-content'>
     <div className='hero-inner'>
       {/* EXISTING typing text markup */}
       ...
       {/* CTA */}
     </div>
   </div>
   Pastikan .hero-content tetap berada setelah .hero-terminals dalam DOM (terminals di belakang).

2. Jika ada margin-top atau offset manual sebelumnya di .hero-content, ganti dengan struktur flex (lihat CSS). Jangan hapus teks atau CTA.

3. Temukan definisi heroTerminals (array objek). Tambahkan atau update property style untuk tiap terminal dengan tiga grup koordinat: desktop / tablet / mobile. Contoh struktur style yang diharuskan per terminal:
   style: {
     desktop: { left: '6%', top: '8%', '--rot': '-10deg', '--scale':'1', '--z': 1 },
     tablet:  { left: '6%', top: '6%', '--rot': '-6deg', '--scale':'0.98', '--z': 1 },
     mobile:  { left: '50%', top: 'auto', bottom: '4%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'1', '--z': 1 }
   }

4. Saat merender heroTerminals, pilih style sesuai breakpoints menggunakan CSS custom properties dan kelas tambahan. Implementasi rendering contoh:
   {heroTerminals.map(t => {
     const styleDesktop = t.style.desktop;
     const styleTablet  = t.style.tablet;
     const styleMobile  = t.style.mobile;
     return (
       <div
         key={t.id}
         className={`hero-terminal hero-terminal--${t.type}`}
         style={{
           ...styleDesktop,
           ['--rot']: styleDesktop['--rot'],
           ['--scale']: styleDesktop['--scale'],
           ['--z']: styleDesktop['--z']
         }}
         data-tablet-style={JSON.stringify(styleTablet)}
         data-mobile-style={JSON.stringify(styleMobile)}
         aria-hidden="true"
       > ... </div>
     )
   })}

   (AI dapat implementasikan cara lain yang setara — intinya: pasang desktop as default inline style dan sertakan tablet/mobile data untuk digunakan oleh CSS media query atau JS kecil.)

Instruksi detail (App.css):
1. Pusatkan hero-content:
   .slide-hero { position: relative; height: 100vh; overflow: hidden; }
   .hero-content {
     position: relative;
     z-index: 3;
     width: 100%;
     height: 100%;
     display: flex;
     align-items: center;          /* vertical center */
     justify-content: center;      /* horizontal center */
     text-align: center;
     padding: 2rem;
   }
   .hero-inner { max-width: 980px; width: 100%; padding: 1rem; }

   Hapus/override margin-top / top offsets sebelumnya agar tidak menahan posisi.

2. Terminal positioning & responsive style:
   /* container */
   .hero-terminals { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

   /* base terminal */
   .hero-terminal {
     position: absolute;
     width: clamp(220px, 28vw, 360px);
     min-width: 200px;
     background: linear-gradient(180deg, rgba(8,12,18,0.55), rgba(6,8,12,0.4));
     border-radius: 14px;
     padding: 14px;
     backdrop-filter: blur(8px);
     border: 1px solid rgba(140,200,255,0.06);
     box-shadow: 0 12px 40px rgba(0,0,0,0.65), 0 0 26px rgba(0,140,255,0.04) inset;
     transform-origin: center;
     transition: transform 0.45s cubic-bezier(.2,.9,.2,1), opacity 0.45s ease;
     will-change: transform, opacity;
     opacity: 0.96;
     pointer-events: none;
   }

   /* By default (desktop) inline styles applied in JSX will set left/top/right/bottom + --rot/--scale/--z */

3. Media-query approach to apply tablet & mobile styles:
   /* Tablet */
   @media (max-width: 1024px) {
     /* For terminals rendered with JSON data in data-* attributes, a small JS helper can be used to parse and apply tablet styles. 
        But simpler: override common positions here if needed. */
     .hero-terminal { width: clamp(260px, 36vw, 420px); }
   }

   /* Mobile: stack terminals vertically and remove tilt */
   @media (max-width: 768px) {
     .hero-terminals { display:flex; flex-direction:column; gap:12px; align-items:center; padding-top: 3rem; }
     .hero-terminal { position: relative !important; transform: none !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; width: 92% !important; }
     .hero-content { align-items: center; justify-content: center; padding-top: 2rem; padding-bottom: 2rem; }
   }

4. Remove overlap by explicit desktop coordinates (AI should apply inline desktop coords from array). Use these recommended sets (desktop / tablet / mobile) — include these exact values:

   Recommended POSITION SET (use these in heroTerminals array style property):
   - EDUCATION_LOG:
     desktop: { left: '4%', top: '6%', '--rot': '-12deg', '--scale':'0.98', '--z': 1 }
     tablet:  { left: '4%', top: '5%',  '--rot': '-8deg',  '--scale':'0.98', '--z':1 }
     mobile:  { left: '50%', top: 'auto', bottom: '78%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'0.98', '--z':1 }

   - EXPERIENCE_LOG:
     desktop: { right: '6%', top: '14%', '--rot': '14deg', '--scale':'1', '--z': 2 }
     tablet:  { right: '6%', top: '12%', '--rot': '10deg', '--scale':'0.98', '--z':2 }
     mobile:  { left: '50%', top: 'auto', bottom: '64%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'0.98', '--z':2 }

   - METASPLOIT:
     desktop: { left: '16%', bottom: '10%', '--rot': '18deg', '--scale':'1.03', '--z': 2 }
     tablet:  { left: '14%', bottom: '8%',  '--rot': '12deg', '--scale':'1.02', '--z':2 }
     mobile:  { left: '50%', top: 'auto', bottom: '24%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'1', '--z':2 }

   - NMAP:
     desktop: { left: '46%', bottom: '18%', '--rot': '-18deg', '--scale':'1.05', '--z': 1 }
     tablet:  { left: '46%', bottom: '14%', '--rot': '-12deg', '--scale':'1.03', '--z':1 }
     mobile:  { left: '50%', top: 'auto', bottom: '18%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'1', '--z':1 }

   - WIRESHARK:
     desktop: { right: '12%', bottom: '12%', '--rot': '-14deg', '--scale':'1', '--z': 1 }
     tablet:  { right: '10%', bottom: '10%', '--rot': '-10deg', '--scale':'1', '--z':1 }
     mobile:  { left: '50%', top: 'auto', bottom: '12%', transformMobile: 'translateX(-50%)', '--rot':'0deg', '--scale':'1', '--z':1 }

5. Implementation notes for overlap fix:
   - Use the desktop values above as **inline styles** for each .hero-terminal so they render exactly where intended (avoid relying only on nth-child selectors).
   - Make sure NMAP and WIRESHARK use different left/right and bottom values (see above) to avoid overlapping; adjust scale slightly (NMAP scale 1.05) to create depth separation.
   - Increase METASPLOIT tilt to 18deg to give clear separation from NMAP and WIRESHARK.

6. Maintain z-index values:
   - EDU z:1 (farthest)
   - NMAP z:1
   - WIRESHARK z:1
   - METASPLOIT z:2 (closer)
   - EXPERIENCE_LOG z:2 (closer)
   Hero-content z:3 (top)

7. Ensure hero typing cursor visible:
   .typing-text .cursor { position: relative; display:inline-block; margin-left:4px; background: var(--accent-1); width:8px; height:1.05em; animation: blink .8s infinite; z-index:4; }

8. Test instructions:
   - Desktop: confirm terminals placed per desktop coords above, no overlap.
   - Tablet (<=1024px): terminal positions change to tablet set.
   - Mobile (<=768px): terminals stack vertically under hero-content; tilt removed.
   - CTA remains clickable.
   - No changes outside hero section.

Catatan:
- Jika AI tidak implement JS parser for data-tablet-style/data-mobile-style, menggunakan inline desktop styles + CSS media query overrides is OK — pastikan tablet/mobile fallback positions (above) applied in media queries.
- Jangan ubah nama variabel slides atau slide order.

Output akhir:
- Hero typing text centered vert & horiz.
- Terminals separated, tilted more, not overlapping (NMAP & WIRESHARK fixed).
- Responsive behavior per breakpoints.
"