var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var router = express.Router();
var Account = require('../models/account');
var Upload = require('../models/upload');

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
    var original_name = req.file.originalname;
    
    console.log("File name is: " + original_name);
    
    var source = req.file.path;
    var desti_dir = req.params.user_id + "/uploads/";
    var desti = req.params.user_id + "/" + req.file.path;

    mkdirp(desti_dir, function(err) {
      if (err) {
        console.log("Couldn't make folder: " + err);

      } 
      else {
        try {
          var stream_source = fs.createReadStream(source);
          var stream_desti = fs.createWriteStream(desti);
          
          stream_source.on('data', function(chunk) {
            stream_desti.write(chunk);
          });

          // Delete files in /uploads folder after it's copied to user folder
          try {
            fs.unlinkSync(source);
            // save file path and metadata to account.js model

            console.log("File path to save is: " + desti)
            
            // create a new uploads object (into which we'll save the file path and info);
            
            var email_list = new Upload({
              username: user_id,
              file_path: desti,
              file_name: original_name,
              info_type: "email_list",
              content_type: "plain/text"
            });
            
            // save this to the Uploads collection

            email_list.save(function (err, email_list) {
              if (err) return console.error(err);
              else { 
                res.send("Upload document successfully saved to MongoDB.")
              }
          }); 

          }

          catch(err) {
            console.log("ERROR! Unable to delete file");
          }

        }
        catch(err) {
          console.log("ERROR! " + err);
        }
      }
    });    
  });



module.exports = router;
