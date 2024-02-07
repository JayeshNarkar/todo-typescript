import react, { useEffect, useState } from "react";
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

function App() {
  return <MainApp />;
}

function MainApp() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/addTodo" Component={AddTodo} />
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
