import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
