ai coder edit src/App.jsx --prompt "
Tujuan:
Tambahkan intro cinematic berbentuk terminal loader yang tampil selama beberapa detik sebelum halaman utama portofolio muncul. Efek ini menampilkan teks booting sistem seperti:
> Booting portfolio system...
> Loading assets... [██████████] 100%
> Access granted.
> Welcome, Operator.

Instruksi Detail:

1. Buat state loading di komponen utama (App.jsx):
   const [loading, setLoading] = useState(true);
   useEffect(() => {
     const timer = setTimeout(() => setLoading(false), 4000);
     return () => clearTimeout(timer);
   }, []);

2. Tampilkan komponen loader selama loading = true, lalu render konten utama setelah selesai:
   return loading ? <CyberLoader /> : (konten utama);

3. Buat komponen baru langsung di App.jsx (bisa di dalam file yang sama) bernama CyberLoader:
   const CyberLoader = () => {
     const lines = [
       '> Booting portfolio system...',
       '> Loading assets... [██████████] 100%',
       '> Access granted.',
       '> Welcome, Operator.'
     ];
     return (
       <div className='cyber-loader'>
         {lines.map((text, i) => (
           <p key={i} style={{ animationDelay: \`\${i * 0.8}s\` }} className='cyber-line'>
             {text}
           </p>
         ))}
       </div>
     );
   };

4. Tambahkan style CSS di App.css:
   .cyber-loader {
     position: fixed;
     inset: 0;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: flex-start;
     background: #000;
     color: var(--accent-1);
     font-family: 'Share Tech Mono', monospace;
     padding-left: 2rem;
     overflow: hidden;
     z-index: 9999;
   }

   .cyber-line {
     opacity: 0;
     white-space: pre;
     font-size: 1rem;
     animation: typeIn 0.6s steps(20) forwards;
   }

   @keyframes typeIn {
     0% { opacity: 0; width: 0; }
     10% { opacity: 1; }
     100% { opacity: 1; width: 100%; }
   }

5. Tambahkan efek flicker terminal sebelum loader hilang:
   .cyber-loader::after {
     content: '_';
     display: inline-block;
     margin-left: 4px;
     animation: blink 0.8s infinite;
   }

   @keyframes blink {
     0%, 50% { opacity: 1; }
     51%, 100% { opacity: 0; }
   }

6. Pastikan transisi halus dari loader ke konten utama:
   - Tambahkan efek fade-out di akhir sebelum loader dihapus.
   Tambahkan di useEffect:
   setTimeout(() => {
     document.querySelector('.cyber-loader')?.classList.add('fade-out');
   }, 3500);

   Di CSS:
   .fade-out {
     animation: fadeOut 0.6s ease-in-out forwards;
   }

   @keyframes fadeOut {
     to { opacity: 0; }
   }

7. Jangan ubah tema, warna, atau struktur halaman utama.

Output:
- Saat website dibuka, muncul layar terminal gelap dengan teks booting bertahap.
- Setelah 4 detik, loader fade-out dan menampilkan halaman utama.
- Warna teks mengikuti var(--accent-1).
- Efek sangat ringan dan cinematic.
"