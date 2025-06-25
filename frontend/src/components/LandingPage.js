import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅

function LandingPage() {
  const navigate = useNavigate(); // ✅


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      
      {/* Navigation Header */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-indigo-700">StudiFy</h1>
        </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              Sign Up
            </button>
          </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-16 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
            </div>
            Your Complete Academic Companion
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            The ultimate platform for SGSITS students - combining semester studies with career preparation for 
            <span className="text-yellow-300 font-semibold"> Placements</span>, 
            <span className="text-green-300 font-semibold"> GATE</span>, 
            <span className="text-purple-300 font-semibold"> UPSC</span>, and 
            <span className="text-pink-300 font-semibold"> CAT</span>
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            From semester studies to career goals - we've got SGSITS students covered
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Semester Studies */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              }
              title="Semester Studies"
              description="Access subject-wise notes, YouTube videos, PYQ papers, and reference books for all 5 subjects in your current semester"
              features={["Curated Video Lectures", "Comprehensive Notes", "Previous Year Questions", "Reference Books"]}
            />

            {/* Career Preparation */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              }
              title="Career Preparation"
              description="Specialized preparation paths for your career goals with progress tracking and personalized learning"
              features={["GATE/CAT/UPSC PYQs", "Placement Preparation", "Coding Practice Sheets", "Interview Experiences"]}
            />

            {/* Progress Tracking */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
              }
              title="Progress Analytics"
              description="Track your learning journey with detailed analytics, streaks, and achievement badges"
              features={["Learning Streaks", "Progress Reports", "Achievement Badges", "Performance Insights"]}
            />

            {/* Community */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              }
              title="Student Community"
              description="Connect with peers, share experiences, and contribute resources in our collaborative platform"
              features={["Share Experiences", "Help Others", "Resource Sharing", "Solution Discussions"]}
            />

            {/* Quizzes & Tests */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                </div>
              }
              title="Interactive Quizzes"
              description="Practice with subject-wise quizzes, competitive exam tests, and coding challenges"
              features={["Subject Quizzes", "Mock Tests", "Coding Challenges", "Real-time Results"]}
            />

            {/* Profile & Analytics */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              }
              title="Personal Dashboard"
              description="Your personalized space to manage profile, track achievements, and monitor progress"
              features={["Personal Profile", "Achievement Gallery", "Study Analytics", "Goal Management"]}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              title="Register & Set Goals"
              description="Create your profile with branch, semester, and career goals. Customize your learning path."
            />
            <StepCard
              step="2"
              title="Access Resources"
              description="Dive into semester subjects or career preparation materials. Everything organized and ready to use."
            />
            <StepCard
              step="3"
              title="Track & Achieve"
              description="Monitor your progress, earn badges, maintain streaks, and achieve your academic goals."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of SGSITS students who are already excelling with our platform
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Join StudiFy Today
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, features }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-indigo-400">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-indigo-700 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="text-center">
      <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-indigo-700 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;