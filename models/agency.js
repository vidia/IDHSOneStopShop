// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var agencySchema = mongoose.Schema({

    //has an id
    name : String,
    url  : String,
    description: String,
    services : [ mongoose.Schema.Types.ObjectId ] //of ServiceSchema
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Agency', agencySchema);
