const express = require("express");
const Router = express.Router();
const { AddTask, getAllTask } = require("./Controller");

Router.post("/add-task", AddTask);
Router.get("/get-all-task", getAllTask);

module.exports = Router;
