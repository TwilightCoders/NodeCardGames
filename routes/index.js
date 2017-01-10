var express = require("express");
var router 	= express.Router();
var passport = require("passport");


// ROOT route
router.get("/", function(req, res){
  res.render("landing");
});


// Exports the routes set in the 'router' variable to the main app
module.exports = router;