const express       = require('express'),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      mongoose      = require('mongoose'),
      LocalStrategy = require('passport-local'),
      routes        = require("./routes/index"),
      cors = require("cors")

const app = express();
// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));


app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/train-app", { useNewUrlParser: true }); 

// // Enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

  // Allowed headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Allowed request methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);