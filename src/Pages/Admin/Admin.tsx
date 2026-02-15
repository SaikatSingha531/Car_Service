import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewsSchema } from "../../Services/Validation/AuthValidation";




const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
  },
});

export default function SidebarPage() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewsSchema),
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

  const handleOpen = (menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              bgcolor: "#d32f2f",
              color: "white",
            },
          }}
        >
          <List>
            {["Services", "Parts", "Main Parts"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleOpen(text)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <h2 style={{ color: "#d32f2f" }}>
            Select an option from the sidebar
          </h2>
        </Box>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle
            sx={{
              color: "#d32f2f",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add {selectedMenu}
          </DialogTitle>

          <DialogContent>
            {/* Image Upload Area */}
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
                      width: "60%",
                      height: 240,
                      borderRadius: 3,
                      border: "2px dashed",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "0.3s",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    }}
                    component="label"
                  >
                    {previewProfilePic ? (
                      <Box
                        component="img"
                        src={previewProfilePic}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box textAlign="center">
                        <Typography fontWeight={500}>
                          Upload Image
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          JPG / PNG
                        </Typography>
                      </Box>
                    )}

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
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
                      size="small"
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
                  fullWidth
                  margin="dense"
                  label="Name"
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
                <FormControl
                  fullWidth
                  margin="dense"
                  error={!!errors.brand}
                >
                  <InputLabel>Brand</InputLabel>
                  <Select {...field} label="Brand">
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="BMW">BMW</MenuItem>
                    <MenuItem value="Mercedes">Mercedes</MenuItem>
                    <MenuItem value="Audi">Audi</MenuItem>
                    <MenuItem value="Ford">Ford</MenuItem>
                    <MenuItem value="Hyundai">Hyundai</MenuItem>
                    <MenuItem value="Kia">Kia</MenuItem>
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
                  fullWidth
                  margin="dense"
                  label="Description"
                  multiline
                  rows={3}
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
                  fullWidth
                  margin="dense"
                  label="Price"
                  type="number"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
