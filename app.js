var express = require("express");
var app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seed");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/yelp_camp",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log('connected to db!'))
.catch(error => console.log(error.message));

// Campground.create(
//     {
//         name : "Granite Hill",
//         image : "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         description : "THis is a huge Granite hill and its awsome"
//     },
//     function(err,camp){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly created campground");
//             console.log(camp);
//         }
//     }
// );

seedDB();

app.get('/', (req,res) =>{
    res.render("landing");
});

app.get('/campgrounds/new', (req,res) =>{
    res.render("campgrounds/new");
});


app.get('/campgrounds',(req,res)=>{
    // var campgrounds = [
    //     {name :"Salmon Creek", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    //     {name :"Granite Hill", image:"https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {name :"Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {name :"Salmon Creek", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    //     {name :"Granite Hill", image:"https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {name :"Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {name :"Salmon Creek", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    //     {name :"Granite Hill", image:"https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {name :"Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    // ]

    Campground.find({},
        function(err,allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        }
    )

    //res.render("campgrounds",{campgrounds:campgrounds});
});

app.post('/newCampground', (req,res) =>{
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

app.get('/campgrounds/:id', (req,res) =>{
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
    //req.params.id;
    //res.render("show");

});

//=================================================
//comments routs
//=================================================

//new route
app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground : foundCampground});
        }
    });
});

//create new comment
app.post("/campgrounds/:id/comments", function(req,res){
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


app.listen(4000,'localhost', ()=>{
    console.log("YelpCamp server has been started");
});