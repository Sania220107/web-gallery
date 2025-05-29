import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Bagaimana cara bergabung dengan GalleryFoto?",
      answer:
        "Klik tombol 'Daftar' di halaman utama. Lengkapi informasi yang dibutuhkan, dan Anda bisa mulai mengeksplorasi serta berbagi karya visual Anda.",
    },
    {
      question: "Bagaimana cara mengunggah karya saya?",
      answer:
        "Setelah login, buka halaman profil lalu klik 'Unggah Foto'. Bagikan hasil karya terbaik Anda dengan komunitas GalleryFoto.",
    },
    {
      question: "Apakah saya bisa menghapus foto yang telah saya unggah?",
      answer:
        "Tentu, Anda dapat menghapus foto melalui halaman profil dengan menekan ikon hapus pada foto yang ingin dihapus.",
    },
    {
      question: "Bagaimana jika saya butuh bantuan lebih lanjut?",
      answer:
        "Hubungi tim kami melalui email di support@galleryfoto.com atau lewat WhatsApp di +62 812-3456-7890. Kami siap membantu Anda.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6  bg-peach-50">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-red-500 hover:text-red-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      {/* Judul & Deskripsi */}
      <h1 className="text-4xl font-semibold text-center text-red-500 hover:text-red-700 mb-6">
        Pusat Bantuan GalleryFoto
      </h1>
      <p className="text-lg text-center  mb-10">
        Temukan informasi seputar penggunaan GalleryFoto atau hubungi tim kami
        untuk bantuan lebih lanjut.
      </p>

      {/* FAQ */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-red-500 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left text-red-500 hover:text-red-700 text-lg font-medium flex justify-between items-center py-3 focus:outline-none text-peach-700"
            >
              {faq.question}
              <span className="text-red-500 hover:text-red-700">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="text-black text-md mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Kontak */}
      <div className="mt-12 p-6 bg-peach-50 rounded-xl text-center shadow-md">
        <h2 className="text-2xl font-semibold text-peach-700 mb-2">
          Masih membutuhkan bantuan?
        </h2>
        <p className="text-black">
          Jangan ragu untuk menghubungi tim kami. Kami dengan senang hati akan
          membantu Anda.
        </p>
        <p className="text-lg text-black font-medium">
          Email: support@galleryfoto.com
        </p>
        <p className="text-lg text-black font-medium">
          WhatsApp: +62 812-3456-7890
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
