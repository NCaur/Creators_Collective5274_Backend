const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define MongoDB schema and models
const userSchema = new Schema({
    username: { type: String, unique: true },
    password: {type: String},
    email: { type: String, unique: true }, 
    age: {type: Number}, 
    gender: {type: String}
  });
  

const User = mongoose.model('User', userSchema);
module.exports = User;