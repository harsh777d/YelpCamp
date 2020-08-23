var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get('/new', middleware.isLoggedIn, (req,res) =>{
    res.render("campgrounds/new");
});

router.get('/',(req,res)=>{
    Campground.find({},
        function(err,allCampgrounds){
            if(err){
                req.flash("error", err.message);
                console.log(err);
            }
            else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        }
    );
});

router.post('/new', middleware.isLoggedIn, (req,res) =>{
    //console.log(req);
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }

    var newCampground = { name : name, price : price, image : image, description : desc, author : author}

    Campground.create(newCampground, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

router.get('/:id', (req,res) =>{
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

//eidt
router.get("/:id/edit", middleware.isOwnerOfCampground, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
});

//update
router.post("/:id/edit", middleware.isOwnerOfCampground, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //console.log("updates");
            //console.log(updatedCampground);
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//Delete
router.post("/:id/delete", middleware.isOwnerOfCampground, function(req,res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds")
        }
    });
});

module.exports = router;