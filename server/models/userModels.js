const mongoose = require("mongoose");

var schema = mongoose.Schema({
  empID: String,
  name: String,
  position: String,
  description: String,
  address: String,
  email: String,
  number: String,
});

module.exports = mongoose.model("users", schema);
