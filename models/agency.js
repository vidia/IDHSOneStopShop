// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var logger = require("../config/logger");

// define the schema for our user model
var agencySchema = mongoose.Schema({

    //has an id
    name : { type: String, required: true },
    url  : String,
    description: String,
    shortdescription : String,
    imageUrl : String,
    services : [ mongoose.Schema.Types.ObjectId ] //of ServiceSchema
});

// methods ======================
// agencySchema.pre("validate", function(next, data) {
//   logger.info("In pre-validate", data);
//
//
// })


// create the model for users and expose it to our app
module.exports = mongoose.model('Agency', agencySchema);
