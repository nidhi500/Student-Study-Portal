import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthStore } from "./authStore";

export default function UnitPage() {
    
  const { subjectId } = useParams();
  const [searchParams] = useSearchParams();
  const subjectName = searchParams.get("name");

  const [units, setUnits] = useState([]);
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("VIDEO");

  const [resources, setResources] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [comments, setComments] = useState({}); // { pyqId: [...] }

  const [newComment, setNewComment] = useState({});
  const { user, token } = useAuthStore();
console.log("Current user:", user);
console.log("Current token:", token);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/subjects/${subjectId}/units`)
      .then((res) => {
        setUnits(res.data);
      });
  }, [subjectId]);

  useEffect(() => {
    const unitId = units[activeUnitIndex]?.id;
    if (!unitId) return;

    axios
      .get(`http://localhost:8080/api/units/${unitId}/resources`)
      .then((res) => setResources(res.data));

    axios
      .get(`http://localhost:8080/api/units/${unitId}/pyqs`)
      .then((res) => {
        setPyqs(res.data);
        res.data.forEach((pyq) => {
          axios
            .get(`http://localhost:8080/api/pyqs/${pyq.id}/comments`)
            .then((cRes) =>
              setComments((prev) => ({ ...prev, [pyq.id]: cRes.data }))
            );
        });
      });
  }, [units, activeUnitIndex]);

  
  const handleCommentSubmit = async (pyqId) => {
  if (!token || !user) {
    alert("Please log in to comment.");
    return;
  }

  const commentText = newComment[pyqId]?.trim();
  if (!commentText) {
    alert("Comment cannot be empty.");
    return;
  }

  try {
    const res = await axios.post(
      `http://localhost:8080/api/pyqs/${pyqId}/comments`,
      { commentText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComments((prev) => ({
      ...prev,
      [pyqId]: [...(prev[pyqId] || []), res.data],
    }));
    setNewComment((prev) => ({ ...prev, [pyqId]: "" }));
  } catch (err) {
    console.error(err);
    alert("Failed to post comment.");
  }
};


  const currentUnit = units[activeUnitIndex];
  const filteredResources = resources.filter((r) => r.type === activeTab);

// Helper function
const getEmbedUrl = (url) => {
  try {
    const videoMatch = url.match(/watch\?v=([a-zA-Z0-9_-]+)/);
    const playlistMatch = url.match(/playlist\?list=([a-zA-Z0-9_-]+)/);

    if (videoMatch) {
      return `https://www.youtube.com/embed/${videoMatch[1]}`;
    } else if (playlistMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
    } else if (url.includes("youtube.com/embed/")) {
      return url; // already formatted
    }

    return ""; // fallback
  } catch (e) {
    return "";
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-6 py-4 bg-white shadow sticky top-0 z-10">
        <h1 className="text-xl font-bold text-indigo-700">
          {subjectName} — Units
        </h1>
        <p className="text-sm text-gray-500">Select a unit to explore</p>
      </div>

      {/* Unit selector */}
      <div className="flex gap-3 overflow-x-auto px-6 py-4">
        {units.map((unit, idx) => (
          <button
            key={unit.id}
            onClick={() => setActiveUnitIndex(idx)}
            className={`px-4 py-2 rounded-full ${
              idx === activeUnitIndex
                ? "bg-indigo-600 text-white"
                : "bg-white border text-indigo-600"
            }`}
          >
            {unit.title || `Unit ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Tabs: Video / Notes / Books / PYQs */}
      <div className="flex justify-center space-x-4 mb-4">
        {["VIDEO", "NOTE", "BOOK", "PYQ"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              tab === activeTab
                ? "bg-indigo-500 text-white"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-6">
        {/* VIDEO / NOTE / BOOK */}
        {activeTab !== "PYQ" &&
          (filteredResources.length === 0 ? (
            <p className="text-gray-500">No {activeTab.toLowerCase()}s found.</p>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((r) => (
            <div key={r.id} className="w-full flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-md border w-full max-w-3xl">
                    <h2 className="font-semibold text-indigo-700 mb-2">{r.title}</h2>

                    {r.type === "VIDEO" ? (
                    getEmbedUrl(r.url) ? (
                        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md">
                        <iframe
                            src={getEmbedUrl(r.url)}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            title={r.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        </div>
                    ) : (
                        <p className="text-red-500 text-sm">Invalid video URL</p>
                    )
                    ) : (
                    <a
                        href={r.url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View {r.type.toLowerCase()}
                    </a>
                    )}
                </div>
                </div>
                ))}
                </div>
          ))}

        {/* PYQs Section */}
        {activeTab === "PYQ" &&
          (pyqs.length === 0 ? (
            <p className="text-gray-500">No previous year questions found.</p>
          ) : (
            pyqs.map((pyq) => (
              <div
                key={pyq.id}
                className="bg-white my-4 p-4 rounded-lg shadow border"
              >
                <h3 className="font-bold text-indigo-700 mb-2">
                  {pyq.questionText}
                </h3>
                <a
                  href={pyq.pdfUrl}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  View PYQ PDF
                </a>

                {/* Comments */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Comments</h4>
                  {(comments[pyq.id] || [])
                    .slice() // to avoid mutating original state
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // descending order
                    .map((c) => (
                        <div key={c.id} className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">{c.user?.name || "User"}</span>: {c.commentText}
                        <div className="text-xs text-gray-400">
                            {new Date(c.timestamp).toLocaleString()} {/* optional readable timestamp */}
                        </div>
                        </div>
                    ))}


                  {user ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newComment[pyq.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [pyq.id]: e.target.value,
                          }))
                        }
                        placeholder="Add your solution..."
                        className="flex-grow border px-2 py-1 rounded"
                      />
                      <button
                        disabled={!newComment[pyq.id]?.trim()}
                        onClick={() => handleCommentSubmit(pyq.id)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Post
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      Login to post a comment.
                    </p>
                  )}
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}
