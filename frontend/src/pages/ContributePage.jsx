import React, { useState, useEffect } from "react";
import api from "../utils/axiosConfig"; // ✅ Use the new axios instance
import CommentSection from "../components/CommentSection";

function extractFileId(url) {
  const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
  return match ? match[1] : null;
}

const ContributePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    subject: "",
    visibility: "",
    url: "",
  });

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    api
      .get("/api/contributions/my")
      .then((res) => setContributions(res.data))
      .catch((err) => {
        console.error("GET contributions error:", err);
        alert("❌ Failed to fetch contributions");
      });
      
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isValidDrive = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)/.test(formData.url);
  if (!isValidDrive) {
    alert("❌ Invalid Google Drive link");
    return;
  }

  try {
    console.log("🔍 Payload about to send:", JSON.stringify(formData));

await api.post("/api/contributions/add", JSON.stringify(formData), {
  headers: {
    "Content-Type": "application/json"
  }
});
    alert("✅ Contribution submitted");
    setFormData({ title: "", description: "", type: "", subject: "", visibility: "", url: "" });

    const res = await api.get("/api/contributions/my");
    setContributions(res.data);
  } catch (err) {
    console.error("POST contribution error:", err);
    alert("❌ Submission failed");
  }
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
            />
            <CommentSection contextType="CONTRIBUTION" contextId={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributePage;
