var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var router = express.Router();
var Account = require('../models/account');
var EmailFile = require('../models/emailFile');

/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;

  // Use mongoose to find the Account that has the user id from above
  var query = Account.findOne({ username: user_id }); 

  // Get the user name from that record, create & save user-specific uploads path    
  query.exec(function (err, account) {
    var upload_dir;
    if (err) return console.error(err);
    upload_dir = "/users/" + account.username + "/file_uploads/";
    account.emails.path = upload_dir;

    account.save(function(err, account) {
      if (err) return console.error(err);
      console.log("Woohoo! You saved a user-specific uploads path:");
      console.log(upload_dir);
    });
  });

  res.render('account', {
		title: "Inpput Dashboard",
		user : req.user,
	});
});	


// File upload:

var upload_func = function(req, res, next) {
  var user_id = req.params.user_id;
  // Use mongoose to find the Account that has the user id from above
  var query = Account.findOne({ username: user_id });

  query.exec(function (err, account) {
    var upload_dir;
    if (err) return console.error(err);
    
    upload_dir = '.'+ account.emails.path;
    var upload = multer({dest: upload_dir});
    var output = upload.single('file');
    return output();
  });
}

router.post('/users/:user_id/file_uploads', upload_func, function(req, res, next) {
    console.log("HARO AGAIN");
  	var email_file = new EmailFile();
    console.log(email_file);

  	// email_file.file_path = req.file.path;
    // console.log(email_file.file_path);
   //  email_file.content_type = 'image/png';
  	// Account.save(function (err, email_file) {
   //    if (err) throw err;
   //    console.error('Woohoo! You saved the filepath to mongo!');
   //  });

});



module.exports = router;
