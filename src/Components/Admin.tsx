import React, { useState } from "react";
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
} from "@mui/material";

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

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    image: null,
    imagePreview: null,
  });

  const handleOpen = (menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      brand: "",
      description: "",
      price: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    console.log("Submitted Data:", formData);
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
            {/* Image Upload & Preview */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  border: "2px dashed #d32f2f",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  mb: 1,
                }}
              >
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ color: "#999" }}>No Image</span>
                )}
              </Box>

              <Button variant="outlined" component="label">
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>

            {/* Name */}
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Brand */}
            <FormControl fullWidth margin="dense">
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                label="Brand"
              >
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

            {/* Description */}
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />

            {/* Price */}
            <TextField
              fullWidth
              margin="dense"
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
