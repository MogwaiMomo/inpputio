var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  
  	app_name:'Inpput', 
  	app_uvp: 'Get Authentic Testimonials Fast',
  	login_p: '/login', 
  	signup_p: '/signup',
    user : req.user,
  });
});


/* GET signup page. */

router.get('/signup', function(req, res, next) {
  res.render('signup', {  
    app_name:'Inpput', 
    app_uvp: 'Get Authentic Testimonials Fast',
    login_p: '/login', 
    signup_p: '/signup',
  });
});


/* POST signup page. */

router.post('/signup', function(req, res) {
  Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
      if (err) {
        return res.render('signup', { 
          info: "Sorry. That username already exists. Try again." });
      }

      passport.authenticate('local')(req, res, function () {
        var url = req.body.username
        res.redirect('/users/' + url);
      });
  });

});

/* GET login page. */

router.get('/login', function(req, res, next) {
  res.render('login', {  
    login_p: '/login', 
    signup_p: '/signup',
    user : req.user,
  });
});

/* POST login page. */

router.post('/login', passport.authenticate('local', {  
  failureRedirect: '/login'}), function(req, res) {
  res.redirect('/users/' + req.user.username);
});


/* GET logout page. */

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
