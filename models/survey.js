// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var surveySchema = mongoose.Schema({

    user: mongoose.Schema.Types.ObjectId,
    survey : [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        questions: [
          {
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            answer: String
          }
        ]
      }
    ],
    printed : { type: Boolean, default: false }

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Survey', surveySchema);
