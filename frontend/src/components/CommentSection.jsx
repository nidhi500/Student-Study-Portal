// src/components/CommentSection.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../utils/axiosConfig";
import { useAuthStore } from "../stores/authStore";

export default function CommentSection({ contextType, contextId }) {
  // ✅ Zustand reactive access
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Fetch comments on mount or when context changes
  useEffect(() => {
    if (!contextType || !contextId) return;

    apiClient
      .get(`/api/comments/${contextType}/${contextId}`)
      .then((res) => setComments(res.data))
      .catch((err) => {
        console.error("❌ Error loading comments:", err);
      });
  }, [contextType, contextId]);

  // ✅ Log current Zustand values (for debug only)
  useEffect(() => {
    console.log("🧪 Zustand User:", user);
    console.log("🧪 Zustand Token:", token);
  }, [user, token]);

  // ✅ Handle comment submission
  const handleSubmit = async () => {
    if (!token || !user) {
      alert("Please log in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await apiClient.post(
        `/api/comments/${contextType}/${contextId}`,
        { commentText: newComment }
      );

      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("❌ Failed to post comment:", err.response?.data || err.message);
      alert("❌ " + (err.response?.data || "Failed to post comment."));
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 && (
        <p className="text-gray-500">No comments yet.</p>
      )}
      {comments.map((c) => (
        <div key={c.id} className="text-sm text-gray-700 mb-2">
          <span className="font-medium">{c.user?.name || "User"}</span>:{" "}
          {c.commentText}
          <div className="text-xs text-gray-400">
            {new Date(c.timestamp).toLocaleString()}
          </div>
        </div>
      ))}

      {user ? (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border px-2 py-1 rounded"
          />
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="bg-indigo-600 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Login to post a comment.</p>
      )}
    </div>
  );
}
