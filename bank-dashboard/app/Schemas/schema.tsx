import * as Yup from "yup";

const signUpSchema = Yup.object({
  // Example (Yup schema idea)
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Include at least one uppercase letter")
    .matches(/[a-z]/, "Include at least one lowercase letter")
    .matches(/[0-9]/, "Include at least one number")
    .matches(/[^A-Za-z0-9]/, "Include at least one special character")
    .required("Password is required"),
});

export default signUpSchema;
