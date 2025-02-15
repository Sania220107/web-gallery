import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; // Import ikon kembali

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
          console.log("Data NamaAlbum: ", data.data)
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
    <div className="p-6 relative bg-gradient-to-r from-gray-300 via-white to-gray-400">
      {/* Tombol Kembali */}
      <motion.button
        onClick={() => navigate("/album")}
        className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-black bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </motion.button>

      {/* Judul Album */}
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.h1>

      {/* Daftar Foto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10 ">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <motion.div
              key={photo.FotoID}
              className="bg-white shadow-lg rounded-3xl overflow-hidden w-72 mx-auto"
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
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 text-start">
                <h2 className="text-sm">{photo.JudulFoto}</h2>
                <p className="text-gray-500 text-sm">
                  Diunggah pada:{" "}
                  {new Date(photo.TanggalUnggah).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500 col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Tidak ada foto dalam album ini.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default FotoAlbum;
