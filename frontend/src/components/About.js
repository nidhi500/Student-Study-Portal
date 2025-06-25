import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <Header />

      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">About Us</h1>
            <p className="text-xl text-gray-600">Built by students, for students of SGSITS</p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              StudiFy was created to bridge the gap between academic excellence and career success.
              We understand the challenges of juggling semester studies with competitive exams.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-indigo-700">Why StudiFy?</h3>
                {[
                  'Designed specifically for SGSITS curriculum',
                  'Curated by successful students and alumni',
                  'Progress tracking to keep you motivated',
                  'Community-driven platform with peer support',
                ].map((item, idx) => (
                  <div className="flex items-start gap-3" key={idx}>
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-700 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To become the go-to platform for every SGSITS student, helping them excel in academics
                  while building a strong foundation for their future careers.
                </p>
              </div>
            </div>
          </div>

          {/* Creators Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Meet the Creators</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ojasv */}
              <div className="text-center">
                <img
                  src="/ojasv.jpg"
                  alt="Ojasv Agrawal"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-300"
                />
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">Ojasv Agrawal</h3>
                <p className="text-gray-600 mb-2">Co-Founder & Developer</p>
                <p className="text-sm text-gray-500 mb-4">
                  IT student at SGSITS, passionate about DSA and web development. Focused on creating tools to
                  improve student life.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/ojasvagrawal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="https://github.com/ojasvagr123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>

              {/* Nidhi */}
              <div className="text-center">
                <img
                  src="/nidhi.jpg"
                  alt="Nidhi Agrawal"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-300"
                />
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">Nidhi Agrawal</h3>
                <p className="text-gray-600 mb-2">Co-Founder & Developer</p>
                <p className="text-sm text-gray-500 mb-4">
                  ECE student at SGSITS with a love for backend development and clean data. Dedicated to building tools that empower students.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/nidhi-agrawal-a91803280/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="https://github.com/nidhi500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-700 mb-3">Our Journey</h3>
              <p className="text-gray-600">
                As SGSITS students, we’ve lived the same problems we aim to solve with StudiFy—
                balancing semester workload and future goals. This is our small step toward easing that journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
