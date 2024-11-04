import axios from "axios";
import AuthService from "../../../client/src/utils/auth";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Replace with your API base URL
});

// Add a response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // If unauthorized, clear the token and redirect to the login page
      AuthService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
