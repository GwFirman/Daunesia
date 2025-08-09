# Daunesia 🌿

Mengidentifikasi kekayaan tanaman herbal Indonesia kini semudah mengambil foto. Daunesia hadir untuk menjembatani kearifan lokal dengan teknologi AI modern, memberikan akses instan terhadap pengetahuan etnobotani Nusantara.

## Live Demo


### 👉 **Kunjungi Website: [https://daunesia.vercel.app/](https://daunesia.vercel.app/)**

---

## Fitur Utama

-   **Identifikasi Tanaman Dua Tahap:** Sistem cerdas yang pertama-tama memastikan gambar yang diunggah adalah tanaman menggunakan model **MobileNetV2**, sebelum mengklasifikasikan jenis tanaman herbal secara spesifik menggunakan model **VGG16**.
-   **Informasi Lengkap & Dinamis:** Tidak hanya memberikan nama, setiap hasil identifikasi diperkaya dengan deskripsi, manfaat, dan cara pengolahan umum yang dihasilkan secara dinamis oleh **Google Gemini AI**.
-   **Referensi Resep Lokal:** Menyediakan tautan ke resep atau cara pengolahan tradisional dari sumber data lokal, memberikan konteks penggunaan yang lebih praktis.
-   **Antarmuka Modern & Responsif:** Dibangun dengan desain yang bersih dan dapat diakses dengan baik di berbagai perangkat, baik desktop maupun mobile.

---

## Keunggulan & Inovasi

1.  **Integrasi AI Ganda:** Daunesia tidak hanya menggunakan AI untuk klasifikasi gambar (*Computer Vision*), tetapi juga mengintegrasikan AI Generatif (*Large Language Model*) untuk menyajikan informasi yang kaya, dinamis, dan kontekstual, bukan sekadar teks statis dari database.
2.  **Satu Foto, Info Lengkap:** Mengubah selembar foto daun menjadi paket informasi yang komprehensif. Pengguna mendapatkan jawaban atas "Ini tanaman apa?" dan "Apa kegunaannya?" dalam satu proses yang mulus.
3.  **Modernisasi Kearifan Lokal:** Daunesia berfungsi sebagai jembatan digital yang mengubah pengetahuan herbal tradisional menjadi data yang cerdas, interaktif, dan mudah diakses oleh generasi Society 5.0, mendukung pelestarian warisan budaya.

---

## Teknologi yang Digunakan

**Fullstack:**
-   Next.js
-   Tailwind CSS

**Machine Learning:**
-   Python
-   PyTorch
-   VGG11 (Klasifikasi Herbal)
-   MobileNetV2 (Klasifikasi Biner)
-   Google Gemini (Generasi Teks)

**Database & Storage:**
-   MongoDB (Data Pengguna)
-   Teby.io (Penyimpanan Gambar S3-Compatible)

**Deployment:**
-   Vercel
