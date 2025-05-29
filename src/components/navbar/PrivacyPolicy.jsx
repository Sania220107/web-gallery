import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-peach-50 min-h-screen ">
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
          Kebijakan Privasi
        </h1>
        <p className="text-lg text-center text-red-500 hover:text-red-700 mb-10">
          Kami menghargai privasi Anda. Berikut adalah kebijakan privasi yang
          menjelaskan bagaimana informasi pribadi Anda dikelola saat menggunakan
          GalleryFoto.
        </p>

        {/* Bagian Kebijakan Privasi */}
        <section className="space-y-12">
          {[
            {
              title: "1. Informasi yang Kami Kumpulkan",
              content:
                "Kami mengumpulkan informasi pribadi yang Anda berikan saat mendaftar atau menggunakan layanan kami, seperti nama, email, nomor telepon, dan lainnya. Kami juga mencatat data teknis seperti IP, perangkat, dan aktivitas di situs.",
            },
            {
              title: "2. Penggunaan Informasi",
              content:
                "Data Anda kami gunakan untuk meningkatkan layanan, mempersonalisasi pengalaman pengguna, serta mengirimkan pemberitahuan atau informasi penting terkait platform.",
            },
            {
              title: "3. Keamanan Data",
              content:
                "Kami menjaga data Anda dengan standar keamanan tinggi. Namun, tidak ada sistem yang sepenuhnya aman, dan kami terus memperbarui sistem kami untuk perlindungan maksimal.",
            },
            {
              title: "4. Pembagian Informasi",
              content:
                "Kami tidak membagikan informasi pribadi kepada pihak ketiga tanpa persetujuan Anda, kecuali untuk keperluan layanan atau kewajiban hukum.",
            },
            {
              title: "5. Penggunaan Cookie",
              content:
                "GalleryFoto menggunakan cookie untuk menyimpan preferensi pengguna dan memahami perilaku penggunaan. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.",
            },
            {
              title: "6. Hak Anda",
              content:
                "Anda berhak untuk melihat, memperbarui, atau meminta penghapusan data pribadi Anda. Hubungi kami jika Anda ingin menggunakan hak ini.",
            },
            {
              title: "7. Perubahan Kebijakan",
              content:
                "Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan akan kami umumkan melalui platform resmi kami.",
            },
            {
              title: "8. Hukum yang Berlaku",
              content:
                "Kebijakan ini tunduk pada hukum negara tempat GalleryFoto beroperasi dan setiap sengketa akan diselesaikan secara hukum.",
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

export default PrivacyPolicy;
