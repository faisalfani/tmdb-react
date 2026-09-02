import axios, { type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (API_TOKEN && API_TOKEN.trim() !== '' && API_TOKEN !== 'your_tmdb_bearer_token_here') {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
  } else if (API_KEY && API_KEY.trim() !== '' && API_KEY !== 'your_tmdb_api_key_here') {
    config.params = {
      ...config.params,
      api_key: API_KEY,
    };
  }
  return config;
});
