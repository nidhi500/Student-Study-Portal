import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

export default function PlacementDashboard() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('/api/career/placement/progress')
      .then(res => setTopics(res.data));
  }, []);

  const markAttempted = (topic) => {
    axios.post('/api/career/placement/attempt', {
      topic: topic.topic,
      link: topic.link
    }).then(() => {
      setTopics(prev => prev.map(t => t.topic === topic.topic ? { ...t, attempted: true } : t));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">📘 Striver Sheet Progress</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {topics.map((topic, idx) => (
            <li key={idx} className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex flex-col justify-between h-full">
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-800">{topic.topic}</p>
                  <a
                    href={topic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    🔗 LeetCode Link
                  </a>
                </div>
                <button
                  disabled={topic.attempted}
                  onClick={() => markAttempted(topic)}
                  className={`w-full py-2 rounded-lg text-white font-medium mt-auto transition ${
                    topic.attempted
                      ? 'bg-green-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {topic.attempted ? "✅ Attempted" : "✔️ Mark as Done"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
