const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  taskTitle: {
    type: String,
  },
  checklists: [
    {
      name: {
        type: String,
        required: true,
      },
      items: [
        {
          text: {
            type: String,
            required: true,
          },
          checked: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  userEmail: {
    type: String,
  },
});

const Task = model("task", TaskSchema);

module.exports = Task;
