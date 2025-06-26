import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAuthStore } from '../stores/authStore';

export default function AssignmentCalendar() {
  const user = useAuthStore((state) => state.user);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user?.branch) return;

    fetch(`http://localhost:8080/api/calendar/assignments?branch=${user.branch}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          const fallbackEvents = [
            {
              title: '📘 Assignment 1: DSP',
              date: '2025-06-27',
              color: '#6366f1',
            },
            {
              title: '📘 Assignment 2: VLSI',
              date: '2025-06-30',
              color: '#4f46e5',
            },
            {
              title: '📙 Mid-Sem 1: EDC',
              date: '2025-07-05',
              color: '#f59e0b',
            },
            {
              title: '📕 Mid-Sem 2: Signals',
              date: '2025-07-15',
              color: '#ef4444',
            },
            {
              title: '📗 Quiz: Analog Circuits',
              date: '2025-07-22',
              color: '#10b981',
            },
            {
              title: '📙 End-Sem Exam: All Subjects',
              date: '2025-07-30',
              color: '#dc2626',
            }
          ];
          setEvents(fallbackEvents);
        } else {
          setEvents(data);
        }
      })
      .catch(err => console.error("❌ Failed to load assignment events:", err));
  }, [user]);

  return (
    <section className="w-full">
      <div className="rounded-t-2xl px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <h3 className="text-2xl font-bold">📅 Assignment & Exam Timetable</h3>
        <p className="text-sm text-indigo-100">Deadlines and important dates</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-b-2xl shadow-xl">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={500}
        />
      </div>
    </section>
  );
}
