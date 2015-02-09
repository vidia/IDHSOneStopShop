// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var serviceSchema = mongoose.Schema({

  //has an id
  name : { type: String, required: true },
  agencies : [ mongoose.Schema.Types.ObjectId ], //Of AgencySchema
  questions : [ mongoose.Schema.Types.ObjectId ] // Of Questions
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Service', serviceSchema);
