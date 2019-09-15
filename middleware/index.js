var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comment");
// Check Campground Ownership
middlewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err || !foundCampground){
				console.log(err);
				req.flash("error","Campground Not Found");
				res.redirect("back")
			}else{
				// does user owns campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You Don't Have permission to do that")
					res.redirect("back");
				}	
			}
		});
	}else{
		console.log("You must be logged in to do that!!!!");
		req.flash("error","You Need To Be Logged In To Do That");
		res.redirect("back");
	}
}

// Check Comment ownership
middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err || !foundComment){
				req.flash("error","Comment Not Found");
				console.log(err);
				res.redirect("back")
			}else{
				// does user owns campground?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You Don't Have permission to do that")
					res.redirect("back");
				}
				
			}
		});
	}else{
		console.log("You must be logged in to do that!!!!");
		req.flash("error","You Need To Be Logged In To Do That");
		res.redirect("back");
	}
}

// isLoggedIn checking function
middlewareObj.isLoggedIn=function(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	else{
		req.flash("error","You Need To Be Logged In To Do That");
		res.redirect("/login");
	}
}





module.exports=middlewareObj;