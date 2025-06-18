const express = require('express');
const router = express.Router();
const Nutrition = require('../models/nutritionModel');

// POST /nutrition - Add a new nutrition entry
router.post('/', async (req, res) => {
  try {
    const { foodItem, calories, date } = req.body;

    if (!foodItem || !calories || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newNutrition = new Nutrition({ foodItem, calories, date });
    await newNutrition.save();
    res.status(201).json(newNutrition);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add nutrition entry' });
  }
});

// GET /nutrition - Retrieve all nutrition entries for a specific date
router.get('/', async (req, res) => {
  const { date } = req.query;

  try {
    const nutritionEntries = await Nutrition.find({ date });
    res.status(200).json(nutritionEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve nutrition entries' });
  }
});

module.exports = router;
