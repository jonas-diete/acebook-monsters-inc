const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    likes: Array,
    comments: Array,
    photoLink: String,
    image: String,
    dateString: String,
    fileStorage: Array,
    userId: String,
    postedOn: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
