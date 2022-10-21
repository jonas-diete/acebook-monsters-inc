const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: String,
  userId: mongoose.Schema.Types.ObjectId, 
  postId: mongoose.Schema.Types.ObjectId
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
