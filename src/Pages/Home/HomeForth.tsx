import { Box, Typography } from '@mui/material'
import ImgFour from "../../assets/forthimage.png"

import imgOne from "../../assets/Rectangle 45.png"
import imgTwo from "../../assets/Rectangle 45 (1).png"
import imgThree from "../../assets/Rectangle 45 (2).png"
import imgFour from "../../assets/Rectangle 45 (3).png"

const Datas = [
  {
    title: "1000+ Trchnicians",
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
    title: "10 Years Experirience",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgFour,
  },
];

const HomeForth = () => {
  return (
    <>
    <Box textAlign="center"  sx={{
        py: { xs: 6, md: 8 },
      }}>
      <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ color: "black" }}>
            Why {" "}
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
              Choose Us
            </Box>
          </Typography>
        </Box>
        <Typography  color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, unde. Quaerat, voluptatem? Excepturi illo, quae magnam sit molestias temporibus modi quis inventore quaerat, 
        </Typography>



        <Box>
          <img src={ImgFour} alt="" />
        </Box>

    </Box>

    </>
  )
}

export default HomeForth