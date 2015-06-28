var express = require('express'),
	AuthCtrl = require('./controllers'),
	authAPI = express.Router(),
	midleware = require('./midleware');


authAPI.route('/login')
	.post(AuthCtrl.login);

authAPI.route('/signin')
	.post(AuthCtrl.signin);

authAPI.route('/check')
	.get(midleware.ensureAuthenticated, AuthCtrl.check);

module.exports = authAPI;