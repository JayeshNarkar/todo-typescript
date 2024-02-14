import { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { PulseLoader } from "react-spinners";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#123abc" loading={true} size={10} />
      </div>
    );
  }

  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={AddTodo} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="*" Component={RedirectToLogin} />
        </Routes>
      </Router>
    </>
  );
}

const RedirectToLogin = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default App;
