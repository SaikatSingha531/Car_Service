import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Typography, Grid, Card, CardMedia, CardContent,
  Button, Skeleton, Stack 
} from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { fetchServices } from "../../Hooks/Redux-Toolkit/Slice/Service.slice";
import { useAppDispatch, useAppSelector } from "../../Hooks/Utils/redux";

const HomeService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector((state) => state.service);
  
  // Exactly 5 items for that perfect professional balance
  const displayItems = items.slice(0, 5);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        width: "100%", 
        // Identical Elegant Deep Reddish Gradient
        background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Identical Decorative accent glow */}
      <Box sx={{
        position: "absolute",
        top: "-10%",
        right: "10%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(216, 67, 21, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        
        {/* Centered Heading Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{ 
              fontWeight: 800, 
              color: "#ff3d00", 
              letterSpacing: 4,
              textShadow: "0 0 10px rgba(255, 61, 0, 0.3)",
              display: "block"
            }}
          >
            EXPERT SOLUTIONS
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
            Our Professional <span style={{ color: "#ff3d00" }}>Services</span>
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: "#ff3d00", mx: "auto", mt: 2, borderRadius: 2 }} />
        </Box>

        {loading && items.length === 0 ? (
          <Grid container spacing={2.5} justifyContent="center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Grid size={{xs:6 ,sm:4 ,md:2.4}}  key={i}>
                <Skeleton 
                  variant="rounded" 
                  height={260} 
                  sx={{ borderRadius: 5, bgcolor: "rgba(255,255,255,0.05)" }} 
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack spacing={6} alignItems="center">
            <Grid container spacing={2.5} justifyContent="center">
              {displayItems.map((service: any) => (
                <Grid size={{xs:6 ,sm:4 ,md:2.4}}  key={service.$id}>
                  <Card 
                    elevation={0} 
                    onClick={() => navigate(`/service/${service.$id}`)}
                    sx={{ 
                      borderRadius: 5, 
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      height: '100%',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden',
                      '&:hover': { 
                        transform: 'translateY(-10px)',
                        background: 'rgba(255, 255, 255, 0.07)',
                        borderColor: '#ff3d00',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        '& .service-img': { transform: 'scale(1.1)' }
                      }
                    }}
                  >
                    {/* Media Area */}
                    <Box sx={{ p: 3, textAlign: 'center', height: 160, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                      <CardMedia
                        className="service-img"
                        component="img"
                        image={service.image || "https://via.placeholder.com/300"}
                        alt={service.name}
                        sx={{ 
                          height: "100%", 
                          width: "auto",
                          objectFit: 'contain', 
                          mx: 'auto',
                          transition: '0.4s ease',
                          filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.5))"
                        }}
                      />
                    </Box>

                    {/* Content Area - Dark Overlay Style */}
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
                        {service.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#ff3d00', 
                          fontWeight: 800, 
                          textTransform: 'uppercase', 
                          fontSize: '0.65rem' 
                        }}
                      >
                        {service.category || 'Premium Service'} • ₹{service.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Bottom Centered Action Button */}
            <Button 
              onClick={() => navigate("/service")}
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: '14px !important' }} />}
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
              View All Services
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default HomeService;