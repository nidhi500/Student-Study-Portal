import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserInfoCard from './UserInfoCard';
import AssignmentCalendar from './AssignmentCalendar';
import WeeklySchedule from './WeeklySchedule';
import DashboardSummary from './DashboardSummary';
import RemindersPanel from './RemindersPanel';
import ThemeToggle from './ThemeToggle'; // ✅ import the toggle
import TodoList from './TodoList';
import axios from "axios";
import UserContributions from '../components/UserContributions';




function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/1') // 🔗 full backend URL
      .then(res => {
        console.log('Status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Fetched user:', data);
        setUser(data);
      })
      .catch(err => console.error('❌ Error fetching user:', err));
  }, []);

  if (!user) return <div className="text-center p-10 text-gray-500">⏳ Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white relative">
      {/* ✅ Floating Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Sidebar user={user} />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-12">
        <UserInfoCard user={user} setUser={setUser} />
        <AssignmentCalendar />
        <WeeklySchedule />
        <DashboardSummary
          user={user}
          assignments={[{ title: 'Midsem', date: '2025-08-25' }]}
          reminders={[{ done: true }]}
        />
        <RemindersPanel />
         <TodoList />   
       <RemindersPanel />
<UserContributions />
      </main>
  
    </div>
  );
}

export default ProfilePage;
