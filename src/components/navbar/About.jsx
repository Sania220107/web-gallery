import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header About */}
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Tentang GalleryFoto
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        GalleryFoto adalah platform berbagi foto yang memungkinkan para
        desainer, fotografer, dan kreator untuk berbagi karya mereka dengan
        dunia. Kami bertujuan untuk memfasilitasi kreativitas dan kolaborasi
        dalam komunitas visual.
      </p>

      {/* Misi & Visi */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Misi Kami</h2>
        <p className="text-lg text-gray-600 mb-8">
          Kami berkomitmen untuk memberikan platform yang memungkinkan para
          pengguna untuk berbagi, mengeksplorasi, dan berkolaborasi dengan
          kreator foto dan desain terbaik. Kami percaya bahwa kreativitas tidak
          memiliki batasan, dan GalleryFoto hadir untuk mendukung proses
          tersebut.
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Visi Kami</h2>
        <p className="text-lg text-gray-600">
          Visi kami adalah menjadi komunitas terbesar yang menghubungkan
          fotografer, desainer, dan kreator dari berbagai bidang, menciptakan
          ruang bagi mereka untuk saling berbagi ide dan proyek.
        </p>
      </section>

      {/* Tim Kami */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Tim Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Anggota Tim */}
          <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Anggota Tim 1"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>

          <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Anggota Tim 2"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Lead Designer</p>
          </div>

          <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Anggota Tim 3"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">David Brown</h3>
            <p className="text-gray-600">Technical Director</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
