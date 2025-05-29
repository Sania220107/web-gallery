import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "../../assets/LogoGaleriFoto.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#ff6b6b] via-[#701c1c] to-[#4b0b0b] text-white pt-12 pb-8 px-6 mt-16 border-t border-[#ffffff]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Deskripsi */}
        <div>
          <img
            src={Logo}
            alt="GalleryFoto Logo"
            className="w-20 h-20 object-cover mb-4 rounded-full shadow-md"
          />
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>GalleryFoto</strong> adalah tempat berbagi karya foto dari
            pengguna seluruh Indonesia.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-[#ff6b6b]">
            Navigasi
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/features" className="hover:text-[#ff6b6b] transition">
                Fitur
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-[#ff6b6b] transition">
                Pusat Bantuan
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#ff6b6b] transition">
                Tentang
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-[#ff6b6b] transition"
              >
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-[#ff6b6b] transition"
              >
                Syarat & Ketentuan
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-[#ff6b6b]">
            Kontak
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Jl. Kauman, Desa Bentar, Salem</li>
            <li>Brebes, Jawa Tengah, 52275</li>
            <li>+62 812-3456-7890</li>
            <li>Email: support@galleryfoto.com</li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-[#ff6b6b]">
            Ikuti Kami
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#ff6b6b] transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#ff6b6b] transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#ff6b6b] transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-white mt-12">
        &copy; {new Date().getFullYear()} GalleryFoto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
