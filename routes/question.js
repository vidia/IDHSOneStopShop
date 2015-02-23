var Question = require('../models/question')
var express = require("express")
var router = express.Router();

router.route("/").get( function(req, res) {
  Question.find().populate("service").exec( function ( err, questions ) {
    if(err) {
      return res.send(err);
    }

    res.json(questions);
  });
});

router.route("/").post( function(req, res) {
  var question = new Question(req.body);

  question.save(function(err) {
    if(err) {
      return res.send(err)
    }

    res.send( { message : "question added"})
  })
})

router.route("/:id").put(function( req, res) {
  Question.findOne( { _id : req.params.id }, function(err, question) {
    if(err) {
      res.send(err)
    }

    for(prop in req.body) {
      question[prop] = req.body[prop]
    }

    //save it
    question.save( function(err) {
      if(err) {
        return res.send(err)
      }

      res.json( { message : "question updated" } )
    })
  })
})

router.route("/:id").get(function(req, res) {
  Question.findOne( { _id : req.params.id }).populate("service").exec( function( err, question) {
      if(err) {
        res.send(err);
      }

      res.json(question);
    }
  );
});

router.route("/:id").delete(function(req, res) {

  Question.remove( { _id: req.params.id }, function(err, question) {
    if(err) {
      return res.send(err);
    }
    res.json( { message: "Deleted successfully" } )
  });
});

module.exports = router;
