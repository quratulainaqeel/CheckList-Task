require("dotenv").config();
const Task = require("./Schema");
const { connect } = require("mongoose");

const AddTask = async (req, res) => {
  const { taskTitle, checklists, userEmail } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    console.log("UserTasks DB connected");

    await Task.create({ taskTitle, checklists, userEmail });
    const tasks = await Task.find();

    console.log(" Task Added");

    res.status(201).json({
      message: "Task Added",
      tasks,
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

const UpdateTask = async (req, res) => {
  const { _id, checklistIndex, itemIndex, checked } = req.body;

  try {
    await connect(process.env.MONGO_URI);

    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.checklists[checklistIndex].items[itemIndex].checked = checked;

    await task.save();
    const tasks = await Task.find();

    res.status(200).json({
      message: "Checkbox value updated successfully",
      tasks
    });
    
  } catch (error) {
    res.status(500).message({ message: error.message });
  }
};

module.exports = { AddTask, getAllTask, UpdateTask };
