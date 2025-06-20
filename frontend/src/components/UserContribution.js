import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserContributions() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/contributions/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContributions(res.data);
      } catch (err) {
        console.error('Error fetching contributions:', err);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">📤 Your Contributions</h3>
      {contributions.length === 0 ? (
        <p className="text-gray-500">You haven’t contributed anything yet.</p>
      ) : (
        <ul className="space-y-2">
          {contributions.map(c => (
            <li key={c.id} className="border p-3 rounded">
              <p className="font-bold">{c.title} <span className="text-sm text-indigo-600">({c.type})</span></p>
              <p className="text-sm">{c.description}</p>
              <p className="text-xs text-gray-400">📅 {new Date(c.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserContributions;
