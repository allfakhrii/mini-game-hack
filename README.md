# 🕵️‍♂️ CTF Secret Vault Challenge: Operation Al & Caca

Aplikasi web Capture The Flag (CTF) interaktif tiga tingkat (Three-Stage Cyber Challenge) yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Didesain dengan estetika modern, narasi sejarah & teknis edukatif, sistem keamanan Anti-Curang (Route Guard & Server-Side Verification), serta integrasi klaim hadiah WhatsApp!

---

## 🗺️ Alur Permainan (Player Flow)

```
[ Level 1: Steganografi LSB ]
   │
   ├─► Unduh target: stegano.png
   ├─► Decode LSB di terminal Python -> Sandi: "alsayangsamacaca"
   ├─► Masukkan sandi (1-click submit otomatis lanjut)
   ▼
[ Level 2: Hash Cracking & Dictionary Attack ]
   │
   ├─► Target Hash MD5: a0095443fbfe1b3ebf4225636a1f86b8
   ├─► Unduh berkas kamus: wordlist.txt
   ├─► Jalankan dictionary attack script Python -> Kata: "makan bergizi gratis"
   ├─► Masukkan kata sandi (otomatis lanjut)
   ▼
[ Level 3: Kriptografi Fernet AES ]
   │
   ├─► Unduh berkas enkripsi: hadiah.txt
   ├─► Salin kunci simetris Fernet: qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=
   ├─► Dekripsi berkas via Python cryptography -> Teks Rahasia
   ├─► Tempel hasil dekripsi
   ▼
[ Victory Page: Romantis & Klaim Hadiah ]
   │
   ├─► Hujan Konfeti & Surat Rahasia Terbuka Penuh
   └─► 1-Click Klaim Hadiah ke WhatsApp (085869018682)
```

---

## 🔑 Kunci Jawaban Developer (Cheat Sheet)

| Level | Media | Target / Kunci | Solusi Script Python | Jawaban |
|---|---|---|---|---|
| **Level 1** | `stegano.png` | Gambar target | `lsb.reveal('stegano.png')` | `alsayangsamacaca` |
| **Level 2** | `wordlist.txt` | `a0095443fbfe1b3ebf4225636a1f86b8` | Loop md5 hash matching | `makan bergizi gratis` |
| **Level 3** | `hadiah.txt` | `qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=` | Fernet cipher decrypt | `ACCESS GRANTED!` / Teks surat |

---

*Dibuat khusus untuk hacker kesayangan! ❤️*
