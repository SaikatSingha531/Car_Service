import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicInput from "./DynamicInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../Services/Validation/AuthValidation";
import { useEffect } from "react";
import { loginUser } from "../Hooks/Redux-Toolkit/Slice/Auth.slice";
import { useAppDispatch, useAppSelector } from "../Hooks/Utils/redux";
import loginImg from "../assets/login.png";

type LoginformData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginformData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) navigate("/admin");
  }, [user, navigate]);

  const handleLoginSubmit = async (data: LoginformData) => {
    await dispatch(loginUser(data));
    reset();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "radial-gradient(circle at 10% 10%, #2a0c0c, #090909 70%)",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        {/* GLASS CARD */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 5,
            borderRadius: "24px",
            backdropFilter: "blur(30px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.8), inset 0 0 40px rgba(255,255,255,0.02)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* RED GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 240,
              height: 240,
              background: "#ff2d2d",
              filter: "blur(140px)",
              top: -80,
              right: -80,
              opacity: 0.25,
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome Back
          </Typography>

          <Typography sx={{ mb: 4, opacity: 0.75 }}>
            Login to your garage dashboard
          </Typography>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <Box mb={3}>
              <DynamicInput
                name="email"
                label="Email Address"
                type="email"
                register={register}
                error={errors.email}
              />
            </Box>

            <Box mb={3}>
              <DynamicInput
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                py: 1.6,
                fontSize: 16,
                fontWeight: "bold",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg,#ff2d2d,#b30000)",
                boxShadow: "0 10px 35px rgba(255,0,0,.35)",
                color: "#fff",
                letterSpacing: 1,
                "&:hover": {
                  transform: "translateY(-2px) scale(1.01)",
                  boxShadow: "0 15px 45px rgba(255,0,0,.55)",
                  background:
                    "linear-gradient(135deg,#ff3b3b,#cc0000)",
                },
              }}
            >
              {loading ? "Logging..." : "LOGIN"}
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                opacity: 0.85,
                fontSize: 14,
              }}
            >
              Don’t have an account?
            </Typography>

            <Button
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{
                mt: 1,
                color: "#ff4d4d",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Create Account
            </Button>
          </form>
        </Box>
      </Box>

      {/* RIGHT SIDE IMAGE */}
      <Box
        sx={{
          width: "60%",
          display: { xs: "none", md: "block" },
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={loginImg}
          alt="garage"
          sx={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />

        {/* OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(25,0,0,0.85), rgba(0,0,0,0.4))",
          }}
        />

        {/* TEXT */}
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            left: 60,
            color: "#fff",
            maxWidth: 500,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Smart Garage System
          </Typography>

          <Typography sx={{ opacity: 0.85 }}>
            Manage vehicles, services and repairs with powerful
            admin dashboard.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
