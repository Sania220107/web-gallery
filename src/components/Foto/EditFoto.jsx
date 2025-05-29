import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";

const EditFoto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState({
    JudulFoto: "",
    DeskripsiFoto: "",
    LokasiFile: "", // Menyimpan path file lama
  });
  const [file, setFile] = useState(null); // State untuk file baru

  // Fetch photo data ketika komponen dimuat
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:5000/foto/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setPhotoData(data.data);
        } else {
          console.error("Failed to fetch photo data");
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("JudulFoto", photoData.JudulFoto);
    formData.append("DeskripsiFoto", photoData.DeskripsiFoto);

    // Hanya tambahkan file jika ada yang diunggah
    if (file) {
      formData.append("LokasiFile", file);
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5000/foto/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/myProfile`);
      } else {
        console.error("Failed to update photo");
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-800">
      <div className="w-full max-w-lg p-6 bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Foto</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul Foto */}
          <div>
            <label htmlFor="judul" className="block text-sm font-medium">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              value={photoData.JudulFoto}
              onChange={(e) =>
                setPhotoData({ ...photoData, JudulFoto: e.target.value })
              }
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Deskripsi Foto */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={photoData.DeskripsiFoto}
              onChange={(e) =>
                setPhotoData({ ...photoData, DeskripsiFoto: e.target.value })
              }
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-medium">Unggah Foto Baru</label>
            <input
              type="file"
              id="LokasiFile"
              onChange={(e) => setFile(e.target.files[0])} // Simpan file ke state
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
            {photoData.LokasiFile && (
              <p className="text-sm text-gray-500 mt-2">
                Current file: {photoData.LokasiFile}
              </p>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate("/myProfile")}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-red-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoto;