import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import {
  increaseService,
  decreaseService,
  removeService,
} from "../../Hooks/Redux-Toolkit/Slice/serviceCartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { serviceProduct } = useAppSelector((state) => state.serviceCart);

  const totalPrice = serviceProduct.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (serviceProduct.length === 0) {
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
        <BuildCircleOutlinedIcon sx={{ fontSize: 80, color: "#ccc" }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#333" }}>
          No services selected
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Your service cart is empty. Explore our expert maintenance packages.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/services")}
          sx={{
            bgcolor: "#000",
            px: 6,
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "30px",
            "&:hover": { bgcolor: "#222" },
          }}
        >
          View Services
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Service Summary
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT SIDE: SERVICE LIST */}
        <Grid size={{xs:12 ,md:8}} >
          <Stack spacing={2}>
            {serviceProduct.map((item) => (
              <Paper
                key={item.$id}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  border: "1px solid #f0f0f0",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  {/* SERVICE IMAGE */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: { xs: 90, sm: 120 },
                      height: { xs: 90, sm: 120 },
                      objectFit: "cover",
                      borderRadius: 3,
                      bgcolor: "#f9f9f9",
                    }}
                  />

                  {/* SERVICE INFO */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                          Professional Maintenance
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
                          borderRadius: "10px",
                          bgcolor: "#fff",
                        }}
                      >
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(decreaseService(item))}
                          sx={{ p: 1 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1.5, fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(increaseService(item))}
                          sx={{ p: 1 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Button
                        onClick={() => dispatch(removeService(item.$id))}
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

        {/* RIGHT SIDE: BOOKING SUMMARY */}
        <Grid size={{xs:12, md:4}} >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #f0f0f0",
              bgcolor: "#fcfcfc",
              position: "sticky",
              top: 100,
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 3 }}>
              Booking Details
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Estimated Labor</Typography>
                <Typography fontWeight={600}>₹{totalPrice.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Service Tax (GST)</Typography>
                <Typography sx={{ fontWeight: 600 }}>Inc. in price</Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Total Payable</Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 900, color: "#1a1a1a" }}>
                  ₹{totalPrice.toLocaleString()}
                </Typography>
              </Box>

              <Button
                fullWidth
                onClick={() => toast.warning("Booking system is in Development Mode")}
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  py: 2,
                  bgcolor: "#d90000",
                  fontWeight: 700,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": { bgcolor: "#b80000" },
                  boxShadow: "0 4px 14px 0 rgba(217,0,0,0.39)",
                }}
              >
                Confirm Booking
              </Button>
              
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                 <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Verified Experts
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Doorstep Service
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartService;