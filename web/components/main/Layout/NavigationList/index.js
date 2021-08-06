import React from "react";
import { connect } from "react-redux";
import {
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
} from "@material-ui/core";

import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
// import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import i18n, { t } from "../../../../i18n";
import style from "./style";
import { NavLink, useLocation } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = style;

export default function NavigationList(props) {
  const classes = useStyles();
  let location = useLocation();

  const lang = localStorage.getItem("lang");
  i18n.changeLanguage(lang ? lang : "fa");

  return (
    <List className={classes.all_text}>
      <div
        className={location.pathname === "/dashboard" ? classes.active : null}
      >
        <NavLink to="/dashboard" exact activeClassName={classes.active}>
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_dashboard")}>
              <ListItemIcon className={classes.drawer_icons}>
                <DashboardOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_dashboard")} />
          </ListItem>
        </NavLink>
      </div>

      <Divider />

      <div
        className={
          location.pathname === "/dashboard/users" ||
          location.pathname.indexOf("/dashboard/users/") === 0
            ? classes.active
            : null
        }
      >
        <NavLink to="/dashboard/users" exact activeClassName={classes.active}>
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_users")}>
              <ListItemIcon className={classes.drawer_icons}>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_users")} />
          </ListItem>
        </NavLink>
      </div>

      <div
        className={
          location.pathname === "/dashboard/courses" ||
          location.pathname.indexOf("/dashboard/courses/") === 0
            ? classes.active
            : null
        }
      >
        <NavLink to="/dashboard/courses" exact activeClassName={classes.active}>
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_courses")}>
              <ListItemIcon className={classes.drawer_icons}>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_courses")} />
          </ListItem>
        </NavLink>
      </div>

      <div
        className={
          location.pathname === "/dashboard/staffTraining" ||
          location.pathname.indexOf("/dashboard/staffTraining/") === 0
            ? classes.active
            : null
        }
      >
        <NavLink
          to="/dashboard/staffTraining"
          exact
          activeClassName={classes.active}
        >
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_staffTraining")}>
              <ListItemIcon className={classes.drawer_icons}>
                {/* <AddOutlinedIcon /> */}
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_staffTraining")} />
          </ListItem>
        </NavLink>
      </div>

      <div
        className={
          location.pathname === "/dashboard/appointments" ||
          location.pathname.indexOf("/dashboard/appointments/") === 0
            ? classes.active
            : null
        }
      >
        <NavLink
          to="/dashboard/appointments"
          exact
          activeClassName={classes.active}
        >
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_appointment")}>
              <ListItemIcon className={classes.drawer_icons}>
                <MeetingRoomIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_appointment")} />
          </ListItem>
        </NavLink>
      </div>

      <Divider />

      <NavLink to="/" exact activeClassName={classes.active}>
        <ListItem
          button
          className={classes.item}
          onClick={async () => {
            localStorage.clear();
            props.history.push("/");
          }}
        >
          <Tooltip title={t("drawer_signout")}>
            <ListItemIcon className={classes.drawer_icons}>
              <ExitToAppIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={t("drawer_signout")} />
        </ListItem>
      </NavLink>
    </List>
  );
}
