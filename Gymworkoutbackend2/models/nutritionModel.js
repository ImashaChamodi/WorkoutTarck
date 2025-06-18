const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  foodItem: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
