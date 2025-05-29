import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-peach-50 rounded-xl shadow-md">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-red-500 hover:text-red-700  mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      {/* Header About */}
      <h1 className="text-4xl font-bold text-center text-red-500 hover:text-red-700 mb-6">
        Tentang GalleryFoto
      </h1>
      <p className="text-lg text-center  mb-10">
        GalleryFoto adalah ruang inspiratif untuk para desainer, fotografer, dan
        kreator visual. Kami hadir untuk memudahkan Anda membagikan karya
        terbaik, menemukan inspirasi, dan terhubung dengan sesama kreator.
      </p>

      {/* Misi & Visi */}
      <section className="mb-16 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-3xl font-semibold text-red-500 hover:text-red-700 mb-4">
          Misi Kami
        </h2>
        <p className="text-lg  mb-8">
          Kami bertekad untuk menciptakan platform yang mendukung setiap
          individu dalam mengekspresikan kreativitas mereka melalui visual.
          GalleryFoto menjadi jembatan antara karya indah dan audiens yang
          tepat.
        </p>

        <h2 className="text-3xl font-semibold text-red-500 hover:text-red-700 mb-4">
          Visi Kami
        </h2>
        <p className="text-lg ">
          Menjadi rumah bagi komunitas visual terbesar di Indonesia — tempat
          setiap ide, warna, dan momen bisa berbicara. Kami ingin tumbuh bersama
          kreator dari berbagai latar belakang untuk mewarnai dunia digital
          dengan keindahan karya foto.
        </p>
      </section>
    </div>
  );
};

export default About;
