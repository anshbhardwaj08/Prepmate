import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { login } from "../../features/auth/authSlice";

import { Button, Input } from "../../components/common";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createAccount = async (data) => {
    setError("");

    try {
      const session = await authService.createAccount(data);

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
          Create Account
        </h1>

        <p className="mb-8 text-slate-400">
          Join PrepMate AI
        </p>

        {error && (
          <p className="mb-5 text-red-500">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(createAccount)}>

          <Input
            label="Full Name"
            placeholder="John Doe"
            register={register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
          />

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
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Button className="mt-2 w-full">
            Create Account
          </Button>

        </form>

        <p className="mt-6 text-center text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;