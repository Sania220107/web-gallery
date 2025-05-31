import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({ NamaAlbum: "", Deskripsi: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

        const response = await fetch(`https://gallerydb-production.up.railway.app/album/${id}`, {
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

      const response = await fetch(`https://gallerydb-production.up.railway.app/album/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      });

      if (response.ok) {
        setSuccess(true);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-200 via-white to-red-300">
      <div className="max-w-lg w-full p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-red-800 mb-4">
          Edit Album
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-800 font-semibold">
              Nama Album
            </label>
            <input
              type="text"
              name="NamaAlbum"
              value={album.NamaAlbum}
              onChange={(e) =>
                setAlbum({ ...album, NamaAlbum: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-red-800 font-semibold">
              Deskripsi
            </label>
            <textarea
              name="Deskripsi"
              value={album.Deskripsi}
              onChange={(e) =>
                setAlbum({ ...album, Deskripsi: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            ></textarea>
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate("/album")}
              className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>

            <button
              type="submit"
              className="w-1/2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
            >
              Update Album
            </button>
          </div>
        </form>

        {success && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <CheckCircle className="text-green-500 mx-auto" size={50} />
              <p className="text-lg font-semibold text-gray-800 mt-3">
                Album berhasil diperbarui!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAlbum;
