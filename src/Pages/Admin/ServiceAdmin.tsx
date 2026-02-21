import { useState } from "react";
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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SparesSchema } from "../../Services/Validation/AuthValidation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
  },
});

export default function ServiceAdmin() {
  const [open, setOpen] = useState(false);

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
      image: null,
      imagePreview: null,
    },
  });

  const previewProfilePic = watch("imagePreview");

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Top Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="primary">
            All Services
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(true)}
          >
            Add Services
          </Button>
        </Box>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header */}
            <Box
              px={3}
              py={2}
              borderBottom="1px solid"
              borderColor="divider"
            >
              <Typography variant="h5" fontWeight="bold" color="primary">
                Add Service
              </Typography>
            </Box>

            {/* Content */}
            <DialogContent sx={{ mt: 2 }}>
              {/* Image upload */}
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
                      {previewProfilePic ? (
                        <Box
                          component="img"
                          src={previewProfilePic}
                          si={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box textAlign="center">
                          <Typography fontWeight={600}>
                            Upload Image
                          </Typography>
                          <Typography variant="caption">
                            JPG / PNG
                          </Typography>
                        </Box>
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

                    {previewProfilePic && (
                      <Button
                        color="error"
                        onClick={() => {
                          setValue("image", null);
                          setValue("imagePreview", null);
                        }}
                      >
                        Remove Image
                      </Button>
                    )}

                    {errors.image && (
                      <Typography color="error" variant="caption">
                        {errors.image.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />

              {/* Name */}
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

              {/* Brand */}
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="dense" error={!!errors.brand}>
                    <InputLabel>Brand</InputLabel>
                    <Select {...field} label="Brand">
                      <MenuItem value="Toyota">Toyota</MenuItem>
                      <MenuItem value="Honda">Honda</MenuItem>
                      <MenuItem value="BMW">BMW</MenuItem>
                      <MenuItem value="Audi">Audi</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {/* Description */}
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

              {/* Price */}
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    margin="dense"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">
                Add Service
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
