// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          🎓 Student Companion Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personalized academic & career planner — built for ECE students aiming for <span className="text-blue-600 font-semibold">Placements</span>, <span className="text-green-600 font-semibold">GATE</span>, <span className="text-purple-600 font-semibold">UPSC</span> and more.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-gray-100 text-blue-600 px-6 py-3 rounded-xl text-lg font-semibold border border-blue-600 hover:bg-blue-50 transition"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
