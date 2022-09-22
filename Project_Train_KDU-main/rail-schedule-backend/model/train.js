const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  number: { type: Number },
  from: { type: String },
  to: { type: String },
  isActive: { type: Boolean, default: false },
  lat: Number,
  lng: Number,
  time: {type: String, default: "N/A"},
  type: { type: String, default: "Daily" },
});

module.exports = mongoose.model('Train', UserSchema);