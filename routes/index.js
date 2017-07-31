var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  
  	app_name:'Inpput', 
  	app_uvp: 'Analyze User Reviews Fast',
    title: 'Inpput: Analyze Reviews Fast and Accurately',
  	login_p: '/login', 
  	signup_p: '/signup',
    user : req.user,
  });
});


/* GET signup page. */

router.get('/signup', function(req, res, next) {
  res.render('signup', {  
    app_name:'Inpput', 
    app_uvp: 'Analyze User Reviews Fast',
    title: 'Inpput: Sign Up Free',
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
    title: 'Inpput: Login to Your Account',
    login_p: '/login', 
    signup_p: '/signup',
    user : req.user,
  });
});



/* POST login page - WORKS, BUT NO REDIRECT OR ERROR MESSAGE */

// router.post('/login', passport.authenticate('local'), function(req, res) {
//   res.redirect('/users/' + req.user.username);
// });

/* POST login page - WORKS AND REDIRECTS, BUT NO ERROR MESSAGE */

// router.post('/login',
//  // handler 1: 
//   passport.authenticate('local'), 
//   // Handler 2 (callback): 
//   function(req, res) {
//     res.redirect('/users/' + req.user.username);
// });


// res.render('login', {info: req.authInfo});

/* POST login page */


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); }
    if (!user) { 
      console.log("The user is: " + user);
      return res.render('login', {info: "Sorry, wrong username and/or password."}); }
    
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });

  })(req, res, next); 
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
