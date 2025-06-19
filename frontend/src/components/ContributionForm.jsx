import React, { useState } from 'react';
import axios from 'axios';

function ContributionForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Notes',
    url: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/contributions/add", form, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

      console.log('✅ Contribution added:', res.data);
      onSuccess();
      setForm({ title: '', description: '', type: 'Notes', url: '' });
    } catch (err) {
      console.error('❌ Error submitting contribution:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Contribute Resource</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
      >
        <option value="Notes">Notes</option>
        <option value="Link">Link</option>
        <option value="Video">Video</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="url"
        name="url"
        placeholder="Resource URL"
        value={form.url}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition"
      >
        Submit
      </button>
    </form>
  );
}

export default ContributionForm;
