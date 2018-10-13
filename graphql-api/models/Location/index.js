const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coordinates = require('./../Coordinates');

let LocationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  coords: { type: Coordinates },
});

module.exports = mongoose.model('Location', LocationSchema);