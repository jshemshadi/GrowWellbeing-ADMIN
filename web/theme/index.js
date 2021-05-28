import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import appStyle from "./app.scss";

const theme = ({ direction }) =>
  createMuiTheme({
    appStyle,
    direction,
    palette: {
      primary: {
        main: "#23d000",
      },
      secondary: {
        main: blue[300],
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 16,
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": ["IRANSansWeb"],
        },
      },
    },
  });

export default theme;
