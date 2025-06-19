import { create } from "zustand";

const getInitialUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export const useAuthStore = create((set, get) => ({
  user: getInitialUser(),

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  getUser: () => get().user,

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
