import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "https: 23v112.lavina.tech/",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    config.headers = {
      Key: "KEY",
      Sign: "SIGN",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
