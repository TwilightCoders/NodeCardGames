var express = require("express");
var router 	= express.Router();
var passport = require("passport");


// 3-13 ROUTES  ====================================
// note, all routes will prepend /games/three-thirteen to whatever render uses


// STATIC route (for a static game run entirely locally)
router.get("/static", function(req, res)
{
  res.render("3-13/static");
});


// INDEX
router.get("/", function(req, res)
{
  res.redirect("/games/three-thirteen/new");
});


// NEW - show the form to make a new game (will be saved to DB)
router.get("/new", function(req, res) 
{
  res.render("3-13/new");
});


// CREATE - process the new game
router.post("/new", function(req, res)
{
  console.log(req.body);
  res.send("Created game post route triggered\n" + req.body);
  
  // TODO:
  // Get the variables from the new route
  
  // Try to make a new game in mongo according to the '3-13' game model (not yet created)
  
  // If it succeeds, then render the edit page (this is where the scorekeeper will live)
  
  // If it fails, then redirect to the 'new' page to try again
});


// SHOW - show the game - everyone can see this, and will update using ajax


// EDIT - this is where the scorekeeper will operate - will asyncronously update the DB so the SHOW page can query it for updates


// UPDATE - process the updates from edit


// DELETE - delete the game from the DB (Probably will never be used)


// END OF ROUTES  ===============================================================

// Exports the routes set in the 'router' variable to the main app
module.exports = router;

