import * as yup from 'yup';

export const SignupSchema = yup.object({
  fullName: yup.string().required("Enter Full Name Here"),
  email: yup
    .string()
    .email("Please Enter A Valid Email")
    .required("Please Enter A Valid Email"),
  password: yup
    .string().required("Password is mandatory")
    .min(8, "Password must be at least 8 characters")
    ,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm Password is mandatory"),
});


export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Please Enter A Valid Email")
    .required("Please Enter A Valid Email"),
  password: yup
    .string().required("Password is mandatory")
    .min(8, "Password must be at least 8 characters")
    ,
});
