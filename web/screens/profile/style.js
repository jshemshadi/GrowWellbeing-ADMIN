import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
  },
  label: {},
  button: {},
  customLoading: {
    width: "100%",
    position: "absolute",
    top: "64px",
    left: "0px",
    "& > * + *": {
      marginTop: 0,
    },
  },
}));

export default useStyles;
