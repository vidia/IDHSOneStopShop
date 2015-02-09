var Agency = require('../models/agency')
var express = require("express")
var auth = require("../routes/auth")
var router = express.Router();

router.route("/").get( function(req, res) {
  Agency.find( function ( err, agencies ) {
    if(err) {
      return res.send(err);
    }

    res.json(agencies);
  });
});

router.route("/").post( function(req, res) {
  var agency = new Agency(req.body);

  agency.save(function(err) {
    if(err) {
      return res.send(err)
    }

    res.send( { message : "Agency added"})
  })
})

router.route("/:id").put(function( req, res) {
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

module.exports = router;
