require("dotenv").config();
const Task = require("./Schema");
const { connect } = require("mongoose");

const AddTask = async (req, res) => {
  const { taskTitle, checklists, userEmail } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    console.log("UserTasks DB connected");

    await Task.create({ taskTitle, checklists, userEmail });
    console.log(" Task Added");

    res.status(201).json({
      message: "Task Added",
    });

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    res.status(500).message({ message: error.message });
  }
};

module.exports = { AddTask, getAllTask };
