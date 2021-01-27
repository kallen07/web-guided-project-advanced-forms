// Here goes the schema for the form
import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be 3 chars long"),
  email: yup
    .string()
    .email("must be a valid email")
    .required("email is required"),
  role: yup
    .string()
    .oneOf(["tl", "instructor", "alumni", "student"], "role is required"),
  civil: yup.string(),
  // we are done with checkboxes
  hiking: yup.boolean(),
  reading: yup.boolean(),
  coding: yup.boolean(),
});

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Passwords must be at least 6 characters long."),
  terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
  // required isn't required for checkboxes.
});
