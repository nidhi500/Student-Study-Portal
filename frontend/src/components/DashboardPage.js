import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const goal = localStorage.getItem("goal") || "Not Set";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-blue-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Student Companion</h1>
        <div className="text-gray-700 font-medium">
          Welcome, <span className="text-indigo-700 font-semibold">{user.name || "Student"}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-10 px-6 shadow-lg">
        <h2 className="text-4xl font-bold mb-2">Empower Your ECE Journey</h2>
        <p className="text-lg">Smart planning, curated content, and goal-focused tools — all in one place!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Study Resources */}
          <Card
            title="📚 Study Resources"
            desc="Get access to semester-wise notes, videos, and PDFs."
            link="/resources"
          />

          {/* Goal Dashboard */}
          <Card
            title="🎯 Goal Dashboard"
            desc={`View content & tools tailored for your goal: ${goal}`}
            link="/goal-dashboard"
          />

          {/* Quizzes */}
          <Card
            title="📝 Quizzes"
            desc="Take tests, track scores, and earn badges."
            link="/quizzes"
          />

          {/* Notifications */}
          <Card
            title="🔔 Notifications"
            desc="Reminders for assignments and quizzes, synced with Google Calendar."
            link="/notifications"
          />

          {/* Profile */}
          <Card
            title="👤 Profile"
            desc="View and update your account information."
            link="/profile"
          />

          {/* ECE Info */}
          <Card
            title="🔧 ECE Info"
            desc="Faculty details, semester timetable, and department updates."
            link="/ece-info"
          />

        </div>
      </main>
    </div>
  );
}

function Card({ title, desc, link }) {
  return (
    <Link to={link} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-indigo-400 hover:border-indigo-600">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </Link>
  );
}
