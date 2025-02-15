import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import CardGrid from "../CardGrid/CardGrid";
import Footer from "../Footer/Footer";
import Logo from "../../assets/Logo.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans text-black bg-gradient-to-r from-gray-200 via-white to-gray-300 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center py-4 px-6 border-b border-gray-300 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-16 object-contain" />
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            GalleryFoto
          </h1>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6 text-gray-700 text-lg">
          <a
            className="hover:text-black transition duration-300 cursor-pointer"
            onClick={() => navigate("/features")}
          >
            Features
          </a>
          <a
            className="hover:text-black transition duration-300 cursor-pointer"
            onClick={() => navigate("/help")}
          >
            Help Center
          </a>
          <a
            className="hover:text-black transition duration-300 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </a>
          <a
            className="hover:text-black transition duration-300 cursor-pointer"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </a>
          <a
            className="hover:text-black transition duration-300 cursor-pointer"
            onClick={() => navigate("/terms-of-service")}
          >
            Terms of Service
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-8 h-8 text-black" />
        </button>

        {/* User Icon */}
        <button
          className="hidden md:flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-gray-100 transition duration-300"
          onClick={() => navigate(isLoggedIn ? "/myProfile" : "/signIn")}
        >
          <User className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4 shadow-md">
          <a
            className="py-2 text-lg text-gray-700 hover:text-black"
            onClick={() => navigate("/features")}
          >
            Features
          </a>
          <a
            className="py-2 text-lg text-gray-700 hover:text-black"
            onClick={() => navigate("/help")}
          >
            Help Center
          </a>
          <a
            className="py-2 text-lg text-gray-700 hover:text-black"
            onClick={() => navigate("/about")}
          >
            About
          </a>
          <a
            className="py-2 text-lg text-gray-700 hover:text-black"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </a>
          <a
            className="py-2 text-lg text-gray-700 hover:text-black"
            onClick={() => navigate("/terms-of-service")}
          >
            Terms of Service
          </a>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Featured Designers */}
        <section className="mt-8">
          <CardGrid />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;