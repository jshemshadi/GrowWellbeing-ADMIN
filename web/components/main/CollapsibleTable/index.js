import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import moment from "moment";
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  useMediaQuery,
} from "@material-ui/core";
import CustomizedSnackbars from "../Snakbar";
import i18n, { t } from "../../../i18n";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function createData({
  guid,
  GPId,
  date,
  gardianName,
  fullName,
  contactNumber,
  DoB,
  status,
}) {
  return {
    guid,
    GPId,
    date: moment(date).format("YYYY-MM-DD"),
    gardianName,
    fullName,
    contactNumber,
    DoB: moment(DoB).format("YYYY-MM-DD"),
    status,
  };
}

function Row(props) {
  const { row, allGPs, hendleAssignAppointment } = props;
  const [open, setOpen] = useState(false);
  // const [selectedGP, setSelectedGP] = useState(
  //   _.find(allGPs, (g) => g.guid === row.GPId)
  // );
  const [selectedGP, setSelectedGP] = useState(null);
  const theme = useTheme();
  const classes = useRowStyles(theme);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.fullName}</TableCell>
        <TableCell align="right">{row.gardianName}</TableCell>
        <TableCell align="right">{row.contactNumber}</TableCell>
        <TableCell align="right">{row.DoB}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Assign
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">GP</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedGP?.username}
                    onChange={(event) => {
                      setSelectedGP(
                        _.find(allGPs, (g) => g.guid === event.target.value)
                      );
                    }}
                  >
                    {allGPs.map((GP, index) => {
                      return <MenuItem value={GP.guid}>{GP.username}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <Button
                  disabled={!selectedGP}
                  variant="contained"
                  color="primary"
                  style={{ width: "130px", color: "#FAFAFA" }}
                  onClick={() => {
                    console.log(row);
                    hendleAssignAppointment({
                      appointmentId: row.guid,
                      GPId: selectedGP.guid,
                    });
                  }}
                >
                  Assign
                </Button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    guid: PropTypes.string.isRequired,
    GPId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    gardianName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    contactNumber: PropTypes.number.isRequired,
    DoB: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

import useStyles from "./style";

export default function CollapsibleTable(props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });
  const [allGPs, setAllGPs] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);

  const loadData = () => {
    utils
      .post("/api/users/getAllGPs")
      .then((result) => {
        setLoading(false);
        if (result && result && result.data) {
          const { isSuccess, data, msg, error, unauthorized } = result.data;
          if (isSuccess) {
            setAllGPs(data);
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
  }, []);

  const rows = props.events.map((event) => {
    return createData(event);
  });

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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">Gardian Name</TableCell>
              <TableCell align="right">Contact Number</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.name}
                row={row}
                allGPs={allGPs}
                hendleAssignAppointment={props.hendleAssignAppointment}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
