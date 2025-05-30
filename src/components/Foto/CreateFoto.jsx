import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateFoto = () => {
  const [judulFoto, setJudulFoto] = useState("");
  const [deskripsiFoto, setDeskripsiFoto] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
        return;
      }
      try {
        const response = await axios.get(
          "https://dbgallery-production.up.railway.app/album/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbumList(response.data.data);
      } catch (err) {
        setError("Gagal mengambil daftar album.");
      }
    };
    fetchAlbums();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAlbumSelection = (albumID) => {
    setSelectedAlbums((prev) =>
      prev.includes(albumID)
        ? prev.filter((id) => id !== albumID)
        : [...prev, albumID]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("File belum dipilih");
      return;
    }
    if (selectedAlbums.length === 0) {
      setError("Pilih setidaknya satu album.");
      return;
    }

    const formData = new FormData();
    formData.append("LokasiFile", file);
    formData.append("JudulFoto", judulFoto);
    formData.append("DeskripsiFoto", deskripsiFoto);
    formData.append("AlbumID", selectedAlbums);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await axios.post("https://dbgallery-production.up.railway.app/foto/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setJudulFoto("");
      setDeskripsiFoto("");
      setSelectedAlbums([]);
      setFile(null);
      setIsLoading(false);
      navigate("/myProfile");
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat mengunggah foto"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#4b0b0b] text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Tambah Foto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Judul Foto</label>
          <input
            type="text"
            value={judulFoto}
            onChange={(e) => setJudulFoto(e.target.value)}
            className="w-full p-2 mt-1 border border-[#ff6b6b] bg-[#701c1c] text-white rounded-lg focus:ring-2 focus:ring-[#ff6b6b]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Deskripsi Foto</label>
          <textarea
            value={deskripsiFoto}
            onChange={(e) => setDeskripsiFoto(e.target.value)}
            className="w-full p-2 mt-1 border border-[#ff6b6b] bg-[#701c1c] text-white rounded-lg focus:ring-2 focus:ring-[#ff6b6b]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Pilih Album</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {albumList.length > 0 ? (
              albumList.map((album) => (
                <label
                  key={album.AlbumID}
                  className="flex items-center space-x-2 text-white"
                >
                  <input
                    type="checkbox"
                    value={album.AlbumID}
                    checked={selectedAlbums.includes(album.AlbumID)}
                    onChange={() => handleAlbumSelection(album.AlbumID)}
                    className="w-4 h-4 accent-[#ff6b6b]"
                  />
                  <span>{album.NamaAlbum}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-300">Tidak ada album tersedia</p>
            )}
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-pink-300 rounded-full hover:bg-[#701c1c] transition">
            <FaCloudUploadAlt className="text-4xl text-pink-200" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {file && <p className="mt-2 text-sm text-pink-100">{file.name}</p>}
        </div>

        {error && <div className="text-red-300 text-sm mb-4">{error}</div>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/myProfile")}
            className="px-4 py-2 border border-pink-200 text-white rounded-lg hover:bg-pink-200 hover:text-[#4b0b0b] transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff4b4b] transition"
          >
            {isLoading ? "Mengunggah..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFoto;
