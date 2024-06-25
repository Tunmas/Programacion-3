const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firtname: String,
  lastname: String,
  documento:String,
  role: String,
  tasks: { type: Schema.Types.ObjectId, ref: 'Task' }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;