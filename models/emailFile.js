var mongoose = require('mongoose');	
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var EmailFile = new Schema({
 	file_path: String,
 	content_type: String 
});

EmailFile.plugin(passportLocalMongoose);

module.exports = mongoose.model('EmailFile', EmailFile);