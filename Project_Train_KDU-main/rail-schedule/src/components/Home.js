import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { geolocated } from "react-geolocated";
import { getDistance } from "geolib";
import Masonry from "@mui/lab/Masonry";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import TrainMap from "./TrainMap";
import { Link, useHistory } from "react-router-dom";
import AboutUS from "./AboutUS";
import Posts from "./Posts";
import FeedBack from "./FeedBack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    margin: "10px",
    height: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const stations = [
  "Moratuwa",
  "Colombo Fort",
  "Mount Lavenia",
  "Kandy",
  "Panadura",
];

const Home = (props) => {
  const columns = [
    { field: "number", headerName: "Number" },
    { field: "from", headerName: "From" },
    { field: "to", headerName: "To" },
  ];

  const columnsTT = [
    { field: "number", headerName: "Number" },
    { field: "from", headerName: "From" },
    { field: "to", headerName: "To" },
    { field: "time", headerName: "Time" },
    { field: "type", headerName: "Available on" },
  ];

  const history = useHistory();
  const classes = useStyles();
  const [isTrainsLoading, setisTrainsLoading] = useState(true);
  const [trains, setTrains] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("Current");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Alert")

  useEffect(() => {
    if (isTrainsLoading) {
      axios.get("http://localhost:5000/train/all").then((response) => {
        console.log(response.data);
        setisTrainsLoading(false);
        var tempTrains = [];
        response.data.data.forEach((t) => {
          t.id = t._id;
          tempTrains.push(t);
        });
        setTrains(tempTrains);
      });
    }
  });

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={()=>setAlertOpen(false)}>
        X
      </Button>
    </React.Fragment>
  );

  const search = (val) => {
    console.log(type);

    if (val === "Current") {
      axios
        .post("http://localhost:5000/train/search", { from: from, to: to })
        .then((response) => {
          console.log(response.data);
          setTrains([]);
          var tempTrains = [];
          response.data.data.forEach((t) => {
            t.id = t._id;
            tempTrains.push(t);
          });
          setTrains(tempTrains);
        });
    } else {
      axios
        .post("http://localhost:5000/train/timeTable", { from: from, to: to })
        .then((response) => {
          console.log("time table");
          console.log(response.data);
          setTrains([]);
          var tempTrains = [];
          response.data.data.forEach((t) => {
            t.id = t._id;
            tempTrains.push(t);
          });
          setTrains(tempTrains);
        });
    }
  };

  const setAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  }

  return (
    <React.Fragment>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={() => {}}
        message={alertMessage}
        action={action}
      />
      <Masonry columns={2} spacing={1} style={{ backgroundColor: "#EEE" }}>
        <div>
          <Paper className={classes.paper}>
            {/* {!props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : props.coords ? (
          <div>
            Your Location: ({props.coords.latitude}), ({props.coords.longitude})
          </div>
        ) : (
          <div>Getting the location data </div>
        )} */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="from"
                value={from}
                onChange={(value) => setFrom(value.target.value)}
              >
                <MenuItem value="">--select--</MenuItem>
                {stations.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label2">To</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="to"
                value={to}
                onChange={(value) => setTo(value.target.value)}
              >
                <MenuItem value="">--select--</MenuItem>
                {stations.map((item) => (
                  <MenuItem key={item + "2"} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label3">
                Search type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="type"
                value={type}
                onChange={(value) => {
                  setType(value.target.value);
                  search(value.target.value);
                  console.log("called");
                }}
              >
                <MenuItem value="">--select--</MenuItem>
                <MenuItem value="Current">Next Train</MenuItem>
                <MenuItem value="TimeTable">Time Table</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => search(type)}
                style={{ margin: "inherit" }}
              >
                Search
              </Button>
            </FormControl>

            <div>
              {to ? (
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "5px 10px" }}
                  >
                    <a
                      target="tab"
                      style={{ textDecoration: "none", color: "white" }}
                      href={`https://pickme.lk/book-your-taxi?location_from=${to}+Railway+Station&location_from_lat=&location_from_lng=&location_to=&location_to_lat=&location_to_lng=&vehicleTypeOption=0&is_widget=1`}
                      className={classes.a}
                    >
                      Book Taxi
                    </a>
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "5px 10px" }}
                  >
                    <a
                      target="tab"
                      style={{ textDecoration: "none", color: "white" }}
                      href={`https://www.airbnb.com/s/${to}--Sri-Lanka/homes`}
                      className={classes.a}
                    >
                      Book Hotel
                    </a>
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {trains.length !== 0 && props.coords ? (
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                filterMode="client"
                autoHeight
                rows={trains}
                columns={type === "Current" ? columns : columnsTT}
                onRowClick={
                  type === "Current"
                    ? (row) => history.push("train-info", { data: row.row })
                    : (row) => {}
                }
              />
            ) : (
              "no trains"
            )}
          </Paper>
        </div>
        <div>
          <AboutUS></AboutUS>
        </div>
        <div>
          <Posts></Posts>
        </div>
        <div>
          <FeedBack alert={setAlert}></FeedBack>
        </div>
      </Masonry>
    </React.Fragment>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home);
