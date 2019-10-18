const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../config/passport')(passport);

router.get('/google', passport.authenticate('google', 
{scope: ['profile', 'email']}));

module.exports = router;
