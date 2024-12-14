import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DetailsContext } from "./../App";
import loginsvg from "./../assets/icons/login.svg";

export default function Login() {
  const { BaseUrl, setError } = useContext(DetailsContext);
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    try {
      const res = await fetch(`${BaseUrl}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token); // Save token
        navigate("/dashboard"); // Navigate to Dashboard
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-2 max-md:grid-cols-1 max-w-5xl mx-auto px-10 items-center justify-center gap-32 pt-8 dark:text-light">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-1">
          <h6 className="text-xl font-semibold">Welcome Back</h6>
          <p className=" flex gap-1">
            <span className="opacity-60">Don't have an account?</span>
            <span className="font-medium text-dark-green cursor-pointer hover:text-green transition-all duration-300">
              <Link to="/signup"> Signup</Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(e.target.email.value, e.target.password.value);
            }}
          >
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-semibold"
              >
                Email :
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input"
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-semibold"
              >
                Password :
              </label>
              <input
                type="Password"
                name="password"
                placeholder="Enter your password"
                className="input"
                required
              />
            </div>
            <div className="self-end mb-4 text-base text-dark-green hover:text-green transition-all duration-300 cursor-pointer">
              <p>Forgot password?</p>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-dark-green hover:bg-[#83cc98] transition-all duration-300 text-light w-full p-2 text-center rounded-md"
              >
                Sign in to your account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-md:hidden">
        <img src={loginsvg} alt="loginsvg" />
      </div>
    </div>
  );
}
