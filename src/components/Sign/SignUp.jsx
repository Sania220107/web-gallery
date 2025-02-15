import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa"; // Icon Upload
import { CheckCircle } from "lucide-react"; // Icon Check
import Logo from "../../assets/Logo.jpg"

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

      const response = await fetch("http://localhost:5000/users/", {
        method: "POST",
        body: formDataToSend,
      });

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 backdrop-blur-md">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        {/* Tambahkan Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 mx-auto shadow-lg rounded-full transition-transform duration-300 hover:scale-105"
        />
        
        <h1 className="text-2xl font-bold text-gray-800 text-center mt-4">
          Sign Up
        </h1>
        <p className="text-gray-600 text-center mb-4 text-sm">
          Welcome! Please create an account.
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
              placeholder="Full name"
              value={formData.NamaLengkap}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="Username"
              placeholder="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black"
            />

            <div className="relative">
              <label
                htmlFor="Profile"
                className="w-full p-2 border border-gray-300 rounded-md text-sm flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 transition-all"
              >
                <FaUpload className="mr-2 text-gray-700" />
                {formData.Profile ? formData.Profile.name : "Upload Profile Picture"}
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
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="Alamat"
              placeholder="Address"
              value={formData.Alamat}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/signIn")}
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;