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
      const response = await fetch("http://localhost:5000/album", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NamaAlbum, Deskripsi }),
      });

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Album
        </h2>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <FaCheckCircle size={50} className="text-green-500 mb-2" />
            <p className="text-lg text-gray-700">Album successfully created!</p>
            <button
              onClick={() => navigate("/myProfile")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Back to Profile
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Album Name
              </label>
              <input
                type="text"
                value={NamaAlbum}
                onChange={(e) => setNamaAlbum(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Description
              </label>
              <textarea
                value={Deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => navigate("/myProfile")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Create Album
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAlbum;