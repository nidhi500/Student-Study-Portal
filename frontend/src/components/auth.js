import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const BASE_URL = "http://localhost:8080/api/auth"; // adjust if needed

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });

  const user = response.data;
  useAuthStore.getState().setUser(user);
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    name,
    email,
    password,
  });

  const user = response.data;
  useAuthStore.getState().setUser(user);
};
