import React from 'react';
import ReminderCard from './ReminderCard';

const dummyReminders = [
  {
    title: 'Mid-Semester Exam',
    description: 'CSE301 - Algorithms Midsem',
    start: '2025-08-25T10:00:00',
    end: '2025-08-25T11:00:00',
  },
  {
    title: 'Assignment Deadline',
    description: 'Submit DBMS Assignment 2',
    start: '2025-07-10T23:59:00',
    end: '2025-07-10T23:59:00',
  },
];

export default function RemindersPanel() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-white">⏰ Reminders</h3>
      {dummyReminders.map((r, i) => (
        <ReminderCard key={i} reminder={r} />
      ))}
  
    </section>
   

  );
}
