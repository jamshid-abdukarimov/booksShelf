import axios from "axios";
import generatorMd5 from "../utils/md5";
import { BASE_URL } from "./constants";

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
    url: `${endpoint}`,
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
