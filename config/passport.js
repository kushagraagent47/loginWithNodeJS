const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
//Load user modal 
const User = require('../models/User');



module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({ email: email})
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'That email is not registered'});
                }

                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect'});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}
module.exports = function(passport){
    passport.use(
      new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy: true
      }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
      })
    )
  }