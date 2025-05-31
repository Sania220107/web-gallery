import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, RotateCw, Undo2, XCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Trash = () => {
  const [deletedPhotos, setDeletedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeletedPhotos = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "https://gallerydb-production.up.railway.app/foto/users/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDeletedPhotos(response.data.data);
      } catch (error) {
        setMessage("Gagal mengambil data foto yang sudah dihapus.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedPhotos();
  }, []);

  const handleRestore = async (fotoID) => {
    const token = localStorage.getItem("accessToken");

    try {
      await axios.put(
        `https://gallerydb-production.up.railway.app/foto/users/restore/${fotoID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Hapus foto dari list setelah dipulihkan
      setDeletedPhotos((prev) => prev.filter((foto) => foto.FotoID !== fotoID));

      setMessage("Foto berhasil dipulihkan!");
      setTimeout(() => setMessage(""), 3000); // hilangkan pesan setelah 3 detik
    } catch (error) {
      console.error("Gagal memulihkan foto:", error);
      setMessage("Gagal memulihkan foto.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-peach-100 px-4 py-8 relative">
      {/* Notifikasi pesan sukses */}
      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-md z-50 transition">
          {message}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RotateCw className="animate-spin text-peach-500 w-8 h-8" />
          <span className="ml-2 text-red-500 hover:text-red-700 font-medium">
            Memuat data...
          </span>
        </div>
      ) : message ? null : deletedPhotos.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada foto yang dihapus.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {deletedPhotos.map((foto) => (
            <div
              key={foto.FotoID}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-peach-200"
            >
              <img
                src={`https://gallerydb-production.up.railway.app/uploads/${foto.LokasiFile}`}
                alt={foto.JudulFoto}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold truncate">{foto.JudulFoto}</h2>

                <p className="text-xs text-gray-400 mb-4">
                  Dihapus pada:{" "}
                  {new Date(foto.deletedAt).toLocaleDateString("id-ID")}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={() => handleRestore(foto.FotoID)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition"
                  >
                    <Undo2 className="w-4 h-4" /> Pulihkan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
