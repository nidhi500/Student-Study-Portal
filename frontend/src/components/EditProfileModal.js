import React, { useState } from 'react';

export default function EditProfileModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user.name,
    dob: user.dob,
    gender: user.gender,
    goal: user.goal,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(updated);
        onClose();
      }
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">📝 Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Name" required />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <input name="goal" value={formData.goal} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Goal" required />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
