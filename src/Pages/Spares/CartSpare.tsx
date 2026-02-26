import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../Hooks/Redux-Toolkit/Slice/Cart.slice";
import { useNavigate } from "react-router-dom";

const CartSpare = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartProduct } = useAppSelector((state) => state.cart);

  // 🛒 EMPTY CART
  if (cartProduct.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 12,
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
          🛒 Your cart is empty
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/spares")} // change route if needed
          sx={{
            bgcolor: "#d90000",
            px: 5,
            py: 1.2,
            fontWeight: 700,
            borderRadius: 2,
            "&:hover": { bgcolor: "#b80000" },
          }}
        >
          Go to Shop
        </Button>
      </Box>
    );
  }

  // 💰 TOTAL PRICE
  const totalPrice = cartProduct.reduce(
    (total, item: any) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ maxWidth: 1100, margin: "auto", mt: 4 }}>
      {/* TOTAL + ORDER BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "black" }}>
          Total: ₹{totalPrice}
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#d90000",
            fontWeight: 700,
            px: 4,
            "&:hover": { bgcolor: "#e8420a" },
          }}
        >
          Order Now
        </Button>
      </Box>

      {/* PRODUCT LIST */}
      {cartProduct.map((item: any) => (
        <Box key={item.$id}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              p: 2,
              alignItems: "center",
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
              mb: 2,
            }}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />

            {/* CENTER INFO */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18, color: "black" }}>
                {item.name}
              </Typography>

              <Typography sx={{ color: "green", fontSize: 14 }}>
                In stock
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#555" }}>
                Parts: {item.brand}
              </Typography>

              {/* QTY */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  width: "fit-content",
                  px: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => dispatch(decreaseQty(item.$id))}
                >
                  <RemoveIcon />
                </IconButton>

                <Typography sx={{ mx: 2, fontWeight: 600 }}>
                  {item.quantity}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => dispatch(increaseQty(item.$id))}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* DELETE */}
              <Box sx={{ mt: 1 }}>
                <Button
                  onClick={() => dispatch(removeFromCart(item.$id))}
                  startIcon={<DeleteIcon />}
                  sx={{ textTransform: "none", color: "#1976d2" }}
                >
                  Delete
                </Button>
              </Box>
            </Box>

            {/* PRICE */}
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 20, color: "black" }}>
                ₹{item.price * item.quantity}
              </Typography>
            </Box>
          </Box>

          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default CartSpare;