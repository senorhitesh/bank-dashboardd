"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import signUpSchema from "../Schemas/schema";
import InputField from "../Components/InputField";
import { validateCredentials } from "../lib/auth";
import { saveUser, getUser } from "../lib/session";

const Page = () => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const existing = getUser();
    if (existing) {
      router.replace("/dashboard");
    }
  }, [router]);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        setAuthError("");
        setIsLoading(true);

        const user = validateCredentials(values.email, values.password);

        if (!user) {
          setAuthError("Invalid email or password. Please try again.");
          setIsLoading(false);
          return;
        }

        // Save to localStorage
        saveUser(user);

        // Redirect to dashboard
        router.push("/dashboard");
      },
      validationSchema: signUpSchema,
    });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="h-screen justify-center items-center flex bg-[#FEF9FF]">
      <div className="w-full z-0 max-w-sm bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <div className="mb-4 flex flex-col justify-center items-center text-center">
          <img
            src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
            alt="logo"
            className="w-40"
          />
          <h1 className="text-2xl mt-2 font-semibold text-slate-800">
            Welcome Back,
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Please enter your details to sign in.
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
            handleChange={(e) => {
              setAuthError(""); // clear server error on change
              handleChange(e);
            }}
            handleBlur={handleBlur}
          />

          <InputField
            label={"Password"}
            name={"password"}
            type={showPassword ? "text" : "password"}
            placeholder={"*******"}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            handleChange={(e) => {
              setAuthError(""); // clear server error on change
              handleChange(e);
            }}
            handleBlur={handleBlur}
            rightElement={
              <div
                onClick={() => setshowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="text-gray-800" />
                ) : (
                  <EyeClosed className="text-gray-800" />
                )}
              </div>
            }
          />

          {/* Auth error (wrong credentials) */}
          {authError && (
            <p className="text-sm text-red-500 -mt-2 text-center">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 flex items-center justify-center gap-2 rounded-md transition active:scale-95 text-white font-medium
              ${
                hasErrors || isLoading
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-neutral-950 hover:bg-neutral-900 cursor-pointer"
              }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                Log In <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-col items-center mt-5">
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

export default Page;
