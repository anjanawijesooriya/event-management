const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Events = new Schema({
  eType: String,
  eHall: String,
  eDate: Date,
  eRevenue: Number,
  eFood: String,
  eLtype: String,
  eDtype: String,
});

const newEvents = mongoose.model("events", Events);
module.exports = newEvents;
