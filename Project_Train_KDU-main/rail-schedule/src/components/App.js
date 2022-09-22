import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import thunk from "redux-thunk";
import TrainMap from "./TrainMap";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Modal,
  FormControl,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Posts from "./Posts";
import Footer from "./Footer";
import tawkTo from "tawkto-react";
import Admin from "./Admin";
import axios from "axios";
import LogInPage from "./AuthPages/LogInPage";
import PasswordResetPage from "./AuthPages/PasswordResetPage";
import RegisterPage from "./AuthPages/RegisterPage";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "../store/reducers/auth";
import Travel from "./Travel";

const imgBack = require("./background.png");

const tawkToPropertyId = "617ea3bff7c0440a5920ccda";
const tawkToKey = "1fjbav9pk";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "White",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    margin: "10px",
    height: "80vh",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  a: {
    color: "White",
  },
}));

const routesList_ = [
  {
    path: "/posts",
    text: "News",
  },
  {
    path: "/home",
    text: "Trains",
  },
];

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [routesList, setRoutesList] = useState(routesList_);

  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      setRoutesList([
        {
          path: "/posts",
          text: "News",
        },
        {
          path: "/travel",
          text: "Travel",
        },
        {
          path: "/home",
          text: "Trains",
        },
        {
          path: "/admin",
          text: "Admin",
        },
      ]);
    } else {
      setRoutesList([
        {
          path: "/posts",
          text: "News",
        },
        {
          path: "/travel",
          text: "Travel",
        },
        {
          path: "/home",
          text: "Trains",
        },
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (!user && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    tawkTo(tawkToPropertyId, tawkToKey);
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("email", response.profileObj.email);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    setUser(response.profileObj);
    setIsOpen(false);
    add(response.profileObj);
    window.location.reload();
  };

  const add = (usr) => {
    axios
      .post("http://localhost:5000/user", {
        username: usr.email,
        name: usr.name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const logout = (response) => {
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const loginAdmin = () => {
    console.log(username, pw);

    if (username === "admin" && pw === "admin123") {
      localStorage.setItem("email", "admin@admin.com");
      const adminUser = {
        role: "ADMIN",
        name: "RTTS Admin",
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      setIsOpen(false);
      window.location.reload();
    } else {
      alert("Invalid login");
    }
  };

  const rootReducer = combineReducers({
    auth: authReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <React.Fragment>
      <Provider store={store}>
        <AppBar position="static">
          <Toolbar>
            <img
              src={require("./logo.jpeg")}
              style={{ height: "40px" }}
              alt="logo"
            ></img>
            <pre> </pre>
            <Typography variant="h6" className={classes.title}>
              Train Scheduler
            </Typography>

            {routesList.map((route) => {
              return (
                <Button color="secondary" className={classes.menuButton}>
                  <a href={route.path} className={classes.a}>
                    {route.text}
                  </a>
                </Button>
              );
            })}

            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button onClick={() => setIsOpen(true)}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
        <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogContent>
            <div style={{ width: "100%", textAlign: "center" }}>
              <GoogleLogin
                clientId="763169832153-f6tgr2gjrtl9h2rk0j702kiu93gd99a8.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => (window.location.href = "/login")}
                color="primary"
                variant="contained"
              >
                Regular login
              </Button>
            </div>
            <hr style={{ margin: "10px" }}></hr>

            <Typography variant="subtitle2">Staff login</Typography>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Username"
                variant="outlined"
                onChange={(val) => setUsername(val.target.value)}
              />
              <TextField
                style={{ marginTop: "10px" }}
                id="standard-basic"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(val) => setPw(val.target.value)}
              />
              <Button
                style={{ marginTop: "10px" }}
                onClick={loginAdmin}
                color="primary"
                variant="contained"
              >
                Login as admin
              </Button>
            </FormControl>
          </DialogContent>
        </Dialog>
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/posts">
                <Posts />
              </Route>
              <Route path="/login">
                <LogInPage />
              </Route>
              <Route path="/reset-password">
                <PasswordResetPage />
              </Route>
              <Route path="/signup">
                <RegisterPage />
              </Route>
              <Route path="/travel">
                <Travel />
              </Route>

              <Route path="/users">
                <Users />
              </Route>
              <Route path="/admin">
                {user?.role === "ADMIN" ? <Admin /> : <Home />}
              </Route>
              <Route path="/train-info">
                <TrainMap />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer></Footer>
      </Provider>
    </React.Fragment>
  );
};

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
