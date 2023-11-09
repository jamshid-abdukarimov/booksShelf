import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useEffect, useLayoutEffect } from "react";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import MyProfile from "./pages/MyProfile";
import "./index.css";
import checkAuth from "./utils/checkAuth";
import { useActions } from "./hooks/useActions";
import Loader from "./components/Loader";

function App() {
  const { loading, isAuth } = useTypedSelector(({ auth }) => auth);
  const { SignIn: signin } = useActions();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    // if (localStorage.getItem("userData")) {
    // }
    checkAuth(navigate, signin);
    // !isAuth ? navigate("/signin") : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (loading) {
    return <Loader main />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
