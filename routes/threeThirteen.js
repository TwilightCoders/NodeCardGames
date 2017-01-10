var express = require("express");
var router 	= express.Router();
var passport = require("passport");


// 3-13 ROUTES  ====================================
// note, all routes will prepend /games/three-thirteen to whatever render uses

// INDEX
router.get("/", function(req, res)
{
  res.render("3-13/game");
});

// NEW - show the form to make a new game (will be saved to DB)

// CREATE - process the new game

// SHOW - show the game - everyone can see this, and will update using ajax

// EDIT - this is where the scorekeeper will operate - will asyncronously update the DB so the SHOW page can query it for updates

// UPDATE - process the updates from edit

// DELETE - delete the game from the DB (Probably will never be used)


// END OF ROUTES  ===============================================================

// Exports the routes set in the 'router' variable to the main app
module.exports = router;