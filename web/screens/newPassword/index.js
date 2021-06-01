import React from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import useStyles from "./style";
import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function NewPassword(props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const email = localStorage.getItem("email");
  const verificationCode = localStorage.getItem("verificationCode");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const hendleNewPassword = async () => {
    setLoading(true);
    const result = await utils.post("/api/users/resetPassword", {
      email,
      verificationCode,
      password,
    });
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        props.history.push("/login");
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
        className={classes.newPassword_bk}
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
        <div className={classes.newPassword_form}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("newPassword_title")}
          </Typography>
          <hr
            style={{
              width: "255px",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          <Typography align="center" className={classes.newPassword_text}>
            {t("newPassword_message_fill")}
          </Typography>
          &nbsp;
          <FormControl className={classes.newPassword_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("newPassword_passwordHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon className={classes.newPassword_text} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          &nbsp;
          <div
            className={classes.newPassword_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                disabled={loading || !password.length}
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleNewPassword}
              >
                {t("newPassword_newPasswordBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
