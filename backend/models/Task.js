const mongoose = require("mongoose");

// Steps kaip atrodo ir kur keliauja nauja uzduotis.
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo", 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model("Task", taskSchema);
