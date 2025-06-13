import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);
      const { token, name, email } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      navigate("/dashboard");
    }catch (err) {
  const errorMessage = err.response?.data?.email || "Signup failed";
  console.error("Signup failed:", errorMessage);
if (errorMessage.toLowerCase().includes("email already exists") || errorMessage.toLowerCase().includes("user already exists")) {
  setError("Email already exists. Redirecting to login...");
  setLoading(true);
  setTimeout(() => {
    navigate("/login");
  }, 2500);
} else {
  setError("Signup failed: " + errorMessage);
}

}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create an Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
  type="submit"
  disabled={loading}
  className={`w-full ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-2 rounded-lg transition duration-300 font-semibold`}
>
  {loading ? "Redirecting..." : "Sign Up"}
</button>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>

        {/* Already have an account? */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
