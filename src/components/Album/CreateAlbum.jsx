import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const CreateAlbum = () => {
  const [NamaAlbum, setNamaAlbum] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/signIn");
      return;
    }

    try {
      const response = await fetch(
        "https://gallerydb-production.up.railway.app/album",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ NamaAlbum, Deskripsi }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/myProfile");
        }, 3000);
      } else {
        throw new Error(data.message || "Error creating album");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-200 via-white to-red-300">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-800">
          Buat Album Baru
        </h2>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <FaCheckCircle size={50} className="text-green-500 mb-2" />
            <p className="text-lg text-gray-700">Berhasil membuat album baru</p>
            <button
              onClick={() => navigate("/myProfile")}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Kembali ke Profile
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-red-800">
                Nama Album
              </label>
              <input
                type="text"
                value={NamaAlbum}
                onChange={(e) => setNamaAlbum(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-red-800">
                Deskripsi
              </label>
              <textarea
                value={Deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-200"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => navigate("/myProfile")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Kirim
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAlbum;
