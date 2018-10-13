const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema({
  lat: { type: Float32Array },
  lng: { type: Float32Array },
});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);
