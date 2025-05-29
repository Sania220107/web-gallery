import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const FotoAlbum = () => {
  const { AlbumID } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [NamaAlbum, setNamaAlbum] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/foto/album/${AlbumID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPhotos(data.data);
        } else {
          console.error("Gagal mengambil data foto:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPhotos();
  }, [AlbumID]);

  return (
    <div className="p-6 relative bg-gradient-to-r from-red-200 via-white to-red-300 min-h-screen">
      {/* Tombol Kembali */}
      <motion.button
        onClick={() => navigate("/album")}
        className="absolute top-4 left-4 flex items-center text-red-800 hover:text-white bg-red-200 hover:bg-red-500 px-3 py-2 rounded-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </motion.button>

      {/* Container utama */}
      <div className="max-w-screen-xl mx-auto">
        {/* Judul Album */}
        <motion.h1
          className="text-3xl font-bold text-center mb-6 text-red-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {NamaAlbum}
        </motion.h1>

        {/* Daftar Foto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-10">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <motion.div
                key={photo.FotoID}
                className="bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-[300px] mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/${photo.LokasiFile}`}
                  alt={photo.JudulFoto}
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-4 text-start">
                  <h2 className="text-sm font-semibold text-red-800">
                    {photo.JudulFoto}
                  </h2>
                  <p className="text-red-600 text-xs sm:text-sm">
                    Diunggah pada: {photo.TanggalUnggah}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-red-700 col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Tidak ada foto dalam album ini.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FotoAlbum;
