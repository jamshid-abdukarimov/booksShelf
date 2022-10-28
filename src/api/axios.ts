import axios, { AxiosRequestConfig } from "axios";
import generatorMd5 from "../utils/md5";
import { BASE_URL } from "./constants";
// const axiosInstance = axios.create({
//   baseURL: "https: 23v112.lavina.tech/",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   function (config: AxiosRequestConfig<any>) {
//     config.headers = {
//       Key: "KEY",
//       Sign: "SIGN",
//     };
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

export interface AxiosProps {
  method: string;
  endpoint: string;
  body: string;
  secret: string;
  key: string;
}

export default async function axiosInstance({
  method,
  endpoint,
  body,
  secret,
  key,
}: AxiosProps) {
  const sign = generatorMd5({
    method,
    url: `${BASE_URL}${endpoint}`,
    body,
    secret,
  });

  return await axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data: body,
    headers: {
      Key: key,
      Sign: sign,
    },
  });
}
