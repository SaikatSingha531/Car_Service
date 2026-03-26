import Navbar from "../../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer";
import { Box } from "@mui/material";

const UserWrapper = () => {
  return (
    <>
      <Navbar />
       <Box sx={{ pt: "80px" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default UserWrapper;
