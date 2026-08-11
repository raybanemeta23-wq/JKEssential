# JK Essensial — Perfume Formula Planner (PWA)

Aplikasi ini dibangun sesuai arsitektur **Zero-Server / Offline-First**:
tidak ada backend, tidak ada database pusat, tidak ada biaya bulanan.
Semua data pengguna (koleksi racikan, profil, API key AI) tersimpan
lokal di perangkat masing-masing lewat **IndexedDB**.

## Isi folder ini

```
jk-essensial-pwa/
├── index.html          → seluruh aplikasi (UI + logika)
├── manifest.json        → identitas PWA (nama, ikon, warna)
├── service-worker.js    → bikin app bisa jalan offline
├── js/db.js              → helper IndexedDB (penyimpanan lokal)
├── icons/                → ikon aplikasi (192px, 512px, maskable)
└── README.md             → file ini
```

## Cara deploy (gratis, ±10 menit) — GitHub Pages

1. **Buat akun GitHub** (kalau belum punya) di github.com
2. Buat repository baru, misalnya `jk-essensial-app` → pilih **Public**
3. Upload **seluruh isi folder ini** (bukan foldernya, tapi isinya) ke repo:
   - Bisa lewat web: tombol "Add file → Upload files", drag semua file/folder
   - Atau lewat terminal:
     ```
     cd jk-essensial-pwa
     git init
     git add .
     git commit -m "Rilis awal JK Essensial"
     git branch -M main
     git remote add origin https://github.com/USERNAME/jk-essensial-app.git
     git push -u origin main
     ```
4. Di repo, buka **Settings → Pages**
5. Di bagian **Source**, pilih branch `main` dan folder `/ (root)` → **Save**
6. Tunggu 1–2 menit, GitHub akan kasih link seperti:
   `https://USERNAME.github.io/jk-essensial-app/`
7. Buka link itu di HP → sudah otomatis HTTPS, sudah bisa "Add to Home Screen"

## Cara pengguna lain menginstall

**Android (Chrome):**
Buka link → tap menu titik tiga → **"Add to Home screen" / "Install app"**

**iPhone (Safari):**
Buka link → tap ikon **Share** (kotak dengan panah ke atas) →
**"Add to Home Screen"**

Setelah itu ikon JK Essensial muncul di home screen seperti aplikasi
native, bisa dibuka tanpa browser, dan bisa dipakai offline.

## Kalau mau jadi file APK juga

Setelah PWA-nya live di link HTTPS di atas, bungkus jadi APK pakai
salah satu (gratis, tanpa coding native):

- **PWA Builder** (microsoft, web-based): buka pwabuilder.com,
  masukkan link PWA kamu, pilih Android, download APK
- **Bubblewrap** (Google, command-line):
  ```
  npm install -g @bubblewrap/cli
  bubblewrap init --manifest=https://USERNAME.github.io/jk-essensial-app/manifest.json
  bubblewrap build
  ```

APK hasilnya bisa langsung dibagikan lewat WhatsApp/Google Drive —
tidak perlu didaftarkan ke Play Store kalau mau tetap 100% gratis
(sideload saja, pengguna cukup izinkan "Install dari sumber tidak dikenal").

## Setelah live, jangan lupa

- [ ] Ganti nomor WhatsApp placeholder (`6281234567890`) di `index.html`
      bagian `confirmWhatsApp()` dengan nomor asli kamu
- [ ] Ganti QRIS placeholder di layar Unlock Expansion Pack dengan
      QRIS asli (gambar QR sungguhan)
- [ ] Ganti kode PIN demo (`12345678`) dengan sistem PIN unik per
      pembelian (idealnya di-hash, bukan disimpan polos)
- [ ] Uji coba fitur "Tanya Asisten AI" pakai API key Gemini asli
      dari [aistudio.google.com](https://aistudio.google.com) — di
      lingkungan produksi (bukan sandbox preview), panggilan API
      langsung dari browser ini akan berfungsi normal
- [ ] Test di HP Android & iPhone asli sebelum dibagikan luas

## Catatan keamanan (baca sebelum publikasikan)

API key AI yang dimasukkan pengguna tersimpan di IndexedDB perangkat
mereka sendiri — tidak terkirim ke server manapun milik kamu. Namun
IndexedDB browser bukan secure-enclave seperti Keychain/Keystore di
aplikasi native, jadi untuk keamanan maksimal (terutama kalau nanti
dibungkus jadi APK Flutter beneran, bukan cuma PWA-wrapper), pindahkan
penyimpanan API key ke `flutter_secure_storage`.
