"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceSchema } from "../../Services/Validation/AuthValidation";

import {
  fetchServices,
  addService,
  deleteService,
  updateService,
} from "../../Hooks/Redux-Toolkit/Slice/Service.slice";

import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";

const theme = createTheme({
  palette: {
    primary: { main: "#1a73e8" }, // Modern Blue
    error: { main: "#d32f2f" },
    background: { default: "#f4f7fe" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: { fontWeight: 700 },
  },
});

export default function ServiceAdmin() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { },
  } = useForm({
    resolver: yupResolver(ServiceSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      imagePreview: "",
    },
  });

  const previewImage = watch("imagePreview");

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      if (editId) {
        await dispatch(updateService({ id: editId, formData: data })).unwrap();
      } else {
        await dispatch(addService(data)).unwrap();
      }
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
        <Container maxWidth="lg">
          {/* HEADER SECTION */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h5" color="text.primary">
                Service Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create, edit, and manage your business offerings.
              </Typography>
            </Box>

            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              onClick={() => {
                setEditId(null);
                reset();
                setOpen(true);
              }}
              sx={{ px: 3, py: 1, textTransform: "none", fontWeight: 600 }}
            >
              Add New Service
            </Button>
          </Box>

          {/* TABLE SECTION */}
          <TableContainer 
            component={Paper} 
            elevation={0} 
            sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden" }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#fafafa" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>SERVICE DETAILS</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>CATEGORY</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>DURATION</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>PRICE</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items?.map((item: any) => (
                  <TableRow 
                    key={item.$id} 
                    hover 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: '0.2s' }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar 
                          src={item.image} 
                          variant="rounded" 
                          sx={{ width: 48, height: 48, bgcolor: 'primary.light' }}
                        >
                          {item.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: 'block' }}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip label={item.category} size="small" variant="outlined" sx={{ fontWeight: 500 }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.duration} mins</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary.main" fontWeight={700}>
                        ₹{item.price}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditId(item.$id);
                            setOpen(true);
                            setValue("name", item.name);
                            setValue("category", item.category);
                            setValue("price", item.price);
                            setValue("duration", item.duration);
                            setValue("description", item.description);
                          }}
                          sx={{ color: "text.secondary", "&:hover": { color: "primary.main", bgcolor: "primary.light" } }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => dispatch(deleteService(item.$id))}
                          sx={{ "&:hover": { bgcolor: "#fff5f5" } }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* MODAL / DIALOG */}
      <Dialog 
  open={open} 
  onClose={handleClose} 
  maxWidth="sm" 
  fullWidth
  PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
>
  <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
    {editId ? "Edit Service" : "Create New Service"}
  </DialogTitle>
  
  <form onSubmit={handleSubmit(onSubmit)}>
    <DialogContent>
      <Stack spacing={3}>
        
        {/* IMAGE UPLOAD SECTION */}
        <Box 
          sx={{ 
            border: "2px dashed", 
            borderColor: "divider", 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            bgcolor: '#fafafa',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': { borderColor: 'primary.main', bgcolor: '#f0f7ff' }
          }}
          component="label"
        >
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file);
                setValue("imagePreview", URL.createObjectURL(file));
              }
            }}
          />
          {previewImage ? (
            <Stack alignItems="center">
              <Avatar src={previewImage} sx={{ width: 100, height: 100, mb: 1 }} variant="rounded" />
              <Typography variant="caption" color="primary" fontWeight={600}>Change Image</Typography>
            </Stack>
          ) : (
            <Stack alignItems="center" spacing={1}>
              <PhotoCameraOutlinedIcon sx={{ fontSize: 32, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Click to upload service thumbnail
              </Typography>
            </Stack>
          )}
        </Box>

        {/* FORM FIELDS */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Service Name" placeholder="e.g. Haircut & Styling" variant="outlined" />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Category" placeholder="e.g. Wellness" />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Duration (mins)" placeholder="30" />
            )}
          />
        </Stack>

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Price (₹)" variant="outlined" />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Description" multiline rows={3} variant="outlined" />
          )}
        />
      </Stack>
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={handleClose} sx={{ color: "text.secondary", textTransform: 'none' }}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        variant="contained" 
        disableElevation 
        sx={{ px: 4, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
      >
        {editId ? "Update Service" : "Create Service"}
      </Button>
    </DialogActions>
  </form>
</Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}