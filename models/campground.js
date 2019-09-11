var mongoose=require("mongoose");

// schema for campgrounds

var campgroundSchema= new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});

// make this into a model

module.exports=mongoose.model("Campground",campgroundSchema);
