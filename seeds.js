var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[ 
	{
		name:"RV Campgrounds",
		image:"https://thumbs.dreamstime.com/b/utah-united-states-july-rv-park-campground-near-th-utah-united-states-july-rv-park-campground-near-oljato%C3%A2%E2%82%AC%E2%80%9Cmonument-valley-124814697.jpg",
		description:"RV campgrounds can be as small as a few dozen sites to booming resorts with hundreds of sites, catering to RVs of every type and size. Some RVers prefer the simple solitude of campgrounds that provide merely the basics of electricity and fresh water at the site"
	},
	{
		name:"Public Campgrounds",
		image:"https://gorving.com/_assets/_images/public-lands/publiclands_hero.jpg",
		description:"Millions of acres of the country’s most pristine locations have been preserved as public access lands for the enjoyment of all Americans. RVs are an ideal way to visit these wilderness areas in comfort."
	},
	{
		name:"Chief Paulina Horse Camp",
		image:"https://thumbs.dreamstime.com/b/lake-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-parked-rv-camper-car-102840191.jpg",
		description:"Chief Paulina Horse Camp is the only horse campground located in Newberry National Volcanic Monument in Deschutes National Forest. A favorite for horse enthusiasts, the campground provides visitors with access to lakes, lava flows and spectacular geologic features."
	},
	{
		name:"Wawona Campground",
		image:"https://www.yosemite.com/wp-content/uploads/2016/04/dry-gulch-merced-river-canyon_sm-low-res-768x511.jpg",
		description:"The Wawona Campground is located one mile north of Wawona, at 4,000 ft (1,200 m) elevation. The campground is open all year. Loops A, B, and C: Required and available online up to five months in advance from approximately April through September"
	},
	{
		name:"Drummon Lake Campground",
		image:"https://images.squarespace-cdn.com/content/v1/5cc1d1add86cc97302714ca0/1556302575162-EVOMI41FWBUQG3K5JMDD/ke17ZwdGBToddI8pDm48kMTLu8sgmHFNwUXrcQJxFOcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dhi97jUa2TytcCum8ByYudXKQnYk-km6tMsXf96SbiOUZDqXZYzu2fuaodM4POSZ4w/11428500_908504605872536_8857769132013784113_n-2.jpg?format=500w",
		description:"In Bayfield County in Northwest Wisconsin, midway between the cities of Hayward and Ashland, our ATV friendly campground adjoins a public park with a swimming beach, a picnic pavilion, and a paved boat landing onto Drummond Lake."
	}
]




/////////////////////////////////////////////////////////////////
function seedDB(){
	// remove data from campground
	Campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed");
		// add a few camprounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a new campground");
					// create comment
					Comment.create(
						{
							text:"This place is great but i wish there was Internet",
							author:"Srijan"
						},function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment")
							}
					});
				}
			});
		});	
	})
}

module.exports=seedDB;