import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const NewPassword = () => {
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (NewPassword !== ConfirmPassword) {
      setMessage("Kata sandi baru dan konfirmasi tidak cocok.");
      return;
    }

    if (NewPassword.length < 6) {
      setMessage("Kata sandi baru minimal terdiri dari 6 karakter.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setMessage("Token tidak ditemukan. Silakan login terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "https://gallerydb-production.up.railway.app/users/update/password",
        {
          OldPassword,
          NewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/myProfile");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response?.data?.message || "Gagal memperbarui kata sandi."
        );
      } else if (error.request) {
        setMessage("Tidak dapat menghubungi server. Coba lagi nanti.");
      } else {
        setMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-gray-800">
        {success ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-4">
              Kata sandi berhasil diperbarui!
            </h2>
            <p className="text-center text-sm text-gray-600">
              Anda akan diarahkan ke halaman profil.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Ganti Kata Sandi
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  className="w-full px-4 py-2 rounded-md border border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-2 rounded-md border border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={NewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 rounded-md border border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <p className="text-sm text-red-500 text-center mb-4">
                  {message}
                </p>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md transition-all duration-200"
                  onClick={() => navigate("/myProfile")}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className={`flex items-center gap-2 py-2 px-4 bg-red-500 hover:bg-pink-600 text-white font-medium rounded-md transition-all duration-200 ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Memproses...
                    </>
                  ) : (
                    "Perbarui"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
