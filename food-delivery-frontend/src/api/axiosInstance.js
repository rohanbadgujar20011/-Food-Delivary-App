import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://your-api-url.com/api', // Replace with your API base URL
});

// Interceptor to add JWT token to Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;