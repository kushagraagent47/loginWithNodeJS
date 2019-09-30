const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const mongoose = require('mongoose');
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

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT 5000`));