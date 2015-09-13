var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var router = express.Router();
var Emails = require('../models/emails');



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

  	console.log(req.file.path);

  	var emailList = new Emails();
  	emailList.file.data = fs.readFileSync(req.file.path);
  	emailList.file.contentType = 'image/png';
  	emailList.save(function (err, emailList) {
      if (err) throw err;
      console.error('Woohoo! You saved the file to mongo!');
    });

});







module.exports = router;
