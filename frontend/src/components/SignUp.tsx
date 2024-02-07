import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { passwordAtom, usernameAtom } from "../atom";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);

  useEffect(() => {
    document.body.style.backgroundColor = "#fbede0";
    document.body.style.fontFamily = "sans-serif";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  function handleSignUp(e: any) {
    e.preventDefault();
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
              required
            />
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
