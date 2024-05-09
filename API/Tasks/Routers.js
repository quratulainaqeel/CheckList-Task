const express = require("express");
const Router = express.Router();
const { AddTask, getAllTask, UpdateTask } = require("./Controller");

Router.post("/add-task", AddTask);
Router.get("/get-all-task", getAllTask);
Router.put("/update-task", UpdateTask);

module.exports = Router;
