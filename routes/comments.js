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

// EDIT route for comments
router.get("/campgrounds/:id/comments/:comment_id/edit",function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	})	
})

// UPDATE route for comments
router.put("/campgrounds/:id/comments/:comment_id",function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

// Comment destroy route
router.delete("/campgrounds/:id/comments/:comment_id",function(req,res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
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