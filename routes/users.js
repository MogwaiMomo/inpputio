var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;
	console.log("WORKING")

	res.render('account', {
		user : req.user
	});
});	

module.exports = router;
