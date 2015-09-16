var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Emails = new Schema({
	path: String, 
	contentType: String 
});


module.exports = mongoose.model('Emails', Emails);