"use strict";

//third party software
const { Router } = require("express");
const router = Router();
//models
const Post = require("../models/post.js")

router.get('/', (req, res) => {
  Post.find().sort({votes: 1})
  .then((posts) => {
    res.render("index", {posts} )
  });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res, err) => {
  Post
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err);
})
  module.exports = router;
