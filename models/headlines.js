const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  episode: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  }
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
