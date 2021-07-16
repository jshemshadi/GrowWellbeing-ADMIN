import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { LinearProgress } from "@material-ui/core";

import CustomizedSnackbars from "../../components/main/Snakbar";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  customLoading: {
    width: "100%",
    position: "absolute",
    top: "64px",
    left: "0px",
    "& > * + *": {
      marginTop: 0,
    },
  },
}));

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [recent, setRecent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getNextWeekAppointments = () => {
    const nextWeek = utils.getNextWeekDate();
    utils
      .post("/api/appointments/getAllAppointments", nextWeek)
      .then((result) => {
        setLoading(false);
        if (result && result && result.data) {
          const { isSuccess, data, msg, error, unauthorized } = result.data;
          if (isSuccess) {
            const { appointments } = data;
            setEvents(appointments);
          } else {
            setMessage({ text: error, type: "error" });
            setOpenSnackbar(true);
          }
        } else {
          setMessage({ text: t("someThingWrong"), type: "error" });
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage({ text: t("someThingWrong"), type: "error" });
        setOpenSnackbar(true);
      });
  };
  const getRecentAppointments = () => {
    utils
      .post("/api/appointments/getAllAppointments", {
        createAfter: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      })
      .then((result) => {
        setLoading(false);
        if (result && result && result.data) {
          const { isSuccess, data, msg, error, unauthorized } = result.data;
          if (isSuccess) {
            const { appointments } = data;
            setRecent(appointments);
          } else {
            setMessage({ text: error, type: "error" });
            setOpenSnackbar(true);
          }
        } else {
          setMessage({ text: t("someThingWrong"), type: "error" });
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage({ text: t("someThingWrong"), type: "error" });
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    getNextWeekAppointments();
    getRecentAppointments();
  }, []);

  return (
    <>
      {loading && <LinearProgress className={classes.customLoading} />}
      {openSnakbar && (
        <CustomizedSnackbars
          message={message}
          open={openSnakbar}
          onClose={() => setOpenSnackbar(false)}
        />
      )}
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart appointments={events} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits count={recent.length} />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Orders appointments={recent} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
