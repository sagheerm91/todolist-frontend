import * as Yup from "yup";

const signupSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    username: Yup.string().required("Username is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone Number must be 11 digits")
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    
  });

  export default signupSchema;