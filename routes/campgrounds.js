var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

//make campgrounds page route
// index route

router.get("/campgrounds",function(req,res){

	// get Campground data from db
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("something went wrong");
			console.log(err);
		}
		else{
			console.log(" finding data done successfully");
			
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
})

// add a post route to same campgrounds-convention
// CREATE Route

router.post("/campgrounds",isLoggedIn,function(req,res){
	//just checking if post route works
	
	// get data from forms to add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,image:image,description:description,author:author};
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

router.get("/campgrounds/new",isLoggedIn,function(req,res){
	res.render("campgrounds/newform",{currentUser:req.user});
});

// SHOW route- to show more info about a specific item/campoground

router.get("/campgrounds/:id",function(req,res){
	// find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("something went wrong");
			console.log(err);
		}
		else{
			console.log(foundCampground);
			// render the show template with that campground
			res.render("campgrounds/show",{campground:foundCampground,currentUser:req.user});
		}
	});
});

// EDIT Campground route
router.get("/campgrounds/:id/edit",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		}else{
			res.render("campgrounds/edit",{campground:foundCampground,currentUser:req.user});
		}
	});
});

// UPDATE Campground route
router.put("/campgrounds/:id",function(req,res){
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
	//redirect somewhere
});

// Destroy route
router.delete("/campgrounds/:id",function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
})
// middleware to check if someone is logged in on the session
function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login");
	}
}

module.exports=router;