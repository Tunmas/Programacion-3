
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name : String,
  description : String,
    resume : String,
    user : String
});

module.exports = mongoose.model('Task', TaskSchema);
