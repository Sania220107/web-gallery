import React from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const HalamanDepan = () => {
const navigate = useNavigate()

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${Logo})`,
        backgroundSize: "cover", // Menyesuaikan ukuran logo agar tetap proporsional
        backgroundRepeat: "no-repeat", // Mencegah pengulangan logo
        backgroundPosition: "center", // Memposisikan logo di tengah
      }}
    >
      <div className="text-center text-white max-w-md p-6">
        <h1 className="text-4xl font-bold mb-6">
          Selamat Datang di Web Gallery Foto
        </h1>
        <button className="bg-orange-500 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-400 transition duration-300" onClick={() => navigate("/Home")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HalamanDepan;
