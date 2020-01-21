const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  coords: {
    lat: { type: Number },
    lng: { type: Number }
  },
  images: [String]
});

module.exports = mongoose.model("Location", LocationSchema);
