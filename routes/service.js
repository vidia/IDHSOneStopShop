var Service = require('../models/service')
var express = require("express")
var router = express.Router();

router.route("/").get( function(req, res) {
  Service.find( function ( err, services ) {
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
      return res.send(err)
    }

    res.send( { message : "Service added"})
  })
})

router.route("/:id").put(function( req, res) {
  Service.findOne( { _id : req.params.id }, function(err, service) {
    if(err) {
      res.send(err)
    }

    for(prop in req.body) {
      service[prop] = req.body[prop]
    }

    //save it
    service.save( function(err) {
      if(err) {
        return res.send(err)
      }

      res.json( { message : "Service updated" } )
    })
  })
})

router.route("/:id").get(function(req, res) {
  Service.findOne( { _id : req.params.id }), function( err, service) {
    if(err) {
      res.send(err)
    }

    res.json(service);
  }
})

router.route("/:id").get(function(req, res) {

  Service.remove( { _id: req.params.id }, function(err, service) {
    if(err) {
      return res.send(err);
    }
    res.json( { message: "Deleted successfully" } )
  });
});

module.exports = router;
