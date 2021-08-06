import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import useStyles from "./style";
import i18n, { t } from "../../i18n";

const AccountProfile = (props) => {
  const { user, onChange } = props;

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={utils.getApiAddress() + "/" + user.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${utils.capitalizeFirstLetter(
              user.firstName
            )} ${utils.capitalizeFirstLetter(user.lastName)}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.username} (username)`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${utils.capitalizeFirstLetter(user.role)} (role)`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <FormControl className={classes.formControl}>
          <input
            id="contained-button-file"
            accept="image/*"
            className={classes.input}
            type="file"
            onChange={(event) => onChange({ avatar: event.target.files[0] })}
          />
          <label className={classes.label} htmlFor="contained-button-file">
            <Button color="primary" component="span" fullWidth variant="text">
              {t("profile_uploadPicture")}
            </Button>
          </label>
        </FormControl>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
