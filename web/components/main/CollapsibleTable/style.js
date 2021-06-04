import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customLoading: {
    width: "100%",
    position: "absolute",
    "& > * + *": {
      marginTop: 0,
    },
  },
}));

export default useStyles;
