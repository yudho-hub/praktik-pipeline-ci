# Praktik Pipeline CI

Proyek ini merupakan contoh API HTTP sederhana menggunakan Node.js untuk praktik Continuous Integration (CI) dengan GitHub Actions.

## 1. Persyaratan

- Node.js versi 20 atau lebih baru
- npm
- Git
- Akun GitHub

## 2. Menjalankan proyek secara lokal

```bash
npm install
npm start
```

Buka `http://localhost:3000` untuk melihat respons API.

Endpoint yang tersedia:
- `GET /` menampilkan pesan API.
- `GET /health` menampilkan status kesehatan API.
- Route lain mengembalikan HTTP 404.

## 3. Menjalankan pengujian

```bash
npm test
```

Pengujian menggunakan modul bawaan `node:test` dan menguji tiga kondisi endpoint.

## 4. Cara kerja pipeline CI

Workflow berada di `.github/workflows/ci.yml`. GitHub Actions menjalankan pipeline saat:
- Ada `push` ke branch `main`.
- Ada `pull_request` yang ditujukan ke branch `main`.

Tahap pipeline:
1. Checkout repository.
2. Menyiapkan Node.js versi 22.
3. Menginstal dependencies.
4. Menjalankan pengujian otomatis.

Pipeline dinyatakan berhasil jika seluruh langkah selesai tanpa error dan semua test lulus.

## 5. Bukti pipeline berhasil

Setelah repository diunggah ke GitHub:
1. Buka tab **Actions**.
2. Pilih workflow **CI Pipeline**.
3. Buka eksekusi terbaru.
4. Pastikan status berwarna hijau dengan keterangan sukses.
5. Ambil screenshot halaman ringkasan run dan detail langkah `Run tests`.

## 6. Simulasi kegagalan dan perbaikan

Lakukan simulasi hanya setelah pipeline pertama berhasil.

1. Buka `test/server.test.js`.
2. Ubah assertion berikut:
   `assert.equal(body.status, 'success');`
   menjadi:
   `assert.equal(body.status, 'gagal');`
3. Commit dan push perubahan ke branch `main`.
4. Buka tab **Actions** dan ambil screenshot run yang gagal (merah).
5. Kembalikan assertion menjadi `success`.
6. Commit dan push perbaikan.
7. Ambil screenshot run terbaru yang kembali berhasil (hijau).

Ringkasan contoh error:
- Penyebab: nilai aktual dari API adalah `success`, sedangkan nilai yang diharapkan pada test diubah menjadi `gagal`.
- Dampak: assertion gagal sehingga perintah `npm test` menghasilkan exit code bukan nol dan pipeline berhenti dengan status gagal.
- Perbaikan: mengembalikan nilai yang diharapkan menjadi `success`, kemudian menjalankan ulang pipeline.

## 7. Berkas yang dikumpulkan

- Tautan repository GitHub.
- Berkas workflow `.github/workflows/ci.yml`.
- Screenshot atau URL run pipeline berhasil.
- Screenshot run gagal dan run setelah diperbaiki.
- README yang menjelaskan cara menjalankan CI.
