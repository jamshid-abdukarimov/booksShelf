import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import MyProfile from "./pages/MyProfile";
import "./index.css";

function App() {
  const { isAuth } = useTypedSelector(({ auth }) => auth);

  const navigate = useNavigate();
  useEffect(() => {
    !isAuth ? navigate("/signup") : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
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
