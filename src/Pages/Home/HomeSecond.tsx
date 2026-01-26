import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import BuildIcon from "@mui/icons-material/Build";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const HomeSecond = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2F2F2F",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container>
        {/* ===== Section Heading ===== */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h2">
            We Provide{" "}
            <Box
              component="span"
              sx={{
                backgroundColor: "primary.main",
                px: 1.5,
                borderRadius: 1,
                display: "inline-block",
              }}
            >
              Expert Service
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{ maxWidth: 520, mx: "auto", mt: 1 }}
          >
            We aim to earn your trust and have a long term relationship with you
          </Typography>
        </Box>

        {/* ===== Services Cards ===== */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
        >
          {/* === Card 1 === */}
          <Box textAlign="center" maxWidth={260} mx="auto">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <BuildIcon sx={{ color: "#fff" }} />
            </Box>

            <Typography variant="h6" mb={1}>
              Maintenance
            </Typography>

            <Typography variant="body1" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor.
            </Typography>

            <Button variant="outlined">Read more</Button>
          </Box>

          {/* === Card 2 === */}
          <Box textAlign="center" maxWidth={260} mx="auto">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <TireRepairIcon sx={{ color: "#fff" }} />
            </Box>

            <Typography variant="h6" mb={1}>
              Wheels & Tires
            </Typography>

            <Typography variant="body1" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor.
            </Typography>

            <Button variant="outlined">Read more</Button>
          </Box>

          {/* === Card 3 === */}
          <Box textAlign="center" maxWidth={260} mx="auto">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <LocalGasStationIcon sx={{ color: "#fff" }} />
            </Box>

            <Typography variant="h6" mb={1}>
              Fuel Change
            </Typography>

            <Typography variant="body1" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor.
            </Typography>

            <Button variant="outlined">Read more</Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeSecond;
