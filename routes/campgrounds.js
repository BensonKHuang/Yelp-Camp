var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"),
    geocoder    = require('geocoder');
    
//=================================
//INDEX ROUTES
//=================================
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//Create route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, image: image, description: desc, author: author, location: location, lat: lat, lng: lng}; 
    
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
                req.flash("error", "Error creating Campground");
                res.redirect("/campgrounds");
                
            } else{
                console.log(err);
                req.flash("success", "Successfully created Campground");
                res.redirect("/campgrounds");
            }
        });
    });
});

//New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//Show route
router.get("/:id", function(req, res){
    //find campground with provided ID
    //populate comments will fill in comment data in place of object ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//Edit Route 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            }
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//Update Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update correct campground
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, location: location, lat: lat, lng: lng};
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

//Destroy Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Error deleting Campgroundt");
          return res.redirect("/campgrounds");
      } else{
          req.flash("success", "Successfully deleted Campground");
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;