var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var router = express.Router();
var Account = require('../models/account');
var EmailFile = require('../models/emailFile');

/* GET users listing. */


router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id;
  res.render('account', {
		title: "Inpput Dashboard",
		user : req.user,
	});
});	

// Upload mailing list file

router.post('/users/:user_id/file_uploads', multer({ dest: './uploads/' }).single('file'), function(req, res, next) {

    var user_id = req.params.user_id;
    var source = req.file.path;
    var desti_dir = req.params.user_id + "/uploads/";
    var desti = req.params.user_id + "/" + req.file.path;
    var uploads_dir_exists = false;

    mkdirp(desti_dir, function(err) {
      if (err) {
        console.log("Couldn't make folder: " + err);

      } 
      else {
        console.log("It worked! Desti_dir is: " + desti_dir);
        try {
          var stream_source = fs.createReadStream(source);
          var stream_desti = fs.createWriteStream(desti);
          
          stream_source.on('data', function(chunk) {
            stream_desti.write(chunk);
            console.log("IT WORKED. HOLY SHIT");
          });
          
        }
        catch(err) {
          console.log("ERROR! " + err);
        }
      }
    });    
  });



module.exports = router;
