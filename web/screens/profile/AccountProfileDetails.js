import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import i18n, { t } from "../../i18n";

const loadFromLocalStorage = (name) => {
  return localStorage.getItem(`${name}`);
};

const AccountProfileDetails = (props) => {
  const { user, onSubmit, onChange } = props;
  const { firstName, lastName, email, mobile } = user;

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader={t("profile_subheader")}
          title={t("profile_title")}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t("profile_firstName")}
                name="firstName"
                onChange={onChange}
                required
                value={firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t("profile_lastName")}
                name="lastName"
                onChange={onChange}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t("profile_emailAddress")}
                name="email"
                onChange={onChange}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t("profile_mobile")}
                name="mobile"
                onChange={onChange}
                value={mobile}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
            disabled={
              !firstName.length ||
              !lastName.length ||
              !email.length ||
              (firstName === loadFromLocalStorage("firstName") &&
                lastName === loadFromLocalStorage("lastName") &&
                email === loadFromLocalStorage("email") &&
                mobile === loadFromLocalStorage("mobile"))
            }
          >
            {t("profile_saveDetails")}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
