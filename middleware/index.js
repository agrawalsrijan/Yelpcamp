var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comment");
// Check Campground Ownership
middlewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				console.log(err);
				res.redirect("back")
			}else{
				// does user owns campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}	
			}
		});
	}else{
		console.log("You must be logged in to do that!!!!");
		res.redirect("back");
	}
}

// Check Comment ownership
middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				console.log(err);
				res.redirect("back")
			}else{
				// does user owns campground?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
				
			}
		});
	}else{
		console.log("You must be logged in to do that!!!!");
		res.redirect("back");
	}
}

// isLoggedIn checking function
middlewareObj.isLoggedIn=function(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login");
	}
}





module.exports=middlewareObj;