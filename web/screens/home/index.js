import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";

import i18n, { t } from "../../i18n";

// import useStyles from "./style";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  termsHeader: {
    backgroundColor: theme.palette.primary.main,
    height: 140,
    color: "#FAFAFA",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid container justify={"space-around"} className={classes.termsHeader}>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          alignItems="center"
          justify="center"
          style={{
            fontWeight: "bolder",
            fontSize: "24px",
            display: "flex",
          }}
        >
          Grow Wellbeing
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          alignItems="center"
          justify="center"
          style={{
            fontWeight: "bolder",
            fontSize: "24px",
            display: "flex",
          }}
        >
          <Button
            variant="outlined"
            style={{
              color: "#FAFAFA",
              borderColor: "#FAFAFA",
              width: "100px",
              margin: "0 10px 0 0",
            }}
            onClick={() => {
              props.history.push("/login");
            }}
          >
            {t("home_login")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              color: "#FAFAFA",
              width: "100px",
              margin: "0 0 0 10px",
            }}
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            {t("home_signup")}
          </Button>
        </Grid>
      </Grid>
      <Container style={{ marginTop: "15px", textAlign: "justify" }}>
        <div className={classes.root}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>
        </div>
      </Container>
    </>
  );
}
