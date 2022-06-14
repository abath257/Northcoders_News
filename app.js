// dependency imports
const cors = require('cors')
app.use(cors());
const express = require("express");
const app = express();

app.use(express.json());
const apiRouter = require("./routes/api.router");

const {
  handleRootPathErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/errors.controller.js");

app.use("/api", apiRouter);

module.exports = app;
