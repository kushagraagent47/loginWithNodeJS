const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//WELCOME
router.get('/', (req,res) => res.render('welcome'));
//DASHBOARD
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
res.render('dashboard', {
  name: req.user.name
})
);
module.exports = router;