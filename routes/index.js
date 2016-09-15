"use strict";

//third party software
const { Router } = require("express");
const router = Router();
//models
const Post = require("../models/post.js")

router.get('/', (req, res) => {
  res.render("index");
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
