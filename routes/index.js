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
    res.render("index",
        {
          agencies : agencies
        }
      );
  });

});

module.exports = router;
