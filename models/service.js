// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var serviceSchema = mongoose.Schema({

  //has an id
  name : { type: String, required: true },
  agencies : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' } ], //Of AgencySchema
  questions : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Question' } ] // Of Questions
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Service', serviceSchema);
