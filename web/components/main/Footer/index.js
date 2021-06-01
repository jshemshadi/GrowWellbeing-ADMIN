import React from "react";
import { Box, Container } from "@material-ui/core";

import useStyles from "./style";

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Container>
        <Box>FOOTER</Box>
      </Container>
    </footer>
  );
}
