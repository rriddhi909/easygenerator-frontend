import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get the access_token from local storage or cookies
      const accessToken = localStorage.getItem('access_token');
  
      // Only add the access_token to the request headers if it exists and the request is not for login or register
      if (accessToken && config.url !== '/login' && config.url !== '/register') {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      const currentUrl = window.location.pathname;
      if (error.response && error.response.status === 401 && currentUrl !== '/login') {
        // Redirect to the login page for 401 status codes
        window.location.href = '/login';
      }
  
      return Promise.reject(error);
    }
  );

  export default axiosInstance;
