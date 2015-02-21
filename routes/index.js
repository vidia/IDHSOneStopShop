var express = require('express');
var Agency = require('../models/agency');
var ejs = require('ejs');
var logger = require('../config/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  Agency.find().populate("services").exec( function ( err, agencies ) {
    if(err) {
      return res.send(err);
    }
    //logger.info(agencies);
    agencies.forEach(function(agency) {
      agency.shortDescription = agency.description.substring(0, 30) + "...";
    });

    //logger.debug(agencies);
    res.render("index",
        {
          agencies : agencies
        }
      );
  });

});

module.exports = router;
