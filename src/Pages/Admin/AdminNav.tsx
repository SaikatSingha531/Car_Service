import { AppBar, Toolbar, Box, Button, Container, useScrollTrigger } from "@mui/material";
import Main_Logo from "../../assets/Main_Logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../../Hooks/Redux-Toolkit/Slice/Auth.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/Utils/redux";

const AdminNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Logic remains exactly as provided
  const handleLogout = () => {
    dispatch(logout());
    console.log("User logged out");
    toast.success("Logout successfully");
    navigate("/auth/login");
  };

  // Logic for a sticky header shadow on scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      position="sticky"
      elevation={trigger ? 4 : 0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)", // Modern Glassmorphism
        borderBottom: "1px solid",
        borderColor: trigger ? "transparent" : "rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: 70, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center" 
          }}
        >
          {/* LEFT: BRANDING */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin/dashboard")}
          >
            <Box
              component="img"
              src={Main_Logo}
              alt="Auto Service"
              sx={{ 
                height: 45, 
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            />
          </Box>

          {/* MIDDLE: OPTIONAL SPACE (For Admin Title or Search) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box 
              sx={{ 
                bgcolor: "rgba(216, 67, 21, 0.08)", 
                px: 2, 
                py: 0.5, 
                borderRadius: "20px",
                border: "1px solid rgba(216, 67, 21, 0.2)"
              }}
            >
              <Box component="span" sx={{ color: "#d84315", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1 }}>
                ADMIN CONTROL PANEL
              </Box>
            </Box>
          </Box>

          {/* RIGHT: ACTIONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              onClick={handleLogout}
              variant="contained"
              disableElevation
              startIcon={<AiOutlineLogout />}
              sx={{
                backgroundColor: "#101828", // Dark pro theme
                color: "#fff",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#d84315", // Changes to orange on hover
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(216, 67, 21, 0.3)",
                },
                "&:active": {
                  transform: "translateY(0)",
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNav;