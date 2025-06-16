import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendarStyles.css'; // Make sure this path is correct

export default function AssignmentCalendar() {
  const events = [
    {
      title: '📘 Assignment 1: DSP',
      date: '2025-06-20',
      color: '#4f46e5',
    },
    {
      title: '📘 Assignment 2: VLSI',
      date: '2025-06-25',
      color: '#6366f1',
    },
    {
      title: '📕 Mid-Sem 1: EDC',
      date: '2025-07-01',
      color: '#f97316',
    },
    {
      title: '📕 Mid-Sem 2: Signals',
      date: '2025-07-12',
      color: '#f97316',
    },
    {
      title: '📙 End-Sem: All Subjects',
      date: '2025-07-30',
      color: '#dc2626',
    }
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">📅 Assignment & Exam Timetable</h3>
      <div className="bg-white rounded-2xl shadow-lg p-4 min-h-[400px]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={500}
          eventDisplay="block"
        />
      </div>
    </section>
  );
}
