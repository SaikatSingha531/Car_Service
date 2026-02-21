import { Box } from "@mui/material";
import AdminNav from "../../../Pages/Admin/AdminNav";
import Sidebar from "../../../Pages/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const NAVBAR_HEIGHT = 70; // change if your navbar height different

const AdminWrapper = () => {
  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f6f8" }}>
      
      {/* 🔥 FIXED NAVBAR */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${NAVBAR_HEIGHT}px`,
          zIndex: 1200,
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <AdminNav />
      </Box>

      {/* 🔥 MAIN LAYOUT */}
      <Box sx={{ display: "flex", pt: `${NAVBAR_HEIGHT}px` }}>
        
        {/* 🔥 SIDEBAR */}
        <Box
          sx={{
            width: 240,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            position: "sticky",
            top: `${NAVBAR_HEIGHT}px`,
            background: "#fff",
            borderRight: "1px solid #eee",
          }}
        >
          <Sidebar />
        </Box>

        {/* 🔥 PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
};

export default AdminWrapper;
