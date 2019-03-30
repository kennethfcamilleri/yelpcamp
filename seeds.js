var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Salmon Creek",
        image: "https://1.bp.blogspot.com/-8X1MXU84xfY/V5teO19xIjI/AAAAAAACoO8/U7GFxyfruBcZ8VE2h2GYjFQIs4f7uKtfQCLcB/s1600/going_camping_with_a_cat_640_01.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris risus, facilisis vitae tortor quis."
    },
    {
        name: "Ghar Dalam",
        image: "https://scontent.cdnsnapwidget.com/vp/7c5d6f721f90093a96faed497a42f57e/5B8B7240/t51.2885-15/s640x640/sh0.08/e35/30602143_969575416533521_1164576731588198400_n.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a."
    },
    {
        name: "Selmun",
        image: "https://i.pinimg.com/736x/cb/03/eb/cb03ebf6eb57f6c3bbd510023307d03d.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae tortor quis."
    }
]

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
    //   if (err) {
    //       console.log(err);
    //   } else {
    //         console.log("removed campgrounds");
           
    //         // add a few camgrounds
    //         data.forEach(function(seed) {
    //             Campground.create(seed, function(err,campground) {
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("added a campground");
    //                     // create a comment
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was Internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if (err) {
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("Created new comment");
    //                             }
    //                         });
    //                 }
    //             })
    //        });
    //   }
    });
}

module.exports = seedDB;