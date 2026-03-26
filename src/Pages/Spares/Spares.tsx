import { useEffect, useState, useMemo } from "react"; // Added useMemo for performance
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // You'll need to install @mui/icons-material

import { toast } from "sonner";
import { addToCart } from "../../Hooks/Redux-Toolkit/Slice/Cart.slice";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import { fetchSpare } from "../../Hooks/Redux-Toolkit/Slice/Spare.slice";

const SparePage = () => {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.spare);

  // --- STATES ---
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchSpare());
  }, [dispatch]);

  // --- SEARCH & PAGINATION LOGIC ---
  
  // 1. Filter items based on search query (Name or Brand)
  const filteredItems = useMemo(() => {
    return items.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // 2. Calculate items for the current page based on FILTERED results
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handleAddCart = (spare: any) => {
    if (role === "user" || role === "admin") {
      dispatch(addToCart(spare));
      toast.success(`${spare.name} added to cart`);
    } else {
      toast.error("Please login to continue");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: "#ef6c00" }} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", 
        minHeight: "100vh", 
        py: { xs: 4, md: 8 } 
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 800, color: "#1a1a1a", mb: 1 }}
          >
            Premium Spare Parts
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
            High-quality components for peak performance.
          </Typography>

          {/* --- SEARCH BAR --- */}
          <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or brand..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#ef6c00" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  bgcolor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#ef6c00" },
                  "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
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
              gap: 4,
              mb: 8,
            }}
          >
            {currentItems.map((spare: any) => (
              <Card
                key={spare.$id}
                sx={{
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                {/* IMAGE */}
                <Box sx={{ position: "relative", width: "100%", pt: "75%" }}>
                  <Box
                    component="img"
                    src={spare.image}
                    alt={spare.name}
                    sx={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%", objectFit: "cover",
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="overline" sx={{ color: "#ef6c00", fontWeight: 700 }}>
                    {spare.brand}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>
                    {spare.name}
                  </Typography>
                  <Box sx={{ mt: "auto", pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.25rem" }}>
                      ₹{spare.price}
                    </Typography>
                    <Button
                      onClick={() => handleAddCart(spare)}
                      variant="contained"
                      sx={{ bgcolor: "#ef2000", borderRadius: "12px", textTransform: "none" }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          /* NO RESULTS STATE */
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h6" color="textSecondary">
              No spare parts found matching "{searchQuery}"
            </Typography>
          </Box>
        )}

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" sx={{ mt: 4, mb: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              size="large"
              sx={{
                "& .Mui-selected": { bgcolor: "#ef6c00 !important", color: "#fff" },
              }}
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default SparePage;