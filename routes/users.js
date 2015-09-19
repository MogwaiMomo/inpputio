var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var router = express.Router();
var Account = require('../models/account');


/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;

  // Use mongoose to find the Account that has the user id from above
  var query1 = Account.findOne({ username: user_id });
  var query2; 

  // Get the user name from that record, create & save user-specific uploads path    
  query1.exec(function (err, account) {
    var upload_path;
    if (err) return console.error(err);
    upload_path = "/users/" + account.username + "/uploads/";
    account.emails.path = upload_path;

    account.save(function(err, account) {
      if (err) return console.error(err);
      console.log("Woohoo! You saved a user-specific uploads path");
    });
  });

  res.render('account', {
		title: "Inpput Dashboard",
		user : req.user,
	});
});	


// File upload

// router.post('/users/:user_id/uploads', upload.single('file'), function(req, res, next) {
//   	var emailList = new Emails();

//   	emailList.path = req.file.path;
//   	emailList.contentType = 'image/png';
//   	emailList.save(function (err, emailList) {
//       if (err) throw err;
//       console.error('Woohoo! You saved the file to mongo!');
//     });

// });



module.exports = router;
