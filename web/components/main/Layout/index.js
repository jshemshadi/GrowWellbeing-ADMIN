import React from "react";
import { Box } from "@material-ui/core";

import useStyles from "./style";

import MyAppBar from "../AppBar";
import Footer from "../Footer";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MyAppBar />
      LAYOUT
      {children}
      <Footer />
    </Box>
  );
}
