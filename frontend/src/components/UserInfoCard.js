import React from 'react';
import {
  User,
  GraduationCap,
  CalendarDays,
  Goal,
  BadgeInfo,
  IdCard,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-indigo-50 px-4 py-3 rounded-xl shadow-sm w-full">
      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md text-indigo-600 shadow">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-indigo-700 font-semibold">{label}</span>
        <span className="text-base text-gray-800 font-medium">{value || 'N/A'}</span>
      </div>
    </div>
  );
}

export default function UserInfoCard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <p className="text-gray-500">Loading user info...</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header */}
      <div className="rounded-t-2xl px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white w-full">
        <h3 className="text-2xl font-bold">Profile Overview</h3>
        <p className="text-sm text-indigo-100">Your Academic Information</p>
      </div>

      {/* Info Rows */}
      <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl w-full">
        <InfoRow icon={<User size={20} />} label="Full Name" value={user.name} />
        <InfoRow icon={<BadgeInfo size={20} />} label="Email Address" value={user.email} />
        <InfoRow icon={<IdCard size={20} />} label="Enrollment Number" value={user.enrollmentNumber} />
        <InfoRow icon={<GraduationCap size={20} />} label="Branch" value={user.branch?.name || user.branch} />
        <InfoRow icon={<CalendarDays size={20} />} label="Current Semester" value={user.currentSemester} />
        <InfoRow icon={<Goal size={20} />} label="Career Goal" value={user.goal?.name || user.goal} />
      </div>
    </motion.section>
  );
}
