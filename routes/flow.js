var express = require("express");
const FlowController = require("../controllers/FlowController");

var router = express.Router();

router.post("/roll", FlowController.rollDice);

router.post("/roll/quick", FlowController.quickRollDice);

module.exports = router;