const API_URL = "http://localhost:3001/api";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data; // Assuming the server returns { user: {...}, token: '...' }
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();
  return data; // Assuming the server returns { user: {...}, token: '...' }
}
