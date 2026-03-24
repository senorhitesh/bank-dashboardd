"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import signUpSchema from "../Schemas/schema";
import InputField from "../Components/InputField";
const page = () => {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: signUpSchema,
    });

  console.log(values);
  return (
    <div className="h-screen justify-center items-center flex bg-[#FEF9FF]">
      <div className="w-full z-0 max-w-sm bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <div className="mb-4 flex flex-col justify-center items-center text-center">
          <img
            src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
            alt="logo"
            className="w-40 "
          />
          <h1 className="text-2xl mt-2 font-semibold text-slate-800">
            Welcome Back,
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Please enter your details to sign up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"abc@abc.com"}
            value={values.email}
            error={errors.email}
            touched={touched.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <InputField
            label={"Password"}
            name={"password"}
            type={`${showPassword ? "text" : "password"}`}
            placeholder={"*******"}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            rightElement={
              <div
                onClick={() => {
                  setshowPassword(!showPassword);
                }}
                className="relative"
              >
                {showPassword ? (
                  <Eye />
                ) : (
                  <EyeClosed className="text-gray-800" />
                )}
              </div>
            }
          />
          <button
            className={`py-2 flex items-center justify-center gap-2 rounded-md ${errors.email && errors.password ? "bg-neutral-600" : " bg-neutral-950 hover:bg-neutral-900 "} transition  active:scale-98  text-white font-medium `}
          >
            Log In <LogIn />
          </button>
        </form>
        <div className="flex flex-col items-center mt-5 ">
          <p className="text-neutral-400 text-sm">
            WebAdmin | Version 25.11.39
          </p>
          <p className="text-neutral-400 text-sm">
            Powered by Soft-Tech Solutions © 2014 - 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
