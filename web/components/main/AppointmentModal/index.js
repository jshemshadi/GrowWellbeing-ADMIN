import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DatePicker from "../DatePicker";
import { Button, Grid, TextField } from "@material-ui/core";

import i18n, { t } from "../../../i18n";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AppointmentModal(props) {
  const classes = useStyles();
  const [appointment, setAppointment] = useState({ date: props.date });
  useEffect(() => {
    if (props.appointment) {
      setAppointment(props.appointment);
    } else {
      setAppointment({ date: props.date, DoB: null });
    }
  }, [props.appointment, props.date]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {!props.appointment
                ? t("appointmentModal_title")
                : t("appointmentModal_detail")}
            </h2>
            <p id="transition-modal-description">{`${t(
              "appointmentModal_description"
            )}: ${props.date}`}</p>
            <Grid style={{ width: 250 }}>
              <DatePicker
                value={appointment.DoB ? new Date(appointment.DoB) : null}
                setValue={(newDoB) => {
                  setAppointment({ ...appointment, DoB: newDoB });
                }}
                label={t("appointmentModal_dob")}
              />
            </Grid>
            <Grid style={{ width: 250 }}>
              <TextField
                required
                id="gardianName_text"
                label={t("appointmentModal_gardianName")}
                disabled={!!props.appointment}
                value={appointment.gardianName}
                fullWidth={true}
                onChange={(event) => {
                  setAppointment({
                    ...appointment,
                    gardianName: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid style={{ width: 250, marginTop: 5 }}>
              <TextField
                required
                id="contactNumber_text"
                label={t("appointmentModal_contactNumber")}
                disabled={!!props.appointment}
                value={appointment.contactNumber}
                fullWidth={true}
                onChange={(event) => {
                  setAppointment({
                    ...appointment,
                    contactNumber: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid style={{ width: 250, marginTop: 5 }}>
              <TextField
                required
                id="address_text"
                disabled={!!props.appointment}
                multiline
                rows={4}
                label={t("appointmentModal_address")}
                value={appointment.address}
                fullWidth={true}
                onChange={(event) => {
                  setAppointment({
                    ...appointment,
                    address: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid style={{ width: 250, marginTop: 5 }}>
              <TextField
                id="summary_text"
                multiline
                disabled={!!props.appointment}
                rows={4}
                label={t("appointmentModal_summary")}
                value={appointment.summary}
                fullWidth={true}
                onChange={(event) => {
                  setAppointment({
                    ...appointment,
                    summary: event.target.value,
                  });
                }}
              />
            </Grid>
            {!props.appointment && (
              <>
                <hr
                  style={{
                    width: "250px",
                    border: 0,
                    borderTop: "1px solid #eee",
                    marginTop: 15,
                  }}
                />
                <Grid
                  style={{
                    width: 250,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      width: "100px",
                      margin: "0 10px 0 0",
                    }}
                    onClick={() => {
                      props.hendleAddNewAppointment(appointment);
                      props.setOpen(false);
                    }}
                  >
                    {t("appointmentModal_submit")}
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
                      props.setOpen(false);
                    }}
                  >
                    {t("appointmentModal_cancel")}
                  </Button>
                </Grid>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
