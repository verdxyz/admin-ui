# Admin UI - UAS Pemrograman Sisi Klien

Proyek ini adalah antarmuka web (Admin UI) yang dibangun sebagai pemenuhan Ujian Akhir Semester (UAS) untuk mata kuliah Pemrograman Sisi Klien. Proyek ini dikembangkan menggunakan **React** dengan **Vite** sebagai build tool, menawarkan performa dan pengalaman pengembangan yang sangat cepat.

## 🚀 Teknologi yang Digunakan

Proyek ini memanfaatkan berbagai library dan framework modern untuk membangun antarmuka pengguna yang responsif, interaktif, dan mudah dipelihara:

- **Framework & Build Tool:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling & UI Components:** 
  - [Material-UI (MUI)](https://mui.com/) untuk komponen UI yang siap pakai.
  - [Tailwind CSS](https://tailwindcss.com/) untuk utility-first styling.
- **Routing:** [React Router DOM](https://reactrouter.com/) untuk navigasi antar halaman.
- **State Management (Forms) & Validation:** [Formik](https://formik.org/) dan [Yup](https://github.com/jquense/yup).
- **Data Fetching API:** [Axios](https://axios-http.com/).
- **Authentication:** Penanganan token JWT dengan `jwt-decode`.
- **Data Visualization:** `@mui/x-charts` untuk grafik dan diagram.

## 📦 Prasyarat

Sebelum memulai, pastikan sistem Anda sudah terinstal:
- [Node.js](https://nodejs.org/) (direkomendasikan versi 18 ke atas)
- [npm](https://www.npmjs.com/) (biasanya otomatis terinstal bersama Node.js)

## 🛠️ Instalasi & Persiapan

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal (localhost):

1. **Clone repository ini** ke komputer Anda:
   ```bash
   git clone <URL_GITHUB_REPOSITORY_ANDA>
   cd UAS-Pemograman-Sisi-Klien-main
   ```

2. **Instal seluruh dependensi:**
   ```bash
   npm install
   ```

## 💻 Menjalankan Aplikasi (Development Server)

Untuk menjalankan server pengembangan lokal dengan fitur Hot Module Replacement (HMR):

```bash
npm run dev
```
Buka browser dan akses aplikasi melalui URL yang tertera di terminal, umumnya di `http://localhost:5173/`.

## 🏗️ Build untuk Production

Untuk mem-build aplikasi agar siap di-deploy ke server production:

```bash
npm run build
```
Hasil file statis build akan otomatis dibuat di dalam folder `dist/`.

Anda dapat melihat preview dari hasil build di local dengan menjalankan:

```bash
npm run preview
```

## 📝 Linting Kode

Untuk memeriksa kualitas dan konsistensi kode JavaScript/React Anda menggunakan ESLint, jalankan:

```bash
npm run lint
```
