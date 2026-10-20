# 🕵️‍♂️ CTF Secret Vault Challenge: Operation Al & Caca

Aplikasi web Capture The Flag (CTF) interaktif dua tingkat (Two-Stage Cyber Challenge) yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Didesain dengan estetika terminal cyberpunk retro, audio synthesizer Web Audio API, sistem keamanan Anti-Curang (Route Guard & Server-Side Verification), serta transisi kemenangan romantis dengan integrasi WhatsApp!

---

## 🗺️ Alur Permainan (Player Flow)

```
[ Landing Page: Level 1 ]
   │
   ├─► Unduh target: stegano.png
   ├─► Decode LSB di terminal Python -> Sandi: "alsayangsamacaca"
   ├─► Masukkan sandi ke terminal web
   ▼
[ Glitch Transition // Bypassing Kernel ]
   │
   ▼
[ Level 2: Jantung Pertahanan ]
   │
   ├─► Unduh file enkripsi: hadiah.txt
   ├─► Salin kunci Fernet: qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=
   ├─► Dekripsi file via Python cryptography -> Teks Rahasia
   ├─► Paste hasil dekripsi ke terminal web
   ▼
[ System Breach Transition ]
   │
   ▼
[ Victory Page: Romantis & Hadiah ]
   │
   ├─► Hujan Konfeti & Perubahan Tema Romantic Cyberpunk
   ├─► Surat Rahasia Brankas Terbuka
   └─► Tombol 1-Click Klaim Hadiah ke WhatsApp (Makan Enak / Es Krim / Main)
```

---

## 🛡️ Fitur Keamanan Anti-Curang (Anti-Cheat)

1. **Route Guard**:
   - Jika pemain langsung mengetik `/level-2` di address bar browser tanpa menyelesaikan Level 1, sistem akan membunyikan alarm dan menendang (redirect) kembali ke `/`.
   - Hal yang sama berlaku untuk `/victory`: tidak bisa dibuka tanpa menyelesaikan Level 2.
2. **Server-Side API Verification**:
   - Pengecekan password dan dekripsi dilakukan di server Next.js (`/api/verify-level-1` dan `/api/verify-level-2`), sehingga target **tidak dapat menemukan jawaban** hanya dengan melihat client bundle JavaScript atau inspect element!
3. **Protected Git Repository**:
   - `kunci_rahasia.key` otomatis diabaikan oleh `.gitignore` agar tidak bocor ke publik GitHub.

---

## 💻 Panduan Menjalankan Secara Lokal

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

### 3. Build & Test Production
```bash
npm run build
npm run start
```

---

## 🚀 Panduan Deployment (Vercel / Netlify)

### Opsi A: Deploy ke Vercel (Paling Direkomendasikan)
1. Buat repository baru di GitHub (misal: `ctf-secret-vault`).
2. Commit dan push project ini ke GitHub:
   ```bash
   git add .
   git commit -m "feat: complete interactive CTF web app"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub kamu.
4. Klik **Add New Project** -> Pilih repository `ctf-secret-vault`.
5. Klik **Deploy**. Dalam ~1 menit, link websitemu langsung aktif (contoh: `https://ctf-secret-vault.vercel.app`)!

### Opsi B: Deploy ke Netlify
1. Buka [netlify.com](https://netlify.com) dan login.
2. Pilih **Add new site** -> **Import an existing project**.
3. Hubungkan ke GitHub repo-mu.
4. Netlify akan mendeteksi Next.js secara otomatis. Klik **Deploy site**.

---

## 🔑 Kunci Jawaban Developer (Cheat Sheet)

| Level | Media | Kunci / Password | Solusi Terminal |
|---|---|---|---|
| **Level 1** | `stegano.png` | `alsayangsamacaca` (atau `SayangkuPintar`) | `python -c "from stegano import lsb; print(lsb.reveal('stegano.png'))"` |
| **Level 2** | `hadiah.txt` | Key: `qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=` | Gunakan script Fernet Python untuk dekripsi |
| **Input L2** | Terminal Form | Paste teks brankas (`ACCESS GRANTED...`) atau flag | Memicu halaman `/victory` |

---

*Dibuat khusus dengan cinta dan teknologi modern untuk hacker kesayangan! ❤️*
