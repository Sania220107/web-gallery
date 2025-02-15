import React from "react";
import { Camera, UploadCloud, MessageSquare, UserCheck } from "lucide-react"; // Menggunakan ikon dari lucide-react

const Features = () => {
  // Daftar fitur utama
  const features = [
    {
      title: "Unggah Foto dengan Mudah",
      description:
        "Upload foto berkualitas tinggi dengan sekali klik dan bagikan ke seluruh dunia.",
      icon: <UploadCloud className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Eksplorasi & Koleksi Foto",
      description:
        "Jelajahi berbagai kategori foto dari komunitas kreatif dan simpan favoritmu.",
      icon: <Camera className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Interaksi & Komentar",
      description:
        "Berikan komentar, suka, dan berinteraksi dengan pengguna lain untuk membangun komunitas.",
      icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Profil & Pengaturan Akun",
      description:
        "Kelola profil pribadi, unggahan, dan preferensi akun dengan mudah.",
      icon: <UserCheck className="w-12 h-12 text-blue-500" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Features */}
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Fitur Unggulan di GalleryFoto
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Temukan berbagai fitur menarik yang membantu Anda berbagi dan menikmati
        foto dengan mudah.
      </p>

      {/* Daftar Fitur */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <div>{feature.icon}</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
