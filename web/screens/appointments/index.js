import { LinearProgress, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import useStyles from "./style";
import Calendar from "../../components/main/Calendar";
import CustomizedSnackbars from "../../components/main/Snakbar";

export default function Appointments(props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);

  const loadData = () => {
    utils
      .post("/api/appointments/getUserAppointments")
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

  useEffect(() => {
    loadData();
  }, []);

  const hendleAddNewAppointment = async (appointment) => {
    setLoading(true);
    const result = await utils.post("/api/appointments/addNew", appointment);
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        setMessage({ text: "successful", type: "success" });
        setOpenSnackbar(true);
        loadData();
      } else {
        setMessage({ text: error, type: "error" });
        setOpenSnackbar(true);
      }
    } else {
      setMessage({ text: t("someThingWrong"), type: "error" });
      setOpenSnackbar(true);
    }
  };

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
      <Calendar
        events={events}
        hendleAddNewAppointment={hendleAddNewAppointment}
      />
    </>
  );
}
