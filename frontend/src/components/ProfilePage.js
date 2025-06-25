// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserInfoCard from './UserInfoCard';
import AssignmentCalendar from './AssignmentCalendar';
import WeeklySchedule from './WeeklySchedule';
import RemindersPanel from './RemindersPanel';
import ThemeToggle from './ThemeToggle';
import TodoList from './TodoList';
import UserContributions from '../components/UserContributions';
import UserComments from '../components/UserComments';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/1')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('❌ Error fetching user:', err));
  }, []);

  if (!user) return <div className="text-center p-10 text-gray-500">⏳ Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Sidebar user={user} />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-12 scroll-smooth">
        <section id="overview">
          <UserInfoCard user={user} setUser={setUser} />
        </section>

        <section id="calendar">
          <AssignmentCalendar />
        </section>

        <section id="schedule">
          <WeeklySchedule />
        </section>

        <section id="reminders">
          <RemindersPanel />
        </section>

        <section id="todos">
          <TodoList />
        </section>

        <section id="contribute">
          <UserContributions />
        </section>

        <section id="comments">
          <UserComments />
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
