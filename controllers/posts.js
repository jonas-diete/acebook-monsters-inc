const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      
      posts.forEach((post) => {
        post.owner = req.session.user._id == post.user_id;
        post.comments.forEach((comment) => {
          comment.comment_owner = req.session.user._id == comment.user_id;
        });
      });

      res.render("posts/index", {
        posts: posts,
        session: req.session,
      });
    }).sort({ createdAt: -1 });
  },

  Create: (req, res) => {
    const post = new Post();
    post.name = req.session.user.name;
    post.message = req.body.message;
    post.photo_link = req.session.user.photo_link;
    if (req.file) {
      post.image = req.file.filename;
    }
    const date = new Date();
    post.date_string = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.toLocaleTimeString()}`;
    post.user_id = req.session.user._id;
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Like: (req, res) => {
    console.log(req.body.userId);
    console.log(req.body.postId);

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
        res.status(201).redirect("/posts");
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
      comment.user_id = req.session.user._id;
      comment.post_id = req.params.id;
      post.comments.unshift(comment);
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },

  DeletePost: (req, res) => {
    Post.findOneAndDelete({_id: req.params.id}, (err)=> {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    })
  },

  DeleteComment: (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        throw err;
      }
      for(let i=0; i< post.comments.length; i++){
        if(post.comments[i]._id == req.params.commentId){
          post.comments.splice(i, 1);
        }
      }
      post.save((err) => {
        if (err) {
          throw err;
        }
     
      res.status(201).redirect("/posts");
    });
  });
}
};

module.exports = PostsController;
