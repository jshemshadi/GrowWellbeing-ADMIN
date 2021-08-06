import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
  newUser_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  newUser_form_account_active: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid",
    borderRadius: "5px",
    height: "150px",
    width: "150px",
    borderColor: theme.palette.primary.main,
    position: "relative",
    boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
  },
  newUser_form_account_deactive: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid",
    borderRadius: "5px",
    height: "150px",
    width: "150px",
    borderColor: theme.palette.info.main,
    position: "relative",
  },
  newUser_text: {
    color: theme.palette.grey.main,
  },
  newUser_input: { width: "80%", margin: "10px" },
}));

export default function NewUser() {
  const classes = useStyles();
  const theme = useTheme();

  const [accountType, setAccountType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);

  const hendleNewUser = async () => {
    setLoading(true);
    const result = await utils.post("/api/users/newUser", {
      accountType,
      firstName,
      lastName,
      mobile,
      email,
      username,
      password,
    });
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        localStorage.setItem("email", email);
        props.history.push("/verifyAccount");
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
      hendleNewUser();
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid container direction="row" justify="center" className={classes.root}>
        {loading && <LinearProgress className={classes.customLoading} />}
        {openSnakbar && (
          <CustomizedSnackbars
            message={message}
            open={openSnakbar}
            onClose={() => setOpenSnackbar(false)}
          />
        )}
        <div className={classes.newUser_form} onKeyDown={hendleKeyDown}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("newUser_title")}
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
            {t("newUser_chooseAccountType")}
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
                    ? classes.newUser_form_account_active
                    : classes.newUser_form_account_deactive
                }
                onClick={() => {
                  setAccountType("admin");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/Admin.png"})`,
                  bottom: 0,
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "42%",
                  }}
                >
                  {t("newUser_accountType_admin")}
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
                    ? classes.newUser_form_account_active
                    : classes.newUser_form_account_deactive
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
                  {t("newUser_accountType_staff")}
                </Typography>
              </div>
            </Badge>

            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "gp"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "gp"
                    ? classes.newUser_form_account_active
                    : classes.newUser_form_account_deactive
                }
                onClick={() => {
                  setAccountType("gp");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/GP.png"})`,
                  margin: "0 0 0 20px",
                  bottom: 0,
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "42%",
                  }}
                >
                  {t("newUser_accountType_gp")}
                </Typography>
              </div>
            </Badge>

            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "school"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "school"
                    ? classes.newUser_form_account_active
                    : classes.newUser_form_account_deactive
                }
                onClick={() => {
                  setAccountType("school");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/School.png"})`,
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
                  {t("newUser_accountType_school")}
                </Typography>
              </div>
            </Badge>
          </div>
          &nbsp;
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstName">
              {t("newUser_firstNameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstName"
              type={"text"}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBoxOutlinedIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastName">
              {t("newUser_lastNameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastName"
              type={"text"}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBoxOutlinedIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">
              {t("newUser_emailHelper")}
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
                  <EmailOutlinedIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-mobile">
              {t("newUser_mobileHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-mobile"
              type={"text"}
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIphoneOutlinedIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">
              {t("newUser_usernameHelper")}
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
                  <PermIdentityIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("newUser_passwordHelper")}
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
                  <LockOutlinedIcon className={classes.newUser_text} />
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
          <FormControl className={classes.newUser_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-repeatPassword">
              {t("newUser_repeatPasswordHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(event) => {
                setRepeatPassword(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon className={classes.newUser_text} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repeat password visibility"
                    onClick={() => {
                      setShowRepeatPassword(!showRepeatPassword);
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
            className={classes.newUser_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                disabled={
                  loading ||
                  !firstName.length ||
                  !lastName.length ||
                  !email.length ||
                  !mobile.length ||
                  !username.length ||
                  !password.length ||
                  !repeatPassword.length ||
                  password !== repeatPassword
                }
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleNewUser}
              >
                {t("newUser_newUserBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Paper>
  );
}
