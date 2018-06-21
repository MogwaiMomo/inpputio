var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var del = require('delete');
var router = express.Router();

var Account = require('../models/account');
var Upload = require('../models/upload');
          

// closure: 

var getUploadsQuery = function(user_id, filename) {
  var query = Upload.find({ username: user_id, file_name: filename });
  return query;
}


var check_files = function(user_id, campaigns, req, res) {
  Upload.find({ username: user_id }, function(err, uploads) {
    if (err) throw err;
    if (uploads.length > 0) {
      uploads.forEach(function(upload) {
        campaigns = upload.file_name;
      });

      res.render('account', {
          title: "Inpput Dashboard",
          user : user_id,
          campaigns : campaigns,
      });
    }
    else {
      res.render('account', {
        title: "Inpput Dashboard",
        user : user_id,
      });
    }      
  });
}

/* Render main dashboard page */

router.get('/users/:user_id', function(req, res, next){
	var user_id = req.params.user_id,
  campaigns = [];
  check_files(user_id, campaigns, req, res);
});	

/* GET users listing - 1+ files. */

router.get('/users/:user_id/campaigns', function(req, res, next){
  var user_id = req.params.user_id,
  campaigns = [];
  check_files(user_id, campaigns, req, res);
}); 



// Upload mailing list file

router.post('/users/:user_id/file_uploads', multer({ dest: './uploads/' }).single('file'), function(req, res, next) {

    var user_id = req.params.user_id;
    var original_name = req.file.originalname;
    
    console.log("File name is: " + original_name);
    
    var source = req.file.path;
    console.log("TEST:" + source);
    var desti_dir = "data/"+ req.params.user_id + "/uploads/";
    var desti = "data/" + req.params.user_id + "/" + req.file.path;

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
            
            // create a new uploads document (into which we'll save the file path and info);
            
            var survey_csv = new Upload({
              username: user_id,
              file_path: desti,
              file_name: original_name,
              info_type: "survey_csv",
              content_type: "plain/text"
            });
            
            // save this to the Uploads collection

            survey_csv.save(function (err, survey_csv, user_id) {
              if (err) return console.error(err);
              else {
                console.log("Upload document successfully saved to MongoDB.");
                console.log("Username is: " + survey_csv.username);
                res.redirect('/users/' + survey_csv.username + '/campaigns'); 


                // TRIAL AREA!!! STILL BROKEN, REMOVE IF YOU CAN'T FIX
                 
                const csv=require('csvtojson');
                var csvFilePath = desti;

                var rootPath = process.cwd()
                
                csvFilePath = path.join(rootPath, csvFilePath)

                console.log('FULL FILE PATH:', csvFilePath)
                
                csv()
                .fromFile(csvFilePath)
                .on('json',(jsonObj)=>{
                  // combine csv header row and csv line to a json object 
                  // jsonObj.a ==> 1 or 4 
                  console.log(jsonObj)
                })
                .on('done',(error)=>{
                  console.log('end')
                })


                // END TRIAL AREA
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



// Delete mailing-list file

router.post('/users/:user_id/delete_files', function(req, res, next) {
  var filename = req.body.filename,
      user_id = req.body.user_id,
      // get query results for uploads documents to delete
      query = getUploadsQuery(user_id, filename);
      
  
  // delete file from file system: 
  query.exec(function(err, uploads, next) {
    if (err) throw err;
    if (uploads.length > 0) {
      uploads.forEach(function(upload) {
        console.log("File to delete: " + upload.file_path);
        del(upload.file_path, function(err) {
          if (err) throw err;
          console.log('File deleted from file system.'); 
          
          // redirect to blank (no uploads) page
          try {
            
            // redirect is working but view is not
            res.redirect('/users/momokoprice+test');
            console.log("WHAT??")
          }
          catch(err) {
            console.log("DIDN'T WORK");
          } 
        });
        upload.remove(function(err){
          if (err) throw err;
          console.log('Document deleted from database.')
        });
      });
    }
  });
});



module.exports = router;
