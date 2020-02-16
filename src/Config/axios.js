import axios from 'axios';

const token = localStorage.getItem('jwt');

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
