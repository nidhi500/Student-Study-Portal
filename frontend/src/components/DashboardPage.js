import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LogoutButton from "./LogoutButton";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user) || {};
  const goal = user.goal || "Not Set";
  const logout = useAuthStore((state) => state.logout);

  const goalDescMap = {
    GATE: "Access GATE books, notes, and videos to build strong core concepts.",
    CAT: "Practice CAT-oriented aptitude, notes, and videos.",
    UPSC: "Explore curated UPSC notes, books, and concept videos.",
    PLACEMENT: "Striver Sheet, company notes, interview experiences, and videos to ace placement."
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-blue-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Student Companion</h1>
        <div className="flex items-center gap-4 text-gray-700 font-medium">
          <span>
            Welcome, <span className="text-indigo-700 font-semibold">{user.name || "Student"}</span>
          </span>
          <LogoutButton />
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
            link={`/subjects/${user.currentSemester}?branch=${user.branch}`}
          />

          {/* Career Goal Dashboard */}
          <Card
            title={`🎯 ${goal !== "Not Set" ? goal : "Career Goal"} Dashboard`}
            desc={goalDescMap[goal] || "Set a career goal to begin your preparation!"}
            link={`/goal/${goal.toLowerCase()}`}
          />

          {/* Quizzes */}
          <Card
            title={`📝 ${goal !== "Not Set" ? goal : "Career Goal"} Quizzes`}
            desc={
              goal === "GATE" ? "Practice GATE PYQs and quizzes for your branch" :
              goal === "CAT" ? "Take CAT-level aptitude quizzes and track your progress" :
              goal === "UPSC" ? "Attempt UPSC PYQs for Prelims & track correctness" :
              goal === "PLACEMENT" ? " Attempt logical quizzes & Practice for OAs" :
              "Set a career goal to begin your preparation!"
            }
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
      <p className="text-gray-600 text-sm mb-1">{desc}</p>
      <span className="text-blue-600 hover:underline text-sm">Explore</span>
    </Link>
  );
}
