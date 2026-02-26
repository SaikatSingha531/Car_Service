import { useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "sonner";
import { addToCart } from "../../Hooks/Redux-Toolkit/Slice/Cart.slice";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import { fetchSpare } from "../../Hooks/Redux-Toolkit/Slice/Spare.slice";

const SparePage = () => {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.spare);

  useEffect(() => {
    dispatch(fetchSpare());
  }, [dispatch]);

  const handleAddCart = (spare: any) => {
    if (role === "user" || role === "admin") {
      dispatch(addToCart(spare));
      toast.success("Added to cart");
    } else {
      toast.error("Please login first");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", p: 4 }}>
      {/* GRID CONTAINER */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(1, 1fr)", // 5 per row
          },
          gap: 3,
        }}
      >
        {items.map((spare: any) => (
          <Card
            key={spare.$id}
            sx={{
              borderRadius: 3,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 320,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "0.3s",
              position: "relative",
              "&:hover": {
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              },
            }}
          >
            {/* Rating Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "#d32f2f",
                color: "#fff",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              4.2 ★
            </Box>

            {/* IMAGE */}
            <Box display="flex" justifyContent="center" mt={1}>
              <Box
                sx={{
                  width: "100%",
                  height: 140,
                  overflow: "hidden",
                  borderRadius: 2,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Box
                  component="img"
                  src={spare.image}
                  alt={spare.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>

            {/* CONTENT */}
            <Box mt={1} flexGrow={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  minHeight: 36,
                  color: "#000",
                  textAlign: "center",
                }}
              >
                {spare.name}
              </Typography>

              <Typography sx={{ fontSize: 12, color: "#666" }}>
                Parts: {spare.brand}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#777",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {spare.description}
              </Typography>

              <Box mt={0.5}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 700, fontSize: 16, mr: 1,color: "#000" }}
                >
                  ₹{spare.price}
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: 13,
                  }}
                >
                  ₹{spare.price + 500}
                </Typography>
              </Box>
            </Box>

            {/* BOTTOM */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#e8f5e9",
                  color: "#2e7d32",
                  px: 1.2,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                20% OFF
              </Box>

              <Button
                onClick={() => handleAddCart(spare)}
                variant="contained"
                startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
                sx={{
                  bgcolor: "#ef6c00",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 13,
                  px: 2,
                  py: 0.5,
                  "&:hover": {
                    bgcolor: "#e65100",
                  },
                }}
              >
                Add
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SparePage;