import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import CardGrid from "../CardGrid/CardGrid";
import Footer from "../Footer/Footer";
import Logo from "../../assets/LogoGalerifoto.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{ backgroundColor: "#4b0b0b", color: "#ffffff" }}
      className="font-sans text-white min-h-screen bg-gradient-to-b from-[#4b0b0b] via-[#701c1c] to-[#ff6b6b]"
    >
      {/* Navbar */}
      <div className="flex justify-between items-center py-4 px-6 border-b border-[#ff6b6b] bg-[#4b0b0b] hover:bg-[#701c1c] text-white font-semibold shadow-md animate-fade-in-up">
  {/* Logo + Title */}
  <div className="flex items-center space-x-4">
    <img
      src={Logo}
      alt="Logo"
      className="h-20 w-20 rounded-full object-cover ring-2 ring-white bg-white p-1"
    />
    <h1 className="text-2xl md:text-3xl font-semibold text-white">
      Galeri Foto
    </h1>
  </div>

  {/* Navigation Links */}
  <div className="hidden md:flex gap-6 text-lg">
    {[
      "/features",
      "/help",
      "/about",
      "/privacy-policy",
      "/Syarat&Ketentuan",
    ].map((route, i) => (
      <a
        key={i}
        className="hover:text-[#ffb3b3] transition duration-300 cursor-pointer"
        onClick={() => navigate(route)}
      >
        {route
          .replace("/", "")
          .replace("-", " ")
          .replace("privacy policy", "Kebijakan Privasi")
          .replace("Terms of service", "Syarat & Ketentuan")
          .replace("features", "Fitur")
          .replace("help", "Pusat Bantuan")
          .replace("about", "Tentang")}
      </a>
    ))}
  </div>

  {/* Mobile Menu Toggle */}
  <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
    <Menu className="w-8 h-8 text-[#ff6b6b]" />
  </button>

  {/* User Icon */}
  <button
    className="hidden md:flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-[#ff6b6b]/20 transition duration-300"
    onClick={() => navigate(isLoggedIn ? "/myProfile" : "/signIn")}
  >
    <User className="w-8 h-8 text-white" />
  </button>
</div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#4b0b0b] py-4 shadow-md animate-fade-in-up">
          {[
            "Fitur",
            "Pusat Bantuan",
            "Tentang",
            "Kebijakan Privasi",
            "Syarat & Ketentuan",
          ].map((text, i) => (
            <a
              key={i}
              className="py-2 text-lg text-white hover:text-[#ff6b6b]"
              onClick={() => {
                const routes = {
                  Fitur: "/features",
                  "Pusat Bantuan": "/help",
                  Tentang: "/about",
                  "Kebijakan Privasi": "/privacy-policy",
                  "Syarat & Ketentuan": "/terms-of-service",
                };
                navigate(routes[text]);
              }}
            >
              {text}
            </a>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Hero / Card Section */}
        <section className="mt-8 animate-fade-in-up delay-200">
          <CardGrid />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
