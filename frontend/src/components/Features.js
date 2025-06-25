import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <Header />
      
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">Platform Features</h1>
            <p className="text-xl text-gray-600">
              Everything designed specifically for SGSITS students
            </p>
          </div>
          
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
              description="Complete academic support for your current semester with curated resources from successful students."
              details={[
                "Subject-wise organized notes and materials",
                "Video lectures from top educators",
                "Previous year question papers with solutions",
                "Reference books and study guides",
                "Topic-wise breakdown of syllabus"
              ]}
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
              description="Comprehensive preparation materials for GATE, CAT, UPSC, and campus placements."
              details={[
                "GATE/CAT/UPSC previous year questions",
                "Placement preparation with coding sheets",
                "Interview experiences from alumni",
                "Company-wise preparation guides",
                "Mock tests and practice sessions"
              ]}
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
              description="Detailed tracking of your learning journey with insights and motivation tools."
              details={[
                "Daily and weekly learning streaks",
                "Subject-wise progress reports",
                "Achievement badges and milestones",
                "Performance comparison and insights",
                "Goal setting and tracking tools"
              ]}
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
              description="Connect and collaborate with fellow SGSITS students for better learning outcomes."
              details={[
                "Share study experiences and tips",
                "Help others with doubt resolution",
                "Contribute and access shared resources",
                "Discussion forums for each subject",
                "Peer-to-peer learning groups"
              ]}
            />

            {/* Interactive Learning */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                </div>
              }
              title="Interactive Quizzes"
              description="Practice and test your knowledge with comprehensive quiz system."
              details={[
                "Subject-wise chapter quizzes",
                "Competitive exam mock tests",
                "Coding practice challenges",
                "Real-time results and explanations",
                "Difficulty-based question sorting"
              ]}
            />

            {/* Personal Dashboard */}
            <FeatureCard
              icon={
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              }
              title="Personal Dashboard"
              description="Your personalized hub for managing all aspects of your academic journey."
              details={[
                "Customizable profile with academic info",
                "Achievement gallery and certificates",
                "Study analytics and time tracking",
                "Goal management and reminders",
                "Resource bookmarking and organization"
              ]}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, details }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-indigo-400">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-indigo-700 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;