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

    survey.save(function(err) {
      if(err) {
        res.send( { message : "Failed to create survey"} );
      }
    });

    //TODO: Add user code.
    Survey.deepPopulate(survey, 'user survey.service survey.questions.question', function(err, survey) {

      if(req.query.format === "json") {
        res.send(survey);
      } else {
        //logger.debug(agencies);
        res.render("survey",
          {
            survey : survey
          }
        );
      }
    });
  });
});


var apiRouter = express.Router();

apiRouter.route("/:id").post( function(req, res, err) {
  logger.debug("Hello");
/*
{
  survey : [
    {
      questionid : ObjectId,
      answer : enum, yes, no, text
    }
  ]
}
*/

  Survey.findOne( { _id : req.params.id }, function(err, survey) {
    if (err) {
      res.send(err);
    }

    var dict = {};
    for (var i = 0; i < req.body.survey.length; i++) {
      var answer = req.body.survey[i];
      dict[answer.questionid] = answer;
    }

    logger.debug(survey);

    async.each(survey.survey, function(section, callback) {

      async.each(section.questions, function(question, callback) {
        if( question.question._id in dict) {
          question.answer = dict[question.question._id];
          callback();
        } else {
          callback("Question " + question.question._id + " was not answered.");
        }
      }, function(err) {
        callback(err); //pass up the callback.
      });

    }, function(err) {
      if(err) {
        res.send( { message : err } );
      }
      else res.send( {message: "Survey answered correctly!"});
    });

  });

});


module.exports = {
  survey : router,
  api : apiRouter
};
