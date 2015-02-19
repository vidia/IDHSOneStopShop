var mongoose = require('mongoose');

var configDB = require('../config/database.js');
mongoose.connect(configDB.geturl()); // connect to our database

var Service = require("../models/service");
var Agency = require("../models/agency");
var Question = require("../models/question");

var faker = require("../lib/faker");



for (var i = 0; i < 12; i++) {
  var agency = new Agency();
  agency.name = faker.company.companyName();
  agency.description = faker.lorem.paragraph();
  agency.url = faker.internet.domainName();
  agency.imageUrl = "http://lorempixel.com/640/480/business";

  console.log("Agency: " + agency);

  agency.save( function(err, agency) {
    if(err) {
      console.log("Error creating agency");
    }

    var service = new Service();
    service.name = faker.lorem.words()[0];

    console.log(agency._id);

    service.agencies.push( agency._id );
    agency.services.push( service._id );

    agency.save();
    service.save();

    console.log("Service: " + service);
    service.save( function(err, service) {
      if(err) {
        console.log("Error creating service");
      }

      for(var v = 0; v < 5; v++) {
        var q = new Question();
        q.type = "yn";
        q.text = faker.lorem.sentence() + "?";
        q.service = service._id;
        service.questions.push( q._id );

        service.save();

        console.log("Question: " + q);

        q.save();
      }
    });

  });
}
