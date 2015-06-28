var jwt = require('jsonwebtoken'),
    moment = require('moment'),
    settings = require('../../settings');

 exports.ensureAuthenticated = function (request, response, next) {
    var token = request.body.token || request.params.token || request.headers['x-access-token'];
    if (!token) {
    	console.log('403 FORBIDEN: Not token provided');
        return response
            .status(403)
            .send('Not token provided');
    }
	jwt.verify(token, settings.CODE, function(err, decoded) {			
		if (err) {
			console.log('401 UNAUTHORIZED: Failed to authenticate token.');
			return response
				.status(401)
				.jsonp({
					success: false,
					message: 'Failed to authenticate token.' 
				});		
		} else {
			request.decoded = decoded;	
			next();
		}
	});
};
