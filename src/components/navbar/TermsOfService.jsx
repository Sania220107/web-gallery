import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-peach-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-red-500 hover:text-red-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-red-500 hover:text-red-700 mb-6">
          Syarat dan Ketentuan Layanan
        </h1>
        <p className="text-lg text-center  mb-10">
          Dengan menggunakan platform GalleryFoto, Anda menyetujui semua syarat
          yang berlaku. Harap baca dengan cermat sebelum melanjutkan penggunaan
          layanan.
        </p>

        {/* Bagian Syarat & Ketentuan */}
        <section className="space-y-12">
          {[
            {
              title: "1. Penggunaan Layanan",
              content:
                "GalleryFoto memberikan layanan eksplorasi dan berbagi karya visual. Anda setuju untuk menggunakan layanan ini hanya untuk hal yang legal dan tidak merugikan pihak lain.",
            },
            {
              title: "2. Akun Pengguna",
              content:
                "Untuk mengakses fitur tertentu, Anda harus membuat akun dengan informasi yang benar. Anda bertanggung jawab atas keamanan dan aktivitas di akun Anda.",
            },
            {
              title: "3. Konten Pengguna",
              content:
                "Konten yang Anda unggah adalah tanggung jawab Anda. Pastikan tidak melanggar hak cipta atau hukum yang berlaku. GalleryFoto tidak bertanggung jawab atas isi yang diunggah pengguna.",
            },
            {
              title: "4. Pembatasan Tanggung Jawab",
              content:
                "GalleryFoto tidak bertanggung jawab atas kerusakan langsung atau tidak langsung yang timbul dari penggunaan platform, termasuk konten pihak ketiga.",
            },
            {
              title: "5. Penghentian Akun",
              content:
                "Kami berhak untuk menangguhkan atau menutup akun Anda jika ditemukan pelanggaran terhadap kebijakan ini atau penggunaan yang merugikan.",
            },
            {
              title: "6. Perubahan Syarat",
              content:
                "Kami dapat memperbarui syarat ini kapan saja. Perubahan akan diinformasikan di platform dan berlaku setelah dipublikasikan.",
            },
            {
              title: "7. Hukum yang Berlaku",
              content:
                "Syarat ini tunduk pada hukum di wilayah operasional GalleryFoto dan sengketa akan diselesaikan di pengadilan yang berwenang.",
            },
          ].map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-red-500 hover:text-red-700 mb-3">
                {section.title}
              </h2>
              <p className="text-md text-black leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <div className="text-center text-red-500 hover:text-red-700 text-sm mt-16">
          &copy; 2025 <span className="font-semibold">GalleryFoto</span>. Semua
          hak dilindungi undang-undang.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
