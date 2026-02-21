import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Main_Logo from "../assets/Main_Logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../Hooks/Redux-Toolkit/Slice/Auth.slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../Hooks/Utils/redux";
import { useState } from "react";

const NavItems = [
  { label: "Home", path: "/home" },
  { label: "Service", path: "/service" },
  { label: "About Us", path: "/about" },
  { label: "Spares", path: "/spares" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);

  const {count}= useAppSelector((state)=>state.cart)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/login", { replace: true });
  };

  const handleCartClick = () => {
    if (role === "user" || role === "admin") {
      navigate("/cart");
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
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
        sx={{ height: { xs: 40, md: 50 }, cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      {/* Desktop Nav */}
      {!isMobile && (
        <Stack direction="row" spacing={4} alignItems="center">
          {NavItems.map((item) => (
            <Typography
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                fontSize: { md: 18, lg: 20 },
                color: "#333",
                textDecoration: "none",
                fontWeight: 500,
                "&.active": { color: "#d84315" },
                "&:hover": { color: "#d84315" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>
      )}

      {/* Right Side */}
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
  onClick={handleCartClick}
  sx={{
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "14px",
    padding: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255,255,255,0.25)",
      transform: "scale(1.08)",
    },
  }}
>
  <Badge
    badgeContent={count}
    color="error"
    sx={{
      "& .MuiBadge-badge": {
        fontWeight: "bold",
        fontSize: "0.75rem",
      },
    }}
  >
    <ShoppingCartIcon sx={{ fontSize: 28, color: "#000000" }} />
  </Badge>
</IconButton>

        {!isMobile &&
          (role === "user" || role === "admin" ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                borderColor: "#d84315",
                color: "#d84315",
                "&:hover": {
                  backgroundColor: "#d84315",
                  color: "#fff",
                },
              }}
            >
              <AiOutlineLogout />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{
                backgroundColor: "#d84315",
                "&:hover": { backgroundColor: "#bf360c" },
              }}
            >
              Login
            </Button>
          ))}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Stack>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
<Drawer
  anchor="right"
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
>
  <Box
    sx={{
      width: 260,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      p: 3,
    }}
  >
    {/* Top Navigation Links */}
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: 600, color: "#d84315" }}
      >
        All Menu
      </Typography>

      <List>
        {NavItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setOpenDrawer(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f8ecec",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 16,
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>

    {/* Bottom Logout/Login */}
    <Box>
      {(role === "user" || role === "admin") ? (
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleLogout();
            setOpenDrawer(false);
          }}
          sx={{
            backgroundColor: "#d32f2f",
            py: 1.2,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            navigate("/login");
            setOpenDrawer(false);
          }}
          sx={{
            backgroundColor: "#d84315",
            py: 1.2,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#bf360c",
            },
          }}
        >
          Login
        </Button>
      )}
    </Box>
  </Box>
</Drawer>

    </Box>
  );
};

export default Navbar;
