import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import style from "./style.scss";
import Title from "./Title";
import i18n, { t } from "../../i18n";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  const statusColor = {
    pending: "warning",
    assigned: "success",
    completed: "light",
    canceled: "danger",
  };
  return (
    <React.Fragment>
      <Title>{t("dashboard_recentTable_title")}</Title>
      {props.appointments && props.appointments.length && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("dashboard_recentTable_date")}</TableCell>
              <TableCell>{t("dashboard_recentTable_school")}</TableCell>
              <TableCell>{t("dashboard_recentTable_user")}</TableCell>
              <TableCell align="right">
                {t("dashboard_recentTable_status")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.appointments.map((appointment) => (
              <TableRow key={appointment.guid}>
                <TableCell>
                  {utils.formatDate(new Date(appointment.date), true)}
                </TableCell>
                <TableCell>{appointment.school.username}</TableCell>
                <TableCell>{appointment.fullName}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    className={`fc-event-${statusColor[appointment.status]}`}
                    style={{ cursor: "auto", backgroundColor: "transparent" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                    }}
                  >
                    {appointment.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className={classes.seeMore}>
        <Link color="primary" href="dashboard/appointments">
          {t("dashboard_recentTable_seeMore")}
        </Link>
      </div>
    </React.Fragment>
  );
}
