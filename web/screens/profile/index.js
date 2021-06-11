import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import CustomizedSnackbars from "../../components/main/Snakbar";
import AccountProfile from "./AccountProfile";
import AccountProfileDetails from "./AccountProfileDetails";
import useStyles from "./style";
import i18n, { t } from "../../i18n";

const loadFromLocalStorage = (name) => {
  return localStorage.getItem(`${name}`);
};

const Profile = () => {
  const [user, setUser] = useState({
    mobile: loadFromLocalStorage("mobile") || "",
    firstName: loadFromLocalStorage("firstName") || "",
    lastName: loadFromLocalStorage("lastName") || "",
    username: loadFromLocalStorage("username") || "",
    country: loadFromLocalStorage("country") || "",
    state: loadFromLocalStorage("state") || "",
    email: loadFromLocalStorage("email") || "",
    avatar: loadFromLocalStorage("avatar") || "",
  });

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);

  const loadData = () => {
    utils
      .post("/api/users/profile")
      .then((result) => {
        setLoading(false);
        if (result && result && result.data) {
          const { isSuccess, data, msg, error, unauthorized } = result.data;
          if (isSuccess) {
            const {
              username,
              firstName,
              lastName,
              email,
              mobile,
              country,
              state,
              guid,
              role,
              avatar,
            } = data;
            localStorage.setItem("username", username);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("email", email);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("country", country);
            localStorage.setItem("state", state);
            localStorage.setItem("guid", guid);
            localStorage.setItem("role", role);
            localStorage.setItem("avatar", avatar);
            setUser({
              mobile: loadFromLocalStorage("mobile") || "",
              firstName: loadFromLocalStorage("firstName") || "",
              lastName: loadFromLocalStorage("lastName") || "",
              username: loadFromLocalStorage("username") || "",
              country: loadFromLocalStorage("country") || "",
              state: loadFromLocalStorage("state") || "",
              email: loadFromLocalStorage("email") || "",
              avatar: loadFromLocalStorage("avatar") || "",
            });
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
  }, [user.avatar]);

  const hendleUpdateProfile = async ({ avatar }) => {
    setLoading(true);
    const { firstName, lastName, email, mobile, country, state } = user;
    const result = await utils.post(
      "/api/users/updateProfile",
      {
        firstName,
        lastName,
        email,
        mobile,
        country,
        state,
        avatar,
      },
      true
    );
    setLoading(false);
    loadData();
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        setMessage({ text: "successful", type: "success" });
        setOpenSnackbar(true);
      } else {
        setMessage({ text: error, type: "error" });
        setOpenSnackbar(true);
      }
    } else {
      setMessage({ text: t("someThingWrong"), type: "error" });
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
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
      <Helmet>
        <title>Account | Grow Wellbeing</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile
                user={user}
                onChange={({ avatar }) => {
                  hendleUpdateProfile({ avatar });
                }}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                user={user}
                onChange={handleChange}
                onSubmit={hendleUpdateProfile}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
