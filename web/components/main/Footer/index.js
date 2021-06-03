import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";

// import useStyles from "./style";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer
      style={{ position: "fixed", bottom: 0 }}
      className={clsx({
        [classes.appBarShift]: props.open,
      })}
    >
      <Container>
        <Box>FOOTER</Box>
      </Container>
    </footer>
  );
}
