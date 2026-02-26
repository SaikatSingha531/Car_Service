import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ default spare active when /cart open
  const isSpare =
    location.pathname === "/cart" ||
    location.pathname.includes("cartspare");

  const isService = location.pathname.includes("cartservice");

  return (
    <Box
      sx={{
        maxWidth: 1100,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* ===== MINI NAVBAR ===== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          pt: 3,
          borderBottom: "1px solid #eee",
        }}
      >
        {/* Spare Parts */}
        <Box
          onClick={() => navigate("/cart/cartspare")}
          sx={{
            cursor: "pointer",
            pb: 1.5,
            fontWeight: 500,
            fontSize: 17,
            minWidth: 150,
            textAlign: "center",
            color: isSpare ? "#2874f0" : "#444",
            borderBottom: isSpare
              ? "3px solid #2874f0"
              : "3px solid transparent",
            transition: "0.3s",
          }}
        >
          Spare Parts
        </Box>

        {/* Services */}
        <Box
          onClick={() => navigate("/cart/cartservice")}
          sx={{
            cursor: "pointer",
            pb: 1.5,
            fontWeight: 500,
            fontSize: 17,
            minWidth: 150,
            textAlign: "center",
            color: isService ? "#2874f0" : "#444",
            borderBottom: isService
              ? "3px solid #2874f0"
              : "3px solid transparent",
            transition: "0.3s",
          }}
        >
          Services
        </Box>
      </Box>

      {/* ===== PAGE CONTENT ===== */}
      <Box p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CartPage;