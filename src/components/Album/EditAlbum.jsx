import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Icon untuk modal sukses

const EditAlbum = () => {
  const { id } = useParams(); // Pastikan sesuai dengan path di App.js
  const navigate = useNavigate();
  const [album, setAlbum] = useState({ NamaAlbum: "", Deskripsi: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State untuk modal sukses

  useEffect(() => {
    if (!id) {
      setError("Album ID tidak ditemukan");
      return;
    }

    const fetchAlbumData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/signIn");
          return;
        }

        console.log("Mengambil data album dengan ID:", id);
        const response = await fetch(`http://localhost:5000/album/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setAlbum(data.data);
        } else {
          setError("Gagal mengambil data album.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data album.");
      }
    };

    fetchAlbumData();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      console.log("Mengirim update untuk Album ID:", id);

      const response = await fetch(`http://localhost:5000/album/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      });

      if (response.ok) {
        setSuccess(true); // Tampilkan modal sukses
        setTimeout(() => {
          setSuccess(false);
          navigate(`/album`);
        }, 2000);
      } else {
        setError("Gagal memperbarui album.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui album.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Edit Album
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">
            Nama Album
          </label>
          <input
            type="text"
            name="NamaAlbum"
            value={album.NamaAlbum}
            onChange={(e) => setAlbum({ ...album, NamaAlbum: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Deskripsi</label>
          <textarea
            name="Deskripsi"
            value={album.Deskripsi}
            onChange={(e) => setAlbum({ ...album, Deskripsi: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Album
        </button>
      </form>

      {/* Modal Sukses */}
      {success && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <CheckCircle className="text-green-500 mx-auto" size={50} />
            <p className="text-lg font-semibold text-gray-800 mt-3">
              Album berhasil diperbarui!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAlbum;
