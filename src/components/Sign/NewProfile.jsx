import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewProfile = () => {
  const { id } = useParams(); // Mengambil ID pengguna dari URL
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Profile: "",
  });

  const [newProfile, setNewProfile] = useState(null); // Untuk menyimpan file gambar baru

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:5000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({
          Username: data.Username,
          Email: data.Email,
          Password: "",
          Profile: data.Profile, // Menyimpan URL foto profil yang ada
        });
      } else {
        console.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Username", userData.Username);
    formData.append("Email", userData.Email);
    formData.append("Password", userData.Password);

    // Hanya menambahkan profile jika file baru diunggah
    if (newProfile) {
      formData.append("Profile", newProfile);
    }

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect ke halaman profil setelah berhasil mengedit
        navigate(`/edit-profile/${id}`);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="Username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="Username"
            name="Username"
            value={userData.Username}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="Email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={userData.Email}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="Password" className="block text-sm font-medium">
            Password (Leave blank to keep the current password)
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={userData.Password}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="Profile" className="block text-sm font-medium">
            Profile Picture (optional)
          </label>
          <input
            type="file"
            id="Profile"
            name="Profile"
            onChange={handleFileChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
          {userData.Profile && !newProfile && (
            <div className="mt-2">
              <img
                src={`http://localhost:5000/uploads/${userData.Profile}`}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProfile;
