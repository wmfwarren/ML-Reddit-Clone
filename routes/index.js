"use strict";

//third party software
const { Router } = require("express");
const router = Router();
//models
const Post = require("../models/post.js")
const Comment = require("../models/comment.js")

router.get('/', (req, res) => {
  Post.find().sort({votes: -1})
  .then((posts) => {
    res.render("index", {posts} )
  })
  .catch(console.error);
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res, err) => {
  Post
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err);
});

router.get('/comments/:postId', (req, res) => {
  let postId = req.params.postId;
  Comment.find({postId}) //.findById(postId)
    .then((comments) => {
      res.render("comments", {comments})
    })
    .catch(console.error)
})

router.post('/comments/:postId', (req, res, err) => {
  let thisComment = req.body;
  thisComment.postId = req.params.postId;
  Comment
    .create(thisComment)
    .then(() => res.redirect('/'))
    .catch(err)
})

router.post("/:id/up", (req, res) => {
  let postID = req.params.id;
  Post.findById(postID, (err, docs) => {
    docs.votes++;
    docs.save((err) => {
      if(err)
      res.redirect("/");
    })
  });
});
router.post("/:id/down", (req, res) => {
  let postID = req.params.id;
  Post.findById(postID, (err, docs) => {
    docs.votes--;
    docs.save((err) => {
      if(err)
      res.redirect("/");
    })
  });
});
  module.exports = router;
