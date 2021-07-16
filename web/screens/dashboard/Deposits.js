import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Title from "./Title";
import i18n, { t } from "../../i18n";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>{t("dashboard_recent_title")}</Title>
      <Typography component="p" variant="h4">
        {props.count}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`${t("dashboard_recent_from")} ${utils.formatDate(
          new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
        )}`}
      </Typography>
      <div>
        <Link color="primary" href="dashboard/appointments">
          {t("dashboard_recent_viewDetail")}
        </Link>
      </div>
    </React.Fragment>
  );
}
