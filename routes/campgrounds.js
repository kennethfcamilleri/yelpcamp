var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// INDEX - Show all campgrounds
router.get("/campgrounds", function (req,res) {
    // get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Something went wrong..");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW - Show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
   res.render("campgrounds/new"); 
});

// SHOW - Show more info about one campground
router.get("/campgrounds/:id", function (req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// CREATE - Add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campground object
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};

    Campground.create(newCampground, function(err,addedCampground) {
        if (err) {
            console.log("Something went wrong..");
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// EDIT - Edit campground route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE - Update campground route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
    
});

// DESTROY - Delete campground route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany({_id: { $in: campgroundRemoved.comments } }, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports = router;