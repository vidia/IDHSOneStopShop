var Service = require('../models/service');
var Agency = require('../models/agency');
var Question = require('../models/question');
var express = require("express");
var router = express.Router();

router.route("/").get( function(req, res) {
  Service.find().populate("agencies").populate("questions").exec( function ( err, services ) {
    if(err) {
      return res.send(err);
    }

    res.json(services);
  });
});

router.route("/").post( function(req, res) {
  var service = new Service(req.body);

  service.save(function(err) {
    if(err) {
      return res.send(err);
    }

    res.send( { message : "Service added"});
  });
});

router.route("/:id").put(function( req, res) {
  Service.findOne( { _id : req.params.id }, function(err, service) {
    if(err) {
      res.send(err);
    }

    for(var prop in req.body) {
      service[prop] = req.body[prop];
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err);
      }

      res.json( { message : "Service updated" } );
    });
  });
});

router.route("/:id").get(function(req, res) {
  Service.findOne( { _id : req.params.id }).populate("agencies").populate("questions").exec( function( err, service) {
    if(err) {
      res.send(err);
    }

    res.json(service);
  });
});

router.route("/:id").delete(function(req, res) {

  Service.remove( { _id: req.params.id }, function(err, service) {
    if(err) {
      return res.send(err);
    }
    res.json( { message: "Deleted successfully" } );
  });
});

//-----------------------
//-- Add/view Agencies --
//-----------------------

router.route("/:id/agency").get(function(req, res) {
  Service.findOne( { _id : req.params.id }).populate("agencies").populate("questions").exec( function(err, service) {
    if(err) {
      res.send(err);
    }
    res.json(service.agencies);
  });
});

//Adds the given array of objectids to the service agencies
// Takes :
// {
//  agencies : [...]
// }
router.route("/:id/agency").put(function( req, res) {
  Service.findOne( { _id : req.params.id }, function( err, service) {
    if(err) {
      res.send(err);
    }

    for(var index = 0; index < req.body.agencies.length ; index++) {
      var agencyId = req.body.agencies[index];
      Agency.findOne( { _id : agencyId } , function(err, agency) {
        if(err) {
          res.send(err);
        }
        agency.services.push(req.params.id);
        service.agencies.push(agencyId);

        agency.save();
      });
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err);
      }

      res.json( { message : "Agencies added" } );
    });
  });
});

// Replaces the current array with the given array
// of objectids to the service agencies
// Takes :
// {
//  agencies : [...]
// }
router.route("/:id/agency").post(function( req, res) {
  Service.findOne( { _id : req.params.id }, function( err, service) {
    if(err) {
      res.send(err);
    }

    service.agencies = [];

    for(var index = 0; index < req.body.agencies.length ; index++) {
      var agencyId = req.body.agencies[index];
      Agency.findOne( { _id : agencyId } , function(err, agency) {
        if(err) {
          res.send(err);
        }
        agency.services.push(req.params.id);
        service.agencies.push(agencyId);

        agency.save();
      });
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err);
      }

      res.json( { message : "Agencies updated" } );
    });
  });
});

//Adds the given array of objectids to the service questions
// Takes :
// {
//  questions : [...]
// }
router.route("/:id/question").put(function( req, res) {
  Service.findOne( { _id : req.params.id }, function( err, service) {
    if(err) {
      res.send(err);
    }

    for(var index = 0; index < req.body.questions.length ; index++) {
      var questionId = req.body.questions[index];
      Question.findOne( { _id : questionId } , function(err, question) {
        if(err) {
          res.send(err);
        }
        question.service = req.params.id;
        service.questions.push(questionId);

        question.save();
      });
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err);
      }

      res.json( { message : "Questions added" } );
    });
  });
});

//Adds the given array of objectids to the service questions
// Takes :
// {
//  questions : [...]
// }
router.route("/:id/question").get(function( req, res) {
  Service.findOne( { _id : req.params.id }).populate("questions").exec( function( err, service) {
    if(err) {
      res.send(err);
    }

    service.questions = [];

    for(var index = 0; index < req.body.questions.length ; index++) {
      var questionId = req.body.questions[index];
      Question.findOne( { _id : questionId } , function(err, question) {
        if(err) {
          res.send(err);
        }
        question.service = req.params.id;
        service.questions.push(questionId);

        question.save();
      });
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err);
      }

      res.json( { message : "Questions updated" } );
    });
  });
});

module.exports = router;
