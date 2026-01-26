import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicInput from "./DynamicInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../Services/Validation/AuthValidation";
import { useState } from "react";

type LoginformData = {
  email: string;
  password: string;
};

export default function SignupPage() {

    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginformData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignupSubmit = (data: LoginformData) => {
    setLoading(true);
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
  LOG IN
</Typography>

<Typography
  variant="body1" 
  sx={{ mb: 4, color: "#000", fontWeight: "500" }} 
>
  Enter your email address & password to continue
</Typography>

        <form onSubmit={handleSubmit(handleSignupSubmit)}>
  

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
    {loading ? "Wait..." : "LOG IN"}
  </Button>

  {/* Login Link */}
  <Typography
  variant="body1" // larger than body2
  sx={{ color: "#000", fontWeight: "500" }}
>
  Don’t have any account?{" "}
  <br />
  <Button
    onClick={() => navigate("/signup")}
    sx={{ textTransform: "none", fontWeight: "bold", color: "#d32f2f" }} // red button for emphasis
  >
    Create Accouant
  </Button>
</Typography>
</form>

      </Box>
    </Box>
  );
}
