import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour ajouter le token à l'en-tête Authorization dans chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
