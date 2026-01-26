import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicInput from "./DynamicInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "../Services/Validation/AuthValidation";
import { useState } from "react";

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignupSubmit = (data: SignupFormData) => {
    setLoading(true)
    console.log("submit data", data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #d32f2f, #BF2D0D)",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          width: 380,
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
       <Typography
  variant="h4" 
  sx={{ fontWeight: "bold", mb: 1, color: "#000" }}
>
  CREATE ACCOUNT
</Typography>

<Typography
  variant="body1" 
  sx={{ mb: 4, color: "#000", fontWeight: "500" }} 
>
  Fill in the details below to get started
</Typography>

        <form onSubmit={handleSubmit(handleSignupSubmit)}>
  <Box mb={2}>
    <DynamicInput
      name="fullName"
      label="Full Name"
      type="text"
      register={register}
      error={errors.fullName}
    />
  </Box>

  <Box mb={2}>
    <DynamicInput
      name="email"
      label="Email"
      type="email"
      register={register}
      error={errors.email}
    />
  </Box>

  <Box mb={2}>
    <DynamicInput
      name="password"
      label="Password"
      type="password"
      register={register}
      error={errors.password}
    />
  </Box>

  <Box mb={3}>
    <DynamicInput
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      register={register}
      error={errors.confirmPassword}
    />
  </Box>

  {/* Sign Up Button */}
  <Button
    fullWidth
    variant="contained"
    type="submit"
    sx={{
      mb: 2,
      backgroundColor: "#d32f2f",
      color: "#fff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#bf2a0c",
      },
    }}
  >
    {loading ? "Wait..." : "SIGN UP"}
  </Button>

  {/* Login Link */}
  <Typography
  variant="body1" // larger than body2
  sx={{ color: "#000", fontWeight: "500" }}
>
  Already have an account?{" "}
  <br />
  <Button
    onClick={() => navigate("/login")}
    sx={{ textTransform: "none", fontWeight: "bold", color: "#d32f2f" }} // red button for emphasis
  >
    Log In
  </Button>
</Typography>
</form>

      </Box>
    </Box>
  );
}
