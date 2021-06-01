import { createMuiTheme } from "@material-ui/core/styles";
import appStyle from "./app.scss";

const theme = ({ direction }) =>
  createMuiTheme({
    appStyle,
    direction,
    palette: {
      primary: {
        main: "#32CB9D",
      },
      secondary: {
        main: "#39B84F",
      },
      info: {
        main: "#EEEFF6",
      },
      grey: { main: "#C6C7CF" },
      error: {
        main: "#E26B86",
      },
    },
    Typography: {
      fontFamily: "OpenSans",
      fontSize: 16,
    },
    Link: {
      fontFamily: "OpenSans",
      fontSize: 16,
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": ["OpenSans"],
        },
      },
    },
  });

export default theme;
