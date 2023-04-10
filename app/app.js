// Import express.js
const express = require("express");

// Create express app
var app = express();

app.use(express.urlencoded({ extended: true }));

// Add static files location
app.use(express.static("static"));

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');


// Get the models
const { User } = require("./models/user");
const { Property } = require("./models/property");

app.get("/", function(req, res) {
     // Set up an array of data
     var test_property = ['houses', 'flats', 'villas', 'appartments'];
     // Send the array through to the template as a variable called data
     res.render("login", {'title':'login page',
           'heading':'My heading', 'data':test_property});
     res.render("signup", {'title':'signup page',
           'heading':'My heading', 'data':test_property});
     res.render("forgotpassword", {'title':'forgotpassword page',
           'heading':'My heading', 'data':test_property});
     res.render("home", {'title':'home page',
           'heading':'My heading', 'data':test_property});
    res.render("sell", {'title':'sell page',
           'heading':'My heading', 'data':test_property});
});



//creating home page
app.get("/main", function(req, res) {
    //
    res.render("login");
    //
    res.render('layout', {data:results});
});
//
app.get("/signup", function(req, res) {
    //
    res.render("signup");
    //
    res.render('login', {data:results});
});

app.get("/login", function(req, res) {
    //
    res.render("login");
    //
    res.render('layout', {data:results});
});

app.get("/forgotpassword", function(req, res) {
    //
    res.render("forgotpassword");
    //
    res.render('signin', {data:results});
});
//
app.get("/home", function(req, res) {
    //
    res.render("home");
    //
    res.render('signin', {data:results});
});

app.get("/sell", function(req, res) {
    //
    res.render("sell");
    //
    res.render('home', {data:results});
});



// Task 2a display a formatted list of users
app.get("/all-user-formatted", function(req, res) {
    var sql = 'select * from users';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        res.render('all-user', {data:results});
    });
});

// Task 2b display a formatted list of properties
app.get("/all-properties-formatted", function(req, res) {
    var sql = 'select * from property';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        res.render('all-properties', {data:results});
    });
});

// Task 3 single user page
app.get("/user-single/:id", async function (req, res) {
    var Uid = req.params.id;
    // Create a student class with the ID passed
    var user = new User(Uid);
    await user.getUserDetails();
    console.log(user);
    res.render('user', {user:user});
});

// Task 3 single property page
app.get("/property-single/:id", async function (req, res) {
    var Pid = req.params.id;
    // Create a property class with the ID passed
    var property = new Property(Pid);
    await property.getPropertyDetails();
    console.log(property);
    res.render('property', {property:property});

});


// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});