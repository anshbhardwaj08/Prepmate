import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { login } from "../../features/auth/authSlice";

import { Button, Input } from "../../components/common";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const user = await authService.getCurrentUser();

        dispatch(login(user));

        if (user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="mb-2 text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-slate-400">
          Login to continue
        </p>

        {error && (
          <p className="mb-5 text-red-500">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(loginUser)}>

          <Input
            label="Email"
            type="email"
            placeholder="john@gmail.com"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

          <Button className="mt-2 w-full">
            Login
          </Button>

        </form>

        <p className="mt-6 text-center text-slate-400">

          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-blue-400"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;