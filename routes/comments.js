var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");


//==================================
//        Comments route
//==================================

router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground,currentUser:req.user});
		}
	})
})

// post route of comments

router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				} else{
					// add username and id to comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect("/campgrounds/"+campground._id);
				}	
			});
		}
	});
});
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