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

  useEffect(() => {
    const existing = getUser();
    if (existing) {
      router.replace("/dashboard");
    }
  }, [router]);

  const initialValues = { email: "", password: "" };

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
        saveUser(user);
        router.push("/dashboard");
      },
      validationSchema: signUpSchema,
    });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    // vh-100 replaces h-screen; d-flex justify-content-center align-items-center handles the centering
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#FEF9FF" }}
    >
      {/* card component provides the white background, border, and shadow */}
      <div
        className="card shadow-sm border-light p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="mb-4 d-flex flex-column align-items-center text-center">
          <img
            src="https://uat.chandrapurdccb.bank.in/webadmin/resources/assets/img/logo/Soft-Tech-logo.png"
            alt="logo"
            className="mb-2"
            style={{ width: "160px" }}
          />
          <h1 className="h4 fw-bold text-dark mb-1">Welcome Back,</h1>
          <p className="small text-muted">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <InputField
            label={"Email"}
            name={"email"}
            // Ensure InputField internal uses .form-control
            type={"email"}
            placeholder={"abc@abc.com"}
            value={values.email}
            error={errors.email}
            touched={touched.email}
            handleChange={(e) => {
              setAuthError("");
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
              setAuthError("");
              handleChange(e);
            }}
            handleBlur={handleBlur}
            rightElement={
              <div
                onClick={() => setshowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <Eye size={20} className="text-secondary" />
                ) : (
                  <EyeClosed size={20} className="text-secondary" />
                )}
              </div>
            }
          />

          {authError && (
            <p className="small text-danger text-center mb-0">{authError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`btn d-flex align-items-center justify-content-center gap-2 py-2 fw-medium ${
              hasErrors || isLoading ? "btn-secondary disabled" : "btn-dark"
            }`}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing in...
              </>
            ) : (
              <>
                Log In <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small mb-0">WebAdmin | Version 25.11.39</p>
          <p className="text-muted small">
            Powered by Soft-Tech Solutions © 2014 - 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
