import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
// import { Home, Settings } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CarCrashIcon from '@mui/icons-material/CarCrash';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Spares", path: "/admin/spares", icon: <CarCrashIcon /> },
    { label: "Services", path: "/admin/services", icon: <DesignServicesIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          pt: 8,
          boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
        },
      }}
    >
      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#111827",
            letterSpacing: 0.5,
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ overflow: "auto", px: 2, py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.label}
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: "10px",
                  mb: 1,
                  px: 2,
                  py: 1.2,
                  transition: "all 0.2s ease-in-out",

                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },

                  "&.Mui-selected": {
                    backgroundColor: "#111827",
                    color: "#ffffff",

                    "& .MuiListItemIcon-root": {
                      color: "#ffffff",
                    },

                    "&:hover": {
                      backgroundColor: "#1f2937",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? "#ffffff" : "#6b7280",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
