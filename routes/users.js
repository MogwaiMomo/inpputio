var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;
	res.render('account', {
		title: "Inpput Dashboard",
		user : req.user,
	});
});	



// File upload

router.post('/users/:user_id/file-upload', upload.single('file'), function(req, res, next) {
	var user_id = req.params.user_id;
	var serverPath = '/users/' + user_id +'/file-upload';
    // console.log(JSON.stringify(req.file));
});



module.exports = router;
