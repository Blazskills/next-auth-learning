"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

let validationSchema = yup.object({
  admission_number: yup.string().required("Admission Number is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [message, setMessage] = useState();
  const {
    setError,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const handleFormSubmit = async (data) => {
    // console.log(data);
    setMessage(null);


    try {
      const res = await signIn("credentials", {
        email: data.admission_number,
        password: data.password,
        role: "student",
        redirect: false,
        callbackUrl,
      });
      if (!res?.error) {
        console.log(callbackUrl)
        router.push(callbackUrl);
      } else {
        // console.log(res);
        setMessage({
          message: res?.error ?? "Login failed, kindly check your credentials ",
          status: "error",
        });
      }
    } catch (error) { 
      console.log("login catch");
      console.log(error);
    }
  };

  return (
    <div>
      <p className="text-center py-10 text-orange-950 text-2xl font-extrabold">
        LOGIN
      </p>
      <div className="max-w-3xl m-auto">
      {message?.status === "error" ? (
          <div className="text-sm text-red-500 pb-10">{message?.message}</div>
        ) : message?.status === "success" ? (
          <div className="text-sm text-green-500 pb-10">{message?.message}</div>
        ) : null}
        <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="admission_number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Admission Number
            </label>
            <input
              type="text"
              id="admission_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="28374645555228"
             
              {...register("admission_number")}
            />
            {errors.admission_number && (
              <div className="text-sm text-red-500">
                {errors.admission_number.message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="........."
              autoComplete="password"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="flex items-start mb-6">
            <p>
              Don&lsquo;t have an account?{" "}
              <Link href="register">
                <span className="text-blue-500">Register</span>{" "}
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
