const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {type: String, unique: false, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, unique: false, required: true},
  photoLink: {type: String, default: "https://i0.wp.com/ih1.redbubble.net/image.1046392292.3346/st,small,507x507-pad,600x600,f8f8f8.jpg"},
  friends: Array,
  friendRequests: Array
});

const User = mongoose.model("User", UserSchema);

module.exports = User;