var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	routes = require('./be/routes'),
	settings = require('./settings');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/fe'));
app.use(routes);


mongoose.connect(settings.DBSERVER + settings.DBNAME, function (error, response) {
	if (error){
		console.log('Error: ' + error.message + ', no se ha podido conectar a la BD')
	} else{
		console.log('Conectado a BD');
	}
	app.listen(settings.PORT, function (error) {
		if (error) {
			console.log('No se pudo levantar la conexión en localhost:3000');
			throw error;
		} else {
			console.log("Se ha levantado el servidor en http://localhost:3000")
		}
	});
});