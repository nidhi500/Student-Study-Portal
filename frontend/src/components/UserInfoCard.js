import React from 'react';
import {
  Calendar,
  User,
  GraduationCap,
  CalendarDays,
  Goal,
  BadgeInfo,
  IdCard,
} from 'lucide-react'; // 👈 Added IdCard icon for enrollment
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {icon}
      <span className="font-semibold text-indigo-700">{label}:</span>
      <span className="text-gray-700 dark:text-white">{value || 'N/A'}</span>
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
    >
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">👤 Profile Overview</h3>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <InfoRow icon={<User size={18} />} label="Name" value={user.name} />
        <InfoRow icon={<BadgeInfo size={18} />} label="Email" value={user.email} />
        <InfoRow icon={<IdCard size={18} />} label="Enrollment No." value={user.enrollmentNumber} />
        <InfoRow icon={<GraduationCap size={18} />} label="Branch" value={user.branch?.name || user.branch} />
        <InfoRow icon={<CalendarDays size={18} />} label="Semester" value={user.currentSemester} />
        <InfoRow icon={<Goal size={18} />} label="Goal" value={user.goal?.name || user.goal} />
      </div>
    </motion.section>
  );
}
