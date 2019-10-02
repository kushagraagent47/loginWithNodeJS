const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();

const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//Passport
require('./config/passport')(passport);
//DB CONFIG
const db = require('./config/keys').MongoURI;

//Connection to MONGO
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Mongo DB CONNECTED'))
.catch(err => console.log('Not connected'))
;

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BODY PARSER
app.use(express.urlencoded({ extended: false}));

//EXPRESS SESSION 

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash());

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