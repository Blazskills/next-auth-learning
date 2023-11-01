"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
let validationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  user_nin: yup
    .number("National Identification number must be a number")
    .required("National Identification number is required"),
  nationality: yup.string().required("Nationality is required"),
  city: yup.string().required("City is required"),
  email_personal: yup.string().email().required("Email is required"),
  current_level: yup.string().required("Current Level is required"),
  department: yup.string().required("Department is required"),
  faculty: yup.string().required("Faculty is required"),
});
const Register = () => {
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
    // event.preventDefault();
    setMessage(null);
    const url =
      process.env.NEXT_PUBLIC_API_URL + "/api/v1/student/add-student/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4NTc3NTA5LCJpYXQiOjE2OTgxNDU1MDksImp0aSI6ImZmZGEyNjMzMmQ4MjRhYzViZTgzYzdhMjQ3MzNiMTVmIiwidXNlcl9pZCI6IjBmYzk2MmFmLTMzYWItNDVmOC05ZWI2LWE0YzcyMTJkZmYzMSJ9.36BD9PP-qww6B26NLA4PQj9TB_RqBnRPqugCn9iBGuE",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage(res?.message ?? "User registered successfully");
      reset();
      console.log("submitted successfully");
    } else {
      const response = await res.json();
      console.log(response);
      Object.keys(response).forEach((field) => {
        setError(field, {
          type: "server",
          message: response[field],
        });
      });
    }
  };
  return (
    <div>
      <p className="text-center py-10 text-orange-950 text-2xl font-extrabold">
        REGISTER
      </p>
      <div className="max-w-3xl m-auto">
        {message && <div className="text-sm text-green-500">{message}</div>}

        <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                //
                {...register("first_name")}
              />
              {errors.first_name && (
                <div className="text-sm text-red-500">
                  {errors.first_name.message}
                </div>
              )}
              {/* {errors["first_name"] &&
                errors["first_name"].type === "server" && (
                  <div className="text-sm text-red-500">
                    {errors["first_name"].message}
                  </div>
                )} */}
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                {...register("last_name")}
              />
              {errors["last_name"] && (
                <div className="text-sm text-red-500">
                  {errors["last_name"].message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                {...register("gender")}
              />
              {errors["gender"] && (
                <div className="text-sm text-red-500">
                  {errors["gender"].message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="nin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Student NIN
              </label>
              <input
                type="text"
                id="nin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"

                {...register("user_nin")}
              />
              {errors["user_nin"] && (
                <div className="text-sm text-red-500">
                  {errors["user_nin"].message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="nationality"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="NG"
                {...register("nationality")}
              />
              {errors["nationality"] && (
                <div className="text-sm text-red-500">
                  {errors["nationality"].message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ogun"
                {...register("city")}
              />
              {errors["city"] && (
                <div className="text-sm text-red-500">
                  {errors["city"].message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Personal Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              {...register("email_personal")}
            />

            {errors["email_personal"] && (
              <div className="text-sm text-red-500">
                {errors["email_personal"].message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="currentlevel"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Level
            </label>
            <input
              type="text"
              id="currentlevel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="11dd0bfa-d429-4b2f-8a97-86caf9424faf"
              {...register("current_level")}
            />
            {errors["current_level"] && (
              <div className="text-sm text-red-500">
                {errors["current_level"].message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="5991ba58-1823-4eec-89cf-4a280e0d0be8"
              {...register("department")}
            />
            {errors["department"] && (
              <div className="text-sm text-red-500">
                {errors["department"].message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="faculty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Faculty
            </label>
            <input
              type="text"
              id="faculty"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="64f9c7a1-1fc2-4d09-b60b-69b7dc1e6759"
              {...register("faculty")}
            />
            {errors["faculty"] && (
              <div className="text-sm text-red-500">
                {errors["faculty"].message}
              </div>
            )}
          </div>
          <div className="flex items-start mb-6">
            <p>
              Already have an account?{" "}
              <Link href="login">
                <span className="text-blue-500">Login</span>{" "}
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
