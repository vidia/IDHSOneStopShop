var Agency = require('../models/agency')
var Service = require('../models/service')
var express = require("express")
var auth = require("../routes/auth")
var logger = require('../config/logger')
var _ = require('underscore');


function forbidServices(res, req, next) {
  if(_.has(req.body, 'services') ) {
    res.code = 401;
    res.json( { message : "Value {" + "Services" + "} cannot be updated here" } );
  } else return next();
}


var router = express.Router();

router.route("/").get( function(req, res) {
  Agency.find( function ( err, agencies ) {
    if(err) {
      return res.send(err);
    }

    res.json(agencies);
  });
});

router.route("/").post(forbidServices, function(req, res) {
  var agency = new Agency(req.body);

  agency.save(function(err) {
    if(err) {
      return res.send(err)
    }

    res.send( { message : "Agency added"})
  })
})

router.route("/:id").put(forbidServices, function( req, res) {
  Agency.findOne( { _id : req.params.id }, function(err, agency) {
    if(err) {
      res.send(err)
    }

    for(prop in req.body) {
      agency[prop] = req.body[prop]
    }

    //save it
    agency.save( function(err) {
      if(err) {
        return res.send(err)
      }

      res.json( { message : "Agency updated" } )
    })
  })
})

router.route("/:id").get(function(req, res) {
  Agency.findOne( { _id : req.params.id }, function(err, agency) {
    if(err) {
      res.send(err)
    }
    res.json(agency);
  });
});


router.route("/:id").delete(function(req, res) {

  Agency.remove( { _id: req.params.id }, function(err, agency) {
    if(err) {
      return res.send(err);
    }
    res.json( { message: "Deleted successfully" } )
  });
});

//-----------------------
//-- Add/view services --
//-----------------------

router.route("/:id/service").get(function(req, res) {
  Agency.findOne( { _id : req.params.id }, function(err, agency) {
    if(err) {
      res.send(err)
    }
    res.json(agency.services);
  });
});

//Adds the given array of objectids to the agency services
// Takes :
// {
//  services : [...]
// }
router.route("/:id/service").put(function( req, res) {
  Agency.findOne( { _id : req.params.id }, function(err, agency) {
    if(err) {
      res.send(err)
    }

    for(var index = 0; index < req.body.services.length ; index++) {
      var serviceId = req.body.services[index];
      Service.findOne( { _id : serviceId } , function(err, service) {
        if(err) {
          res.send(err)
        }
        service.agencies.push(req.params.id);
        agency.services.push(serviceId);

        service.save();
      })
    }

    //save it
    agency.save( function(err) {
      if(err) {
        return res.send(err)
      }

      res.json( { message : "Services added" } )
    })
  })
})

// Replaces the current array with the given array
// of objectids to the agency services
// Takes :
// {
//  services : [...]
// }
router.route("/:id/service").post(function( req, res) {
  Agency.findOne( { _id : req.params.id }, function(err, agency) {
    if(err) {
      res.send(err)
    }

    agency.services = [];

    for(var index = 0; index < req.body.services.length ; index++) {
      var serviceId = req.body.services[index];
      Service.findOne( { _id : serviceId } , function(err, service) {

        if(err) {
          res.send(err)
        }
        service.agencies.push(req.params.id);
        agency.services.push(serviceId);

        service.save();
      })
    }

    //save it
    agency.save( function(err) {
      if(err) {
        return res.send(err)
      }

      res.json( { message : "Services updated" } )
    })
  })
})




module.exports = router;
