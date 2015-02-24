var Agency = require('../models/agency');
var Service = require('../models/service');
var Question = require('../models/question');
var User = require('../models/user');
var Survey = require('../models/survey');
var express = require("express");
var logger = require('../config/logger');
var async = require('async');

var ejs = require('ejs');

var router = express.Router();

router.route("/:id").get( function(req, res, err) {
  //Use query params to get a specific survey?
  logger.info("Routing with ID");

  Survey.find( {_id : req.params.id}, function(err, survey) {
    if(err) {
      res.send("Survey does not exist");
    }

    //TODO: Add user code.
    Survey.deepPopulate(survey, 'user survey.service survey.questions.question', function(err, survey) {

        logger.info(typeof(survey)); 

        //logger.debug(agencies);
        res.render("print",
          {
            survey : survey
          }
        );

    });

  });

});

module.exports = router;
