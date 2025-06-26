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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-5 space-y-3 w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-violet-700 dark:text-violet-300">{title}</h4>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

      {/* Time */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        🕒{' '}
        {new Date(start).toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}{' '}
        | {new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
        {new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* Button */}
      <div className="pt-2">
        <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-all shadow">
            ➕ Add to Google Calendar
          </button>
        </a>
      </div>
    </div>
  );
}
