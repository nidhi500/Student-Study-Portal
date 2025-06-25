import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-indigo-700">StudiFy</h1>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={() => navigate('/features')}
          className="text-gray-700 hover:text-indigo-600 font-medium transition"
        >
          Features
        </button>
        <button
          onClick={() => navigate('/about')}
          className="text-gray-700 hover:text-indigo-600 font-medium transition"
        >
          About Us
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="text-gray-700 hover:text-indigo-600 font-medium transition"
        >
          Contact Us
        </button>
        <div className="flex gap-3 ml-4">
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
      </div>

      {/* Mobile Menu Placeholder (optional future logic) */}
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-indigo-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Header;
