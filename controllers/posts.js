const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find({ $expr: { $eq: ["$postedOn", "$userId"] } }, (err, posts) => {
      if (err) {
        throw err;
      }

      posts.forEach((post) => {
        post.owner = req.session.user._id == post.userId;
        post.isProfileFriend = false
        for (let i = 0; i < req.session.user.friends.length; i++){
          if (req.session.user.friends[i].id == post.userId){
            post.isProfileFriend = true     
          } 
        }
        post.comments.forEach((comment) => {
          comment.commentOwner = req.session.user._id == comment.userId;
        });
      });

      res.render("posts/index", {
        posts: posts,
        session: req.session
      });
    }).sort({ createdAt: -1 });
  },

  Create: (req, res) => {
    const post = new Post();
    post.name = req.session.user.name;
    post.message = req.body.message;
    post.photoLink = req.session.user.photoLink;
    post.userId = req.session.user._id;

    if (req.params.id) {
      post.postedOn = req.params.id;
    } else {
      post.postedOn = req.session.user._id;
    }

    if (req.file) {
      post.image = `/images/${req.file.filename}`;
    }

    const date = new Date();
    post.dateString = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.toLocaleTimeString()}`;
    post.save((err) => {
      if (err) {
        throw err;
      }
      //redirect to the current page
      res.status(201).redirect("back");
    });
  },
  Like: (req, res) => {
    Post.findById(req.body.postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (post.likes.includes(req.body.userId)) {
        // removing that userId from the array
        for (let i = 0; i < post.likes.length; i++) {
          if (post.likes[i] === req.body.userId) {
            post.likes.splice(i, 1);
          }
        }
      } else {
        // adding the userId to the array
        post.likes.push(req.body.userId);
      }

      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("back")
      });
    });
  },

  CreateComment: (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        throw err;
      }
      const comment = new Comment();
      comment.name = req.session.user.name;
      comment.message = req.body.message;
      const date = new Date();
      comment.createdAt = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} ${date.toLocaleTimeString()}`;
      comment.userId = req.session.user._id;
      comment.postId = req.params.id;
      post.comments.unshift(comment);
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("back");
      });
    });
  },

  DeletePost: (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id }, (err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("back");
    });
  },

  DeleteComment: (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        throw err;
      }
      for (let i = 0; i < post.comments.length; i++) {
        if (post.comments[i]._id == req.params.commentId) {
          post.comments.splice(i, 1);
        }
      }
      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("back");
      });
    });
  },
};

module.exports = PostsController;
