import React, { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.jpg"

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFotoID, setSelectedFotoID] = useState(null);
  const [selectedProfile, setSelectedProfile ] = useState(null)
  const [selectedUsername, setSelectedUsername] = useState(null)
  const [searchResults, setSearchResults] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedPhotos =
      JSON.parse(localStorage.getItem("likedPhotos")) || [];
    const storedLikeCounts =
      JSON.parse(localStorage.getItem("likeCounts")) || {};
    const storedCommentCounts =
      JSON.parse(localStorage.getItem("commentCounts")) || {};

    setLikedPhotos(storedLikedPhotos);
    setLikeCounts(storedLikeCounts);
    setCommentCounts(storedCommentCounts);

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/foto/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setCards(data.data);

          data.data.forEach(async (card) => {
            const storedCount = storedLikeCounts[card.FotoID];
            if (storedCount !== undefined) {
              setLikeCounts((prevCounts) => ({
                ...prevCounts,
                [card.FotoID]: storedCount,
              }));
            } else {
              const likeCountResponse = await fetch(
                `http://localhost:5000/foto/count/${card.FotoID}`
              );
              const likeCountData = await likeCountResponse.json();
              if (likeCountData.success) {
                setLikeCounts((prevCounts) => ({
                  ...prevCounts,
                  [card.FotoID]: likeCountData.data,
                }));

                const updatedLikeCounts = {
                  ...storedLikeCounts,
                  [card.FotoID]: likeCountData.data,
                };
                localStorage.setItem(
                  "likeCounts",
                  JSON.stringify(updatedLikeCounts)
                );
              }
            }

            const commentCountResponse = await fetch(
              `http://localhost:5000/komentar/foto/count/${card.FotoID}`
            );
            const commentCountData = await commentCountResponse.json();
            if (commentCountData.success) {
              setCommentCounts((prevCounts) => ({
                ...prevCounts,
                [card.FotoID]: commentCountData.data,
              }));

              const updatedCommentCounts = {
                ...storedCommentCounts,
                [card.FotoID]: commentCountData.data,
              };
              localStorage.setItem(
                "commentCounts",
                JSON.stringify(updatedCommentCounts)
              );
            }
          });
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/users/search/username?Username=${searchQuery}`
      );
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  

  const handleLike = async (fotoID) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setSuccessMessage("You need to be logged in to like a photo.");
      setLoading(false);
      return;
    }

    const isLiked = likedPhotos.includes(fotoID);
    const url = isLiked
      ? `http://localhost:5000/like/foto/${fotoID}`
      : "http://localhost:5000/like";

    try {
      const response = await fetch(url, {
        method: isLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: isLiked ? null : JSON.stringify({ FotoID: fotoID }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);

        const updatedLikedPhotos = isLiked
          ? likedPhotos.filter((id) => id !== fotoID)
          : [...likedPhotos, fotoID];
        setLikedPhotos(updatedLikedPhotos);
        localStorage.setItem("likedPhotos", JSON.stringify(updatedLikedPhotos));

        const updatedLikeCount = isLiked
          ? (likeCounts[fotoID] || 1) - 1
          : (likeCounts[fotoID] || 0) + 1;

        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [fotoID]: updatedLikeCount,
        }));

        const updatedLikeCounts = { ...likeCounts, [fotoID]: updatedLikeCount };
        localStorage.setItem("likeCounts", JSON.stringify(updatedLikeCounts));
      } else {
        setSuccessMessage(result.message);
      }
    } catch (err) {
      setSuccessMessage("Error liking the photo.");
    }

    setLoading(false);
  };

  const handleCommentClick = async (fotoID) => {
    setSelectedFotoID(fotoID);
    setSelectedProfile(fotoID.User)
    setSelectedUsername(fotoID.User)
    setIsModalOpen(true);

    try {
      const response = await fetch(
        `http://localhost:5000/komentar/foto/${fotoID}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleAddComment = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setSuccessMessage("You need to be logged in to add a comment.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/komentar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          FotoID: selectedFotoID,
          Profile: selectedProfile,
          Username: selectedUsername,
          IsiKomentar: newComment,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setNewComment("");
        const updatedComments = [...comments, result.data];
        setComments(updatedComments);

        const updatedCommentCount = (commentCounts[selectedFotoID] || 0) + 1;
        setCommentCounts((prevCounts) => ({
          ...prevCounts,
          [selectedFotoID]: updatedCommentCount,
        }));

        const updatedCommentCounts = {
          ...commentCounts,
          [selectedFotoID]: updatedCommentCount,
        };
        localStorage.setItem(
          "commentCounts",
          JSON.stringify(updatedCommentCounts)
        );
      } else {
        setSuccessMessage(result.message);
      }
    } catch (err) {
      setSuccessMessage("Error adding the comment.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-6xl text-center px-4 mt-16">
        <h1 className="text-5xl font-semibold text-black mb-5">
          Discover the world’s top designers
        </h1>
        <p className="text-xl text-gray-800 mb-12">
          Explore work from the most talented and accomplished designers ready
          to take on your next project
        </p>

        {/* Search Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-96 p-4 text-lg border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="p-4 text-lg bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-300 shadow-lg"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
        <div className="mt-4">
          {searchResults.length > 0 && (
            <div className="bg-white p-4 shadow rounded-md">
              <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
              <ul>
                {searchResults.map((user, index) => (
                  <li key={index} className="p-2 border-b">
                    {user.Username} - {user.Email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-4 flex items-center space-x-4 text-black">
                <img
                  src={
                    card.User.Profile
                      ? `http://localhost:5000/uploads/${card.User.Profile}`
                      : "http://localhost:5000/uploads/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p
                    className="font-semibold cursor-pointer"
                    onClick={() => navigateToProfile(card.User.Username)}
                  >
                    {card.User.Username}
                  </p>
                  <p
                    className="font-semibold cursor-pointer"
                    onClick={() => navigateToProfile(card.User.Email)}
                  >
                    {card.User.Email}
                  </p>
                </div>
              </div>

              <img
                src={
                  card.LokasiFile
                    ? `http://localhost:5000/uploads/${card.LokasiFile}`
                    : "http://localhost:5000/uploads/default-photo.jpg"
                }
                alt={card.JudulFoto}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />

              <div className="p-4">
                <h3 className="text-sm">{card.JudulFoto}</h3>
                <p className="text-gray-500 flex items-start">
                  Uploaded on:{" "}
                  {card.TanggalUnggah !== "Invalid date"
                    ? card.TanggalUnggah
                    : "Unknown date"}
                </p>

                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(card.FotoID)}
                    className="text-red-500 flex items-center"
                    disabled={loading}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={
                        likedPhotos.includes(card.FotoID)
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    />
                  </button>
                  <span className="text-gray-500">
                    {likeCounts[card.FotoID] || 0}
                  </span>

                  <button
                    onClick={() => handleCommentClick(card.FotoID)}
                    className="text-blue-500 flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-gray-500"
                    />
                  </button>
                  <span className="text-gray-500">
                    {commentCounts[card.FotoID] || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center ">
            {/* Latar belakang dengan logo */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 bg-gradient-to-r from-gray-400 via-white to-gray-600"
              
            ></div>

            {/* Konten Modal */}
            <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 shadow-xl relative z-10">
              <h2 className="text-xl font-semibold mb-4 flex justify-center items-center">
                komentar
              </h2>
              <div className="max-h-64 overflow-y-auto mb-4">
                {comments.map((comment, index) => (
                  <div key={index} className="mb-4">
                    {/* Display User Profile and Username */}
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={
                          comment.User?.Profile
                            ? `http://localhost:5000/uploads/${comment.User.Profile}`
                            : "http://localhost:5000/uploads/default-avatar.png"
                        }
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p>{comment.User.Username}</p>
                    </div>
                    {/* Display Comment Content */}
                    <p className="text-gray-500 flex items-start">{comment.IsiKomentar}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded-full border-gray-300 px-2"
                placeholder="Add a comment..."
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
