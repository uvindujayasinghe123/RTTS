import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Masonry from "@mui/lab/Masonry";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  CardContent,
  Card,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
const Admin = (props) => {
  const [data, setData] = useState(null);
  const [trains, setTrains] = useState(null);

  const get = () => {
    axios.get("http://localhost:5000/dashboard").then((response) => {
      console.log(response);
      setData(response.data.data);
    });

    axios.get("http://localhost:5000/train/all").then((response) => {
      console.log(response);
      setTrains(response.data.data);
    });
  };

  const changeState = (id, state) => {
      axios.get(`http://localhost:5000/train/${id}/changeState?isActive=${state}`).then((response) => {
        console.log(response);
        axios.get("http://localhost:5000/train/all").then((response) => {
          console.log(response);
          setTrains(response.data.data);
        });
      });
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <React.Fragment>
      {data ? (
        <div style={{ margin: "10px" }}>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h3">Users</Typography>
                  <Typography variant="h1">{data.userCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h3">Trains</Typography>
                  <Typography variant="h1">{data.trainCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h3">Posts</Typography>
                  <Typography variant="h1">{data.postCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h3">Feedbacks</Typography>
                  <Typography variant="h1">{data.feedbackCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Masonry columns={2}>
            {trains ? (
              <TableContainer
                component={Paper}
                style={{ minHeight: "500px", padding: "10px" }}
              >
                <Typography variant="h4" style={{ margin: "10px" }}>
                  Train Status Manager
                </Typography>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Train Name</TableCell>
                      <TableCell align="center">Number</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trains.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row.number}
                        </TableCell>
                        <TableCell align="center">
                          {row.isActive ? (
                            <Button
                              onClick={() => changeState(row._id, "false")}
                              color="secondary"
                              variant="contained"
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              onClick={() => changeState(row._id, "true")}
                              color="primary"
                              variant="contained"
                            >
                              Activate
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>No trains</div>
            )}
          </Masonry>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export default Admin;
