const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Passport
require('./config/passport')(passport);

//google auth
//DB CONFIG
const db = require('./config/keys').MongoURI;

//Connection to MONGO
mongoose.connect(db, {useUnifiedTopology: true,useNewUrlParser: true })
.then(() => console.log('Mongo DB CONNECTED'))
.catch(err => console.log(err))
;

app.get("/error", function(req, res) {
    // docs is an array of all the documents in mycollection
    res.render("error");
  });
//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));


//BODY PARSER
app.use(express.urlencoded({ extended: false}));

//EXPRESS SESSION 

// Express session
app.use(cookieParser());
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const auth = require('./routes/auth');

app.use('/auth', auth);

//CONNECT FLASH
app.use(flash());

app.get('/google12cfc68677988bb4.html', function (req, res) {
  res.sendFile(views+"/google12cfc68677988bb4.html");
 })
// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT 5000`));