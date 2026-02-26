import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SparesSchema } from "../../Services/Validation/AuthValidation";
import {
  addSpare,
  fetchSpare,
  deleteSpare,
  updateSpare,
} from "../../Hooks/Redux-Toolkit/Slice/Spare.slice";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
  },
});

interface SpareFormValues {
  name: string;
  brand: string;
  description: string;
  price: string;
  image?: File;
  imagePreview?: string;
}

export default function SparesAdmin() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading, items } = useAppSelector((state) => state.spare);

  useEffect(() => {
    dispatch(fetchSpare());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SpareFormValues>({
    resolver: yupResolver(SparesSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      price: "",
      image: undefined,
      imagePreview: undefined,
    },
  });

  const previewImage = watch("imagePreview");

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    reset();
  };

  const handleAddClick = () => {
    setEditId(null);
    reset();
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditId(item.$id);
    setValue("name", item.name);
    setValue("brand", item.brand);
    setValue("description", item.description);
    setValue("price", item.price);
    setOpen(true);
  };

  const onSubmit = async (data: SpareFormValues) => {
    if (editId) {
      await dispatch(
        updateSpare({
          id: editId,
          formData: {
            name: data.name,
            brand: data.brand,
            description: data.description,
            price: data.price,
          },
        })
      );
    } else {
      await dispatch(addSpare(data));
    }

    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="primary">
            Spare Parts
          </Typography>

          <Button variant="contained" onClick={handleAddClick}>
            Add Product
          </Button>
        </Box>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box px={3} py={2} borderBottom="1px solid" borderColor="divider">
              <Typography variant="h5" fontWeight="bold" color="primary">
                {editId ? "Edit Product" : "Add Product"}
              </Typography>
            </Box>

            <DialogContent sx={{ mt: 2 }}>
              {/* IMAGE (Only in Add Mode) */}
              {!editId && (
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={2}
                      mb={2}
                    >
                      <Box
                        sx={{
                          width: "70%",
                          height: 240,
                          borderRadius: 3,
                          border: "2px dashed",
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          overflow: "hidden",
                          "&:hover": { borderColor: "primary.main" },
                        }}
                        component="label"
                      >
                        {previewImage ? (
                          <Box
                            component="img"
                            src={previewImage}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Typography>Upload Image</Typography>
                        )}

                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setValue(
                                "imagePreview",
                                URL.createObjectURL(file)
                              );
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                />
              )}

              {/* NAME */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              {/* BRAND */}
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="dense" error={!!errors.brand}>
                    <InputLabel>Parts</InputLabel>
                    <Select {...field} label="Parts">
                      <MenuItem value="Bumper">Bumper</MenuItem>
                      <MenuItem value="Fender">Fender</MenuItem>
                      <MenuItem value="Hood">Hood</MenuItem>
                      <MenuItem value="Windshield">Windshield</MenuItem>
                      <MenuItem value="Battery">Battery</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {/* DESCRIPTION */}
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    margin="dense"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />

              {/* PRICE */}
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    fullWidth
                    margin="dense"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Product"
                  : "Save Product"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* TABLE */}
        <Box mt={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Parts Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items?.length > 0 ? (
                  items.map((item: any) => (
                    <TableRow key={item.$id}>
                      <TableCell>
                        {item.image ? (
                          <Box
                            component="img"
                            src={item.image}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 2,
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>

                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>₹ {item.price}</TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() =>
                            dispatch(deleteSpare(item.$id))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Products Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}