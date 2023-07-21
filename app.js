const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConfig = require("./db/dbConfig");
const registerController = require("./controllers/registerController");
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const auth = require("./auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConfig();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

module.exports = app;

app.post("/register", registerController.registerUser);

app.post("/login", loginController.loginUser);

app.post("/getUserByEmail", userController.getUserByEmail);

app.post("/updateProfile", auth, userController.updateProfile);
