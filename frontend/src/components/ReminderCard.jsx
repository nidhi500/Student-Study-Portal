import React from 'react';

function formatGoogleDate(dateStr) {
  const dt = new Date(dateStr);
  return dt.toISOString().replace(/[-:]|\.\d{3}/g, '');
}

export default function ReminderCard({ reminder }) {
  const { title, description, start, end } = reminder;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&dates=${formatGoogleDate(
    start
  )}/${formatGoogleDate(end)}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4 space-y-2">
      <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        🕒 {new Date(start).toLocaleString()} - {new Date(end).toLocaleTimeString()}
      </p>
      <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
          ➕ Add to Google Calendar
        </button>
      </a>
    </div>
  );
}
