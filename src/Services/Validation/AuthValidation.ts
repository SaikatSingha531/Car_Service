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


export const NewsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  brand: yup.string().required("Brand is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .string()
    .required("Price is required"),
  image: yup.mixed().optional(),
});
