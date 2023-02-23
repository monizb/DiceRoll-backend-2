var express = require("express");
const FlowController = require("../controllers/FlowController");

var router = express.Router();

router.post("/roll", FlowController.rollDice);


module.exports = router;