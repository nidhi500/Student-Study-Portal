// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, BookOpen, ClipboardList, LogOut } from 'lucide-react';

export default function Sidebar({ user }) {
  if (!user) return null;

  return (
    <aside className="w-56 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white h-screen p-5 shadow-xl rounded-tr-3xl rounded-br-3xl flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1">🎓 {user.name}</h2>
          <p className="text-sm text-indigo-200">{user.enrollment}</p>
          <p className="text-sm text-indigo-200">ECE • Goal: {user.goal}</p>
        </div>

        <nav className="space-y-3">
          <NavItem icon={<User size={18} />} label="Profile" to="/profile" />
          <NavItem icon={<ClipboardList size={18} />} label="Study Plan" to="/goals" />
          <NavItem icon={<Calendar size={18} />} label="Timetable" to="/calendar" />
          <NavItem icon={<BookOpen size={18} />} label="Resources" to="/resources" />
        </nav>
      </div>

      <div>
        <Link
          to="/logout"
          className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition duration-200"
        >
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 transition duration-200"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
