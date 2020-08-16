var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name : "Mountain",
        image : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec laoreet enim, eu efficitur nulla. Cras cursus pharetra luctus. Maecenas vitae mattis leo. Sed at dui sit amet massa consequat imperdiet ac quis sem. Maecenas ut lacus tincidunt, venenatis lectus at, vulputate mi. Nullam eu faucibus augue. Pellentesque convallis tempus auctor. Nam sollicitudin pretium mauris et ornare. Vivamus malesuada fringilla velit, sed convallis libero pellentesque eu. Etiam tempor nulla sed mauris eleifend, non venenatis nulla tempus. Cras dictum, ligula et fermentum pharetra, ex turpis commodo diam, ac faucibus lacus ante sed ipsum. Duis id nulla et arcu pretium feugiat. Nulla in ultrices dolor."
    },
    {
        name : "Hills",
        image : "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec laoreet enim, eu efficitur nulla. Cras cursus pharetra luctus. Maecenas vitae mattis leo. Sed at dui sit amet massa consequat imperdiet ac quis sem. Maecenas ut lacus tincidunt, venenatis lectus at, vulputate mi. Nullam eu faucibus augue. Pellentesque convallis tempus auctor. Nam sollicitudin pretium mauris et ornare. Vivamus malesuada fringilla velit, sed convallis libero pellentesque eu. Etiam tempor nulla sed mauris eleifend, non venenatis nulla tempus. Cras dictum, ligula et fermentum pharetra, ex turpis commodo diam, ac faucibus lacus ante sed ipsum. Duis id nulla et arcu pretium feugiat. Nulla in ultrices dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec laoreet enim, eu efficitur nulla. Cras cursus pharetra luctus. Maecenas vitae mattis leo. Sed at dui sit amet massa consequat imperdiet ac quis sem. Maecenas ut lacus tincidunt, venenatis lectus at, vulputate mi. Nullam eu faucibus augue. Pellentesque convallis tempus auctor. Nam sollicitudin pretium mauris et ornare. Vivamus malesuada fringilla velit, sed convallis libero pellentesque eu. Etiam tempor nulla sed mauris eleifend, non venenatis nulla tempus. Cras dictum, ligula et fermentum pharetra, ex turpis commodo diam, ac faucibus lacus ante sed ipsum. Duis id nulla et arcu pretium feugiat. Nulla in ultrices dolor."
    },
    {
        name : "Night camp",
        image : "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Silent night, pleasant site. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec laoreet enim, eu efficitur nulla. Cras cursus pharetra luctus. Maecenas vitae mattis leo. Sed at dui sit amet massa consequat imperdiet ac quis sem. Maecenas ut lacus tincidunt, venenatis lectus at, vulputate mi. Nullam eu faucibus augue. Pellentesque convallis tempus auctor. Nam sollicitudin pretium mauris et ornare. Vivamus malesuada fringilla velit, sed convallis libero pellentesque eu. Etiam tempor nulla sed mauris eleifend, non venenatis nulla tempus. Cras dictum, ligula et fermentum pharetra, ex turpis commodo diam, ac faucibus lacus ante sed ipsum. Duis id nulla et arcu pretium feugiat. Nulla in ultrices dolor."
    }
]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed all data");

            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("removed all commenst");

                    data.forEach(function(seed){
                        Campground.create(seed, function(err, data){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Added a campground");

                                Comment.create({
                                    text: "This place is great, but i wish there was internet",
                                    author : "Homer"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        data.comments.push(comment);
                                        data.save();
                                        console.log("Created new comment");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports = seedDB;