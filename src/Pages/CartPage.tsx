import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppSelector } from "../Hooks/Utils/redux";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { count: spare } = useAppSelector((state) => state.cart);
  const { count: service } = useAppSelector((state) => state.serviceCart);

  // ⭐ default spare active when /cart open
  const isSpare =
    location.pathname === "/cart" || location.pathname.includes("cartspare");

  const isService = location.pathname.includes("cartservice");

  return (
    <Box
      sx={{
        maxWidth: 1100,
        margin: "40px auto",
        background: "#efeaea",
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
            fontWeight: 600, // Slightly bolder for better readability
            fontSize: 16,
            minWidth: 150,
            textAlign: "center",
            display: "flex", // Added flex to align text and badge
            alignItems: "center",
            justifyContent: "center",
            gap: 1, // Space between text and span
            color: isSpare ? "#2874f0" : "#555",
            borderBottom: isSpare
              ? "3px solid #2874f0"
              : "3px solid transparent",
            transition: "0.3s",
            "&:hover": {
              color: "#2874f0",
            },
          }}
        >
          Spare Parts
          {spare > 0 && ( // Only show badge if there are items
            <Box
              component="span"
              sx={{
                bgcolor: "#d90000", // Professional Deep Red
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                minWidth: "20px",
                height: "20px",
                borderRadius: "50%", // Perfectly circular
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.6,
                boxShadow: "0 2px 4px rgba(217, 0, 0, 0.2)", // Subtle red glow
              }}
            >
              {spare}
            </Box>
          )}
        </Box>

        {/* Services */}
       <Box
  onClick={() => navigate("/cart/cartservice")}
  sx={{
    cursor: "pointer",
    pb: 1.5,
    fontWeight: 600, // Matches the Spare Parts font weight
    fontSize: 16,
    minWidth: 150,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1, // Space between text and red badge
    color: isService ? "#2874f0" : "#555",
    borderBottom: isService ? "3px solid #2874f0" : "3px solid transparent",
    transition: "0.3s",
    "&:hover": {
      color: "#2874f0",
    },
  }}
>
  Services
  {service > 0 && (
    <Box
      component="span"
      sx={{
        bgcolor: "#d90000", // Same professional deep red
        color: "#fff",
        fontSize: "11px",
        fontWeight: 700,
        minWidth: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 0.6,
        boxShadow: "0 2px 4px rgba(217, 0, 0, 0.2)", // Matching subtle shadow
      }}
    >
      {service}
    </Box>
  )}
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
