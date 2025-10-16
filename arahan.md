**Misi: Revitalisasi UI/UX Section Proyek**

Anda adalah seorang Frontend Developer ahli. Tugas Anda adalah melakukan pembaruan UI/UX pada section "Projects" (`slide-projects`) di aplikasi portofolio React ini.

Semua instruksi di bawah ini harus diikuti dengan tepat untuk menambahkan informasi relevan dan meningkatkan interaktivitas kartu proyek.

-----

### **Instruksi Perbaikan Rinci:**

#### **Fase 1: Modifikasi Struktur Data di `App.jsx`**

1.  **Temukan data `slides`**: Cari objek di dalam array `slides` yang memiliki `id: 6` (section "Projects").

2.  **Perbarui Objek Proyek**: Di dalam `projects`, untuk setiap objek proyek (`chat-lite`, `anniv`, `input-data`), tambahkan dua *key* baru:

      * `status`: Sebuah *string* yang menunjukkan status proyek. Gunakan nilai `'Live'`, `'WIP'` (Work In Progress), atau `'Private'`.
      * `tags`: Sebuah *array* berisi *string* yang mendeskripsikan teknologi yang digunakan.

    **Gunakan data berikut sebagai referensi:**

    ```javascript
    // Untuk proyek 'chat-lite'
    status: '(work in progress)',
    tags: ['Fullstack', 'React', 'Node.js', 'Socket.io', 'Security'],

    // Untuk proyek 'anniv'
    status: 'Private',
    tags: ['Fullstack', 'CodeIgniter 4', 'PHP', 'Vue.js'],

    // Untuk proyek 'input-data'
    status: 'Live',
    tags: ['Frontend', 'JavaScript', 'HTML', 'CSS', 'UI/UX'],
    ```

#### **Fase 2: Implementasi Tampilan di `App.jsx`**

1.  **Render Tags**: Di dalam fungsi `renderProjectsSectionZigZag`, temukan bagian `card-content`. Di bawah `.project-short-desc`, buat sebuah `div` baru untuk menampung *tags*. Lakukan *map* pada `p.tags` untuk merender setiap tag sebagai elemen `<span>` atau `div` kecil.
2.  **Render Status Badge**: Temukan `<a>` dengan `className="repo-link"`. Ganti atau letakkan di sampingnya sebuah elemen `<span>` atau `div` yang menampilkan `p.status`. Beri `className` yang berbeda untuk setiap status (misalnya, `status-live`, `status-private`, `status-wip`) agar bisa ditata gayanya secara unik.
3.  **Tambahkan Image Overlay**: Modifikasi struktur JSX untuk `.project-thumb`. Bungkus `<img>` dengan sebuah `div` (misalnya dengan `className="project-thumb-container"`) agar kita bisa menambahkan elemen overlay di dalamnya. Di dalam kontainer ini, tambahkan `div` untuk overlay (misalnya, `className="image-overlay"`) yang akan berisi ikon.

#### **Fase 3: Styling di `App.css`**

1.  **Styling Tags**:

      * Buat *selector* baru (misalnya, `.project-tags-container` dan `.project-tag`).
      * Atur agar tag tampil kecil, dengan *padding*, `border-radius`, warna latar belakang yang tembus pandang (misalnya, `rgba(102, 204, 255, 0.1)`), dan warna teks yang kontras.

2.  **Styling Status Badge**:

      * Buat *selector* untuk setiap status (`.status-live`, `.status-private`, `.status-wip`).
      * `.status-live`: Beri warna latar hijau atau biru cerah.
      * `.status-wip`: Beri warna latar kuning atau oranye.
      * `.status-private`: Beri warna latar abu-abu atau merah.
      * Buat *badge* ini menonjol dengan *padding*, `border-radius`, dan `font-weight` yang sesuai.

3.  **Styling Image Overlay & Hover Effect**:

      * Buat *selector* untuk `.project-thumb-container` dan `.image-overlay`.
      * Atur `.project-thumb-container` agar memiliki `position: relative`.
      * Atur `.image-overlay` agar memiliki `position: absolute`, menutupi seluruh gambar, dengan latar belakang semi-transparan (misalnya, `rgba(0, 0, 0, 0.6)`), dan `opacity: 0` secara default.
      * Saat `.project-card-zigzag` di-*hover*, ubah `opacity` dari `.image-overlay` menjadi `1`.
      * Pusatkan ikon (misalnya, ikon mata atau `+` dari Font Awesome jika tersedia, atau buat dengan CSS) di tengah *overlay*.
      * **Tingkatkan Efek Hover Kartu**: Perkuat efek `box-shadow` pada `.project-card-zigzag:hover`. Buat bayangan lebih menyebar dan berwarna sesuai tema (misalnya, `box-shadow: 0 0 25px rgba(102, 204, 255, 0.4), 0 0 40px rgba(102, 204, 255, 0.2)`).

**Constraint:**
Fokus hanya pada modifikasi section `slide-projects` (`id: 6`). Pastikan semua perubahan bersifat responsif dan tidak merusak tata letak pada tampilan desktop maupun mobile. 