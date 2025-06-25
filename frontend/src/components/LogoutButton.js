import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  console.log("✅ LogoutButton rendered");

  const handleLogout = () => {
    console.log("🧪 Logout button clicked");
    logout();
    localStorage.clear();

    toast.success("✅ Logged out successfully", {
      position: "top-center",
      autoClose: 1500,
      onClose: () => {
        console.log("🧭 Navigating to / after toast");
        navigate("/", { replace: true });
      },
    });

    setTimeout(() => {
      console.log("🧭 Fallback navigate");
      navigate("/", { replace: true });
    }, 2000);
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
