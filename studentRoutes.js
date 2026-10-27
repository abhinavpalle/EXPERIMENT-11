const express = require('express');
const Student = require('../models/student');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to retrieve students' });
  }
});

module.exports = router;
