import { Box, Typography, Button, Stack } from "@mui/material";
import imgOne from "../../assets/fifthOne.png";
import imgTwo from "../../assets/fifthTwo.png";
import imgThree from "../../assets/fifthThree.png";
import imgFour from "../../assets/fifthFour.png";

const Datas = [
  {
    title: "Select The Perfect Service",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgOne,
  },
  {
    title: "Schedule Free Doorstep Pick-up",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgTwo,
  },
  {
    title: "Repair Your Vehicle",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgThree,
  },
  {
    title: "Enjoy Our Service",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgFour,
  },
];

const HomeFifth = () => {
  return (
    <>
      <Box
        sx={{
          background:"#FDF7F6",
          py: { xs: 6, md: 8 },
        }}
      >
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ color: "black" }}>
            How{" "}
            <Box
              component="span"
              sx={{
                backgroundColor: "primary.main",
                px: 1.5,
                borderRadius: 1,
                display: "inline-block",
                color: "white",
              }}
            >
              We Work
            </Box>
          </Typography>
        </Box>

        <Typography color="text.secondary" textAlign="center" >
Lorem ipsum dolor sit amet consectetur adipisicing elit.   
        </Typography>

        <Box sx={{ py: 6 }}>
          <Stack
            direction="row"
            spacing={6}
            justifyContent="center"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            {Datas.map((item, index) => (
              <Box
                key={index}
                sx={{
                  maxWidth: 220,
                  textAlign: "center",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 2,
                  }}
                />

                {/* Title */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 , color:"black" }}>
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default HomeFifth;
