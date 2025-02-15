import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaImage, FaSignOutAlt, FaHome } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const adminName = "Admin Rista";

  // State untuk menyimpan jumlah user berdasarkan kategori
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Warna untuk Pie Chart
  const COLORS = ["#4CAF50", "#FF6F61", "#8884d8"];

  // Fungsi Fetch Data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeRes = await axios.get(
          "http://localhost:5000/users/active/count"
        );
        const inactiveRes = await axios.get(
          "http://localhost:5000/users/isactive/count"
        );
        const deletedRes = await axios.get(
          "http://localhost:5000/users/delete/count"
        );

        const newData = [
          { name: "Aktif", value: activeRes.data.data }, // Ambil data dari `data.data`
          { name: "Tidak Aktif", value: inactiveRes.data.data },
          { name: "Dihapus", value: deletedRes.data.data },
        ];

        console.log("User Data:", newData); // Debugging

        // Jika semua data 0, tampilkan "No Data"
        const filteredData = newData.some((d) => d.value > 0)
          ? newData
          : [{ name: "No Data", value: 1 }];

        setUserData(filteredData);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        setError("Gagal mengambil data pengguna. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-300 via-white to-gray-300">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-800 via-white to-gray-700 text-white p-5 flex flex-col rounded-r-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
        <ul className="space-y-4 flex-1">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 text-lg hover:text-gray-400"
            >
              <FaHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className="flex items-center space-x-3 text-lg hover:text-gray-400"
            >
              <FaUser size={20} />
              <span>Users</span>
            </Link>
          </li>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-lg text-red-500 hover:text-red-300"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
          <li></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-xl">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">{adminName}</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
              <FaUser size={20} className="text-gray-600" />
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-5 text-center">
            Dashboard Overview
          </h2>
          <div className="bg-white p-6 shadow-xl rounded-xl text-center">
            <h3 className="text-xl font-semibold">User Overview</h3>

            {/* Loading & Error Handling */}
            {loading ? (
              <p className="mt-4 text-gray-600">Loading...</p>
            ) : error ? (
              <p className="mt-4 text-red-500">{error}</p>
            ) : (
              <div className="mt-6 flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) =>
                        name !== "No Data"
                          ? `${name} ${(percent * 100).toFixed(0)}%`
                          : "No Data"
                      }
                    >
                      {userData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
