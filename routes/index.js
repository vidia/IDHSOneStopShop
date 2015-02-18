var express = require('express');
var Service = require('../models/service');
var ejs = require('ejs');
var logger = require('../config/logger');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  Service.find( function ( err, services ) {
    if(err) {
      return res.send(err);
    }

    //logger.debug( { "services" : services } );
    res.render("index",
        {
          services : services
        }
      );

    //logger.log( page );
    //res.render(page);
  });

});

module.exports = router;
