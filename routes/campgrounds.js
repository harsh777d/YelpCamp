var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get('/new', (req,res) =>{
    res.render("campgrounds/new");
});

router.get('/',(req,res)=>{
    Campground.find({},
        function(err,allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        }
    );
});

router.post('/new', (req,res) =>{
    console.log(req);
    var name = req.body.name;
    var image = req.body.image;

    var newCampground = { name : name, image : image}

    Campground.create(newCampground, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    });
});

router.get('/:id', (req,res) =>{
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log("from asdad");
            console.log(foundCampground);
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

module.exports = router;