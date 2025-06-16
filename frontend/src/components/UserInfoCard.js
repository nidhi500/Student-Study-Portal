import React from 'react';
import { Calendar, User, GraduationCap, CalendarDays, Goal, BadgeInfo } from 'lucide-react';
import { motion } from 'framer-motion';

<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* ... existing content ... */}
</motion.section>


function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {icon}
      <span className="font-semibold text-indigo-700">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

export default function UserInfoCard({ user }) {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">👤 Profile Overview</h3>
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <InfoRow icon={<User size={18} />} label="Name" value={user.name} />
        <InfoRow icon={<BadgeInfo size={18} />} label="Enrollment" value={user.enrollment} />
        <InfoRow icon={<GraduationCap size={18} />} label="Branch" value={user.branch} />
        <InfoRow icon={<CalendarDays size={18} />} label="Semester" value={user.semester} />
        <InfoRow icon={<Calendar size={18} />} label="DOB" value={user.dob} />
        <InfoRow icon={<User size={18} />} label="Gender" value={user.gender} />
        <InfoRow icon={<Goal size={18} />} label="Goal" value={user.goal} />
      </div>
    </section>
  );
}
