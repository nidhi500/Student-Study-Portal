import React, { useState, useEffect } from "react";
import axios from "axios";

function isValidDriveUrl(url) {
  const pattern = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]{10,})/;
  return pattern.test(url);
}

function extractFileId(url) {
  const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
  return match ? match[1] : null;
}

const ContributePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    subject: '',
    visibility: '',
    url: '',
  });
  const [contributions, setContributions] = useState([]);
  const [comments, setComments] = useState({});

  const fetchContributions = async () => {
    const res = await axios.get('http://localhost:8080/api/contributions/my');
    setContributions(res.data);
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidDriveUrl(formData.url)) {
      alert('❌ Please enter a valid Google Drive link.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/contributions/add', formData);
      alert('✅ Contribution submitted');
      setFormData({ title: '', description: '', type: '', subject: '', visibility: '', url: '' });
      fetchContributions();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit contribution');
    }
  };

  const isValidDriveUrl = (url) => {
    const pattern = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]{10,})/;
    return pattern.test(url);
  };

  const extractFileId = (url) => {
    const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
    return match ? match[1] : null;
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('📋 Link copied!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">📤 Contribute Resource</h2>
        <input className="w-full p-2 border rounded" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input className="w-full p-2 border rounded" name="type" placeholder="Type (e.g. Notes, Video)" value={formData.type} onChange={handleChange} required />
        <input className="w-full p-2 border rounded" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <select className="w-full p-2 border rounded" name="visibility" value={formData.visibility} onChange={handleChange} required>
          <option value="">Select Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <input className="w-full p-2 border rounded" type="url" name="url" placeholder="Google Drive Link" value={formData.url} onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>

      {/* Contributions List */}
      <div className="mt-8 space-y-6">
        <h3 className="text-lg font-semibold">🧾 Your Contributions</h3>
        {contributions.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-4 space-y-2">
            <h4 className="text-lg font-bold">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <iframe
              className="w-full h-52 rounded border"
              src={`https://drive.google.com/file/d/${extractFileId(item.url)}/preview`}
              allow="autoplay"
              title={item.title}
            ></iframe>

            {/* Buttons */}
            <div className="flex gap-4 mt-2 text-sm">
              <button className="text-green-600 hover:underline">⬆️ Upvote</button>
              <button className="text-red-600 hover:underline">⬇️ Downvote</button>
              <button className="text-pink-600 hover:underline">❤️ Favorite</button>
              <button className="text-yellow-600 hover:underline">🔖 Bookmark</button>
              <button onClick={() => handleCopyLink(item.url)} className="text-blue-600 hover:underline">🔗 Share</button>
              <button className="text-gray-600 hover:underline">🚫 Report</button>
            </div>

            {/* Comments */}
            <div className="mt-3">
              <textarea
                rows="2"
                className="w-full border p-2 rounded text-sm"
                placeholder="Add a comment..."
                value={comments[item.id] || ''}
                onChange={(e) => handleCommentChange(item.id, e.target.value)}
              />
              <button className="mt-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm">Post Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributePage;