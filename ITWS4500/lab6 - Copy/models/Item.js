const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  Title: String,
  Link: URL,
  Description: String,
  Category: String,
  ID:Number,

});

module.exports = mongoose.model("Article", itemSchema);