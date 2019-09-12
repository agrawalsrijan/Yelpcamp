var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

// make index page for app

router.get("/",function(req,res){
	res.render("home",{currentUser:req.user});
});

//=========================================
//             AUTH Routes
//=========================================

// show register form
router.get("/register",function(req,res){
	res.render("register",{currentUser:req.user});
});
// handle signup logic
router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register",{currentUser:req.user});
		}
		else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/campgrounds");
			});
		}
	});
});


// Show login form
router.get("/login",function(req,res){
	res.render("login",{currentUser:req.user});
});

// Handle Login logic
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	//login logic

});

// Logout route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
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