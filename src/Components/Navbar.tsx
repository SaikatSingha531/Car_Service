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
  Container,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../Hooks/Redux-Toolkit/Slice/Auth.slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../Hooks/Utils/redux";
import { useState, useEffect } from "react";
import Main_Logo from "../assets/Main_Logo.png";

const NavItems = [
  { label: "Home", path: "/home" },
  { label: "Service", path: "/service" },
  { label: "Spares", path: "/spares" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);
  const { count } = useAppSelector((state) => state.cart);

  const {count : service}= useAppSelector((state)=>state.serviceCart);

  const totalCount = count+service

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const handleCartClick = () => {
    (role === "user" || role === "admin") ? navigate("/cart") : toast.error("Please login first");
  };

  const activeLinkStyle = {
    color: "#d84315",
    "&::after": { width: "100%", left: "0%" },
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 1200,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pt: scrolled ? 1.5 : 2.5,
        px: { xs: 2, md: 0 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderRadius: scrolled ? "100px" : "0px", // Floating pill effect
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
          boxShadow: scrolled ? "0 10px 30px -(10px) rgba(0,0,0,0.1)" : "none",
          transition: "all 0.4s ease",
          py: 1,
          px: { xs: 2, sm: 4 } + " !important",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* Brand */}
          <Box
            component="img"
            src={Main_Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{
              height: { xs: 30, md: 38 },
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { opacity: 0.8 },
            }}
          />

          {/* Desktop Nav */}
          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {NavItems.map((item) => (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: scrolled ? "#1a1a1a" : "#000",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    px: 2,
                    textTransform: "none",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 8,
                      left: "50%",
                      width: 0,
                      height: "2px",
                      backgroundColor: "#d84315",
                      transition: "all 0.3s ease",
                    },
                    "&:hover": { backgroundColor: "transparent", color: "#d84315" },
                    "&.active": activeLinkStyle,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {/* Actions */}
          <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
            <IconButton
              onClick={handleCartClick}
              sx={{
                color: scrolled ? "#1a1a1a" : "#000",
                transition: "0.3s",
                "&:hover": { color: "#d84315", transform: "translateY(-2px)" },
              }}
            >
              <Badge
                badgeContent={totalCount}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#d84315",
                    color: "white",
                    fontSize: "0.65rem",
                  },
                }}
              >
                <ShoppingCartIcon fontSize="medium" />
              </Badge>
            </IconButton>

            {!isMobile && (
              role === "user" || role === "admin" ? (
                <Button
                  onClick={handleLogout}
                  variant="text"
                  startIcon={<AiOutlineLogout />}
                  sx={{
                    color: "#d84315",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": { backgroundColor: "rgba(216, 67, 21, 0.08)" },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  disableElevation
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 700,
                    backgroundColor: "#1a1a1a", // Deep slate/black for a professional look
                    color: "#fff",
                    "&:hover": { backgroundColor: "#d84315" },
                  }}
                >
                  Sign In
                </Button>
              )
            )}

            {isMobile && (
              <IconButton 
                onClick={() => setOpenDrawer(true)}
                sx={{ color: scrolled ? "#1a1a1a" : "#000" }}
              >
                <MenuRoundedIcon fontSize="large" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* Modern Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: "100%", maxWidth: 300, pt: 5, px: 3 },
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700 }}>
          Navigation
        </Typography>
        <List sx={{ mt: 2 }}>
          {NavItems.map((item) => (
            <ListItem
              key={item.label}
              disablePadding
              sx={{ mb: 1 }}
              onClick={() => {
                navigate(item.path);
                setOpenDrawer(false);
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto", mb: 5 }}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={() => {
                role === "user" || role === "admin" ? handleLogout() : navigate("/login");
                setOpenDrawer(false);
              }}
              sx={{
                py: 2,
                borderRadius: "16px",
                backgroundColor: "#1a1a1a",
                fontWeight: 700,
              }}
            >
              {(role === "user" || role === "admin") ? "Logout" : "Get Started"}
            </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;