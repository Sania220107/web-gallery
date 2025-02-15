import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-r from-gray-200 via-white to-gray-200 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Syarat dan Ketentuan Layanan
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Dengan mengakses atau menggunakan platform GalleryFoto, Anda setuju
          untuk terikat dengan syarat dan ketentuan berikut. Harap baca dengan
          teliti sebelum menggunakan layanan kami.
        </p>

        {/* Bagian Syarat dan Ketentuan */}
        <section className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              1. Penggunaan Layanan
            </h2>
            <p className="text-lg text-gray-600">
              GalleryFoto memberikan layanan berbagi dan eksplorasi foto serta
              desain secara online. Anda setuju untuk menggunakan layanan kami
              hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              2. Akun Pengguna
            </h2>
            <p className="text-lg text-gray-600">
              Untuk mengakses beberapa fitur dari platform, Anda harus mendaftar
              dan membuat akun. Anda setuju untuk memberikan informasi yang
              akurat dan lengkap saat mendaftar dan menjaga kerahasiaan akun
              Anda.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              3. Konten Pengguna
            </h2>
            <p className="text-lg text-gray-600">
              Anda bertanggung jawab penuh atas konten yang Anda unggah ke
              platform. Kami tidak bertanggung jawab atas pelanggaran hak cipta,
              merek dagang, atau hak kekayaan intelektual lainnya yang timbul
              akibat penggunaan konten yang diunggah oleh pengguna.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              4. Pembatasan Tanggung Jawab
            </h2>
            <p className="text-lg text-gray-600">
              Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
              timbul dari penggunaan atau ketidakmampuan untuk menggunakan
              layanan GalleryFoto, termasuk kerugian yang disebabkan oleh konten
              yang diunggah oleh pengguna lain.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              5. Penghentian Akun
            </h2>
            <p className="text-lg text-gray-600">
              Kami berhak untuk menangguhkan atau menghentikan akses Anda ke
              layanan kami jika kami mencurigai adanya pelanggaran terhadap
              syarat dan ketentuan ini atau kebijakan lainnya.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              6. Perubahan Syarat dan Ketentuan
            </h2>
            <p className="text-lg text-gray-600">
              Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke
              waktu. Setiap perubahan akan diberitahukan melalui platform kami.
              Penggunaan Anda terhadap layanan setelah perubahan dianggap
              sebagai persetujuan Anda terhadap perubahan tersebut.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              7. Hukum yang Berlaku
            </h2>
            <p className="text-lg text-gray-600">
              Syarat dan ketentuan ini diatur oleh hukum yang berlaku di negara
              tempat GalleryFoto beroperasi. Setiap sengketa yang timbul akan
              diselesaikan di pengadilan yang berwenang.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-16">
          &copy; 2025 GalleryFoto. Semua hak dilindungi undang-undang.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
