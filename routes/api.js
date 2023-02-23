var express = require("express");
var nftRouter = require("./nft")
var flowRouter = require("./flow")

var app = express();

app.use("/nft", nftRouter);

app.use("/flow", flowRouter);

module.exports = app;