const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');

const Post = require('../models/Post');
const User = require('../models/User');



// app.get("/", function(req, res) {
//   db.users.find(function(err, docs) {
//     // docs is an array of all the documents in mycollection

//     res.render("index", {
//       title: "Customers",
//       users: docs
//     });
//   });
// });
//WELCOME
// router.get('/', (req,res) => {
//   Post.find({})
//   .populate('User')
//   .then(docs => {
//     res.render('welcome', {
//       users: docs
//     });
//     console.log(docs);
//   });
// });
router.get('/', (req, res) => {
  Post.find({})
    .populate('User').exec()
    .then(stories => {
      res.render('welcome', {
        users: stories
      });
    });
});
//Post Handler
router.post('/', (req, res) => {
  const { user, title, description, category, tag, link } = req.body;
  const newPost = new Post({
    user: user,
    title: title,
    category: category,
    description: description,
    tag: tag,
    link: link
  });
  newPost.save()
  .then(
    post => {
      res.redirect('/dashboard/');
    })
  .catch(err => console.log(err));
});
// Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res) {
  Post.find(function(err, docs){
  res.render("dashboard", {
    name: req.user.name,
    email: req.user.email,
    img: req.user.img,
    users: docs
  });
});
});


module.exports = router;