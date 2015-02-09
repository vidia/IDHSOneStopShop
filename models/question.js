// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var questionTypes = "yn fillin".split(" ");

// define the schema for our user model
var questionSchema = mongoose.Schema({

  //has an id
  text : {type: String, required: true },
  type  : { type : String, enum : questionTypes },
  service : mongoose.Schema.Types.ObjectId //of ServiceSchema

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Question', questionSchema);
