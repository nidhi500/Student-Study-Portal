import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserContributions() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/contributions/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setContributions(res.data))
      .catch((err) => console.error('❌ Error fetching contributions:', err));
  }, []);

  if (!contributions.length) {
    return (
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow text-center text-gray-500 dark:text-gray-300">
        📭 No contributions yet.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">🧩 Your Contributions</h2>
      <ul className="space-y-3">
        {contributions.map((c) => (
          <li key={c.id} className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg">
            <h3 className="text-lg font-medium">{c.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{c.description}</p>
            <p className="text-xs text-indigo-500 mt-1">{c.type} • <a href={c.url} target="_blank" rel="noreferrer" className="underline">View</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserContributions;
