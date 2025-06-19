import React from "react";
import { useAuthStore } from "./authStore";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
