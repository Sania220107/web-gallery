import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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
      setMessage("Kata sandi baru dan konfirmasi kata sandi tidak cocok");
      return;
    }

    if (NewPassword.length < 6) {
      setMessage("Kata sandi baru harus memiliki setidaknya 6 karakter");
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
        "http://localhost:5000/users/update/password",
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
          error.response?.data?.message || "Gagal memperbarui kata sandi"
        );
      } else if (error.request) {
        setMessage("Tidak dapat menghubungi server. Silakan coba lagi.");
      } else {
        setMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        {success ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Kata Sandi Berhasil Diperbarui!
            </h2>
            <p className="text-center text-sm text-gray-600">
              Anda akan diarahkan ke halaman profil.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Ubah Kata Sandi
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                  value={NewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <p className="text-sm text-red-400 text-center mb-4">
                  {message}
                </p>
              )}
              <button
                className={`w-25% py-2 m-1 px-5 bg-gray-400  font-semibold rounded-md shadow-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
                onClick={() => navigate("/myProfile")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`w-75% py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Memperbarui..." : "Perbarui Kata Sandi"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPassword;