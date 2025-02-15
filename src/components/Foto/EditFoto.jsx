import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io"; // Menggunakan ikon upload dari react-icons

const EditFoto = () => {
  const { id } = useParams(); // Get the FotoID from the URL
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState({
    JudulFoto: "",
    DeskripsiFoto: "",
    LokasiFile: "",
  });
  const [file, setFile] = useState(null);

  // Fetch photo data when the component is mounted
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

    // Jika file baru diupload, tambahkan file ke formData
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
        navigate(`/myProfile`); // Redirect after update
      } else {
        console.error("Failed to update photo");
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Photo</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="judul" className="block text-sm font-medium">
              Title
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

          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium">
              Description
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

          <div>
            <input
              type="file"
              id="LokasiFile"
              value={photoData.LokasiFile}
              onChange={(e) =>
                setPhotoData({ ...photoData, LokasiFile: e.target.value })
              }
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* <label htmlFor="file" className="block text-sm font-medium">
              Upload New File (optional)
            </label> */}
            <div className="flex items-center space-x-3">
              {/* <input
                htmlFor="file"
                value={photoData.LokasiFile}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
              >
                <IoMdCloudUpload className="text-xl" id="LokasiFile"/>
                <span>Upload Photo</span>
              </input> */}
            </div>
          </div>

          <div className="mt-6 flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate("/myProfile")}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            >
              <span>Update Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoto;
