//  routes/threeThirteen.js

var express       = require("express"),
    router 	      = express.Router(),
    ThreeThirteen = require("../models/threeThirteen");


// 3-13 ROUTES  ====================================
// note, all routes will prepend /games/three-thirteen to whatever render uses

// INDEX - redirect to "new" since we need to make a new game before we can do anything (no need to view all games)
// Perhaps in the future, make a simple "would you like to view a game, or start a new game?"
router.get("/", function(req, res)
{
  // Go to the 'NEW' route to make a new game
  res.redirect("/games/three-thirteen/new");
});


// NEW - show the form to make a new game (will be saved to DB)
router.get("/new", function(req, res) 
{
  
  // Just for now, drop all games from the DB because we'll be doing a lot of testing, and don't need more than one or two
  ThreeThirteen.remove({});
  
  res.render("3-13/new");
});


// CREATE - process the new game
router.post("/new", function(req, res)
{
  var numRounds = 11;
  
  // Get the variables from the new route, and make a game object to send to mongo
  var numPlayers  = parseInt(req.body.numPlayers);
  var scores      = new Array(numRounds);  // Creating 11 rounds worth of arrays
  
  for (var round = 0; round < numRounds; round++)
    scores[round] = new Array(numPlayers);
  
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
      // Redirect to the 'new' page
      res.redirect("/games/three-thirteen/new");
    }
    else
    {
      // Redirect to the 'edit' page
      res.redirect("/games/three-thirteen/" + newGame._id + "/edit");
    }
  });
  
  // NEXT STEPS:
  // 1. Verify that scores are a 2D array
  // 2. Render the edit page (this is where the scorekeeper will live) for the main part of the game
  // 3. If it fails, then redirect to the 'new' page to try again (this is the default action ATM)
});


// SHOW - show the game - everyone can see this, and will update using ajax
// to start, just somehow get and format a game object from the mongodb and get it to the local console
router.get("/:id", function(req, res)
{
  res.send("The normal show route");
});

// SHOW json - this will get the json value of the current game
router.get("/:id/json", function(req, res)
{
  res.set('Content-Type', 'application/json');
  ThreeThirteen.findOne({shortId: req.params.id}, function(err, foundGame)
  {
    if(err)
    {
      res.send(JSON.stringify(err));
    }
    else
    {
      res.send(JSON.stringify(foundGame));
    }
  })
});


// EDIT - this is where the scorekeeper will operate - will asyncronously update the DB so the SHOW page can query it for updates
router.get("/:id/edit", function(req, res)
{
  // Find the game from mongo
  ThreeThirteen.findById(req.params.id, function(err, game){
    res.render("3-13/edit", {game: game});
  });
  
  // Make the HTML document - and pass along the game mongo object to the render page
  
  // Within the EDIT document, use the mongo object to make a basic javascript settings object, which can then be called from the 'app' object
});


// UPDATE - process the updates from edit
router.put("/:id", function(req, res)
{
  console.log("Passed in data:\n" + JSON.stringify(req.body) + "\n\n");

  ThreeThirteen.findOneAndUpdate({shortId: req.body.shortId}, req.body, {new: true}, function(err, updatedGame)
  {
    if(err)
    {
      res.send(err);
    }
    else
    {
      //console.log("Updated game:\n" + updatedGame);
      res.status(200).send(updatedGame);
    }
  });
});


// DELETE - delete the game from the DB (Probably will never be used)


// END OF ROUTES  ===============================================================


// Exports the routes set in the 'router' variable to the main app
module.exports = router;

