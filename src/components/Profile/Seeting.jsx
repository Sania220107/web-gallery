import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const Seeting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Settings
        </h2>

        <div className="space-y-4">

          {/* Ubah Profil Button */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <button
              onClick={() => navigate("edit-profile")}
              className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-green-600"
            >
              <FaCog size={20} />
              <span className="text-lg">Ubah Profil</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-red-600"
            >
              <FiLogOut size={20} />
              <span className="text-lg">Logout</span>
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <button
              onClick={() => navigate("/myProfile")}
              className="flex items-center space-x-3 w-full text-left text-gray-700 hover:text-red-600"
            >
              <FiLogOut size={20} />
              <span className="text-lg">Kembali</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seeting;