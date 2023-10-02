//import needed packages
const express = require('express');
const {check, validationResult} = require('express-validator');

//create the server
const router = express.Router();

//route to the login page
router.get('/', (req, res)=>{
    res.render('login', {title:'Login Page'});
});

//route to authenticate the user
router.post('/login',

[
    check('email')
    .notEmpty()
    .withMessage('email is required.'),

    check('password')
    .notEmpty()
    .withMessage('password is required.')
    .isLength({min:8})
    .withMessage('password must be at least 8 characters.')
]

,(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        // res.send({ errors: errors.array() });
        res.render('login', {title:'Login Page', errors:'Please check your input!'});
    }else{
        if(isCredentialCorrect(email, password)){
            // create a session
            req.session.user = req.body.email;
            res.redirect('/dashboard');
        }else{
            res.render('login', {title:'Login Page', isInvalid:'Your credential does not exist!'});
        }
    }
});

function isCredentialCorrect(email, password){
    //fake database
       const credential = {
       email:'kodego@test.com',
       password: '12345678'
       }

       if(email == credential.email && password == credential.password){
           return true;
       }else{
           return false;
       }
   };

//route to the dashboard
router.get('/dashboard', (req, res)=>{
    if(req.session.user){
        res.render('dashboard', {title: 'Dashboard', user: req.session.user});
    }else{
        res.sendStatus(403);
    }
});

// route to the foreign_exchange
router.get('/foreign_exchange', (req, res)=>{
    if(req.session.user){
        res.render('foreign_exchange', {title: 'foreign_exchange', user: req.session.user});
    }else{
        res.sendStatus(403);
    }
});

// route to the currency_converter
router.get('/currency_converter', (req, res)=>{
    if(req.session.user){
        res.render('currency_converter', {title: 'currency_converter', user: req.session.user});
    }else{
        res.sendStatus(403);
    }
});

//route to destroy the session
router.post('/logout', (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.render('login', {title:'Login Page', logout:'Logout successfully!'});
        }
    });
});

module.exports = router;