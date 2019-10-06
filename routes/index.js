const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');

const Post = require('../models/Post')

//WELCOME
router.get('/', (req,res) => res.render('welcome'));
//Post Handler
router.post('/', (req, res) => {
  const { title, description, category, tag, link } = req.body;
  const newPost = new Post({
    title: title,
    category: category,
    description: description,
    tag: tag,
    link: link
  });
  newPost.save()
  .then(
    post => {
      res.redirect('/');
    })
  .catch(err => console.log(err));
});
//DASHBOARD
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
res.render('dashboard', {
  name: req.user.name,
  title: "hey"
})
);
module.exports = router;