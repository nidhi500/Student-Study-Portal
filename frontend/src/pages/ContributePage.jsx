import React, { useState } from 'react';
import axios from 'axios';

export default function ContributePage() {
const [formData, setFormData] = useState({
title: '',
description: '',
type: 'Notes', // Notes, Video, Link, Drive
subject: '',
url: '',
file: null, // For file uploads
visibility: 'Public', // Public, ECE, Goal
});

const [message, setMessage] = useState('');

const handleChange = (e) => {
const { name, value, files } = e.target;
if (name === 'file') {
setFormData((prev) => ({ ...prev, file: files[0] }));
} else {
setFormData((prev) => ({ ...prev, [name]: value }));
}
};

const handleSubmit = async (e) => {
e.preventDefault();
 console.log("Submitting...");

try {
  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('type', formData.type);
  data.append('subject', formData.subject);
  data.append('visibility', formData.visibility);

  if (formData.file) {
    data.append('file', formData.file);
  } else {
    data.append('url', formData.url);
  }

  await axios.post('http://localhost:8080/api/contributions/add', data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  setMessage('✅ Contribution submitted successfully!');
  setFormData({
    title: '',
    description: '',
    type: 'Notes',
    subject: '',
    url: '',
    file: null,
    visibility: 'Public',
  });
} catch (error) {
  console.error('❌ Submission failed:', error);
  setMessage('❌ Failed to submit contribution.');
}
};

return (
<div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 dark:bg-gray-900 dark:text-white">
<h2 className="text-2xl font-semibold mb-4">📤 Contribute a Resource</h2>
<form onSubmit={handleSubmit} className="space-y-4">
  {/* Title */}
  <div>
    <label className="block text-sm font-medium mb-1">Title</label>
    <input type="text" name="title" value={formData.title} onChange={handleChange}
      className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800" required />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium mb-1">Description</label>
    <textarea name="description" value={formData.description} onChange={handleChange}
      className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800" rows="3" required />
  </div>

  {/* Type */}
  <div>
    <label className="block text-sm font-medium mb-1">Resource Type</label>
    <select name="type" value={formData.type} onChange={handleChange}
      className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800">
      <option value="Notes">Notes</option>
      <option value="Video">Video</option>
      <option value="Link">Link</option>
      <option value="Drive">Drive Link</option>
    </select>
  </div>

  {/* Subject */}
  <div>
    <label className="block text-sm font-medium mb-1">Subject</label>
    <input type="text" name="subject" value={formData.subject} onChange={handleChange}
      placeholder="e.g., Digital Electronics"
      className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800" required />
  </div>

  {/* Upload or URL Input */}
  {formData.type === 'Drive' || formData.type === 'Link' ? (
    <div>
      <label className="block text-sm font-medium mb-1">Resource URL</label>
      <input type="url" name="url" value={formData.url} onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800" required />
    </div>
  ) : (
    <div>
      <label className="block text-sm font-medium mb-1">Upload File</label>
      <input type="file" name="file" onChange={handleChange}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.zip,.png,.jpg,.jpeg"
        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800" />
    </div>
  )}

  {/* Visibility */}
  <div>
    <label className="block text-sm font-medium mb-1">Visibility</label>
    <select name="visibility" value={formData.visibility} onChange={handleChange}
      className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800">
      <option value="Public">Public</option>
      <option value="ECE">ECE Only</option>
      <option value="Goal">Goal Based</option>
    </select>
  </div>

  <br />
  <button type="submit"
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
    Submit
  </button>

  {message && <p className="mt-2 text-sm">{message}</p>}
</form>

</div>
);
}