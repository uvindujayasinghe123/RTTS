const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  content : String,
  email: String,
  name : String,
  image: String,
  addedOn: {
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model("Post", Schema);