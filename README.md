# Teka-Teki CTF: Operation Secret Vault

Aplikasi web Capture The Flag (CTF) interaktif tiga tingkat yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. 

Didesain dengan pendekatan editorial modern berstandar antislop (bersih, santai, dan tidak berlebihan), narasi sejarah dan teknis yang edukatif, sistem keamanan anti-curang (Route Guard dan Server-Side Verification), serta integrasi klaim hadiah langsung ke WhatsApp.

---

## Alur Permainan (Player Flow)

```
[ Level 1: Steganografi LSB ]
   │
   ├─► Unduh target: stegano.png
   ├─► Ekstrak LSB dengan Python -> Sandi: "alsayangsamacaca"
   ├─► Masukkan sandi (otomatis lanjut dalam 1x submit)
   ▼
[ Level 2: Hash Cracking & Dictionary Attack ]
   │
   ├─► Target Hash MD5: a0095443fbfe1b3ebf4225636a1f86b8
   ├─► Unduh berkas kamus: wordlist.txt
   ├─► Jalankan dictionary attack via Python -> Kata: "makan bergizi gratis"
   ├─► Masukkan kata sandi (otomatis lanjut)
   ▼
[ Level 3: Kriptografi Fernet AES ]
   │
   ├─► Unduh berkas terenkripsi: hadiah.txt
   ├─► Salin kunci simetris: qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=
   ├─► Jalankan dekripsi Fernet via Python -> Teks Surat Rahasia
   ├─► Tempel hasil dekripsi
   ▼
[ Victory Page: Surat Kemenangan & Klaim Hadiah ]
   │
   ├─► Efek selebrasi konfeti dan surat terbuka penuh
   └─► 1-Click klaim reward via WhatsApp ke nomor target (085869018682)
```

---

## Kunci Jawaban & Script Penyelesaian (Cheat Sheet)

### Level 1: Steganografi Gambar
- **Media Target**: `public/stegano.png`
- **Konsep**: Least Significant Bit (LSB) pada kanal warna RGB.
- **Jawaban**: `alsayangsamacaca` (alternatif: `sayangkupintar`)
- **Script Penyelesaian (Python)**:
  ```bash
  pip install stegano
  python -c "from stegano import lsb; print(lsb.reveal('stegano.png'))"
  ```

---

### Level 2: Hash Cracking (Dictionary Attack)
- **Media Target**: `public/wordlist.txt`
- **Target Hash**: `a0095443fbfe1b3ebf4225636a1f86b8` (MD5)
- **Konsep**: One-way cryptographic hash function dan serangan kamus.
- **Jawaban**: `makan bergizi gratis` (alternatif: `mbg`)
- **Script Penyelesaian (Python)**:
  ```python
  import hashlib

  target = "a0095443fbfe1b3ebf4225636a1f86b8"

  with open("wordlist.txt", "r") as file:
      for line in file:
          kata = line.strip()
          if hashlib.md5(kata.encode()).hexdigest() == target:
              print(f"Password ditemukan: {kata}")
              break
  ```

---

### Level 3: Kriptografi Kunci Simetris Fernet
- **Media Target**: `public/hadiah.txt`
- **Kunci Rahasia**: `qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=`
- **Konsep**: Kerckhoffs's Principle, AES-128-CBC, dan HMAC-SHA256.
- **Jawaban**: Teks surat asli brankas (menerima `ACCESS GRANTED`, `Selamat sayang`, atau seluruh teks).
- **Script Penyelesaian (Python)**:
  ```bash
  pip install cryptography
  ```
  ```python
  from cryptography.fernet import Fernet

  kunci = b"qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4="
  cipher = Fernet(kunci)

  with open("hadiah.txt", "rb") as file:
      hasil = cipher.decrypt(file.read())
      print(hasil.decode())
  ```

---

## Fitur & Arsitektur Sistem

1. **Sistem Keamanan Anti-Curang (Anti-Cheat)**:
   - **Server-Side API Verification**: Pengecekan jawaban dilakukan melalui endpoint Next.js Route Handlers (`/api/verify-level-1`, `/api/verify-level-2`, dan `/api/verify-level-3`), sehingga jawaban tidak bisa diintip melalui Inspect Element maupun bundle JavaScript browser.
   - **Route Guard**: Mencegah akses langsung ke rute berikutnya via address bar browser. Jika pemain mencoba membuka `/level-2`, `/level-3`, atau `/victory` tanpa menuntaskan level sebelumnya, sistem otomatis mengembalikannya ke halaman utama.
   - **Git Protection**: Berkas sensitif seperti `kunci_rahasia.key` otomatis diabaikan oleh `.gitignore`.

2. **Antarmuka Bersih (Antislop Compliant)**:
   - Desain seimbang 2 kolom dengan tata letak proporsional.
   - Kontras warna teks memenuhi standar aksesibilitas WCAG AA (hingga 17.7:1).
   - Menghindari visual klise berlebihan (tanpa scanlines, tanpa neon glow, tanpa fake loading glitch).
   - Audio synthesizer native menggunakan Web Audio API tanpa perlu aset eksternal.

3. **Integrasi WhatsApp Langsung**:
   - Endpoint API [`/api/claim-reward`](/api/claim-reward) dan tombol di halaman kemenangan langsung menghubungkan pemain ke kontak WhatsApp tujuan (**085869018682**) dengan pesan otomatis untuk 3 opsi hadiah: Makan Enak, Jajan Es Krim, atau Jalan-Jalan.

---

## Struktur Berkas Proyek

```
.
├── public/
│   ├── stegano.png         # Gambar target steganografi (11.5 MB)
│   ├── wordlist.txt        # Kamus kata untuk dictionary attack
│   └── hadiah.txt          # Berkas ciphertext terenkripsi Fernet
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── claim-reward/route.ts    # Endpoint klaim hadiah WhatsApp
│   │   │   ├── verify-level-1/route.ts  # Verifikasi sandi steganografi
│   │   │   ├── verify-level-2/route.ts  # Verifikasi hash cracking
│   │   │   └── verify-level-3/route.ts  # Verifikasi dekripsi Fernet
│   │   ├── level-2/page.tsx             # Halaman Level 2 (Hash Cracking)
│   │   ├── level-3/page.tsx             # Halaman Level 3 (Fernet AES)
│   │   ├── victory/page.tsx             # Halaman Kemenangan & Hadiah
│   │   ├── layout.tsx                   # Layout utama & font
│   │   ├── page.tsx                     # Halaman Level 1 (Steganografi)
│   │   └── globals.css                  # Konfigurasi Tailwind & tema
│   ├── components/
│   │   ├── AmbientBackground.tsx        # Efek latar ambient tenang
│   │   ├── GlitchTransition.tsx         # Transisi antar-level
│   │   ├── RouteGuard.tsx               # Proteksi rute anti-bypass
│   │   └── TerminalNavbar.tsx           # Navigasi progress & kontrol audio
│   ├── context/
│   │   └── GameContext.tsx              # Manajemen state progres game
│   └── lib/
│       └── audio.ts                     # Web Audio API sound synthesizer
└── README.md
```

---

## Cara Menjalankan Secara Lokal

### 1. Prasyarat
- Node.js versi 18 ke atas (disarankan v20 atau v22).
- npm atau pnpm.

### 2. Instalasi Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di alamat: `http://localhost:3000`

### 4. Build untuk Production
```bash
npm run build
npm run start
```

---

## Panduan Deployment ke Vercel

1. Buat repository baru di akun GitHub kamu (misalnya: `ctf-secret-vault`).
2. Hubungkan repository lokal dan lakukan push:
   ```bash
   git add .
   git commit -m "feat: complete interactive CTF web application"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```
3. Buka [Vercel](https://vercel.com) dan login menggunakan akun GitHub.
4. Klik **Add New Project**, lalu pilih repository `ctf-secret-vault`.
5. Klik tombol **Deploy**. Vercel akan otomatis mendeteksi konfigurasi Next.js dan website akan langsung aktif dalam waktu sekitar 1 menit.
