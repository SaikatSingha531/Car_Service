import { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../Hooks/Utils/redux";
import { fetchSpare } from "../Hooks/Redux-Toolkit/Slice/Spare.slice";
import { addToCart } from "../Hooks/Redux-Toolkit/Slice/Cart.slice";
import { toast } from "sonner";

const SparePage = () => {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.spare);
  // const { cartProduct, count } = useAppSelector((state) => state.cart);

  // console.log("single cart item ", cartProduct, "count:", count);

  useEffect(() => {
    dispatch(fetchSpare());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAddCart = (spare: any) => {
    if (role === "user" || role === "admin") {
      dispatch(addToCart(spare));
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <Box sx={{ background: "#f2f2f2", minHeight: "100vh", p: 4 }}>
      <Grid container spacing={3}>
        {items.map((spare: any) => {
          const discountPrice = spare.price;
          const originalPrice = discountPrice + 500;

          return (
            <Grid item xs={12} sm={6} md={4} key={spare.$id}>
              <Card
                sx={{
                  height: 470,
                  borderRadius: 2,
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  p: 2,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Small Logo */}
                <Box
                  component="img"
                  src="https://media.istockphoto.com/id/2164899850/vector/timing-belt-repair-icon-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=VQ_OOTklM5FfLdwwsqW9H8k20ipvHLknjzG55h3A9Mg="
                  sx={{
                    width: 40,
                    position: "absolute",
                    top: 15,
                    left: 15,
                    opacity: 0.6,
                  }}
                />

                {/* Rating Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                    bgcolor: "#c62828",
                    color: "#fff",
                    px: 1.2,
                    py: 0.4,
                    borderRadius: 1,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  4.2 ★
                </Box>

                {/* Image */}
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                  }}
                >
                  <Box
                    component="img"
                    src={spare.image}
                    alt={spare.name}
                    sx={{
                      maxHeight: 160,
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box>
                  {/* Title */}
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 15,
                      mt: 2,
                      minHeight: 45,
                    }}
                  >
                    {spare.name}
                  </Typography>

                  {/* Brand */}
                  <Typography sx={{ fontSize: 13, color: "#777", mt: 1 }}>
                    Brand Name: {spare.brand}
                  </Typography>

                  {/* Part ID */}
                  <Typography sx={{ fontSize: 13, color: "#777" }}>
                    Part ID: {spare.$id}
                  </Typography>

                  {/* Price */}
                  <Box mt={1}>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#000",
                        mr: 1,
                      }}
                    >
                      ₹{discountPrice}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "#888",
                        fontSize: 14,
                      }}
                    >
                      ₹{originalPrice}
                    </Typography>
                  </Box>
                </Box>

                {/* Bottom Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {/* Discount Box */}
                  <Box
                    sx={{
                      bgcolor: "#c8e6c9",
                      color: "#2e7d32",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    20% OFF
                  </Box>

                  {/* Add Button */}
                  <Button
                    onClick={() => handleAddCart(spare)}
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      bgcolor: "#d84315",
                      fontWeight: 700,
                      borderRadius: 1,
                      textTransform: "uppercase",
                      px: 3,
                      "&:hover": {
                        bgcolor: "#bf360c",
                      },
                    }}
                  >
                    ADD
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SparePage;