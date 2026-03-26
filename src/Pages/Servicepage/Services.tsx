"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import { fetchServices } from "../../Hooks/Redux-Toolkit/Slice/Service.slice";
import { addService } from "../../Hooks/Redux-Toolkit/Slice/serviceCartSlice";





const ServicesPage = () => {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.service);

  // --- STATES ---
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // --- LOGIC ---
  const filteredItems = useMemo(() => {
    return (items || []).filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleAddCart = (spare: any) => {
      if (role === "user" || role === "admin") {
        dispatch(addService(spare));
        toast.success(`${spare.name} added to cart`);
      } else {
        toast.error("Please login to continue");
      }
    };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: "#d32f2f" }} />
      </Box>
    );
  }

   

  return (
    <Box 
      sx={{ 
        background: "linear-gradient(180deg, #f4eeee 0%, #f8f9fa 100%)", 
        minHeight: "100vh", 
        py: { xs: 4, md: 8 } 
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography 
            variant="h3" 
            sx={{ fontWeight: 900, color: "#1a1a1a", mb: 1, letterSpacing: "-1px" }}
          >
            Our Professional <span style={{ color: "#d32f2f" }}>Services</span>
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", mb: 4, maxWidth: 600, mx: "auto" }}>
            Expert solutions tailored to your needs. Book an appointment with our specialists today.
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <TextField
              fullWidth
              placeholder="Search services or categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  bgcolor: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  px: 2,
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": { borderColor: "#d32f2f" },
                },
              }}
            />
          </Box>
        </Box>

        {/* --- GRID VIEW --- */}
        {currentItems.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              mb: 8,
            }}
          >
            {currentItems.map((service: any) => (
              <Card
                key={service.$id}
                sx={{
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: "1px solid #eee",
                  bgcolor: "#fff",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": { 
                    transform: "translateY(-12px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)" 
                  },
                }}
              >
                {/* Image Wrap */}
                <Box sx={{ position: "relative", width: "100%", pt: "60%" }}>
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.name}
                    sx={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%", objectFit: "cover",
                    }}
                  />
                  <Chip 
                    label={service.category} 
                    size="small"
                    sx={{ 
                      position: "absolute", top: 15, right: 15, 
                      bgcolor: "rgba(255,255,255,0.9)", 
                      fontWeight: 700, color: "#d32f2f",
                      backdropFilter: "blur(4px)"
                    }} 
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}>
                    {service.name}
                  </Typography>
                  
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="caption" color="text.secondary">{service.duration} Hour</Typography>
                    </Box>
                  </Stack>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#777", 
                      mb: 2, 
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Divider sx={{ mb: 2, mt: "auto" }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Price Starts At</Typography>
                        <Typography sx={{ fontWeight: 900, fontSize: "1.4rem", color: "#1a1a1a" }}>
                          ₹{service.price}
                        </Typography>
                    </Box>
                    <Button
                      onClick={() => handleAddCart(service)}
                      variant="contained"
                      sx={{ 
                        bgcolor: "#d32f2f", 
                        borderRadius: "12px", 
                        px: 3,
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#b71c1c" }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <RoomServiceIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              We couldn't find any services matching "{searchQuery}"
            </Typography>
          </Box>
        )}

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <Stack alignItems="center" sx={{ mt: 2, mb: 6 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(_e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
              sx={{
                "& .Mui-selected": { 
                    bgcolor: "#d32f2f !important", 
                    color: "#fff",
                    boxShadow: "0 4px 10px rgba(211, 47, 47, 0.3)"
                },
              }}
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ServicesPage;