// cardgame.js

// MODULES  ==============================================
var express 		    = require("express"),
		app 					  = express(),
		bodyParser 		  = require("body-parser"),
		mongoose 			  = require("mongoose"),
		flash				    = require("connect-flash"),
		methodOverride  = require("method-override"),
		//Campground 		  = require("./models/campground"),
		//Comment 			  = require("./models/comment"),
		passport			  = require("passport"),
		LocalStrategy   = require("passport-local");


// CONFIGURATION  =========================================

// Connect to mongodb - use 'cardgame' as DB
mongoose.connect(process.env.MONGOLAB_URI ||"mongodb://localhost/cardgame");
// Enable body-parser so that req.body will contain passed in parameters to the route
app.use(bodyParser.urlencoded({extended: true}));
// Enable the /public directory to contain static files (CSS, JavaScript, etc...)
app.use(express.static(__dirname + "/public"));
// Use the 'ejs' engine to parse .ejs files
app.set("view engine", "ejs");
// Method Override, in order to use "_method" to obtain HTTP "PUT" and "DELETE" requests
app.use(methodOverride("_method"));





