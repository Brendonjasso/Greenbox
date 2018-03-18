//Initialization Script for Node.JS Server
//Copyright Project Greenbox
//By Chris Schild

const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var routes = require("./routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
