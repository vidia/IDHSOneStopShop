var express = require('express');
var router = express.Router();

router.use( "/agency", require('./agency.js'));
router.use( "/question", require("./question.js"));
router.use( "/service", require("./service.js"));
// router.use( "/survey", require("./survey.js"));

module.exports = router;
