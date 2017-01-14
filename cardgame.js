//  cardgame.js

// MODULES  ==============================================
var express 		    = require("express"),
		app 					  = express(),
		bodyParser 		  = require("body-parser"),
		mongoose 			  = require("mongoose"),
		flash				    = require("connect-flash"),
		methodOverride  = require("method-override");//,
		//passport			  = require("passport"),
		//LocalStrategy   = require("passport-local"),
		//ThreeThirteen		= require("./models/threeThirteen");


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


/*
// Passport config - but, we're not doing auth at the moment
app.use(require("express-session")({
	secret: "Charlie and Tucker are the best dogs",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Sets the "local" strategy (as opposed to "twitter" or "facebook" etc...)
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


// Initialize global variables available everywhere
app.use(function(req, res, next)
{
	//res.locals.threeThirteen = { js: "static.js" };
	//res.locals.currentUser = req.user;
	//res.locals.error = req.flash("error");
	//res.locals.success = req.flash("success");
	next();
});*/


// ROUTES  ==============================

var indexRoutes					= require("./routes/index");
var threeThirteenRoutes	= require("./routes/threeThirteen");

app.use(indexRoutes);
app.use("/games/three-thirteen", threeThirteenRoutes);


// SERVER  ==============================

// depending on the environment, process.env.PORT might be set - if not, then use a default value (in this case, 3001)
var port = Number(process.env.PORT || 3001);

// Run the app
app.listen(port, function()
{
	console.log("CardGames app running!");
});