import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa"; // Icon Upload
import { CheckCircle, ArrowLeftCircle } from "lucide-react"; // Icon Check & Back
import Logo from "../../assets/LogoGaleriFoto.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    NamaLengkap: "",
    Username: "",
    Email: "",
    Profile: null,
    Password: "",
    Alamat: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Profile") {
      setFormData({ ...formData, Profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (
      !formData.NamaLengkap ||
      !formData.Username ||
      !formData.Email ||
      !formData.Profile ||
      !formData.Password ||
      !formData.Alamat
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("NamaLengkap", formData.NamaLengkap);
      formDataToSend.append("Username", formData.Username);
      formDataToSend.append("Email", formData.Email);
      formDataToSend.append("Profile", formData.Profile);
      formDataToSend.append("Password", formData.Password);
      formDataToSend.append("Alamat", formData.Alamat);

      const response = await fetch(
        "https://gallerydb-production.up.railway.app/users/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user: " + response.statusText);
      }

      const data = await response.json();
      setSuccessMessage(
        "User successfully created! Welcome, " + data.NamaLengkap
      );
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-200 via-white to-red-300 dark:from-sky-900 dark:via-peach-800 dark:to-peach-900 transition-all duration-700">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-black dark:text-white hover:scale-105 transition"
      >
        <ArrowLeftCircle className="w-8 h-8" />
      </button>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl transform transition-all duration-500 hover:shadow-3xl text-gray-800 dark:text-white">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 mx-auto shadow-lg rounded-full transition-transform duration-300 hover:scale-105"
        />

        <h1 className="text-2xl font-bold text-center mt-4">Daftar</h1>
        <p className="text-center text-sm mb-4">
          Selamat Datang, Silahkan membuat akun baru anda!
        </p>

        {errorMessage && (
          <p className="text-red-500 text-center mb-3 text-sm">
            {errorMessage}
          </p>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center mb-3">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <p className="text-green-500 text-center text-sm mt-2">
              {successMessage}
            </p>
          </div>
        )}

        {!isSuccess && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="NamaLengkap"
              placeholder="Nama Lengkap"
              value={formData.NamaLengkap}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="text"
              name="Username"
              placeholder="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <div className="relative">
              <label
                htmlFor="Profile"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm flex items-center justify-center cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all text-black dark:text-white"
              >
                <FaUpload className="mr-2" />
                {formData.Profile
                  ? formData.Profile.name
                  : "Upload Profile Picture"}
              </label>
              <input
                id="Profile"
                type="file"
                name="Profile"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <input
              type="password"
              name="Password"
              placeholder="Kata sandi"
              value={formData.Password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="text"
              name="Alamat"
              placeholder="Alamat"
              value={formData.Alamat}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              type="submit"
              className="w-full py-2 bg-red-800 text-white dark:bg-white dark:text-black rounded-md text-sm hover:opacity-80 transition-all"
            >
              Daftar
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-sm">
            Sudah mempunyai akun?{" "}
            <button
              className="text-blue-500 dark:text-blue-300 hover:underline font-medium"
              onClick={() => navigate("/signIn")}
            >
              Masuk disini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
