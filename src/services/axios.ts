import { Strorages } from '@/models/storage.enum';
import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

const apiServerUrl =
  process.env.NEXT_PUBLIC_API_URL || 'https://moonkit.twendeesoft.com';
// const apiServerUrl = "https://22c0-222-252-11-28.ngrok-free.app";
// const apiServerUrl = "http://localhost:8000";

export const getAxiosInstance = async () => {
  // const credentials = await Keychain.getInternetCredentials(JWT_KEY);
  // if (credentials && credentials.password) {
  //   axios.defaults.headers.common.Authorization = `Bearer ${credentials.password}`;
  // }

  const accessToken = getCookie(Strorages.AccessToken);
  const axiosInstance = axios.create({
    baseURL: apiServerUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    timeout: 15000
  });

  return axiosInstance;
};

const api = async (
  url: string,
  data?: any,
  options: AxiosRequestConfig = {}
) => {
  try {
    const API = await getAxiosInstance();
    return await API({ url, data, method: 'POST', ...options });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default api;
