import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Get base URL from environment variable
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

export default axiosInstance;
