"use strict";

const mongoose = require("mongoose");

module.exports = mongoose.model("comment", {
    "username" : {type: String},
    "message" : {type: String},
    "postId" : {type: String}
})
