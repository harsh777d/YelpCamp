var express = require("express");
const { update } = require("./models/comment");
var app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
    seedDB = require("./seed");

var indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments");

app.use(flash());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

//Passport Configuration
app.use(require("express-session")({
    secret : "this is secret key",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.CurrentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

const db_url = process.env.DATABASE

mongoose.connect(db_url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log('connected to db!'))
.catch(error => console.log(error.message));


//seedDB();

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

let port = process.env.PORT;

if( port == null || port == ''){
    port = 4000;
}

// let host = process.env.IP;

// if(host == null || host == ''){
//     host = 'localhost';
// }


app.listen(port, ()=>{
    console.log("YelpCamp server has been started", " port: ", port);  
});