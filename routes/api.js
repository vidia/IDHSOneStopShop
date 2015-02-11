var express = require('express');
var router = express.Router();
var auth = require("./auth");
var logger = require("../config/logger")


//NOTE: Do not auth the survey POST
// router.use( function(req, res, next) {
//   var mutateMethods = "POST PUT DELETE".split(" ");
//
//   logger.debug("Attempting auth.");
//
//   if(mutateMethods.indexOf(req.method) > -1) {
//     var loggedIn = auth.authenticate(req);
//
//     if (loggedIn) {
//       return next();
//     }
//
//     res.statusCode = 401;
//     res.json( { message : "Must be logged on to write to this api" } )
//
//   } else {
//     return next();
//   }
// });

router.use( "/agency", require('./agency.js'));
router.use( "/question", require("./question.js"));
router.use( "/service", require("./service.js"));
// router.use( "/survey", require("./survey.js"));

module.exports = router;
