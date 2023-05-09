// Import express.js
const express = require("express");

//
const bodyParser = require('body-parser');

//
//const multer = require('multer');
//const path = require('path');

// Create express app
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

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
const { Credentials } = require("./models/credentials");

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.get("/", function(req, res) {
     // Set up an array of data
     var test_property = ['houses', 'flats', 'villas', 'appartments'];
     // Send the array through to the template as a variable called data
     res.render("login", {'title':'login page',
           'heading':'My heading', 'data':test_property});
});


//
app.get("/signup", function(req, res) {
    //
    res.render("signup");
    //
    //res.render('login', {data:results});
});

//set password
app.post('/set-password', async function (req, res) {
    params = req.body;
    var credentials = new Credentials(params.email);
    try {
        credentials.getIdFromEmail().then( cId => {
            if (cId) {
                 // If a valid, existing user is found, set the password and redirect to the users single-student page
                credentials.setUserPassword(params.password).then ( result => {
                    res.send('Perhaps a page where a new user sets a programme would be good here');
                    
                });
            }
            else {
                 // If no existing user is found, add a new one
                credentials.addUser(params.email).then( Promise => {
                    res.redirect('/login');
                    
                });
            }
        });
     } catch (err) {
        console.error('Error while adding password ', err.message);
     }
});

app.get("/login", function(req, res) {
    //
    res.render("login");
    //
    //res.render('layout', {data:results});
});

// Check submitted email and password pair
app.post('/authenticate', function (req, res) {
    params = req.body;
    var credentials = new Credentials(params.email);
    try {
        credentials.getIdFromEmail().then(cId => {
            if (cId) {
                credentials.authenticate(params.password).then(match => {
                    console.log(match);
                    if (match) {
                        res.redirect('/home');
                        req.session.cid = cId;
                        req.session.loggedIn = true;
                        console.log(req.session); 
                    }
                    else {
                        // TODO improve the user journey here
                        res.send('invalid password');
                    }
                });
            }
            else {
                res.send('invalid email');
            }
        })
    } catch (err) {
        console.error('Error while comparing ', err.message);
    }
});

// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });

app.get("/forgotpassword", function(req, res) {
    //
    res.render("forgotpassword");
    //
    res.render('signin', {data:results});
});
//
app.get("/home", function(req, res) {
    
    res.render("home");
    //
    //res.render('signin', {data:results});
});

app.get("/about", function(req, res) {
    //
    res.render("about");

});

app.get("/blog", function(req, res) {
    //
    res.render("blog");

});

app.get("/reviews", function(req, res) {
    //
    res.render("reviews");

});

app.get("/contact", function(req, res) {
    //
    res.render("contact");

});


app.get("/sell", function(req, res) {
    //
    res.render("sell");
    //
    //res.render('home', {data:results});
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const propertyType = req.body['property-type'];
    const bedrooms = req.body.bedrooms;
    const bathrooms = req.body.bathrooms;
    const price = req.body.price;
    const description = req.body.description;
    const contactName = req.body['contact-name'];
    const contactEmail = req.body['contact-email'];
    const contactPhone = req.body['contact-phone'];
    const image = req.body['property-image'];
  
    const sql = `INSERT INTO properties (property_type, bedrooms, bathrooms, price, description, contact_name, contact_email, contact_phone, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [propertyType, bedrooms, bathrooms, price, description, contactName, contactEmail, contactPhone, image];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Data inserted');
      res.redirect('/home');
    });
  });

app.get("/buy", function(req, res) {
    
    var sql = 'select * from properties';
    db.query(sql).then(results => {
        res.render('buy', {properties:results});
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