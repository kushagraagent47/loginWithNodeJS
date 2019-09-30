const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//USER MODAL
const User = require('../models/User')
//LOGIN
router.get('/login', (req,res) => res.render('login'));

//Register
router.get('/register', (req,res) => res.render('register'));

//Rgister Handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
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
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                        }))
            }
        });
    }
});

module.exports = router;