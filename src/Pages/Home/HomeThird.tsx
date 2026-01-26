import ScooterImg from "../../assets/Homethird.png";
import { Box, Container, Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const servicesLeft = [
  "FREE 4 Wheeler Service",
  "FREE 2 Wheeler Service",
  "Exhaust System Repair",
  "Wheel Alignment",
  "Fuel System Repair",
  "Electrical Diagnosis",
  "Brake Service",
  "Emission Repair",
  "Oil Change",
  "AC Repair",
];

const servicesRight = [
  "Manufacturer Recommended Service",
  "Tire Repair and Replacement",
  "Transmission Repair & Replacement",
  "General Auto Repair & Maintenance",
  "Engine Cooling System Maintenance",
  "Starting & Charging Repair",
  "Steering and Suspension Work",
  "Vehicle Preventative Maintenance",
  "State Emissions Inspection",
  "Engine Cooling System Flush",
];

const HomeThird = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* FULL WIDTH CONTAINER */}
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          {/* LEFT IMAGE */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={ScooterImg}
              alt="Scooter Service"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* RIGHT CONTENT */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "primary.main",
              color: "text.primary",
              px: { xs: 3, md: 6 },
              py: { xs: 4, md: 6 },
            }}
          >
            <Typography variant="h6" mb={3}>
              Below are some of the many auto repair services we offer:
            </Typography>

            <Box sx={{ display: "flex", gap: 4 }}>
              {/* LEFT LIST */}
              <Stack spacing={1.5} flex={1}>
                {servicesLeft.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Stack>

              {/* RIGHT LIST */}
              <Stack spacing={1.5} flex={1}>
                {servicesRight.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckIcon sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeThird;
