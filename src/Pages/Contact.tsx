import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  Paper,
  Avatar,
  Fade
} from "@mui/material";
// Icons
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedIcon from "@mui/icons-material/Speed";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoltIcon from "@mui/icons-material/Bolt";
import { toast } from "sonner";

const ContactPage = () => {
  const [priority, setPriority] = useState("Standard");

  const tiers = [
    { label: "Standard", desc: "Routine Maintenance", icon: <CalendarMonthIcon /> },
    { label: "Express", desc: "Same Day Turnaround", icon: <BoltIcon /> },
    { label: "Concierge", desc: "Pick-up & Drop-off", icon: <VerifiedUserIcon /> },
  ];

  return (
    <Box sx={{ background: "#ffffff", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* --- HERO SECTION --- */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={10} alignItems="flex-start">
            
            {/* LEFT: CONTENT */}
            <Grid size={{ xs:12, md:5}}>
              <Box sx={{ position: 'sticky', top: '40px' }}>
                <Typography variant="overline" sx={{ color: "#ef6c00", fontWeight: 800, letterSpacing: 2, display: 'block', mb: 1 }}>
                  ELITE AUTOMOTIVE SERVICE
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, color: "#101828", mb: 3, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  Precision Engineering. <br />
                  <span style={{ color: "#ef6c00" }}>Unmatched Care.</span>
                </Typography>
                <Typography variant="body1" sx={{ color: "#475467", mb: 6, fontSize: "1.2rem", lineHeight: 1.6 }}>
                  Experience a new standard of vehicle maintenance. From performance tuning to routine diagnostics, we treat every car like a masterpiece.
                </Typography>

                <Stack spacing={4}>
                  <ContactInfoItem icon={<PhoneInTalkIcon />} label="Priority Support" value="+91 98765 43210" />
                  <ContactInfoItem icon={<EmailIcon />} label="General Inquiries" value="service@nexus-auto.com" />
                  <ContactInfoItem icon={<LocationOnIcon />} label="Main Studio" value="77 Elite Drive, BKC, Mumbai" />
                </Stack>
              </Box>
            </Grid>

            {/* RIGHT: THE FORM */}
            <Grid size={{xs:12 ,md:7}} >
              <Fade in timeout={1000}>
                <Paper elevation={0} sx={formContainerStyle}>
                  <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#101828", mb: 1 }}>
                      Schedule Service
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#667085" }}>
                      Please select your preferred service tier and provide your vehicle details.
                    </Typography>
                  </Box>

                  {/* Tier Selection */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#344054" }}>
                    Select Service Tier
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {tiers.map((tier) => (
                      <Grid size={{ xs:12 ,sm:4}} key={tier.label}>
                        <Box 
                          onClick={() => setPriority(tier.label)}
                          sx={priority === tier.label ? activeTierStyle : inactiveTierStyle}
                        >
                          <Box sx={{ mb: 1, color: priority === tier.label ? "#ef6c00" : "#98A2B3" }}>
                            {tier.icon}
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{tier.label}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>{tier.desc}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid size={{xs:12, sm:6}} >
                      <Typography sx={labelStyle}>Full Name</Typography>
                      <TextField fullWidth placeholder="e.g. John Doe" sx={textFieldStyle} />
                    </Grid>
                    <Grid size={{xs:12 ,sm:6}} >
                      <Typography sx={labelStyle}>Phone Number</Typography>
                      <TextField fullWidth placeholder="+91 00000 00000" sx={textFieldStyle} />
                    </Grid>
                    <Grid size={{xs:12}} >
                      <Typography sx={labelStyle}>Vehicle Model & Year</Typography>
                      <TextField fullWidth placeholder="e.g. 2023 Porsche 911" sx={textFieldStyle} />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <Typography sx={labelStyle}>Service Notes</Typography>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={3} 
                        placeholder="Describe any specific issues or requirements..." 
                        sx={textFieldStyle} 
                      />
                    </Grid>
                    <Grid size={{xs:12}} >
                      <Button 
                      onClick={()=>toast.info("Under Development")}
                      fullWidth sx={submitButtonStyle}>
                        Confirm Booking
                      </Button>
                      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                        <TimerIcon sx={{ fontSize: 16, color: "#ef6c00" }} />
                        <Typography variant="caption" sx={{ color: "#667085", fontWeight: 500 }}>
                          Average confirmation time: 12 minutes
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- TRUST BAR --- */}
      <Box sx={{ py: 8, borderTop: "1px solid #F2F4F7", bgcolor: "#fff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <StatItem icon={<EngineeringIcon />} title="Master Techs" desc="Factory certified experts" />
            <StatItem icon={<VerifiedUserIcon />} title="Genuine Parts" desc="OEM standard guarantee" />
            <StatItem icon={<SpeedIcon />} title="Fast Lane" desc="Express diagnostics" />
            <StatItem icon={<BoltIcon />} title="Warranty" desc="12-month service cover" />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

// --- COMPONENTS ---

const ContactInfoItem = ({ icon, label, value }:any) => (
  <Stack direction="row" spacing={3} alignItems="center">
    <Avatar sx={{ bgcolor: "#F9FAFB", color: "#ef6c00", width: 48, height: 48, border: '1px solid #EAECF0' }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="caption" sx={{ color: "#667085", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{label}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#101828", fontSize: '1rem' }}>{value}</Typography>
    </Box>
  </Stack>
);

const StatItem = ({ icon, title, desc }:any) => (
  <Grid size={{ xs:6, md:3}}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ color: "#ef6c00" }}>{React.cloneElement(icon, { sx: { fontSize: 32 } })}</Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#101828", lineHeight: 1.2 }}>{title}</Typography>
        <Typography variant="caption" sx={{ color: "#667085" }}>{desc}</Typography>
      </Box>
    </Stack>
  </Grid>
);

// --- STYLES ---

const formContainerStyle = {
  background: "#ffffff",
  borderRadius: "24px",
  p: { xs: 4, md: 6 },
  border: "1px solid #EAECF0",
  boxShadow: "0 24px 48px -12px rgba(16, 24, 40, 0.08)",
};

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#344054',
  mb: 1
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fff",
    transition: "all 0.2s",
    "& fieldset": { borderColor: "#D0D5DD" },
    "&:hover fieldset": { borderColor: "#ef6c00" },
    "&.Mui-focused fieldset": { borderColor: "#ef6c00", borderWidth: '2px' },
  },
};

const activeTierStyle = {
  p: 2,
  borderRadius: "12px",
  border: "2px solid #ef6c00",
  bgcolor: "#fffaf5",
  cursor: "pointer",
  transition: "0.3s",
};

const inactiveTierStyle = {
  p: 2,
  borderRadius: "12px",
  border: "1px solid #EAECF0",
  bgcolor: "#fff",
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": { borderColor: "#D0D5DD", bgcolor: "#F9FAFB" }
};

const submitButtonStyle = {
  bgcolor: "#101828",
  color: "#fff",
  py: 1.8,
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  "&:hover": { bgcolor: "#ef6c00", boxShadow: "0 4px 12px rgba(239, 108, 0, 0.3)" },
  transition: "all 0.3s ease",
};

export default ContactPage;