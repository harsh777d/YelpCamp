var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//new route
router.get("/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground : foundCampground});
        }
    });
});

//create new comment
router.post("/", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err,Ncomment){
                if(err){
                    console.log(err);
                }else{
                    foundCampground.comments.push(Ncomment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+ req.params.id);
                }
            });
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;