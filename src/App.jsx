import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Menggunakan named import
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import CardGrid from "./components/CardGrid/CardGrid";
import NewPassword from "./components/Sign/NewPassword";
import MyProfile from "./components/Profile/MyProfile";
import CreateFoto from "./components/Foto/CreateFoto";
import CreateAlbum from "./components/Album/CreateAlbum";
import Seeting from "./components/Profile/Seeting";
import NewProfile from "./components/Sign/NewProfile";
import CommentsPage from "./components/comments/CommentsPage";
import Dashboard from "./components/admin/Dashboard";
import User from "./components/admin/User";
import Foto from "./components/admin/Foto";
import FotoAlbum from "./components/Album/FotoAlbum";
import HalamanDepan from "./components/LandingPage/HalamanDepan";
import Featurs from "./components/LandingPage/Featurs";
import HelpCenter from "./components/navbar/HelpCenter";
import Features from "./components/navbar/Features";
import About from "./components/navbar/About";
import TermsOfService from "./components/navbar/TermsOfService";
import PrivacyPolicy from "./components/navbar/PrivacyPolicy";
import EditFotoModal from "./components/Profile/EditFotoModal";
import Album from "./components/Album/Album";
import EditAlbum from "./components/Album/EditAlbum";
import HapusAlbum from "./components/Album/HapusAlbum";
import EditFoto from "./components/Foto/EditFoto";
import Trash from "./components/Foto/Trash";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/newPassword" element={<NewPassword />}></Route>
        <Route path="/myProfile" element={<MyProfile />}></Route>
        <Route path="create-photo" element={<CreateFoto />}></Route>
        <Route path="/create-album" element={<CreateAlbum />}></Route>
        <Route path="/settings" element={<Seeting />}></Route>
        <Route path="/settings/edit-password" element={<NewPassword />}></Route>
        <Route path="settings/edit-profile" element={<NewProfile />}></Route>
        <Route path="/comments" element={<CommentsPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/foto" element={<Foto />}></Route>
        <Route path="/album/:AlbumID" element={<FotoAlbum />} />
        <Route path="/featurs" element={<Featurs />}></Route>
        <Route path="/edit-profile/:id" element={<NewProfile />}></Route>
        <Route path="/help" element={<HelpCenter />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="//Syarat&Ketentuan" element={<TermsOfService />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/EditFotoModal/:id" element={<EditFotoModal />}></Route>
        <Route path="/album" element={<Album />}></Route>
        <Route path="/edit-album/:id" element={<EditAlbum />}></Route>
        <Route path="/hapus-album/:id" element={<HapusAlbum />}></Route>
        <Route path="/edit-photo/:id" element={<EditFoto />}></Route>
        <Route path="/trash" element={<Trash />}></Route>
      </Routes>
  );
};

export default App;
