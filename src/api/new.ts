// import axios from "axios";
// import { Md5 } from "ts-md5";

// interface IRequest {
//   method: string;
//   url: string;
//   secret: string;
//   body: any;
// }

// export default async function request(
//   method: any,
//   url: any,
//   secret: any,
//   body: any
// ) {
//   let Sing = Md5.hashStr(`${method}${url}${body}${secret}`);

//   await axios({
//     method,
//     url,
//     data: body,
//     headers: {
//       "Content-Type": "application/json",
//       Key: "",
//       Sign,
//     },
//   });
// }
export default function newSecret() {
  console.log(123);
}
