import { Md5 } from "ts-md5";

interface IGenerator {
  method: string;
  url: string;
  body: string;
  secret: string;
}

export default function generatorMd5({
  method,
  url,
  body,
  secret,
}: IGenerator): string {
  return Md5.hashStr(`${method}${url}${body}${secret}`);
}
