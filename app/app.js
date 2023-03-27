// Import express.js
const express = require("express");

// Create express app
var app = express();

app.use(express.urlencoded({ extended: true }));

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');


// Get the models
const { Student } = require("./models/student");
const { User } = require("./models/user");
const { Property } = require("./models/property");

// Create a route for root - /
app.get("/", function(req, res) {
     // Set up an array of data
     var test_data = ['one', 'two', 'three', 'four'];
     // Send the array through to the template as a variable called data
     res.render("index", {'title':'My index page',
           'heading':'My heading', 'data':test_data});
});


// Task 1a JSON formatted listing of users
app.get("/all-user", function(req, res) {
    var sql = 'select * from users';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });
});

// Task 1b JSON formatted listing of properties
app.get("/all-properties", function(req, res) {
    var sql = 'select * from property';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });
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
app.get("/user-property/:id", async function (req, res) {
    var Pid = req.params.id;
    // Create a student class with the ID passed
    var property = new property(Pid);
    await user.getPropertyDetails();
    console.log(property);
    res.render('property', {property:property});
/*
// Task 3 single programme page
app.get("/user-single/:id", function (req, res) {
    var pCode = req.params.Name;
    output = '';
    output += "<h1>Programme</h1>";
   
    //Now call the database for the modules
    //Why do you think that the word modules is coming in before the name of the programme??
    var modSql = "SELECT * FROM users \
    WHERE Name = ?";
    output += "<h2>phone</h2>";
    db.query(modSql, [pCode]).then(results => {
        output += '<table border="1px">';
        for (var row of results) {
            output += '<tr>';
            output += '<td><a href="/user-single/">' + row.name + '</a></td>';
            output += '<td>' + row.id + '</td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);    
    });

});
*/
// Create a route for testing the db
app.get("/db_test1", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from user_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});