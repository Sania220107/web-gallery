import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Ikon sosial media dari lucide-react
import Logo from "../../assets/Logo.jpg"

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 px-8 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Bagian 1: Tentang Website */}
        <div>
          <h3 className="w-16 h-16  font-semibold mb-3"><img src={Logo} alt="" /></h3>
          <p className="text-gray-700 text-sm">
            GalleryFoto adalah platform untuk berbagi dan menemukan foto dari
            berbagai pengguna yang mengunggah foto.
          </p>
        </div>

        {/* Bagian 2: Navigasi */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Navigasi</h3>
          <ul className="text-gray-700 space-y-2">
            <li>
              <Link to="/features" className="hover:text-blue-500">
                Features
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-blue-500">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-blue-500">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Bagian 3: Kontak */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Kontak</h3>
          <p className="text-gray-700 text-sm">
            Alamat: Jl. Kauman, desa Bentar, Kec. Salem Kab. Brebes Jawa Tengah Indonesia
          </p>
          <p className="text-gray-700 text-sm">No Telepon: +62 812-3456-7890</p>
          <p className="text-gray-700 text-sm">Kode Pos: 52275</p>
          <p className="text-gray-700 text-sm">
            Email: support@galleryfoto.com
          </p>
        </div>

        {/* Bagian 4: Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; 2025 GalleryFoto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
