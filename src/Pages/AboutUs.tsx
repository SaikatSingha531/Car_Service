import {
  Box,
  Container,
  Typography,
  // Grid,
  Stack,
  Card,
  Button,
} from "@mui/material";

import Grid from '@mui/material/Grid';
// Icons
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import { toast } from "sonner";

const AboutUs = () => {
  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* --- SECTION 1: THE STORY (HERO) --- */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#101828", color: "#fff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{xs:12 ,md:6}} >
              <Typography variant="overline" sx={{ color: "#ef6c00", fontWeight: 800, letterSpacing: 2 }}>
                OUR STORY
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, mt: 2, mb: 3, lineHeight: 1.2 }}>
                Redefining the <br /> 
                <span style={{ color: "#ef6c00" }}>Workshop Experience.</span>
              </Typography>
              <Typography variant="body1" sx={{ color: "#98A2B3", fontSize: "1.1rem", lineHeight: 1.8, mb: 4 }}>
                Founded in 2024, Nexus Auto started with a simple question: Why is car maintenance so stressful? We built a bridge between cutting-edge software and master-level mechanics to give you a transparent, seamless booking experience.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" sx={primaryBtnStyle}>Our Services</Button>
                <Button variant="outlined" sx={secondaryBtnStyle}>Meet the Techs</Button>
              </Stack>
            </Grid>
            <Grid size={{xs:12 ,md:6}} >
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Garage"
                sx={{ width: "100%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- SECTION 2: VALUES --- */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#101828", mb: 2 }}>
            Driven by Excellence
          </Typography>
          <Typography variant="body1" sx={{ color: "#667085", maxWidth: "600px", mx: "auto" }}>
            We aren't just an app; we are a network of dedicated professionals committed to keeping you on the road safely.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <ValueCard 
            icon={<SettingsSuggestIcon fontSize="large" />} 
            title="Precision Tech" 
            desc="Our app uses AI-driven diagnostics to predict your car's needs before they become expensive problems." 
          />
          <ValueCard 
            icon={<SecurityIcon fontSize="large" />} 
            title="Total Transparency" 
            desc="Live tracking, photo updates of repairs, and upfront digital invoicing. No hidden costs, ever." 
          />
          <ValueCard 
            icon={<GroupsIcon fontSize="large" />} 
            title="Vetted Network" 
            desc="Every mechanic on our platform undergoes a 50-point rigorous background and skill certification." 
          />
        </Grid>
      </Container>

      {/* --- SECTION 3: THE NUMBERS --- */}
      <Box sx={{ bgcolor: "#F9FAFB", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <StatBox number="15k+" label="Active Users" />
            <StatBox number="500+" label="Certified Workshops" />
            <StatBox number="4.9/5" label="Average Rating" />
            <StatBox number="12min" label="Avg. Booking Time" />
          </Grid>
        </Container>
      </Box>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          Ready to experience the future of car care?
        </Typography>
        <Typography variant="body1" sx={{ color: "#667085", mb: 5 }}>
          Join thousands of owners who have traded garage waiting rooms for the comfort of their own homes.
        </Typography>
        <Button 
        onClick={()=>toast.info("Under Development")}
          variant="contained" 
          size="large"
          sx={{ ...primaryBtnStyle, px: 6, py: 2, fontSize: "1.1rem" }}
        >
          Book Your First Service
        </Button>
      </Container>
    </Box>
  );
};

// --- SUB-COMPONENTS ---

const ValueCard = ({ icon, title, desc }:any) => (
  <Grid size={{xs:12 ,md:4}} >
    <Card elevation={0} sx={{ p: 4, height: "100%", borderRadius: "16px", border: "1px solid #EAECF0", transition: '0.3s', '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.05)', transform: 'translateY(-5px)' } }}>
      <Box sx={{ color: "#ef6c00", mb: 2 }}>{icon}</Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: "#667085", lineHeight: 1.6 }}>{desc}</Typography>
    </Card>
  </Grid>
);

const StatBox = ({ number, label }:any) => (
  <Grid size={{xs:6 ,md:3}} >
    <Typography variant="h3" sx={{ fontWeight: 900, color: "#ef6c00" }}>{number}</Typography>
    <Typography variant="subtitle2" sx={{ color: "#475467", fontWeight: 600, textTransform: "uppercase" }}>{label}</Typography>
  </Grid>
);

// --- CUSTOM STYLES ---

const primaryBtnStyle = {
  bgcolor: "#ef6c00",
  color: "#fff",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: "8px",
  "&:hover": { bgcolor: "#e65100" },
};

const secondaryBtnStyle = {
  borderColor: "#ef6c00",
  color: "#ef6c00",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: "8px",
  "&:hover": { borderColor: "#e65100", bgcolor: "rgba(239, 108, 0, 0.04)" },
};

export default AboutUs;