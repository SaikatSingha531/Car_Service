
import {
  Box,
  Card,
  Typography,
  IconButton,
  Container,
  Stack,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import {
  increaseService,
  decreaseService,
  removeService,
} from "../../Hooks/Redux-Toolkit/Slice/serviceCartSlice";

const CartService = () => {
  const dispatch = useAppDispatch();

  const { serviceProduct } = useAppSelector(
    (state) => state.serviceCart
  );

  // ✅ total price
  const totalPrice = serviceProduct.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        🛒 Your Service Cart
      </Typography>

      {/* ❌ Empty Cart */}
      {serviceProduct.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          {/* ✅ Cart Items */}
          <Stack spacing={3}>
            {serviceProduct.map((item) => (
              <Card
                key={item.$id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: "16px",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "12px",
                    mr: 2,
                  }}
                />

                {/* Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {item.name}
                  </Typography>

                  <Typography color="text.secondary">
                    ₹{item.price} × {item.quantity}
                  </Typography>

                  <Typography fontWeight={700}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>

                {/* Controls */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => dispatch(decreaseService(item))}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography>{item.quantity}</Typography>

                  <IconButton
                    onClick={() => dispatch(increaseService(item))}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>

                {/* Delete */}
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeService(item.$id))}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Stack>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />

          {/* Total */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" fontWeight={800}>
              ₹{totalPrice}
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartService;