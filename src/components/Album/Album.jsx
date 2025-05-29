import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; // Import ikon kembali

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [photoCounts, setPhotoCounts] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/signIn");
          return;
        }

        const albumsResponse = await fetch(
          "http://localhost:5000/album/users/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!albumsResponse.ok) throw new Error("Gagal mengambil data album");

        const albumsData = await albumsResponse.json();
        if (albumsData.success) {
          setAlbums(albumsData.data);
          fetchPhotoCounts(albumsData.data);
        } else {
          throw new Error(albumsData.message || "Gagal memuat data album");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchPhotoCounts = async (albums) => {
      const token = localStorage.getItem("accessToken");
      const counts = {};

      await Promise.all(
        albums.map(async (album) => {
          try {
            const response = await fetch(
              `http://localhost:5000/foto/count/album/${album.AlbumID}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const data = await response.json();
            console.log(`Data untuk Album ${album.AlbumID}:`, data);

            if (response.ok) {
              // Akses data yang ada pada response.data
              counts[album.AlbumID] = data?.data ?? 0; // Mengambil data dari `data` bukan `count`
            } else {
              counts[album.AlbumID] = 0;
            }
          } catch (error) {
            console.error(
              `Gagal mengambil jumlah foto untuk album ${album.AlbumID}:`,
              error
            );
            counts[album.AlbumID] = 0;
          }
        })
      );

      console.log("Final Counts: ", counts);
      setPhotoCounts(counts);
    };



    fetchAlbums();
  }, [navigate]);

  const openDeleteModal = (album) => {
    setSelectedAlbum(album);
    setModalOpen(true);
    setDropdownOpen(null);
  };

  const closeDeleteModal = () => {
    setSelectedAlbum(null);
    setModalOpen(false);
  };

  const handleDeleteAlbum = async () => {
    if (!selectedAlbum) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/album/${selectedAlbum.AlbumID}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setAlbums(
          albums.filter((album) => album.AlbumID !== selectedAlbum.AlbumID)
        );
        closeDeleteModal();
      } else {
        console.error("Gagal menghapus album");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus album:", error);
    }
  };

  return (
    <div className="p-5 ">
        <motion.button
                onClick={() => navigate("/myProfile")}
                className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-black bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <FaArrowLeft className="mr-2" />
                Kembali
              </motion.button>
      {/* Button for creating a new album */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/create-album")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Buat Album Baru
        </button>
      </div>

      {/* Daftar Album */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <motion.div
            key={album.AlbumID}
            className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                backgroundImage: `url(http://localhost:5000/uploads/${
                  album.FirstFotoUrl || "default-image.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            >
              <div
                className="p-4 bg-black bg-opacity-50 h-full flex flex-col justify-between"
                onClick={() => navigate(`/album/${album.AlbumID}`)}
              >
                <h2 className="text-lg font-semibold text-white cursor-pointer hover:text-blue-500">
                  {album.NamaAlbum}
                </h2>
                <p className="text-sm text-white mt-1">
                  📷 {photoCounts[album.AlbumID] ?? 0} Foto
                </p>
              </div>
            </div>

            <div className="absolute top-2 right-2">
              <button
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === album.AlbumID ? null : album.AlbumID
                  )
                }
                className="p-2 bg-gray-700 rounded-full text-white"
              >
                <FiMoreVertical />
              </button>
              {dropdownOpen === album.AlbumID && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
                  <button
                    onClick={() => navigate(`/edit-album/${album.AlbumID}`)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(album)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Konfirmasi Hapus
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Apakah Anda yakin ingin menghapus album{" "}
              <strong>{selectedAlbum?.NamaAlbum}</strong>?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteAlbum}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Ya, Hapus
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
