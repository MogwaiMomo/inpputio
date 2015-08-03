var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  
  	app_name:'Inpput', 
  	app_uvp: 'Get Authentic Testimonials Fast',
  	login_p: '/login', 
  	signup_p: '/signup',
  });
});

/* GET login page. */

router.get('/login', function(req, res, next) {
  res.render('login', {  
    app_name:'Inpput', 
    app_uvp: 'Get Authentic Testimonials Fast',
    login_p: '/login', 
    signup_p: '/signup',
  });
});

/* GET login page. */

router.get('/signup', function(req, res, next) {
  res.render('signup', {  
    app_name:'Inpput', 
    app_uvp: 'Get Authentic Testimonials Fast',
    login_p: '/login', 
    signup_p: '/signup',
  });
});


module.exports = router;
