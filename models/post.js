"use strict";

const mongoose = require("mongoose");

module.exports = mongoose.model("post", {
    "imgurl" : {type: String},
    "title" : {type: String},
    "votes" : {type: Number, default: 0},
    "username" : {type: String}
})
