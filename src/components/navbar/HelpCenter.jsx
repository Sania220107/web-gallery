import React, { useState } from "react";

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Daftar pertanyaan & jawaban
  const faqs = [
    {
      question: "Bagaimana cara membuat akun di GalleryFoto?",
      answer:
        "Anda dapat mendaftar dengan mengklik tombol 'Sign Up' di halaman utama dan mengikuti langkah-langkah pendaftaran.",
    },
    {
      question: "Bagaimana cara mengunggah foto?",
      answer:
        "Setelah login, buka halaman profil Anda dan klik tombol 'Upload Foto'. Pastikan format file sesuai dengan ketentuan.",
    },
    {
      question: "Apakah saya bisa menghapus foto yang telah diunggah?",
      answer:
        "Ya, Anda dapat menghapus foto melalui halaman profil dengan mengklik ikon hapus pada foto yang diunggah.",
    },
    {
      question: "Bagaimana cara menghubungi dukungan pelanggan?",
      answer:
        "Anda bisa menghubungi kami melalui email di support@galleryfoto.com atau melalui WhatsApp di +62 812-3456-7890.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Help Center */}
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Pusat Bantuan (Help Center)
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Temukan jawaban dari pertanyaan yang sering diajukan atau hubungi kami
        untuk bantuan lebih lanjut.
      </p>

      {/* FAQ Section */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left text-lg font-medium flex justify-between items-center py-3 focus:outline-none"
            >
              {faq.question}
              <span className="text-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="text-gray-700 text-md mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Kontak Dukungan */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Masih butuh bantuan?
        </h2>
        <p className="text-gray-600 mb-4">
          Hubungi tim dukungan kami untuk mendapatkan bantuan lebih lanjut.
        </p>
        <p className="text-lg text-gray-800 font-medium">
          Email: support@galleryfoto.com
        </p>
        <p className="text-lg text-gray-800 font-medium">
          WhatsApp: +62 812-3456-7890
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
