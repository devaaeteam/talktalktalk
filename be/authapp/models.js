var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	_id: {type: String},
	name: {type: String},
	surname: {type: String},
	email: {type: String},
	password: {type: String}
});

module.exports = mongoose.model('User', UserSchema);