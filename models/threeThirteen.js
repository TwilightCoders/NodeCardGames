var mongoose  = require("mongoose"),
    shortId   = require("shortid");

var threeThirteenSchema = new mongoose.Schema(
{
  /* _id will be added automatically by mongoose */
  shortId:      {type: String, unique: true, default: shortId.generate},
	numPlayers:   Number,       
	playerNames:  [ String ], // Array of strings
  scores:       [],         // using mixed type, so that we can make a 2d array (we can push [] to this [])
  numRounds:    { type: Number, default: 11 },
  round:        { type: Number, default: 1 }
});

module.exports = mongoose.model("ThreeThirteenGame", threeThirteenSchema);

/*
 data:
  {
    initialized:  false,
    round:        null,
    numRounds:    11,
    started:      false,
    players:      2,
    playerNames:  [],
    scores:       []    // Scores will be kept track of in this way: scores[round][player]
  },
  
  */