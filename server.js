"use strict";

//third party requires
const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/");
const {connect} = require("./database");

const app = express();

//set user prefered port or default to 3001
const port = process.env.PORT || 3001;
app.set("port", port);
//configure for pug
app.set("view engine", "pug");

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use(routes);

// app.use((req, res) => {
//   res.render("404");
// })

//error handling
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
    res.sendStatus(err.status || 500)

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp}] "${`${method} ${url}`}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on Port number ${port}`)
    })
  })
  .catch(console.error);
