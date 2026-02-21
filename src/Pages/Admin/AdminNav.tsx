import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Main_Logo from "../../assets/Main_Logo.png";

import { AiOutlineLogout } from "react-icons/ai";
// import { useDispatch } from "react-redux";
import { logout } from "../../Hooks/Redux-Toolkit/Slice/Auth.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/Utils/redux";

const AdminNav = () => {
  const dispatch =useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    console.log("User logged out");
    toast.success("logout successfully")
        navigate("/auth/login")
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#ffefef" }}>
        <Toolbar sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              <Box
                component="img"
                src={Main_Logo}
                alt="Auto Service"
                sx={{ height: 50 }}
              />
            </Typography>
          </Box>

          {/* Push Logout to Right */}
          <Box sx={{ marginLeft: "auto" }}>
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNav;
