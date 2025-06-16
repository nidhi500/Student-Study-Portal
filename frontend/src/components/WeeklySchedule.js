import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './calendarStyles.css'; // custom style for event coloring

const fakeClasses = [
  {
    title: '📐 Math',
    start: '2025-06-16T09:00:00',
    end: '2025-06-16T10:00:00',
    className: 'event-math',
  },
  {
    title: '🧪 Physics',
    start: '2025-06-16T11:00:00',
    end: '2025-06-16T12:00:00',
    className: 'event-physics',
  },
  {
    title: '💻 DSA Lab',
    start: '2025-06-17T10:00:00',
    end: '2025-06-17T12:00:00',
    className: 'event-dsa',
  },
  {
    title: '📘 Digital Electronics',
    start: '2025-06-18T13:00:00',
    end: '2025-06-18T14:00:00',
    className: 'event-de',
  },
  {
    title: '📝 English',
    start: '2025-06-19T09:30:00',
    end: '2025-06-19T10:30:00',
    className: 'event-english',
  },
  {
    title: '⚙️ Microprocessors',
    start: '2025-06-20T15:00:00',
    end: '2025-06-20T16:00:00',
    className: 'event-micro',
  }
];

export default function WeeklySchedule() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">📘 Weekly Class Schedule</h3>
      <div className="bg-white rounded-2xl shadow-lg p-4 min-h-[400px]">
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          height={500}
          events={fakeClasses}
        />
      </div>
    </section>
  );
}
