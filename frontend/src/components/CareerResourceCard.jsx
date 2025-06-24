import React from "react";

export default function CareerResourceCard({ title, items }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">{title}</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 italic">No resources available in this category.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((res) => (
            <li
              key={res.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition"
            >
              <h3 className="font-semibold text-indigo-700 text-md mb-2 line-clamp-2">{res.title}</h3>

              {/* Handle video previews */}
              {res.type === "VIDEO" && isYouTubeLink(res.url) ? (
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded mb-2">
                  <iframe
                    src={getEmbedUrl(res.url)}
                    className="absolute top-0 left-0 w-full h-full"
                    title={res.title}
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              ) : null}

              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                🔗 View Resource
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Utility functions for YouTube
function isYouTubeLink(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getEmbedUrl(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
