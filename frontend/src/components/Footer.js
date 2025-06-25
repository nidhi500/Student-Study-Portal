import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-indigo-700">StudiFy</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Your complete academic companion for SGSITS students. From semester studies to career preparation - we've got you covered.
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <span>Made with</span>
              <span className="text-red-500 text-lg">❤️</span>
              <span>for SGSITS Students</span>
            </div>
          </div>

          {/* Quick Links */}
        <div>
        <h3 className="text-lg font-semibold text-indigo-700 mb-4">Quick Links</h3>
        <ul className="space-y-2">
            <li>
            <button
                onClick={() => navigate('/features')}
                className="text-gray-600 hover:text-indigo-600 transition"
            >
                Features
            </button>
            </li>
            <li>
            <button
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-indigo-600 transition"
            >
                About Us
            </button>
            </li>
            <li>
            <button
                onClick={() => navigate('/contact')}
                className="text-gray-600 hover:text-indigo-600 transition"
            >
                Contact Us
            </button>
            </li>
            <li>
            <button
                onClick={scrollToTop}
                className="text-gray-600 hover:text-indigo-600 transition"
            >
                Back to Top
            </button>
            </li>
        </ul>
        </div>


          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-indigo-600 transition">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-indigo-600 transition">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 StudiFy. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-indigo-600 text-sm transition">
              Terms & Conditions
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-gray-600 hover:text-indigo-600 text-sm transition">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;