import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const User = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const activeRes = await axios.get(
          "http://localhost:5000/users/users/active"
        );
        const inactiveRes = await axios.get(
          "http://localhost:5000/users/users/isactive"
        );
        const deletedRes = await axios.get(
          "http://localhost:5000/users/users/delete"
        );

        setActiveUsers(activeRes.data.data);
        setInactiveUsers(inactiveRes.data.data);
        setDeletedUsers(deletedRes.data.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        setError("Gagal mengambil data pengguna. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-red-800 via-white to-pink-200">
      {/* Tombol Kembali */}
      <Link
        to="/dashboard"
        className="flex items-center text-white hover:text-blue-800 mb-3 text-sm"
      >
        <FaArrowLeft className="mr-1" />
        <span>Kembali ke Dashboard</span>
      </Link>

      <h2 className="text-lg font-bold mb-4 text-center">Daftar Pengguna</h2>

      {loading ? (
        <p className="text-center text-gray-600 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : (
        <div className="flex flex-col items-center ">
          {/* Tabel User Aktif */}
          <UserTable
            title="Pengguna Aktif"
            users={activeUsers}
            color="text-green-600"
          />

          {/* Tabel User Tidak Aktif */}
          <UserTable
            title="Pengguna Tidak Aktif"
            users={inactiveUsers}
            color="text-red-800"
          />

          {/* Tabel User Dihapus */}
          <UserTable
            title="Pengguna Dihapus"
            users={deletedUsers}
            color="text-purple-600"
          />
        </div>
      )}
    </div>
  );
};

// Komponen Reusable untuk menampilkan tabel
const UserTable = ({ title, users, color }) => (
  <div className="mb-6 w-full max-w-md bg-white">
    {" "}
    {/* Lebar tabel dibatasi */}
    <h3 className={`text-base font-semibold mb-2 text-center ${color}`}>
      {title}
    </h3>
    {users.length === 0 ? (
      <p className="text-gray-500 text-sm text-center">Tidak ada pengguna.</p>
    ) : (
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-xs">
            <tr>
              <th className="border border-gray-300 px-3 py-1 text-left">
                Nama
              </th>
              <th className="border border-gray-300 px-3 py-1 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-3 py-1 text-left">
                Terakhir Login
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-3 py-1">
                  {user.Username}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {user.Email}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {user.LastLogin
                    ? new Date(user.LastLogin).toLocaleString()
                    : "Belum pernah login"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default User;
