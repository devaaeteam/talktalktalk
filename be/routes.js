var express = require('express'),
	router = express.Router(),
	authAPI = require('./authapp/routes');

router.get('/', function (request, response) {
	response.render('index.html');
});
router.use('/api/auth', authAPI);

module.exports = router;