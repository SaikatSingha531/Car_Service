import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BF2D0D",
    },
  //  secondary: {

  //   },
    // background: {
    //   default: "#FDF7F6",    
    //   paper: "#FDF7F6",
    // },
    text: {
      primary: "#0b0909",
      secondary: "#4e4545",
    },
  },

  typography: {
    fontFamily: `"Urbanist", sans-serif`,

    h2: {
      fontWeight: 700,
      fontSize: "36px",
      color: "#FFFFFF",
    },

    h6: {
      fontWeight: 600,
      fontSize: "18px",
      color: "#FFFFFF",
    },

    body1: {
      fontSize: "14px",
      color: "#BDBDBD",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
          fontSize: 13,
          padding: "6px 16px",
        },
        outlined: {
          borderColor: "#FFFFFF",
          color: "#FFFFFF",
          "&:hover": {
            borderColor: "#BF2D0D",
            color: "#BF2D0D",
          },
        },
      },
    },
  },
});

export default theme;
