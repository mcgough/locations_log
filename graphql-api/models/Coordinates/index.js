const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema({
  lat: { type: Number },
  lng: { type: Number },
});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);
