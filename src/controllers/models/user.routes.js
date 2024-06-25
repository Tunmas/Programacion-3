const express = require('express');
const router = express.Router();
const User = require('./user.model');

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('tasks');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
