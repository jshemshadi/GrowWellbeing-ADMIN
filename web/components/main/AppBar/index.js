import React from "react";
import { Fragment } from "react";
import { AppBar, Box, Toolbar, Container, Typography } from "@material-ui/core";

import useStyles from "./style";

export default function MyAppBar() {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Container>
            <Box>
              <Typography>APPBAR</Typography>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
