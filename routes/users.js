var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var router = express.Router();
var Emails = require('../models/emails');
var upload = multer({ dest: 'uploads/' });


/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;
  res.render('account', {
		title: "Inpput Dashboard",
		user : req.user,
	});
});	


// File upload

router.post('/users/:user_id/uploads', upload.single('file'), function(req, res, next) {

  	var emailList = new Emails();
  	emailList.path = req.file.path;
  	emailList.contentType = 'image/png';
  	emailList.save(function (err, emailList) {
      if (err) throw err;
      console.error('Woohoo! You saved the file to mongo!');
    });

});



module.exports = router;
