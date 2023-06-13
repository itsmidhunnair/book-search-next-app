import * as yup from "yup";

/**
 * Signin Form Input Schemas
 * @field Name
 * @field Email
 * @field Password
 */
export const signupSchema = yup
  .object()
  .shape({
    name: yup.string().required("First Name is required."),
    email: yup
      .string()
      .email("Please Enter a Valid Email")
      .required("Email is required."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Password must contain 1 special char., 1 number, and Alphabets"
      ),
  })
  .required();

/**
 * Login Form Input Schemas
 * @field Email
 * @field Password
 */
export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email("Please Enter a Valid Email").required(),
    password: yup.string().required(),
  })
  .required();
