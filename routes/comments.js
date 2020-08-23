var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//new route
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground : foundCampground});
        }
    });
});

//create new comment
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err,Ncomment){
                if(err){
                    console.log(err);
                }else{
                    Ncomment.author.id = req.user._id;
                    Ncomment.author.username = req.user.username;
                    Ncomment.save();
                    foundCampground.comments.push(Ncomment);
                    foundCampground.save();
                    res.redirect('/campgrounds/'+ req.params.id);
                }
            });
        }
    });
});

//edit comment
router.get("/:comment_id/edit", middleware.isOwnerOfComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        res.render("comments/edit", {comment : foundComment, campground_id : req.params.id});
    });
});

//update comment
router.post("/:comment_id/edit", middleware.isOwnerOfComment, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            console.log(updatedComment);
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//Delete route
router.post("/:comment_id/delete", middleware.isOwnerOfComment, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log("delete error");
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;