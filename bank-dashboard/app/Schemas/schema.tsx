import * as Yup from "yup";

const signUpSchema = Yup.object({
  // Example (Yup schema idea)
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

export default signUpSchema;
