import React from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography,
  Link,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import useStyles from "./style";
import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";

export default function LogIn(props) {
  localStorage.clear();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const [accountType, setAccountType] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const hendleLogin = async () => {
    setLoading(true);
    const result = await utils.post("/api/users/login", {
      accountType,
      username,
      password,
    });
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        const {
          username: apiUserName,
          firstName,
          lastName,
          email,
          mobile,
          guid,
          token,
          role,
        } = data;
        localStorage.setItem("username", apiUserName);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("guid", guid);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        props.history.push("/dashboard");
      } else {
        setMessage({ text: error, type: "error" });
        setOpenSnackbar(true);
      }
    } else {
      setMessage({ text: t("someThingWrong"), type: "error" });
      setOpenSnackbar(true);
    }
  };
  const hendleKeyDown = async (event) => {
    if (event.key === "Enter") {
      hendleLogin();
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
        className={classes.login_bk}
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
        <div className={classes.login_form} onKeyDown={hendleKeyDown}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("login_title")}
          </Typography>
          <hr
            style={{
              width: "255px",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bold" }}
          >
            {t("login_chooseAccountType")}
          </Typography>
          &nbsp;
          <div
            style={{
              display: "flex",
            }}
          >
            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "admin"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "admin"
                    ? classes.login_form_account_active
                    : classes.login_form_account_deactive
                }
                onClick={() => {
                  setAccountType("admin");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/Admin.png"})`,
                  margin: "0 0 0 20px",
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "30%",
                  }}
                >
                  {t("login_accountType_admin")}
                </Typography>
              </div>
            </Badge>

            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "staff"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "staff"
                    ? classes.login_form_account_active
                    : classes.login_form_account_deactive
                }
                onClick={() => {
                  setAccountType("staff");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/Staff.png"})`,
                  margin: "0 0 0 20px",
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "30%",
                  }}
                >
                  {t("login_accountType_staff")}
                </Typography>
              </div>
            </Badge>
          </div>
          &nbsp;
          <Typography align="center" className={classes.login_text}>
            {t("login_message_hello")}
          </Typography>
          <Typography align="center" className={classes.login_text}>
            {t("login_message_fill")}
          </Typography>
          &nbsp;
          <FormControl className={classes.LogIn_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">
              {t("login_usernameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type={"text"}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentityIcon className={classes.login_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.LogIn_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("login_passwordHelper")}
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
                  <LockOutlinedIcon className={classes.login_text} />
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
                  <div
                    style={{
                      borderLeft: "1px solid #EEEFF6",
                      margin: "0 10px",
                      height: "40px",
                    }}
                  ></div>
                  <Link
                    href="forgetPassword"
                    style={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {t("login_forgot")}
                  </Link>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          &nbsp;
          <div
            className={classes.LogIn_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                disabled={loading || !username.length || !password.length}
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleLogin}
              >
                {t("login_loginBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
