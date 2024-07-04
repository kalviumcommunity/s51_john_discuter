import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { login, loading } = useLogin()
  const loginUser = async (data) => {
    try {
      const res = await login(data);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center min-w-96 mx-auto m-1 mt-10">
        <h1 className="">Login to Chat app</h1>
        <form onSubmit={handleSubmit(loginUser)}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </label>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="flex justify-around items-center p-6">
            <button type="submit" className="btn bg-green-800 btn-active">
              Login
            </button>
            <Link style={{ color: "blue" }} to="/signup">
              New user ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
