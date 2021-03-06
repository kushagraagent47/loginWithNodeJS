const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
//Load user modal 
const User = require('../models/User');



module.exports = function(passport){
    passport.use(
      new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy: true
      }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile.displayName[0].value);
        // console.log(profile.email);
        // const newUser = {
        //     name: profile.name.givenName,
        const image = profile.photos[0].value;
        // console.log(image);
        const email = profile.emails[0].value;
        const newUser = {
            name: profile.name.givenName,
            img: image,
            email: profile.emails[0].value
        }
    
    //  console.log(email);
        //Check For Existing User
        User.findOne({
            email: email
        }).then(user => {
            if(user) {
                done(null, user);
            } else {
                //Create User
                new User(newUser)
                .save()
                .then(user => done(null, user));
        }
        
    })
})
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
      });
    
  }