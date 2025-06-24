import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import StriverProgressSection from "../components/StriverProgressSection";

export default function CareerGoalPage() {
  const { goal } = useParams();
  const upperGoal = goal.toUpperCase();
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState("VIDEO");
  const [loading, setLoading] = useState(true);

  const baseTabs = ["VIDEO", "NOTE", "BOOK"];
  const tabs = upperGoal === "PLACEMENT" ? [...baseTabs, "STRIVER"] : baseTabs;

  useEffect(() => {
    axios
      .get(`/api/career/${upperGoal}`)
      .then((res) => {
        setResources(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load resources:", err);
        setLoading(false);
      });
  }, [upperGoal]);

  const filteredResources = resources.filter(
    (r) => r.type?.toUpperCase().trim() === activeTab.toUpperCase()
  );

  const getEmbedUrl = (url) => {
    const videoMatch = url.match(/watch\?v=([a-zA-Z0-9_-]+)/);
    const playlistMatch = url.match(/playlist\?list=([a-zA-Z0-9_-]+)/);

    if (videoMatch) {
      return `https://www.youtube.com/embed/${videoMatch[1]}`;
    } else if (playlistMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }
    return "";
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-indigo-600 text-xl animate-pulse">
        Loading {goal} resources...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="px-6 py-4 bg-white shadow sticky top-0 z-10">
        <h1 className="text-xl font-bold text-indigo-700 capitalize">
          {goal} — Resources
        </h1>
        <p className="text-sm text-gray-500">Select a tab to explore</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {tab === "STRIVER" ? "Striver Sheet" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 max-w-6xl mx-auto">
        {activeTab === "STRIVER" ? (
          <div className="bg-white p-6 rounded-xl shadow border">
            <StriverProgressSection />
          </div>
        ) : filteredResources.length === 0 ? (
          <p className="text-gray-500 text-center">
            No {activeTab.toLowerCase()}s found.
          </p>
        ) : (
          filteredResources.map((r) => (
            <div
              key={r.id}
              className="bg-white p-4 rounded-xl shadow-md border mb-4"
            >
              <h2 className="font-semibold text-indigo-700 mb-2">{r.title}</h2>
              {r.type === "VIDEO" ? (
                getEmbedUrl(r.url) ? (
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md">
                    <iframe
                      src={getEmbedUrl(r.url)}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      title={r.title}
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
          ))
        )}
      </div>
    </div>
  );
}
