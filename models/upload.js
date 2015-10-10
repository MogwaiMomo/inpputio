var mongoose = require('mongoose');	
var Schema = mongoose.Schema;

var Upload = new Schema({
	username: String,
 	file_path: String,
 	info_type: String,
 	content_type: String 
});


module.exports = mongoose.model('Upload', Upload);