var Agency = require('../models/agency');
var Service = require('../models/service');
var Question = require('../models/question');
var User = require('../models/user');
var Survey = require('../models/survey');
var express = require("express");
var auth = require("../routes/auth");
var logger = require('../config/logger');
var _ = require('underscore');

var router = express.Router();


router.route("/").get( function(req, res, err) {
  //Use query params to get a specific survey?

  var survey = new Survey();


  Question.find().populate("service").exec(function(err, questions) {

    var sbukt = {};

    questions.forEach( function(question) {
      if( sbukt[question.service._id] === undefined )
        sbukt[question.service._id] = [];
      sbukt[question.service._id].push(question);
    });

    for( var id in sbukt ) {
      var serviceEntry = {};
      serviceEntry.questions = [];
      sbukt[id].forEach(function(question) {

        serviceEntry.service = question.service;

        var e = {};
        e.question = question;
        serviceEntry.questions.push(e);
      });

      survey.survey.push(serviceEntry);
    }

    //TODO: Add user code.
    Survey.deepPopulate(survey, 'user survey.service survey.questions.question', function(err, survey) {
      res.send(survey);
    });
  });
});

module.exports = router;
