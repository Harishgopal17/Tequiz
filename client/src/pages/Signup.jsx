import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DetailsContext } from "./../App";
import signup from "./../assets/icons/signup.svg";

export default function Signup() {
  const { BaseUrl, setError } = useContext(DetailsContext);
  const navigate = useNavigate();

  const [signupLoading, setsignupLoading] = useState(false);

  async function handleSignup(name, email, password) {
    try {
      setsignupLoading(true);
      const res = await fetch(`${BaseUrl}/api/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (data.status === "success" && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setsignupLoading(false);
    }
  }

  if (signupLoading) {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen grid grid-cols-2 max-md:grid-cols-1 max-w-5xl mx-auto px-10 items-center justify-center gap-32 pt-8 dark:text-light">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-1">
          <h6 className="text-xl font-semibold">Welcome</h6>
          <p className=" flex gap-1">
            <span className="opacity-60">Already have an account?</span>
            <span className="font-medium text-dark-green cursor-pointer hover:text-green transition-all duration-300">
              <Link to="/login">Signin</Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup(
                e.target.name.value,
                e.target.email.value,
                e.target.password.value
              );
            }}
          >
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-semibold"
              >
                Name :
              </label>
              <input
                type="name"
                name="name"
                placeholder="Enter your Name"
                className="input"
                required
              />
            </div>
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
            <div className="mb-3">
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
            <div className="flex">
              <button
                type="submit"
                className="bg-dark-green hover:bg-[#83cc98] transition-all duration-300 text-light w-full p-2 text-center rounded-md"
              >
                Sign up to your account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-md:hidden">
        <img src={signup} alt="signupsvg" />
      </div>
    </div>
  );
}
