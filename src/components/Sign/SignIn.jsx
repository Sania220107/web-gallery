import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Logo from "../../assets/LogoGaleriFoto.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const adminAccounts = [
        { email: "Ristasaniaputri@gmail.com", password: "admin123" },
      ];

      const adminLogin = adminAccounts.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (adminLogin) {
        setIsSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1500);
        return;
      }

      const response = await axios.post(
        "https://dbgallery-production.up.railway.app/auth/login",
        {
          Email: email,
          Password: password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.data.AccessToken);
        setIsSuccess(true);
        setTimeout(() => {
          navigate(data.Role === "admin" ? "/dashboard" : "/");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Gagal login, silakan coba lagi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-200 via-white to-red-300 flex items-center justify-center px-4 relative transition duration-300">
      {/* Tombol Kembali */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-3 py-2 rounded shadow bg-white text-yellow-700 hover:bg-yellow-100"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
        </button>
      </div>

      <div className="w-full max-w-sm p-6 rounded-lg shadow-xl bg-white">
        <div className="flex justify-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
        <h2 className="text-xl font-bold text-center mb-4 text-yellow-800">
          Masuk
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-3">
            {errorMessage}
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center mb-3">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <p className="text-green-600 mt-2 text-sm">
              Login berhasil! Mengarahkan...
            </p>
          </div>
        )}

        {!isSuccess && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="text-sm text-yellow-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 bg-white text-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-yellow-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 bg-white text-black text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-sm font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-800 text-white hover:bg-yellow-600"
              }`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        )}

        <div className="text-center mt-4 text-sm">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="underline font-semibold text-yellow-800"
          >
            Daftar di sini
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
