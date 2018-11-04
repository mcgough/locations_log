const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  title: { type: String, length: 255 },
  image: { type: JSON },
});

module.exports = mongoose.model('Photo', PhotoSchema);