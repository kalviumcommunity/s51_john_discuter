import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import useSignUp from "../hooks/useSignUp";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const nav = useNavigate()

  const { signup, loading } = useSignUp();
  const signUp = async (data) => {
    
    try {
      console.log(loading);
      const res = await signup(data);
      console.log(res);
      console.log(loading);
      toast.success('Look at my styles.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      nav("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  const password = watch("password");

  return (
    <div>
      <div className="flex flex-col items-center min-w-96 mx-auto m-1 mt-10">
        <h1 className="">Sign Up for Chat app</h1>
        <form onSubmit={handleSubmit(signUp)}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full Name is required",
              })}
            />
          </label>
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </label>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
              Boy or Girl ??
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label>
                  <input
                    type="radio"
                    value="boy"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Boy
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="girl"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Girl
                </label>
              </li>
            </ul>
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
            <Link style={{color: "blue"}} to="/login">Already have an account? </Link>
          <div className="flex justify-around items-center p-6">
            <button type="submit" className="btn btn-primary btn-active" disabled={loading}>
              {
                loading 
                ? <span className="loading loading-ball loading-md"></span>
                : "Sign up" 
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
