var mongoose = require('mongoose');

var configDB = require('../config/database.js');
mongoose.connect(configDB.geturl()); // connect to our database

var Service = require("../models/service");
var Agency = require("../models/agency");
var Question = require("../models/question");

var faker = require("../lib/faker");

// FSSA
var agency = new Agency();
agency.name = "Family and Social Services (FSSA)";
agency.description = "The agency offers assistance for Hoosiers of nearly all ages. At disaster sites, it provides crisis counseling, replacement food stamps for current recipients who have lost food.";
agency.url = "http://fssa.in.gov";
agency.imageUrl = "images/IndyGov.png";

agency.save( function(err, agency) {
  if(err) {
    console.log("Error creating agency");
  }
});

var service = new Service();
service.name = "Social Services";

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
});

// IDHS
var agency = new Agency();
agency.name = "Department of Homeland Security (IDHS)";
agency.description = "This challenge can potentially impact Hoosiers by decreasing the amount of required paperwork. This will help speed up service times in the one-stop shop and help get assistance distributed more quickly.";
agency.url = "http://www.in.gov/dhs/";
agency.imageUrl = "images/IndyGov.png";

agency.save( function(err, agency) {
  if(err) {
    console.log("Error creating agency");
  }
});

var service = new Service();
service.name = "Additional documentation";

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
});

var q = new Question();
q.type = "yn";
q.text = "Do you need a Green Card replaced?";
q.service = service._id;
service.questions.push( q._id );
service.save();
console.log("Question: " + q);
q.save();

q = new Question();
q.type = "yn";
q.text = "Do need a new social security card?";
q.service = service._id;
service.questions.push( q._id );
service.save();
console.log("Question: " + q);
q.save();


// ISDH
var agency = new Agency();
agency.name = "Indiana State Department of Health (ISDH)";
agency.description = "This agency offers clean up and disposal advice and education, including mold removal and prevention, vaccination information, tetanus shots, access and information to vital records.";
agency.url = "http://www.state.in.us/isdh/";
agency.imageUrl = "images/IndyGov.png";

agency.save( function(err, agency) {
  if(err) {
    console.log("Error creating agency");
  }
});

// DWD
var agencydwd = new Agency();
agency.name = "Department of Workforce Development (DWD)";
agency.description = "Unemployment benefits can be applied for through this agency.";
agency.url = "http://www.in.gov/dwd/";
agency.imageUrl = "images/IndyGov.png";

agency.save( function(err, agency) {
  if(err) {
    console.log("Error creating agency");
  }
});



var service = new Service();
service.name = "Public Health Information";

console.log(agency._id);

service.agencies.push( agency._id );
service.agencies.push( agencydwd._id );

agency.services.push( service._id );
agencydwd.services.push( service._id );

agency.save();
service.save();
agencydwd.save();

console.log("Service: " + service);
service.save( function(err, service) {
  if(err) {
    console.log("Error creating service");
  }
});

var q = new Question();
q.type = "yn";
q.text = "Do you need to clean up your property?";
q.service = service._id;
service.questions.push( q._id );

service.save();

console.log("Question: " + q);

q.save();


var q = new Question();
q.type = "yn";
q.text = "Did you lose any vital records for you or a family member’s birth or death certificate?";
q.service = service._id;
service.questions.push( q._id );

service.save();

console.log("Question: " + q);

q.save();



var q = new Question();
q.type = "yn";
q.text = "Are you and your family members in need of an updated tetanus shot to avoid getting tetanus/aka lockjaw since you may be in need of cleaning your property and handling rusty nails or other materials?";
q.service = service._id;
service.questions.push( q._id );

service.save();

console.log("Question: " + q);

q.save();

//BMV
var agency = new Agency();
agency.name = "Bureau of Motor Vehicles (BMV)";
agency.description = "All BMV transactions can be completed, including replacement driver’s license, identification card, titles, registrations or license plates.";
agency.url = "https://secure.in.gov/bmv/";
agency.imageUrl = "images/BMV.png";

console.log("Agency: " + agency);

agency.save( function(err, agency) {
if(err) {
console.log("Error creating agency");
}
});

var service = new Service();
service.name = "Bureau of motor vehicles";

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
});

var q = new Question();
q.type = "yn";
q.text = "Do you or a family member need to obtain a replacement identification card including driver’s licenses or State I.D.?";
q.service = service._id;
service.questions.push( q._id );
service.save();
console.log("Question: " + q);
q.save();

q = new Question();
q.type = "yn";
q.text = "Do you or a family member need to replace a title, registration, license plate?";
q.service = service._id;
service.questions.push( q._id );
service.save();
console.log("Question: " + q);
q.save();








//Department of Child Services
var agency = new Agency();
agency.name = "Department of Child Services";
agency.description = "This agency provides clothing for children.";
agency.url = "http://www.in.gov/dcs/";
agency.imageUrl = "http://www.in.gov/dcs/images/logo_dcs-115.png";

console.log("Agency: " + agency);

agency.save( function(err, agency) {
if(err) {
console.log("Error creating agency");
}
});
var service = new Service();
service.name = "Children's Clothing";

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
});

var q = new Question();
q.type = "yn";
q.text = "Did any of your children lose any clothing due to the disaster/emergency?";
q.service = service._id;
service.questions.push( q._id );

service.save();

console.log("Question: " + q);

q.save();
