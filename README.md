# Serenity Massage — Traditional Wellness

Website resmi layanan pijat tradisional dan relaksasi panggilan ke hotel, apartemen, homestay, dan rumah dengan pemesanan langsung melalui WhatsApp admin.

## Fitur Utama

- **Katalog Layanan & Harga Interaktif**:
  - **Full Body Massage**: 90 menit (Rp300.000), 120 menit (Rp350.000)
  - **Full Body Massage & Kerokan**: 90 menit (Rp350.000), 120 menit (Rp400.000), 150 menit (Rp450.000)
  - **Full Body Massage & Reflexology**: 90 menit (Rp350.000), 120 menit (Rp400.000), 150 menit (Rp450.000)
  - **Full Body Massage & Scrub**: 90 menit (Rp350.000), 120 menit (Rp400.000), 150 menit (Rp450.000)
- **Pemilihan Terapis**: Foto profil resmi `Terapis 01` hingga `Terapis 04`, serta opsi `Terapis mana saja yang tersedia`.
- **Formulir Booking & Ringkasan Otomatis**:
  - Durasi menyesuaikan layanan yang dipilih secara otomatis.
  - Kalkulasi total harga real-time.
  - Validasi nomor WhatsApp Indonesia, tanggal minimal hari ini, dan jam operasional (`15.00–03.00 WIB`).
  - Tanpa kolom alamat jalan lengkap (cukup jenis tempat dan nama tempat/hotel).
- **Integrasi WhatsApp Admin**: Mengarahkan pesanan lengkap ke `+62 852 1185 2718` (`https://wa.me/6285211852718`) disertai pratinjau pesan dan tombol salin teks.

## Cara Publikasi & Kelola dari HP (Tanpa Laptop / VS Code)

Proyek ini sudah dilengkapi konfigurasi otomatis (`netlify.toml` dan `vercel.json`) sehingga dapat langsung dipublikasikan ke internet hanya lewat browser HP:

1. **Simpan ke GitHub**: Di pojok kanan atas Google AI Studio, klik ikon **GitHub** untuk menyalin proyek ini ke akun GitHub Anda.
2. **Publikasikan Gratis ke Internet**:
   - Buka **Netlify** (`app.netlify.com`), **Cloudflare Pages** (`dash.cloudflare.com`), atau **Vercel** (`vercel.com`) lewat browser HP.
   - Pilih **Import from GitHub** dan pilih repositori Anda.
   - Pengaturan build (`npm run build` dan folder `dist`) sudah otomatis terdeteksi. Klik **Deploy**.
   - Website langsung mendapatkan alamat publik `https://...` yang dapat dibuka siapa saja.
3. **Edit Layanan, Harga, atau Nomor WhatsApp dari HP**:
   - Buka repositori Anda di `github.com` lewat browser HP → buka file **`src/data/catalog.ts`** → ketuk ikon **Pensil (Edit)** → ubah angka/teks → ketuk **Commit changes**.
   - Hosting Anda (Netlify/Cloudflare Pages/Vercel) otomatis memperbarui website dalam 1–2 menit.
4. **Pasang Domain Kustom & Bagikan ke Media Sosial**:
   - Setelah membeli domain (misal `.id` / `.com`), hubungkan di menu **Custom Domains** penyedia hosting.
   - Tempelkan link website di **Bio Instagram**, **TikTok**, **Profil WhatsApp Business**, **Facebook**, dan **Google Business Profile**.

## Batasan Operasional

Website ini adalah aplikasi web statis sisi klien:
- Data pemesanan tidak disimpan ke database atau browser (`localStorage`).
- Tidak tersedia dashboard admin, pembayaran online, maupun pengecekan jadwal otomatis.
- Jadwal dan ketersediaan terapis **dikonfirmasi secara manual oleh admin** melalui WhatsApp setelah pesan dikirim.

## Build Lokal (Opsional jika memakai komputer)

```bash
npm install
npm run build
```

Hasil build statis berada di folder `dist/`.
