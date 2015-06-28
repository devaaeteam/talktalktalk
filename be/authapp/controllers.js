var mongoose = require('mongoose'),
	User = require('./models'),
	jwt = require('jsonwebtoken');


exports.login = function (request, response) {
	var username = request.body.username || request.params.username,
		password = request.body.password || request.params.password
	console.log('POST /api/auth/login Username: ' + username);
	User.findOne()
		.where('_id').equals(username)
		.where('password').equals(password)
		.exec(function (error, user) {
			if (error) {
				console.log('500 INTERNAL SERVER ERROR: ' + error.message)
				response.status(500).send(error.message);
			} else if (user){
				var token = jwt.sign(user, 'PRUEBA', {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				response
					.status(200)
					.jsonp({
						success: true,
						profile: {
							username: user._id,
							name: user.name,
							surname: user.surname,
							email: user.email,
						},
						message: 'Authenticated',
						token: token
					});

				console.log('200 OK: El usuario ' + request.body.username + ' se ha autenticado correctamente');
			} else {
				console.log('401 UNAUTHORIZED: El nombre de usuario y contraseña no son correctos')
				response.status(401).jsonp({'message': 'Fallo en la autenticación'})
			}
		});
};

exports.signin = function (request, response) {
	console.log('POST /api/auth/signin Username: ' + request.body.username);
	User.findOne()
		.where('_id').equals(request.body.username)
		.where('password').equals(request.body.password)
		.exec(function (error, user) {
			if (error) {
				console.log('500 INTERNAL SERVER ERROR: ' + error.message);
				response
					.status(500)
					.send(error.message);
			} else if (user){
				console.log('401 UNAUTHORIZED: El usuario ya existe.');
				response
					.status(401)
					.jsonp({
						success: false,
						message: 'ERROR: El usuario ya existe.' 
					});	
			} else {
				var newUser = new User();
				newUser._id = request.body.username;
				newUser.name = request.body.name;
				newUser.email = request.body.email;
				newUser.surname = request.body.surname;
				newUser.password = request.body.password;
				newUser.save(function (error, user) {
					if (error) {
						console.log('500 INTERNAL SERVER ERROR: ' + error.message);
						response
							.status(500)
							.jsonp({
								success: false,
								message: 'ERROR: ' + + error.message 
							});
					} else {
						console.log('201 CREATED: El usuario ' + request.body.username + ' se ha añadido correctamente');
						response
							.status(201)
							.jsonp({
								success: true,
								message: 'Añadido correctamente al sistema'
							});
					}
				});
			}
		});
};

exports.check = function (request, response) {
	console.log('200 OK: Cheked');
	response
		.status(200)
		.jsonp({
			"success": true,
			"message": "Checked"
		})
};