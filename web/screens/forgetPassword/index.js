import React from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography,
  Link,
} from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import useStyles from "./style";
import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";

export default function ForgetPassword(props) {
  localStorage.clear();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const hendleForgetPassword = async () => {
    setLoading(true);
    const result = await utils.post("/api/users/forgetPassword", {
      email,
    });
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        localStorage.setItem("email", email);
        props.history.push("/verifyPasswordReset");
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
    <Grid container direction="row" className={classes.root}>
      {loading && <LinearProgress className={classes.customLoading} />}
      {openSnakbar && (
        <CustomizedSnackbars
          message={message}
          open={openSnakbar}
          onClose={() => setOpenSnackbar(false)}
        />
      )}
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={classes.forgetPassword_bk}
        style={{ height: isSm ? "70%" : "auto" }}
      ></Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        style={{ margin: "50px 0" }}
      >
        <div className={classes.forgetPassword_form}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("forgetPassword_title")}
          </Typography>
          <hr
            style={{
              width: "255px",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          <Typography align="center" className={classes.forgetPassword_text}>
            {t("forgetPassword_message_hello")}
          </Typography>
          <Typography align="center" className={classes.forgetPassword_text}>
            {t("forgetPassword_message_fill")}
          </Typography>
          &nbsp;
          <FormControl
            className={classes.forgetPassword_input}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-email">
              {t("forgetPassword_emailHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type={"text"}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon className={classes.forgetPassword_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          &nbsp;
          <div
            className={classes.forgetPassword_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <Typography className={classes.forgetPassword_text}>
                {t("forgetPassword_haveAccount")}
              </Typography>
              <Link
                href="login"
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  margin: "0 0 0 5px",
                }}
              >
                {t("forgetPassword_login")}
              </Link>
            </div>
            <div>
              <Button
                disabled={loading || !email.length}
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleForgetPassword}
              >
                {t("forgetPassword_forgetPasswordBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
