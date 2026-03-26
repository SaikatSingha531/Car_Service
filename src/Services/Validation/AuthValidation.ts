import * as yup from "yup";

export const SignupSchema = yup.object({
  fullName: yup.string().required("Enter Full Name Here"),
  email: yup
    .string()
    .email("Please Enter A Valid Email")
    .required("Please Enter A Valid Email"),
  password: yup
    .string()
    .required("Password Is Mandatory")
    .min(8, "Password Must Be At Least 8 Characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords Must Same")
    .required("Confirm Password Is Mandatory"),
});

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Please Enter A Valid Email")
    .required("Please Enter A Valid Email"),
  password: yup
    .string()
    .required("Password is mandatory")
    .min(8, "Password Must Be At Least 8 Characters"),
});

export const SparesSchema = yup.object().shape({
  name: yup.string().required("Name Is Required"),
  brand: yup.string().required("Parts Is Required"),
  description: yup.string().required("Description Is Required"),
  price: yup.string().required("Price Is Required"),
  image: yup.mixed().optional(),
  imagePreview: yup.string().optional(),
});

export const ServiceSchema = yup.object().shape({
  name: yup
    .string()
    .required("Service name is required")
    .min(3, "Minimum 3 characters"),

  category: yup.string().required("Category is required"),

  description: yup
    .string()
    .required("Description is required"),

  price: yup
    .string()
    .required("Price is required"),

  duration: yup.string().required("Duration is required"),

  image: yup
    .mixed().optional()
    .test("fileType", "Only image files allowed", (value: any) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),

    imagePreview:yup.string()
});
