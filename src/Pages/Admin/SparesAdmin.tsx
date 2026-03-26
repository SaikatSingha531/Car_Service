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
  Stack,
  Grid,
  FormHelperText,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

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
      main: "#d32f2f", // Core Red Theme
    },
    background: {
      default: "#f8f9fa",
    },
  },
  shape: {
    borderRadius: 4, // Professional sharp-ish corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, backgroundColor: "#fcfcfc" },
      },
    },
  },
});

export default function SparesAdmin() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.spare);

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
  } = useForm({
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

  const onSubmit = async (data: any) => {
    if (editId) {
      await dispatch(updateSpare({ id: editId, formData: data }));
    } else {
      await dispatch(addSpare(data));
    }
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          {/* Dashboard Header */}
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Inventory Management</Typography>
              <Typography variant="body2" color="text.secondary">Manage your auto-parts catalog and pricing.</Typography>
            </Box>
            <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={() => { setEditId(null); reset(); setOpen(true); }}>
              Add Product
            </Button>
          </Box>

          {/* Inventory Table */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ITEM</TableCell>
                  <TableCell>PARTS</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item: any) => (
                  <TableRow key={item.$id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box component="img" src={item.image} sx={{ width: 44, height: 44, borderRadius: 1, objectFit: 'cover', border: '1px solid #eee' }} />
                        <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell sx={{ color: '#d32f2f', fontWeight: 700 }}>₹{item.price}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => { setEditId(item.$id); setOpen(true); setValue("name", item.name); }}><EditOutlinedIcon fontSize="inherit" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => dispatch(deleteSpare(item.$id))}><DeleteOutlineIcon fontSize="inherit" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* --- ALIGNED FORM DIALOG --- */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 1 } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight={800}>
                  {editId ? "Update Spare Part" : "Create New Spare Part"}
                </Typography>
              </Box>

              <DialogContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  
                  {/* Image Upload Row - Aligned horizontally */}
                  {!editId && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, border: '1px solid #eee', borderRadius: 1, bgcolor: '#fafafa' }}>
                      <Box sx={{ width: 80, height: 80, borderRadius: 1, bgcolor: '#fff', border: '1px solid #ddd', overflow: 'hidden', flexShrink: 0 }}>
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <PhotoCameraOutlinedIcon sx={{ color: '#ccc' }} />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Product Photo</Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>JPG, PNG or WEBP. Max 2MB.</Typography>
                        <Button component="label" variant="outlined" size="small" sx={{ fontSize: '0.75rem' }}>
                          Upload Image
                          <input hidden type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setValue("imagePreview", URL.createObjectURL(file));
                          }} />
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* General Info Row */}
                  <Controller name="name" control={control} render={({ field }) => (
                    <TextField {...field} label="Product Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
                  )} />

                  {/* Two-Column Alignment for Category & Price */}
                  <Grid container spacing={2}>
                    <Grid size={{xs:6}}>
                      <Controller name="brand" control={control} render={({ field }) => (
                        <FormControl fullWidth error={!!errors.brand}>
                          <InputLabel>Category</InputLabel>
                          <Select {...field} label="Category">
                            <MenuItem value="Bumper">Bumper</MenuItem>
                            <MenuItem value="Fender">Fender</MenuItem>
                            <MenuItem value="Hood">Hood</MenuItem>
                            <MenuItem value="Battery">Battery</MenuItem>
                          </Select>
                          <FormHelperText>{errors.brand?.message}</FormHelperText>
                        </FormControl>
                      )} />
                    </Grid>
                    <Grid size={{xs:6}}>
                      <Controller name="price" control={control} render={({ field }) => (
                        <TextField {...field} label="Price (₹)" fullWidth error={!!errors.price} helperText={errors.price?.message} />
                      )} />
                    </Grid>
                  </Grid>

                  <Controller name="description" control={control} render={({ field }) => (
                    <TextField {...field} label="Description" multiline rows={3} fullWidth error={!!errors.description} helperText={errors.description?.message} />
                  )} />
                </Stack>
              </DialogContent>

              <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
                <Button variant="contained" type="submit" disableElevation sx={{ px: 4, fontWeight: 700 }}>
                  {editId ? "Update Product" : "Save Product"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}