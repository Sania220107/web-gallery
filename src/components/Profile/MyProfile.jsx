import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaHeart, FaTrash, FaPlus, FaEllipsisV, FaComment } from "react-icons/fa";
import { FiLogOut, FiMoreVertical } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { IoMdSend, IoMdMore, IoMdAlbums } from "react-icons/io";
import axios from "axios";


const MyProfile = () => {
  const [userData, setUserData] = useState({
    Username: "",
    Email: "",
    Profile: "",
  });
  const [photos, setPhotos] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [albumName, setAlbumName] = useState("");
  const [file, setFile] = useState(null);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [likesPerPhoto, setLikesPerPhoto] = useState({});
  const [commentsPerPhoto, setCommentsPerPhoto] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Untuk menyimpan foto yang dipilih
  const [IsiKomentar, setIsiKomentar] = useState(""); // Untuk menyimpan komentar baru
  const [showModal, setShowModal] = useState(false); // Untuk menampilkan modal
  const [editedComment, setEditedComment] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/signIn");
          return;
        }

        const profileResponse = await fetch(
          "http://localhost:5000/users/profile",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!profileResponse.ok) throw new Error("Gagal mengambil data profil");
        const profileData = await profileResponse.json();
        if (profileData.success) setUserData(profileData.data);

        const likeResponse = await fetch(
          "http://localhost:5000/like/users/count",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!likeResponse.ok) throw new Error("Gagal mengambil jumlah like");
        const likeData = await likeResponse.json();
        if (likeData.success) setLikeCount(likeData.data);

        const photosResponse = await fetch(
          "http://localhost:5000/foto/users/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!photosResponse.ok) throw new Error("Gagal mengambil foto");
        const photosData = await photosResponse.json();
        if (photosData.success) setPhotos(photosData.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfileData();
  }, [navigate]);


  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/foto/${photoToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setPhotos(photos.filter((photo) => photo.FotoID !== photoToDelete));
        setPhotoToDelete(null);

        const photosResponse = await fetch(
          "http://localhost:5000/foto/users/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (photosResponse.ok) {
          const photosData = await photosResponse.json();
          if (photosData.success) {
            setPhotos(photosData.data);
          }
        }
      } else {
        console.error("Gagal menghapus foto");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const openPhotoModal = async (FotoID) => {
    try {
      const response = await fetch(`http://localhost:5000/foto/${FotoID}`);
      const photoData = await response.json();
      if (photoData.success) {
        setSelectedPhoto(photoData.data);
        setShowModal(true);
        fetchLikeAndCommentCount(FotoID); // Ambil jumlah like & komentar
        fetchCommentsByPhotoID(FotoID); // Ambil daftar komentar
      }
    } catch (error) {
      console.error("Error fetching photo data:", error);
    }
  };


  const handleAddComment = async () => {
    if (!IsiKomentar) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/komentar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          FotoID: selectedPhoto.FotoID,
          IsiKomentar: IsiKomentar,
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Tambahkan komentar baru ke dalam state
        setCommentsPerPhoto((prev) => ({
          ...prev,
          [selectedPhoto.FotoID]: prev[selectedPhoto.FotoID] + 1,
        }));
        setIsiKomentar(""); // Reset input komentar
        // Fetch ulang komentar terbaru setelah komentar ditambahkan
        fetchLikeAndCommentCount(selectedPhoto.FotoID);
      } else {
        console.error("Gagal menambahkan komentar");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  console.log("Selected: ",selectedPhoto)

  const fetchCommentsByPhotoID = async (fotoID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/komentar/foto/${fotoID}`
      );
      const data = await response.json();
      if (data.success) {
        setSelectedPhoto((prev) => ({
          ...prev,
          komentar: data.data, // Perbarui daftar komentar pada foto yang dipilih
        }));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };



  const fetchLikeAndCommentCount = async (fotoID) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      // Ambil jumlah like untuk foto
      const likeResponse = await fetch(
        `http://localhost:5000/like/foto/count/${fotoID}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const likeData = await likeResponse.json();
      if (likeData.success) {
        setLikesPerPhoto((prev) => ({
          ...prev,
          [fotoID]: likeData.data, // Menyimpan jumlah like untuk FotoID tertentu
        }));
      }

      // Ambil jumlah komentar untuk foto
      const commentResponse = await fetch(
        `http://localhost:5000/komentar/foto/count/${fotoID}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const commentData = await commentResponse.json();
      if (commentData.success) {
        setCommentsPerPhoto((prev) => ({
          ...prev,
          [fotoID]: commentData.data, // Menyimpan jumlah komentar untuk FotoID tertentu
        }));
      }
    } catch (error) {
      console.error("Error fetching like/comment counts:", error);
    }
  };

 

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-300 to-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => navigate("/album")}
              className="flex items-center space-x-2 text-gray-700"
            >
              <IoMdAlbums /> <span>Album</span>
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center space-x-2 text-gray-700"
            >
              <FaCog /> <span>Settings</span>
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => navigate("/edit-password")}
              className="flex items-center space-x-2 text-gray-700"
            >
              <MdLock /> <span>Edit Password</span>
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-700"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <img
            src={`http://localhost:5000/uploads/${userData.Profile}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{userData.Username}</h2>
            <p className="text-gray-500">{userData.Email}</p>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <FaHeart className="text-red-500" />
            <span className="text-lg font-semibold">{likeCount} Likes</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6">Photos</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => navigate("/create-photo")}
        >
          + Upload Foto
        </button>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {photos.map((photo) => (
            <div
              key={photo.FotoID}
              className="relative group w-64 h-auto shadow-lg rounded-lg"
              onMouseEnter={() => fetchLikeAndCommentCount(photo.FotoID)}
              onClick={() => openPhotoModal(photo.FotoID)}
              // Panggil API saat hover
            >
              <div>
                <img
                  src={`http://localhost:5000/uploads/${
                    photo.LokasiFile
                  }?${new Date().getTime()}`}
                  alt="Photo"
                  className="w-full h-48 object-cover rounded-lg"
                />

                {/* Overlay dengan foto sebagai background saat hover */}
                <div
                  className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(http://localhost:5000/uploads/${
                      photo.LokasiFile
                    }?${new Date().getTime()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex space-x-4">
                    <p className="flex items-center">
                      <FaHeart className="mr-2" />{" "}
                      {likesPerPhoto[photo.FotoID] || 0}
                    </p>
                    <p className="flex items-center">
                      <FaComment className="mr-2" />{" "}
                      {commentsPerPhoto[photo.FotoID] || 0}
                    </p>
                  </div>
                </div>

                {/* Dropdown Button */}
                <button
                  onClick={(event) => {
                    event.stopPropagation(); // Mencegah event klik merambat ke parent
                    setDropdownOpen(
                      dropdownOpen === photo.FotoID ? null : photo.FotoID
                    );
                  }}
                  className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaEllipsisV />
                </button>

                {dropdownOpen === photo.FotoID && (
                  <div className="absolute top-10 right-0 w-32 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={() => navigate(`/edit-photo/${photo.FotoID}`)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setPhotoToDelete(photo.FotoID)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for deleting photo */}
      {photoToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">
              Are you sure you want to delete this photo?
            </h2>
            <div className="mt-4">
              <button
                onClick={handleDeletePhoto}
                className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setPhotoToDelete(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedPhoto && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${selectedPhoto.ProfileBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white bg-opacity-80 p-4 rounded-2xl shadow-lg w-full max-w-3xl max-h-[95vh] overflow-auto backdrop-blur-md">
            <div className="flex flex-col md:flex-row">
              {/* Foto Section */}
              <div className="md:w-1/2">
                <img
                  src={`http://localhost:5000/uploads/${selectedPhoto.LokasiFile}`}
                  alt="Selected Photo"
                  className="w-full max-h-screen object-contain rounded-lg"
                />
              </div>

              {/* Info & Comments Section */}
              <div className="md:ml-6 flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedPhoto.User?.Username || "Pengguna Tidak Diketahui"}
                </h2>
                <p className="text-sm text-gray-500">{selectedPhoto.Email}</p>

                {/* Comments */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Komentar
                  </h3>
                  <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
                    {/* Daftar komentar */}
                    {selectedPhoto.komentar &&
                      selectedPhoto.komentar.map((comment, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-sm"
                        >
                          {/* Foto Profil Pengomentar */}
                          <img
                            src={`http://localhost:5000/uploads/${comment.User?.Profile}`}
                            alt="Profile"
                            className="w-10 h-10 object-cover rounded-full"
                          />

                          {/* Isi Komentar */}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">
                              {comment.User?.Username ||
                                "Pengguna Tidak Diketahui"}
                            </p>
                            <p className="text-sm text-gray-700">
                              {comment.IsiKomentar}
                            </p>
                          </div>

                          {/* Icon Titik Tiga untuk Edit dan Hapus */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setDropdownOpen(
                                  dropdownOpen === comment.KomentarID
                                )
                              }
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <FiMoreVertical className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Add Comment (Input dengan Icon Send di dalamnya) */}
                <div className="mt-6 relative">
                  <input
                    value={IsiKomentar}
                    onChange={(e) => setIsiKomentar(e.target.value)}
                    className="w-full bg-white bg-opacity-80 p-3 pr-10 rounded-full shadow-md backdrop-blur-md outline-none text-gray-800 placeholder-gray-500"
                    placeholder="Tambahkan komentar..."
                  />
                  <button
                    onClick={handleAddComment}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-all"
                  >
                    <IoMdSend className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;