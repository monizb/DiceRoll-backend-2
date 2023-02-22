var express = require("express");
var nftRouter = require("./nft")

var app = express();

app.use("/nft", nftRouter);

module.exports = app;