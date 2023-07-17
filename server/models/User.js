const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    sex: { type: String, required: true },
    location: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
