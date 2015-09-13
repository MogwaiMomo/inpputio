var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Emails = new Schema({
	file: { data: Buffer, 
			contentType: String }
});


module.exports = mongoose.model('Emails', Emails);