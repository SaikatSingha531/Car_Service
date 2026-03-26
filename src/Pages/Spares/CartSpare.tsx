import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../Hooks/Redux-Toolkit/Slice/Cart.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartSpare = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartProduct } = useAppSelector((state) => state.cart);

  const totalPrice = cartProduct.reduce(
    (total, item: any) => total + item.price * item.quantity,
    0
  );

  if (cartProduct.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: "#ccc" }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#333" }}>
          Your cart is feeling a bit light
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Add some spares to your cart and they will appear here.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/spares")}
          sx={{
            bgcolor: "#d90000",
            px: 6,
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "30px",
            "&:hover": { bgcolor: "#b80000" },
          }}
        >
          Browse Spares
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Spare Parts
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SIDE: PRODUCT LIST */}
        <Grid size={{ xs:12 ,md:8}}>
          <Stack spacing={2}>
            {cartProduct.map((item: any) => (
              <Paper
                key={item.$id}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #f0f0f0",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  {/* IMAGE */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: { xs: 100, sm: 140 },
                      height: { xs: 100, sm: 140 },
                      objectFit: "cover",
                      borderRadius: 2,
                      bgcolor: "#f9f9f9",
                    }}
                  />

                  {/* INFO */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                          Brand: <b>{item.brand}</b>
                        </Typography>
                        <Typography sx={{ color: "#2e7d32", fontSize: 12, fontWeight: 600, mt: 0.5 }}>
                          ● In stock
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>

                    {/* ACTIONS */}
                    <Box sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(decreaseQty(item.$id))}
                          sx={{ borderRadius: 0, p: 1 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(increaseQty(item.$id))}
                          sx={{ borderRadius: 0, p: 1 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Button
                        onClick={() => dispatch(removeFromCart(item.$id))}
                        startIcon={<DeleteOutlineIcon />}
                        size="small"
                        sx={{ 
                          textTransform: "none", 
                          color: "#999",
                          "&:hover": { color: "#d90000", bgcolor: "transparent" } 
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* RIGHT SIDE: SUMMARY */}
        <Grid size={{xs:12 ,md:4}} >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #f0f0f0",
              bgcolor: "#fcfcfc",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 3 }}>
              Order Summary
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={600}>₹{totalPrice.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography sx={{ color: "#2e7d32", fontWeight: 600 }}>FREE</Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Total</Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 900, color: "#d90000" }}>
                  ₹{totalPrice.toLocaleString()}
                </Typography>
              </Box>

              <Button
                fullWidth
                onClick={() => toast.warning("This Feature Is Under Development Mode")}
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  py: 1.8,
                  bgcolor: "#000", // Black buttons often look more premium than red
                  fontWeight: 700,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                Checkout Now
              </Button>
              
              <Typography sx={{ fontSize: 12, color: "text.secondary", textAlign: "center", mt: 2 }}>
                Secure Checkout Powered by Razorpay
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartSpare;