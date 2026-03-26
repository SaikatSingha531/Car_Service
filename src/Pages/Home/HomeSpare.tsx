import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Skeleton,
  Container,
  Stack,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";
import { fetchSpare } from "../../Hooks/Redux-Toolkit/Slice/Spare.slice";
import { useNavigate } from "react-router-dom";

const HomeSpare = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector((state) => state.spare);

  useEffect(() => {
    dispatch(fetchSpare());
  }, [dispatch]);

  // Showing 5 items for a perfect professional balance
  const displayItems = items.slice(0, 5);

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        width: "100%", 
        // Elegant Deep Reddish Gradient (Automotive Theme)
        background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative accent glow */}
      <Box sx={{
        position: "absolute",
        top: "-10%",
        right: "10%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(216, 67, 21, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <Container maxWidth="lg"> 
        {/* Centered Heading Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{ 
              fontWeight: 800, 
              color: "#ff3d00", 
              letterSpacing: 4,
              textShadow: "0 0 10px rgba(255, 61, 0, 0.3)"
            }}
          >
            PREMIUM INVENTORY
          </Typography>
          <Typography
            variant="h3"
            sx={{ 
              fontWeight: 900, 
              color: "#fff", 
              mt: 1,
              fontSize: { xs: "2.2rem", md: "3rem" },
              textTransform: "uppercase",
              letterSpacing: -1
            }}
          >
            Explore <span style={{ color: "#ff3d00" }}>Genuine</span> Spares
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: "#ff3d00", mx: "auto", mt: 2, borderRadius: 2 }} />
        </Box>

        {loading ? (
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Grid
              size={{xs:6,sm:4,md:2.4}}
key={i}>
                <Skeleton 
                  variant="rounded" 
                  height={260} 
                  sx={{ borderRadius: 4, bgcolor: "rgba(255,255,255,0.05)" }} 
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack spacing={6} alignItems="center">
            <Grid container spacing={2.5} justifyContent="center">
              {displayItems.map((item) => (
                <Grid size={{xs:6 ,sm:4, md:2.4}}  key={item.$id}>
                  <Card
                    elevation={0}
                    onClick={() => navigate(`/spares/${item.$id}`)}
                    sx={{
                      height: "100%",
                      borderRadius: 5,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      cursor: "pointer",
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        borderColor: "#ff3d00",
                        background: "rgba(255, 255, 255, 0.07)",
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        "& .part-image": { transform: "scale(1.1)" }
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 3, 
                        display: "flex", 
                        justifyContent: "center",
                        height: 160,
                        alignItems: "center"
                      }}
                    >
                      <CardMedia
                        className="part-image"
                        component="img"
                        image={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        sx={{
                          height: "100%",
                          width: "auto",
                          objectFit: "contain",
                          transition: "0.4s ease",
                          filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.5))"
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2, textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: "#fff",
                          fontSize: "0.95rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#ff3d00", fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                        In Stock • OEM
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Centered Large View Button */}
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/spares")}
              endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: "14px !important" }} />}
              sx={{ 
                px: 6,
                py: 2,
                borderRadius: "50px",
                backgroundColor: "#ff3d00",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                boxShadow: "0 10px 25px rgba(255, 61, 0, 0.3)",
                transition: "0.3s all ease",
                "&:hover": { 
                  backgroundColor: "#d13200",
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 30px rgba(255, 61, 0, 0.5)",
                } 
              }}
            >
              View All Spares
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default HomeSpare;