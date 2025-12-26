/**
 * Centralized Axios instance with interceptors
 * Handles JWT injection and error responses
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { logout, setCredentials } from '@/features/auth/authSlice';
import type { ApiError } from '@/types';

// API base URL - would come from environment in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.razgo.com/v1';

/**
 * Creates and configures the main Axios instance
 * with request/response interceptors
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - inject JWT token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors and token refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized - token expired
      if (error.response?.status === 401 && originalRequest) {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          try {
            // Attempt to refresh the token
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            // Update tokens in store
            store.dispatch(setCredentials({
              accessToken,
              refreshToken: newRefreshToken,
              user: state.auth.user!,
            }));

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed - logout user
            store.dispatch(logout());
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token - logout
          store.dispatch(logout());
          window.location.href = '/auth/login';
        }
      }

      // Handle 403 Forbidden - insufficient permissions
      if (error.response?.status === 403) {
        console.error('Access denied: Insufficient permissions');
      }

      // Transform error response
      const apiError: ApiError = {
        message: error.response?.data?.message || 'An unexpected error occurred',
        code: error.response?.data?.code || 'UNKNOWN_ERROR',
        statusCode: error.response?.status || 500,
        details: error.response?.data?.details,
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

/** Main API instance for all HTTP requests */
export const api = createApiInstance();

/** 
 * Helper function for GET requests 
 */
export const get = async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

/**
 * Helper function for POST requests
 */
export const post = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

/**
 * Helper function for PUT requests
 */
export const put = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

/**
 * Helper function for PATCH requests
 */
export const patch = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await api.patch<T>(url, data);
  return response.data;
};

/**
 * Helper function for DELETE requests
 */
export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};

export default api;
