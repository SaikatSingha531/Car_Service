import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CarCrashIcon from '@mui/icons-material/CarCrash';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Spares Inventory", path: "/admin/spares", icon: <CarCrashIcon /> },
    { label: "Service Management", path: "/admin/services", icon: <DesignServicesIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280, // Slightly wider for a more premium feel
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          backgroundColor: "#111827", // Deep Slate / Navy background
          color: "#9ca3af",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        {/* BRAND SECTION */}
        <Box sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              width: 35, 
              height: 35, 
              bgcolor: "#ef6c00", 
              borderRadius: "8px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            N
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontSize: "1.1rem",
              letterSpacing: -0.5,
            }}
          >
            NEXUS <span style={{ color: "#ef6c00" }}>AUTO</span>
          </Typography>
        </Box>

        {/* NAVIGATION LIST */}
        <Box sx={{ px: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ color: "#4b5563", fontWeight: 700, ml: 2, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}
          >
            Management
          </Typography>
          <List sx={{ p: 0 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: "12px",
                    mb: 0.5,
                    px: 2,
                    py: 1.5,
                    position: 'relative',
                    transition: "all 0.2s ease",
                    backgroundColor: isActive ? "rgba(239, 108, 0, 0.1)" : "transparent",
                    color: isActive ? "#ef6c00" : "#9ca3af",

                    "&:hover": {
                      backgroundColor: isActive ? "rgba(239, 108, 0, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      color: "#ffffff",
                      "& .MuiListItemIcon-root": { color: "#ffffff" }
                    },

                    // Active indicator bar
                    "&::before": {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        height: isActive ? '60%' : '0%',
                        width: '4px',
                        backgroundColor: '#ef6c00',
                        borderRadius: '0 4px 4px 0',
                        transition: '0.3s'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "#ef6c00" : "inherit",
                      transition: "0.2s",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Box>

      {/* USER PROFILE SECTION (Bottom) */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            p: 1.5, 
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.03)'
          }}
        >
          <Avatar 
            sx={{ width: 36, height: 36, fontSize: '0.9rem', bgcolor: '#ef6c00' }}
          >
            AD
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
<Typography 
  variant="body2" 
  noWrap 
  sx={{ color: '#fff', fontWeight: 600 }}
>              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
              Super Admin
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;