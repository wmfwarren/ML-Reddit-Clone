"use strict";

//third party software
const { Router } = require("express");
const router = Router();
//models
const Post = require("../models/post.js")

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
