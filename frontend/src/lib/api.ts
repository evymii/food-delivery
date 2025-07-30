import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/log-in";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signIn: async (email: string, password: string) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },

  signUp: async (email: string, password: string) => {
    const response = await api.post("/auth/signup", { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

// Food API
export const foodAPI = {
  getAll: async () => {
    const response = await api.get("/food");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/food/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId: string) => {
    const response = await api.get(`/food/category/${categoryId}`);
    return response.data;
  },
};

// Categories API
export const categoryAPI = {
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
};

// Orders API
export const orderAPI = {
  create: async (orderData: unknown) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api;
