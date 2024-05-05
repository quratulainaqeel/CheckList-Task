const express = require("express");
const Router = express.Router();
const { getstories } = require("./Controller");

Router.get("/get-stories", getstories);

module.exports = Router;
