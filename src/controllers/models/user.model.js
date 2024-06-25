const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firtname: String,
  lastname: String,
  documento:String,
  role: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;