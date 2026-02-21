import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import BuildIcon from "@mui/icons-material/Build";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const HomeSecond = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2F2F2F",
        py: { xs: 6, sm: 7, md: 8 },
      }}
    >
      <Container>
        {/* ===== Section Heading ===== */}
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "28px", sm: "34px", md: "42px" },
            }}
          >
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
            sx={{
              maxWidth: 520,
              mx: "auto",
              mt: 2,
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            We aim to earn your trust and have a long term relationship with you
          </Typography>
        </Box>

        {/* ===== Services Cards ===== */}
        <Grid container spacing={4}>
          {/* Card 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ServiceCard
              icon={<BuildIcon />}
              title="Maintenance"
            />
          </Grid>

          {/* Card 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ServiceCard
              icon={<TireRepairIcon />}
              title="Wheels & Tires"
            />
          </Grid>

          {/* Card 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ServiceCard
              icon={<LocalGasStationIcon />}
              title="Fuel Change"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const ServiceCard = ({ icon, title }) => (
  <Box
    textAlign="center"
    sx={{
      px: 2,
      py: 3,
    }}
  >
    <Box
      sx={{
        width: { xs: 60, md: 70 },
        height: { xs: 60, md: 70 },
        borderRadius: "50%",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mb: 2,
      }}
    >
      {icon}
    </Box>

    <Typography variant="h6" mb={1}>
      {title}
    </Typography>

    <Typography
      variant="body2"
      mb={2}
      sx={{ fontSize: { xs: "14px", sm: "15px" } }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
    </Typography>

    <Button variant="outlined" size="small">
      Read more
    </Button>
  </Box>
);

export default HomeSecond;
