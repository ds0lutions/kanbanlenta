const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CRUD - READ, CREATE, UPDATE IR DELEte
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      status: req.body.status,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, status: req.body.status },
      { new: true, runValidators: true },
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Užduotis ištrinta" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
