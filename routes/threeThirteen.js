var express       = require("express"),
    router 	      = express.Router(),
    ThreeThirteen = require("../models/threeThirteen");


// 3-13 ROUTES  ====================================
// note, all routes will prepend /games/three-thirteen to whatever render uses

// INDEX - redirect to "new" since we need to make a new game before we can do anything (no need to view all games)
// Perhaps in the future, make a simple "would you like to view a game, or start a new game?"
router.get("/", function(req, res)
{
  // Just for now, drop all games from the DB because we'll be doing a lot of testing, and don't need more than one or two
  ThreeThirteen.remove({});
  
  // Now go to the 'NEW' route to make a new game
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
  // Get the variables from the new route, and make a game object to send to mongo
  var numPlayers  = req.body.numPlayers;
  var scores      = [];  // This will be kept track of as scores[round][player]
  
  // Set the first round of the game to have an array equal to the number of players
  for (var playerIndex = 0; playerIndex < numPlayers; playerIndex++)
    scores[0] = [];
  
  // Set all the game variables
  var game = {
    numPlayers:   numPlayers,
    playerNames:  req.body.playerNames,
    scores:       scores
  }
  
  // Create the game in mongo
  ThreeThirteen.create(game, function(err, newGame)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log(newGame);
    }
    
    res.redirect("/games/three-thirteen/new");
  });
  
  // NEXT STEPS:
  // 1. Verify that scores are a 2D array
  // 2. Render the edit page (this is where the scorekeeper will live) for the main part of the game
  // 3. If it fails, then redirect to the 'new' page to try again (this is the default action ATM)
});


// SHOW - show the game - everyone can see this, and will update using ajax


// EDIT - this is where the scorekeeper will operate - will asyncronously update the DB so the SHOW page can query it for updates


// UPDATE - process the updates from edit


// DELETE - delete the game from the DB (Probably will never be used)


// END OF ROUTES  ===============================================================

// Exports the routes set in the 'router' variable to the main app
module.exports = router;

