import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from './utilities/constants';
import useAuth from './hooks/useAuth';
import { fetchUserAccountDetails } from './hooks/useAuth';
import { getTokenValues } from './hooks/useAuth';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7000',
  timeout: 30000,
  params: {
    translate: `${localStorage.getItem(STORAGE_KEYS.LANGUAGE_SELECTED) ?? "de"}-${(localStorage.getItem(STORAGE_KEYS.LANGUAGE_SELECTED) === 'en') ? "GB" : "DE"}`,
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response.data,
//   (error: AxiosError) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         if (getTokenValues(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? '').isTokeExpired) {
//           const { isAuthenticated, removeToken } = useAuth();
//         }
//       }
//       return Promise.reject(error);
//     } else {
//       throw new Error('Network error or no response received:');
//     }
//   },
// );

let isRefreshing = false;

interface FailedRequest {
  resolve: (value?: string | PromiseLike<string> | undefined) => void;
  reject: (reason?: any) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!error.response) {
      // Network error or request cancelled
      return Promise.reject(error);
    }

    if (error.response.status !== 401) {
      // Not an auth error, just reject
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      // Prevent infinite loop on refresh endpoint
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      // Already retried once
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Wait for the refresh to complete and retry after it resolves
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject } as FailedRequest);
      }).then((token) => {
        if (originalRequest.headers)
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const newAccessToken = await fetchUserAccountDetails();
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);

      // Retry original failed request with the new token
      if (originalRequest.headers)
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;