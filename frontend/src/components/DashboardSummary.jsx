export default function DashboardSummary({ user, assignments = [], reminders = [] }) {
  const completed = reminders.filter(r => r.done).length;
  const upcoming = assignments[0];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 grid grid-cols-2 gap-6">
      <div>
        <h4 className="text-gray-600 dark:text-white font-semibold">🎓 Goal</h4>
        <p className="text-purple-600">{user.goal}</p>
      </div>
      <div>
        <h4 className="text-gray-600 dark:text-white font-semibold">🧾 Upcoming</h4>
        <p className="text-blue-600">{upcoming?.title || "No Events"}</p>
      </div>
      <div>
        <h4 className="text-gray-600 dark:text-white font-semibold">✅ Reminders Done</h4>
        <p className="text-green-600">{completed}</p>
      </div>
    </div>
  );
}
