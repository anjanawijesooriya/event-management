const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Decorations = new Schema({
  dType: String,
  dLightings: String,
  dFlowers: String,
  dSeating: Number,
  dEquipment: String,
});

const newDecorations = mongoose.model("event", Decorations);
module.exports = newDecorations;
