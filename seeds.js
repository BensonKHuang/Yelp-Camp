var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },    
    {
        name: "Cliff's End", 
        image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },    
    {
        name: "Against the gods", 
        image: "https://farm9.staticflickr.com/8486/8240036928_1a31fbbe9e.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       }
       console.log("removed campgrounds"); 
           
       //add a few campgrounds
    //   data.forEach(function(seed){
    //       Campground.create(seed, function(err, campground){
    //           if(err){
    //               console.log(err);
    //           } else{
    //               console.log("added a campground");
                   
    //               //add a few comments
    //               Comment.create({
    //                   text: "This place is great, but I wish there was internet",
    //                   author: "Homer"
    //               }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else{
    //                         campground.comments.push(comment._id);
    //                         campground.save();
    //                         console.log("created new comment");
    //                     }
    //               });
    //           }
    //       }); 
    //     });
    });
}

module.exports = seedDB;