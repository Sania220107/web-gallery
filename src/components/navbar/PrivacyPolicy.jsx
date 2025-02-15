import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Kebijakan Privasi
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Kami menghargai privasi Anda. Berikut adalah kebijakan privasi kami
          yang menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
          melindungi informasi pribadi Anda saat Anda menggunakan platform
          GalleryFoto.
        </p>

        {/* Bagian Kebijakan Privasi */}
        <section className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-lg text-gray-600">
              Kami mengumpulkan informasi pribadi yang Anda berikan saat
              mendaftar atau menggunakan layanan kami, seperti nama, alamat
              email, nomor telepon, dan informasi lain yang relevan. Kami juga
              dapat mengumpulkan data teknis seperti alamat IP, jenis perangkat,
              dan data penggunaan situs.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              2. Penggunaan Informasi
            </h2>
            <p className="text-lg text-gray-600">
              Informasi yang kami kumpulkan digunakan untuk menyediakan layanan,
              meningkatkan pengalaman pengguna, dan mengirimkan pembaruan atau
              komunikasi terkait platform. Kami juga menggunakan data untuk
              menganalisis tren dan perilaku pengguna.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              3. Keamanan Data
            </h2>
            <p className="text-lg text-gray-600">
              Kami berkomitmen untuk melindungi data pribadi Anda dengan
              langkah-langkah keamanan yang sesuai untuk mencegah akses tidak
              sah atau kebocoran informasi. Namun, tidak ada metode pengiriman
              data melalui internet yang sepenuhnya aman, dan kami tidak dapat
              menjamin sepenuhnya keamanan data Anda.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              4. Pembagian Informasi
            </h2>
            <p className="text-lg text-gray-600">
              Kami tidak akan menjual, menyewa, atau membagikan informasi
              pribadi Anda kepada pihak ketiga, kecuali jika diwajibkan oleh
              hukum atau untuk keperluan yang terkait langsung dengan layanan
              kami, seperti pengelolaan pembayaran atau dukungan teknis.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              5. Penggunaan Cookie
            </h2>
            <p className="text-lg text-gray-600">
              Kami menggunakan cookie untuk meningkatkan pengalaman pengguna,
              menyimpan preferensi, dan melacak penggunaan situs web. Anda dapat
              mengatur browser Anda untuk menolak cookie, tetapi hal ini dapat
              mempengaruhi pengalaman Anda dalam menggunakan platform kami.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              6. Hak Anda
            </h2>
            <p className="text-lg text-gray-600">
              Anda berhak untuk mengakses, memperbarui, atau menghapus informasi
              pribadi Anda yang kami simpan. Jika Anda ingin melakukan perubahan
              atau memiliki pertanyaan mengenai kebijakan privasi ini, silakan
              hubungi kami melalui informasi yang tersedia di situs kami.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              7. Perubahan Kebijakan Privasi
            </h2>
            <p className="text-lg text-gray-600">
              Kami berhak untuk memperbarui kebijakan privasi ini dari waktu ke
              waktu. Setiap perubahan akan diberitahukan melalui platform kami,
              dan perubahan tersebut akan berlaku segera setelah diposting.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              8. Hukum yang Berlaku
            </h2>
            <p className="text-lg text-gray-600">
              Kebijakan privasi ini diatur oleh hukum yang berlaku di negara
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

export default PrivacyPolicy;
