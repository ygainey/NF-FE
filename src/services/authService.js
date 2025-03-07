import toast from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
const API_PATH = import.meta.env.VITE_API_PATH 

// Helper function to get user from localStorage
const getUser = () => {
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
};

// Signup function
const signup = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATH}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include' // equivalent to withCredentials: true
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || "Signup failed")
    }
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(data.user))
    toast.success("Account created successfully")
    
    return data.user;
  } catch (error) {
    toast.error(error.message || "Signup failed")
    throw error
  }
};

// Login function
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATH}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include' // equivalent to withCredentials: true
    });

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || "Login failed")
    }
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(data.user))
    toast.success("Logged in successfully")
    
    return data.user
  } catch (error) {
    toast.error(error.message || "Login failed")
    throw error;
  }
};

// Logout function
const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATH}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || "Logout failed")
    }
    
    // Remove user from localStorage
    localStorage.removeItem('user')
    toast.success("Logged out successfully")
  } catch (error) {
    toast.error(error.message || "Logout failed")
    throw error
  }
};

// Auth check function
const checkAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATH}/auth/authCheck`, {
      credentials: 'include'
    })
    
    if (!response.ok) {
      // If unauthorized, clear local user data
      localStorage.removeItem('user')
      return null
    }
    
    const data = await response.json();
    // Update stored user data
    localStorage.setItem('user', JSON.stringify(data.user))
    return data.user
  } catch (error) {
    console.error("Auth check error:", error)
    return null
  }
};

export { signup, login, logout, getUser, checkAuth }