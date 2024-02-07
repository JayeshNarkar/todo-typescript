import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#fbede0";
    return () => {
      document.body.style.backgroundColor = ""; // Reset color on component unmount
    };
  }, []);

  function handleSignUp(e: any) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form onSubmit={handleSignUp}></form>
      </div>
      <p>
        Already have an account?{" "}
        <button
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
