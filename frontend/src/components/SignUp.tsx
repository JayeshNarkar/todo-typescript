import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom, passwordAtom, usernameAtom } from "../atom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    document.body.style.backgroundColor = "#fbede0";
    document.body.style.fontFamily = "sans-serif";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  async function handleSignUp(e: any) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://172.172.247.173:8080/api/users",
        {
          username,
          password,
        }
      );
      setErrorMessage("");
      setUsername(response.data.username);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.id);
      setIsAuthenticated(true);
      navigate("/");
      setSuccessMessage(response.data.message);
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.error || error.response.data.message);
    } finally {
      setIsLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold m-3 text-center md:text-4xl mt-4">
        Sign Up
      </h1>
      <p className="text-center md:text-xl">
        Just a few quick things to get started
      </p>
      <div className="flex justify-center m-3 md:text-xl">
        <form onSubmit={handleSignUp}>
          <div>
            <input
              className="rounded-md border-2 border-gray-500 p-2 m-2 w-60"
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              placeholder="🔥 Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              className="rounded-md border-2 border-gray-500 p-2 m-2 w-60"
              type="password"
              id="password"
              value={password}
              placeholder="🔑 Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              className="rounded-md border-2 border-gray-500 p-2 m-2 w-60"
              type="password"
              id="passwordConfirm"
              placeholder="✍ Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          <p className="text-green-500 text-xl text-center">{successMessage}</p>
          <p className="text-red-500 text-xl text-center">{errorMessage}</p>
          <div>
            <button
              className="rounded-md p-2 m-2 w-60 bg-blue-400 text-black text-xl disabled:bg-blue-700"
              type="submit"
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      <p className="m-3 text-center text-xl md:text-2xl">
        Already have an account?{" "}
        <button
          className="active:underline text-purple-700 active:text-purple-900"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}
