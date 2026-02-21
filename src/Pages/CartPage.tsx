import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSpare = location.pathname.includes("cartspare") || location.pathname === "/cart";
  const isService = location.pathname.includes("cartservice");

  const shopNow =()=>{
    if(isSpare === true){
      navigate("/spares")
    }else if(isService === true ){
      navigate("/service")
    }
  } 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f1f3f6",
        py: 4,
      }}
    >
      {/* MAIN CONTAINER */}
      <Box
        sx={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* ===== TOP TABS CENTERED ===== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // ⭐ CENTERED
            gap: 8, // space between tabs
            pt: 3,
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Spare Tab */}
          <Box
            onClick={() => navigate("/cart/cartspare")}
            sx={{
              cursor: "pointer",
              pb: 1.5,
              fontWeight: 500,
              fontSize: 17,
              color: isSpare ? "#2874f0" : "#444",
              borderBottom: isSpare
                ? "3px solid #2874f0"
                : "3px solid transparent",
              transition: "0.3s",
              minWidth: 150,
              textAlign: "center",
            }}
          >
            Spare Parts (0)
          </Box>

          {/* Service Tab */}
          <Box
            onClick={() => navigate("/cart/cartservice")}
            sx={{
              cursor: "pointer",
              pb: 1.5,
              fontWeight: 500,
              fontSize: 17,
              color: isService ? "#2874f0" : "#444",
              borderBottom: isService
                ? "3px solid #2874f0"
                : "3px solid transparent",
              transition: "0.3s",
              minWidth: 150,
              textAlign: "center",
            }}
          >
            Services
          </Box>
        </Box>

        {/* ===== EMPTY CART UI ===== */}
        <Box sx={{ p: 6, textAlign: "center" }}>
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: 120, color: "#c7c7c7", mb: 2 }}
          />

          <Typography fontSize={20} mb={2} color="#444">
            Your basket is empty!
          </Typography>

          <Button
            variant="contained"
            onClick={() => shopNow()}
            sx={{
              bgcolor: "#2874f0",
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: 1,
              "&:hover": { bgcolor: "#1c5ed6" },
            }}
          >
            Shop now
          </Button>

          {/* outlet */}
          <Box mt={4}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;