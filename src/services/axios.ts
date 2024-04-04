import axios, { AxiosRequestConfig } from "axios";

const apiServerUrl = "https://evocean.twendeesoft.com";

const getAxiosInstance = async () => {
  // const credentials = await Keychain.getInternetCredentials(JWT_KEY);
  // if (credentials && credentials.password) {
  //   axios.defaults.headers.common.Authorization = `Bearer ${credentials.password}`;
  // }

  const axiosInstance = axios.create({
    baseURL: apiServerUrl,
    timeout: 15000,
  });

  return axiosInstance;
};

const api = async (
  url: string,
  data?: any,
  options: AxiosRequestConfig = {},
) => {
  try {
    const API = await getAxiosInstance();
    return await API({ url, data, method: "POST", ...options });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default api;
