import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:8080/api", 
  baseURL : import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,                      
});

// 3 - add token automatically to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {                                 
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;                               
}, (error) => {
  return Promise.reject(error);                
});

export default instance;                       
