import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import i18n, { t } from "../../i18n";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    cursor: "pointer",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState({});
  const [anchorPr, setAnchorPr] = React.useState(null);
  const classes = useStyles();
  const { sections, title } = props;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorPr}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorPr)}
      onClose={() => {
        setAnchorPr(null);
      }}
    >
      <StyledMenuItem>
        <ListItemText
          onClick={async () => {
            props.history.push("/dashboard");
          }}
        >
          {t("appbar_dashboard")}
        </ListItemText>
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemText
          onClick={async () => {
            props.history.push("/dashboard/profile");
          }}
        >
          {t("appbar_profile")}
        </ListItemText>
      </StyledMenuItem>
      <StyledMenuItem>
        <ListItemText
          onClick={async () => {
            localStorage.clear();
            props.history.push("/");
          }}
        >
          {t("appbar_signout")}
        </ListItemText>
      </StyledMenuItem>
    </Menu>
  );

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      MenuListProps={{ onMouseLeave: () => setAnchorEl({}) }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          onClick={() => {
            props.history.push("/");
          }}
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {!localStorage.getItem("token") ? (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.history.push("/login");
              }}
              style={{ marginRight: 5 }}
            >
              log in
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.history.push("/signup");
              }}
              style={{ marginLeft: 5 }}
            >
              Sign up
            </Button>{" "}
          </>
        ) : (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={(event) => {
              setAnchorPr(event.currentTarget);
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <div key={`menue_${section.title}`}>
            <StyledMenuItem key={`menueItem_${section.title}`}>
              <ListItemText
                id={`section_${section.title}`}
                style={{ minWidth: "fit-content" }}
                aria-controls={`customized-menu_${section.title}`}
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  props.history.push(section.url);
                  setAnchorEl({});
                }}
                onMouseOver={(event) => {
                  event.preventDefault();
                  if (anchorEl[section.title] !== event.currentTarget) {
                    setAnchorEl({
                      [section.title]: event.currentTarget,
                    });
                  }
                }}
              >
                {section.title}
              </ListItemText>
            </StyledMenuItem>
            {section.subMenues && (
              <StyledMenu
                id={`customized-menu_${section.title}`}
                anchorEl={anchorEl[section.title]}
                keepMounted
                open={Boolean(anchorEl[section.title])}
                onClose={() => setAnchorEl({})}
              >
                {section.subMenues &&
                  section.subMenues.map((menu) => (
                    <StyledMenuItem
                      key={`styledMenuItem-subMenues_${menu.title}`}
                      onClick={() => {
                        props.history.push(menu.url);
                        setAnchorEl({});
                      }}
                    >
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText
                        key={`listItemText-subMenues_${menu.title}`}
                        primary={menu.title}
                      />
                    </StyledMenuItem>
                  ))}
              </StyledMenu>
            )}
          </div>
        ))}
      </Toolbar>
      {localStorage.getItem("token") && renderMenu}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
