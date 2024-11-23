import axios from "axios";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_BASE_URL ='https://aaharr.com/api';

// Create an Axios instance
const apiInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include Authorization header
apiInstance.interceptors.request.use(
  async (config) => {
    try {
      const userInfo = Cookies.get('userInfo');
      if (userInfo) {
        const user = JSON.parse(userInfo);
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or other errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, token might be expired.');
      // Handle logout or token refresh logic here
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
