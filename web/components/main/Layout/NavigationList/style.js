import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawer_icons: {
    color: "#A5A4BF",
  },
  active: {
    color: "white !important",
    textDecoration: "none",
    "& $item": {
      backgroundColor: theme.palette.primary.dark,
      borderLeft: "4px solid #A3A0FB",
    },
    "& $drawer_icons": {
      color: "white !important",
    },
  },
  all_text: {
    "& a": {
      color: "#A5A4BF",
      textDecoration: "none",
    },
  },
  item: {},
}));

export default useStyles;
