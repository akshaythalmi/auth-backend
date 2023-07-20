const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide Firstname!"],
  },

  lastname: {
    type: String,
    required: [true, "Please provide Lastname!"],
  },

  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: [true, "Email Exist"],
  },

  address: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
