import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaTrash } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

const Seeting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-red-100">
      {/* Tombol Kembali */}
      <div className="p-4">
        <button
          onClick={() => navigate("/myProfile")}
          className="flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold"
        >
          <IoArrowBack size={20} />
          <span>Kembali</span>
        </button>
      </div>

      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-800">
          Pengaturan
        </h2>

        <div className="space-y-4">
          {/* Ubah Kata Sandi */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <button
              onClick={() => navigate("edit-password")}
              className="flex items-center gap-3 w-full text-left text-red-700 hover:text-red-900"
            >
              <FaCog size={20} />
              <span className="text-lg">Ubah Kata Sandi</span>
            </button>
          </div>

          {/* Logout */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left text-red-700 hover:text-red-900"
            >
              <FiLogOut size={20} />
              <span className="text-lg">Logout</span>
            </button>
          </div>

          {/* Sampah */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <button
              onClick={() => navigate("/trash")}
              className="flex items-center gap-3 w-full text-left text-red-700 hover:text-red-900"
            >
              <FaTrash size={20} />
              <span className="text-lg">Sampah</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seeting;
