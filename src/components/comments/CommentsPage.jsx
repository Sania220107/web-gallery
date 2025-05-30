import React, { useState, useEffect } from "react";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [photoId, setPhotoId] = useState(null); // Store selected photo ID

  // Ambil token dari localStorage
  const token = localStorage.getItem("accessToken");

  // Ambil data komentar berdasarkan FotoID
  useEffect(() => {
    if (photoId) {
      fetch(`https://dbgallery-production.up.railway.app/komentar/foto/${photoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Ensure the response is an array before setting it
          if (Array.isArray(data)) {
            setComments(data);
          } else {
            console.error("Expected an array, but got", data);
            setComments([]); // Fallback to empty array if data is not valid
          }
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [photoId, token]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comment submission

    // Kirim komentar baru ke server
    fetch("https://dbgallery-production.up.railway.app/komentar/", {
      method: "POST",
      body: JSON.stringify({ comment: newComment, fotoId: photoId }), // Include fotoId
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]); // Add new comment to the list
        setNewComment(""); // Reset input field
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  // This function simulates selecting a photo
  const handlePhotoClick = (photoId) => {
    setPhotoId(photoId); // Set selected photo ID for fetching related comments
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-semibold text-black mb-5">Comments</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Photo</h2>
        {/* Dynamically set the image source using the photoId */}
        <img
          src={`https://dbgallery-production.up.railway.app/uploads/${photoId}.jpg`} // URL now includes dynamic photoId
          alt="Designer Work"
          className="w-full h-auto mb-4 cursor-pointer"
          onClick={() => handlePhotoClick(photoId)} // Click will set the photoId
        />
      </div>

      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-4 text-lg border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddComment}
          className="p-2 mt-2 bg-blue-500 text-white rounded-md"
        >
          Add Comment
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Previous Comments</h3>
        <ul className="mt-4">
          {Array.isArray(comments) &&
            comments.map((comment, index) => (
              <li key={index} className="mb-4 border-b pb-4">
                <strong>{comment.user}</strong>:
                <p className="text-gray-600">{comment.text}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsPage;
