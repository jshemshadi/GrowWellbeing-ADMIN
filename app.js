const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer({});
const cors = require("cors");

const path = require("path");
const favicon = require("serve-favicon");

const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config");
const globals = require("./globals");

const app = express();
app.use(favicon(path.join(__dirname, "views", "favicon.png")));

globals(app);

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
    credentials: false,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, phone_number"
  );
  next();
});

const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const compiler = webpack(config(true));
app.use(
  webpackMiddleware(compiler, {
    publicPath: "/",
    writeToDisk: true,
  })
);

app.post(
  "/api/users/updateProfile",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  function (req, res, next) {
    if (req.files && req.files.avatar && req.files.avatar.length) {
      req.body.avatar = req.files.avatar[0];
    }
    next();
  }
);

const api = require("./routes/api");

app.use("/api", api);

const index = require("./routes/index");
app.use("/", index);
app.get("*", (req, res) => {
  res.send(404);
});

server.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});
