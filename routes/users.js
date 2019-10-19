const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const Post = require('../models/Post')
//USER MODAL
const User = require('../models/User')
//LOGIN
router.get('/login', (req,res) => res.render('login'));

//Register
router.get('/register', (req,res) => res.render('register'));

//Profile
router.get('/profile', ensureAuthenticated, function(req, res) {
    Post.find({user: req.user.name},(function(err, docs){
        res.render("profile", {
          name: req.user.name,
         users: docs
        });
    }));
});
  
//Rgister Handler
router.post('/register', (req, res) => {
    const { name, email, password, img, password2 } = req.body;
    let errors = [];
    if(password !== password2) {
        errors.push({ msg: 'Password do not match' });
    }

    if(errors.length > 0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Validation Passed
        User.findOne({ email: email})
        .then(user => {
            if(user) {
                //USER exists
                errors.push({ msg: 'Email already exists'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });                            
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    img: img,
                    password: password
                });
                    //HASH PASSWORD
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                                //Password is noe hashed
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg','You are now in the team,now login');
                                    res.redirect('/');
                                })
                                .catch(err => console.log(err))
                        }))
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;