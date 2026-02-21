import { Box, Typography, Container, Grid } from "@mui/material";
import ImgFour from "../../assets/forthimage.png";

import imgOne from "../../assets/Rectangle 45.png";
import imgTwo from "../../assets/Rectangle 45 (1).png";
import imgThree from "../../assets/Rectangle 45 (2).png";
import imgFour from "../../assets/Rectangle 45 (3).png";

const Datas = [
  {
    title: "1000+ Technicians",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgOne,
  },
  {
    title: "Quality Support",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgTwo,
  },
  {
    title: "520 Locations",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgThree,
  },
  {
    title: "10 Years Experience",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgFour,
  },
];

const HomeForth = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "36px", md: "48px" },
              fontWeight: 700,
            }}
          >
            Why{" "}
            <Box
              component="span"
              sx={{
                backgroundColor: "primary.main",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                display: "inline-block",
                color: "white",
              }}
            >
              Choose Us
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              maxWidth: "700px",
              mx: "auto",
            }}
            color="text.secondary"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, unde. Quaerat, voluptatem? Excepturi illo, quae magnam
            sit molestias temporibus modi quis inventore quaerat.
          </Typography>
        </Box>

        {/* Main Image */}
        <Box textAlign="center" mb={{ xs: 5, md: 8 }}>
          <Box
            component="img"
            src={ImgFour}
            alt="Why Choose Us"
            sx={{
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Feature Cards */}
        <Grid container spacing={4}>
          {Datas.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box textAlign="center">
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    mb: 2,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "13px", md: "14px" },
                    mt: 1,
                  }}
                  color="text.secondary"
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeForth;
