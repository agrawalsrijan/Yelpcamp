const express = require("express");
const app=express();
var bodyParser=require("body-parser");
var flash=require("connect-flash");
var mongoose=require("mongoose");
var methodOverride=require("method-override");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var User=require("./models/user");
var seedDB=require("./seeds");
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");

// seedDB();

// use body parser by following code:
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
// use routes
app.locals.moment=require("moment");
//express session
app.use(require("express-session")({
	secret:"Once again rusty is cute",
	resave:false,
	saveUninitialized:false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set view engine as ejs
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

// USe this to pass the req.user to every route -small and easy way to do

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success")
	next();
});

// mongoose stuff
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology',true);
//mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.connect("mongodb+srv://srijanag13:GUd1Oh08I5c7OVDH@cluster0-xdlxp.mongodb.net/test?retryWrites=true&w=majority");
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


// create some data
// Campground.create(
// 	{
// 		name:"In the woods",
// 		image:"https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 		description:"This campground is in the forests.No bathrooms,no Water"

// 	},function(err,campground){
// 		if(err){
// 			console.log("something went wrong");
// 		}
// 		else{
// 			console.log("The campground was added");
// 			console.log(campground);
// 		}
// 	});

// each campground should have name and image
// var campgrounds=[
// 	{name:"Mountain hills",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
// 	{name:"Under the stars",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
// 	{name:"Riverside harahi",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
// 	{name:"In the woods",image:"https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
// ];

//listen to server requests

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Your yelpcamp server has started")
});
// app.listen(3000,function(){
// 	console.log("Your yelpcamp server has started")
// });