const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../config/passport')(passport);

router.get('/google', passport.authenticate('google', 
{scope: ['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),(req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

module.exports = router;
