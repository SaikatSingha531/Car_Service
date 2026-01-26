import {
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/* ---------------- Info Card ---------------- */
const InfoCard = ({ icon, title, children }) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{
      bgcolor: "#111",
      p: 2,
      borderRadius: 1,
      alignItems: "center",
      minWidth: 240,
      flex: 1,
    }}
  >
    <Box
      sx={{
        bgcolor: "#ff5722",
        p: 1,
        borderRadius: "50%",
        display: "flex",
      }}
    >
      {icon}
    </Box>

    <Box>
      <Typography fontWeight={600}>{title}</Typography>
      {children}
    </Box>
  </Stack>
);

/* ---------------- Footer Button ---------------- */
const FooterButton = ({ label, onClick }) => (
  <Button
    onClick={onClick}
    variant="text"
    disableRipple
    sx={{
      justifyContent: "flex-start",
      textTransform: "none",
      color: "gray",
      p: 0,
      minWidth: "auto",
      fontSize: "14px",
      "&:hover": {
        color: "#ff5722",
        backgroundColor: "transparent",
        transform: "translateX(4px)",
      },
      transition: "0.3s",
    }}
  >
    {label}
  </Button>
);

/* ---------------- Footer ---------------- */
const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#3a3a3a", color: "#fff", px: 3, py: 6 }}>
      {/* Header */}
      <Typography variant="overline" textAlign="center" display="block">
        CONTACT US
      </Typography>

      <Typography variant="h4" fontWeight={600} textAlign="center" mb={5}>
        Do you have a question? <br />
        Feel free to contact
      </Typography>

      {/* Top Cards */}
      <Stack direction="row" flexWrap="wrap" gap={2} mb={5}>
        <InfoCard icon={<LocationOnIcon />} title="Address">
          <Typography variant="body2" color="gray">
            123, ABC Bye Lane <br /> Madhupur
          </Typography>
        </InfoCard>

        <InfoCard icon={<EmailIcon />} title="Email Address">
          <Typography variant="body2" color="gray">
            autoservice@gmail.com
          </Typography>
        </InfoCard>

        <InfoCard icon={<CallIcon />} title="Contact No">
          <Typography variant="body2" color="gray">
            +91 1234567890
          </Typography>
        </InfoCard>

        <InfoCard icon={<LocationOnIcon />} title="Follow Us">
          <Stack direction="row" spacing={1}>
            <FacebookIcon fontSize="small" />
            <TwitterIcon fontSize="small" />
            <InstagramIcon fontSize="small" />
          </Stack>
        </InfoCard>
      </Stack>

      {/* Bottom Section */}
      <Stack direction="row" flexWrap="wrap" gap={6}>
        {/* Our Services */}
        <Box minWidth={200}>
          <Typography fontWeight={600} mb={2}>
            Our Services
          </Typography>
          <Stack spacing={1}>
            <FooterButton label="Repair" onClick={() => {}} />
            <FooterButton label="Maintenance" onClick={() => {}} />
            <FooterButton label="Diagnostic" onClick={() => {}} />
            <FooterButton label="Oil Change" onClick={() => {}} />
            <FooterButton label="Brake Repair Service" onClick={() => {}} />
          </Stack>
        </Box>

        {/* Company */}
        <Box minWidth={200}>
          <Typography fontWeight={600} mb={2}>
            Company
          </Typography>
          <Stack spacing={1}>
            <FooterButton label="About Company" onClick={() => {}} />
            <FooterButton label="Spares" onClick={() => {}} />
            <FooterButton label="FAQs" onClick={() => {}} />
            <FooterButton label="Terms & Conditions" onClick={() => {}} />
            <FooterButton label="Contact Us" onClick={() => {}} />
          </Stack>
        </Box>

        {/* Quick Links */}
        <Box minWidth={200}>
          <Typography fontWeight={600} mb={2}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <FooterButton label="Careers" onClick={() => {}} />
            <FooterButton label="Features" onClick={() => {}} />
            <FooterButton label="Customer Feedback" onClick={() => {}} />
            <FooterButton label="Privacy Policy" onClick={() => {}} />
          </Stack>
        </Box>

        {/* Newsletter */}
        <Box minWidth={260}>
          <Typography fontWeight={600} mb={2}>
            Get Our Newsletter
          </Typography>
          <Typography variant="body2" color="gray" mb={2}>
            Enter your email address to receive updates.
          </Typography>

          <Box
            sx={{
              display: "flex",
              bgcolor: "#fff",
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ px: 2, flex: 1 }}
            />
            <IconButton sx={{ bgcolor: "#ff5722", color: "#fff" }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
