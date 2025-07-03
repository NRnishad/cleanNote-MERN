import axios from "axios";

const baseURL = import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000/api' // Your backend port
    : '/api';

const api = axios.create({
  baseURL: baseURL,
});

export default api;