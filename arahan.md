ai coder edit src/App.jsx --prompt "
Tujuan:
Tambahkan interaksi visual (easter egg) yang menampilkan pesan animatif seperti '🧠 Cyber Mode Activated!' setiap kali pengguna mengaktifkan fullscreen (misalnya dengan menekan tombol F11 atau melalui API requestFullscreen).

Instruksi Spesifik:
1. Tambahkan event listener di React (gunakan useEffect) yang memantau event:
   - 'fullscreenchange' untuk mendeteksi perubahan mode layar penuh.
   - Deteksi juga keydown 'F11' sebagai cadangan jika browser tidak memicu fullscreenchange secara langsung.

2. Saat mode fullscreen aktif:
   - Buat elemen div baru dengan class 'cyber-activation-msg' berisi teks:
     '🧠 CYBER MODE ACTIVATED!'
   - Tambahkan elemen tersebut ke dalam body.
   - Beri animasi glow halus dan efek fade-out otomatis setelah ±2.5 detik, lalu hapus elemen dari DOM.

3. Tambahkan CSS berikut di App.css (atau style global):
   .cyber-activation-msg {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     color: var(--accent-1);
     font-family: 'Share Tech Mono', monospace;
     font-size: 1.5rem;
     letter-spacing: 2px;
     opacity: 0;
     animation: cyberAppear 2.5s ease-in-out;
     z-index: 9999;
     text-shadow: 0 0 8px var(--accent-1);
   }
   @keyframes cyberAppear {
     0% { opacity: 0; filter: blur(6px); transform: translate(-50%, -50%) scale(0.95); }
     20%, 80% { opacity: 1; filter: blur(0); transform: translate(-50%, -50%) scale(1); }
     100% { opacity: 0; filter: blur(4px); transform: translate(-50%, -50%) scale(1.05); }
   }

4. Pastikan event listener dihapus saat komponen unmount agar tidak menumpuk.

5. Jangan ubah logika atau layout lain di App.jsx — hanya tambahkan logika easter egg ini di dalam useEffect.

Output yang diharapkan:
- Saat user menekan F11 atau mengaktifkan fullscreen mode, muncul pesan animatif 'CYBER MODE ACTIVATED!' di tengah layar selama ±2.5 detik.
- Efek glow sesuai tema (var(--accent-1)).
- Tidak mempengaruhi performa atau layout utama.
"