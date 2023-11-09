import { NavigateFunction } from "react-router-dom";

export default function (
  navigate: NavigateFunction,
  signinFunc: (data: { key: string; secret: string }) => void
) {
  if (!localStorage.getItem("userData")) {
    return navigate("/signin");
  }

  const data = JSON.parse(localStorage.getItem("userData") || "");
  signinFunc(data);
}
