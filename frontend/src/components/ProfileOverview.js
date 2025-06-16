import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileOverview() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8080/api/users/profile", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
.then(res => console.log(res.data))
.catch(err => console.error("❌ Error fetching profile:", err));

  }, []);

  if (!profile) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-4">
      <h3 className="text-xl font-semibold text-indigo-700 dark:text-white mb-3">👤 Profile Overview</h3>
      <div className="space-y-2 text-sm text-gray-700 dark:text-white">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Enrollment No.:</strong> {profile.enrollmentNumber}</p>
        <p><strong>Target Goal:</strong> {profile.goal}</p>
      </div>
    </div>
  );
}
