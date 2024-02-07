import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#82d1d7";
    return () => {
      document.body.style.backgroundColor = ""; // Reset color on component unmount
    };
  }, []);

  return (
    <div>
      <h1>login</h1>
      <p>
        Don't have an account?{" "}
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      </p>
    </div>
  );
}
