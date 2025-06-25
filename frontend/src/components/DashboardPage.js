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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-indigo-700">StudiFy</h1>
        </div>
        <div className="flex items-center gap-4 text-gray-700 font-medium">
          <span>
            Welcome, <span className="text-indigo-700 font-semibold">{user.name || "Student"}</span>
          </span>
          <LogoutButton />
        </div>
      </nav>

      {/* Compact Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Your {user.branch ? user.branch.toUpperCase() : "ECE"} Learning Hub
          </h2>
          <p className="text-lg opacity-90">Smart planning, curated content, and goal-focused tools — all in one place!</p>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Study Resources */}
            <DashboardCard
              icon={
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              }
              title="📚 Study Resources"
              desc="Semester-wise notes, videos, and PDFs for all subjects"
              features={["Video Lectures", "Notes & PDFs", "PYQ Papers", "Reference Books"]}
              link={`/subjects/${user.currentSemester}?branch=${user.branch}`}
              accent="border-indigo-400"
            />

            {/* Career Goal Dashboard */}
            <DashboardCard
              icon={
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              }
              title={`🎯 ${goal !== "Not Set" ? goal : "Career Goal"}`}
              desc={goalDescMap[goal] || "Set a career goal to begin your preparation!"}
              features={
                goal === "GATE" ? ["GATE PYQs", "Mock Tests", "Analytics", "Practice"] :
                goal === "CAT" ? ["Quant Practice", "Verbal Ability", "Mock CATs", "Analysis"] :
                goal === "UPSC" ? ["Prelims Material", "Current Affairs", "Mock Tests", "Writing"] :
                goal === "PLACEMENT" ? ["Coding Practice", "Aptitude Tests", "Interview Prep", "Companies"] :
                ["Set Goal", "Custom Path", "Track Progress", "Achieve Success"]
              }
              link={`/goal/${goal.toLowerCase()}`}
              accent="border-green-400"
            />

            {/* Quizzes */}
            <DashboardCard
              icon={
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                </div>
              }
              title={`📝 ${goal !== "Not Set" ? goal : "Practice"} Quizzes`}
              desc={
                goal === "GATE" ? "Practice GATE PYQs for your branch" :
                goal === "CAT" ? "Take CAT-level aptitude quizzes" :
                goal === "UPSC" ? "Attempt UPSC PYQs for Prelims" :
                goal === "PLACEMENT" ? "Logical reasoning & coding quizzes" :
                "Interactive quizzes for practice"
              }
              features={["Interactive Tests", "Real-time Results", "Progress Track", "Analysis"]}
              link="/quizzes"
              accent="border-orange-400"
            />

            {/* Profile */}
            <DashboardCard
              icon={
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              }
              title="👤 Profile & Analytics"
              desc="View your progress, achievements, and account settings"
              features={["Personal Profile", "Achievements", "Study Analytics", "Settings"]}
              link="/profile"
              accent="border-pink-400"
            />

          </div>

        </div>
      </main>
    </div>
  );
}


function DashboardCard({ icon, title, desc, features, link, accent }) {
  return (
    <Link to={link} className={`bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 ${accent} hover:border-opacity-80 block transform hover:-translate-y-1 h-full flex flex-col justify-between`}>
      <div>
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{desc}</p>
        <div className="grid grid-cols-2 gap-1">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center text-xs text-gray-700">
              <span className="text-green-500 mr-1 text-xs">✓</span>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <span className="text-blue-600 hover:underline text-sm font-medium flex items-center justify-between">
          <span>Explore</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}

