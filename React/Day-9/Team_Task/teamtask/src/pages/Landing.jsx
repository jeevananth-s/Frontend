import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  // ➕ Create Post
  const handlePost = () => {
    if (!postText) return;

    const newPost = {
      id: Date.now(),
      user: currentUser.email,
      content: postText,
      likes: 0,
      comments: [],
    };

    savePosts([newPost, ...posts]);
    setPostText("");
  };

  // ❤️ Like
  const handleLike = (id) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    savePosts(updated);
  };

  // 💬 Add Comment
  const handleComment = (id, text) => {
    if (!text) return;

    const updated = posts.map((p) =>
      p.id === id
        ? {
            ...p,
            comments: [
              ...p.comments,
              { user: currentUser.email, text },
            ],
          }
        : p
    );

    savePosts(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* 🔝 Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center sticky top-0">
        <h1 className="text-xl font-bold">📸 InstaMini</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* ➕ Create Post */}
      <div className="max-w-xl mx-auto mt-4 bg-white p-4 rounded shadow">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handlePost}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          Post
        </button>
      </div>

      {/* 📄 Posts Feed */}
      <div className="max-w-xl mx-auto mt-4 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;


// 🔥 Post Card Component
const PostCard = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* User */}
      <p className="font-bold">{post.user}</p>

      {/* Content */}
      <p className="my-2">{post.content}</p>

      {/* Actions */}
      <div className="flex gap-4 text-sm">
        <button onClick={() => onLike(post.id)}>❤️ {post.likes}</button>
      </div>

      {/* Comments */}
      <div className="mt-3">
        {post.comments.map((c, index) => (
          <p key={index} className="text-sm">
            <span className="font-semibold">{c.user}</span>: {c.text}
          </p>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex mt-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border p-1 rounded-l"
        />
        <button
          onClick={() => {
            onComment(post.id, commentText);
            setCommentText("");
          }}
          className="bg-blue-500 text-white px-3 rounded-r"
        >
          Post
        </button>
      </div>
    </div>
  );
};