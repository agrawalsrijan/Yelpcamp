const express = require("express");
const app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB=require("./seeds");

seedDB();

// use body parser by following code:
app.use(bodyParser.urlencoded({extended:true}));

// set view engine as ejs
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

// mongoose stuff
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/yelp_camp");


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

// make index page for app

app.get("/",function(req,res){
	res.render("home");
});

//make campgrounds page route
// index route

app.get("/campgrounds",function(req,res){

	// get Campground data from db
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("something went wrong");
			console.log(err);
		}
		else{
			console.log(" finding data done successfully");
			
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});

})

// add a post route to same campgrounds-convention
// CREATE Route

app.post("/campgrounds",function(req,res){
	//just checking if post route works
	
	// get data from forms to add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var newCampground={name:name,image:image,description:description};
	// campgrounds.push(newCampground); old method without db

	//create new campground and add it to db
	Campground.create(newCampground,function(err,newcampground){
		if(err){
			console.log(err);
		}
		else{
			console.log("new campground added to db");
			
			// redirect back to the campgrounds(get) page
			res.redirect("/campgrounds");
			// by default redirects go to get routes
		}
	})

	
});

// add another route seperatley for a form
// the form data will be sent to the campgrounds-post route
// NEW route

app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/newform");
});

// SHOW route- to show more info about a specific item/campoground

app.get("/campgrounds/:id",function(req,res){
	// find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("something went wrong");
			console.log(err);
		}
		else{
			console.log(foundCampground);
			// render the show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

//==================================
//        Comments route
//==================================

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		}
	})
})

// post route of comments

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				campground.comments.push(comment);
				campground.save();
				res.redirect("/campgrounds/"+campground._id);
			});
		}
	});
});

//listen to server requests

app.listen(3000,function(){
	console.log("Your yelpcamp server has started")
});