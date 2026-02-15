import { Box, Stack, Typography, IconButton, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Main_Logo from "../assets/Main_Logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Typescript/type/redux.type";
import { logoutUser } from "../Hooks/Redux-Toolkit/Slice/Auth.slice";
// import type { AppDispatch } from "../redux/store";
// import { logoutUser } from "../redux/features/auth/authSlice";

const NavItems = [
  { label: "Home", path: "/" },
  { label: "Service", path: "/service" },
  { label: "About Us", path: "/about" },
  { label: "Spares", path: "/spares" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        px: 6,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={Main_Logo}
        alt="Auto Service"
        sx={{ height: 40 }}
      />

      {/* Navigation Links */}
      <Stack direction="row" spacing={4} alignItems="center">
        {NavItems.map((item) => (
          <Typography
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{
              fontSize: 14,
              color: "#333",
              textDecoration: "none",
              position: "relative",
              fontWeight: 500,
              "&.active": {
                color: "#d84315",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#d84315",
                },
              },
              "&:hover": {
                color: "#d84315",
              },
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Stack>

      {/* Right Side */}
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>

        {/* Logout visible for ALL logged users */}
        <Button
          onClick={handleLogout}
          variant="outlined"
          sx={{
            borderColor: "#d84315",
            color: "#d84315",
            px: 2,
            fontSize: 20,
            "&:hover": {
              backgroundColor: "#d84315",
              color: "#fff",
            },
          }}
        >
          <AiOutlineLogout />
        </Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
