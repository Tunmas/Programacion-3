const express = require('express');
const router = express.Router();
const Task = require('./task.model');
const User = require('./user.model');

// Crear una nueva tarea
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    // Asignar la tarea al usuario
    await User.findByIdAndUpdate(task.user, { $push: { tasks: task._id } });

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todas las tareas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('user');
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;