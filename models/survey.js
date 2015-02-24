// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var Agency = require('../models/agency');
var Service = require('../models/service');
var Question = require('../models/question');
var User = require('../models/user');

var deepPopulate = require("mongoose-deep-populate");


var surveyQuestionSchema = mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answer: String
});

var surveyEntrySchema = mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  questions: [ surveyQuestionSchema ]
});

var surveySchema = mongoose.Schema({

    surveyid : String,
    survey : [ surveyEntrySchema ],
    printed : { type: Boolean, default: false }

});

surveySchema.plugin(deepPopulate);
// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Survey', surveySchema);
