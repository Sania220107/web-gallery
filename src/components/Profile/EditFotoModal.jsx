import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const EditFotoModal = () => {
  const { id } = useParams(); // Ambil ID foto dari URL
  const [judulFoto, setJudulFoto] = useState("");
  const [deskripsiFoto, setDeskripsiFoto] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
        return;
      }
      try {
        // Ambil data album
        const albumResponse = await axios.get(
          "http://localhost:5000/album/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbumList(albumResponse.data.data);

        // Ambil data foto yang akan diedit
        const fotoResponse = await axios.get(
          `http://localhost:5000/foto/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const fotoData = fotoResponse.data.data;
        setJudulFoto(fotoData.JudulFoto);
        setDeskripsiFoto(fotoData.DeskripsiFoto);
        setSelectedAlbums(fotoData.AlbumID || []);
      } catch (err) {
        setError("Gagal mengambil data.");
      }
    };
    fetchData();
  }, [id]);

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
    if (selectedAlbums.length === 0) {
      setError("Pilih setidaknya satu album.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("LokasiFile", file);
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
      await axios.put(`http://localhost:5000/foto/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      navigate("/myProfile");
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat memperbarui foto"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Foto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Judul Foto</label>
          <input
            type="text"
            value={judulFoto}
            onChange={(e) => setJudulFoto(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Deskripsi Foto</label>
          <textarea
            value={deskripsiFoto}
            onChange={(e) => setDeskripsiFoto(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={album.AlbumID}
                    checked={selectedAlbums.includes(album.AlbumID)}
                    onChange={() => handleAlbumSelection(album.AlbumID)}
                    className="w-4 h-4"
                  />
                  <span>{album.NamaAlbum}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">Tidak ada album tersedia</p>
            )}
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-full hover:bg-gray-100">
            <FaCloudUploadAlt className="text-4xl text-gray-500" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/myProfile")}
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Memperbarui..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFotoModal;