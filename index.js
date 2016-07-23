var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var mongoskin = global.mongoskin = require('mongoskin');
global.pmatrimonyDb = mongoskin.db('mongodb://localhost:27017/pmatrimony', {
	'auto_reconnect': true,
	'poolSize': 2
});

var session = require('cookie-session');
var app = express();

// trust first proxy 
app.set('trust proxy', 1);

app.use(session({
	keys: ['key1', 'key2']
}));

//parse application/json
app.use(bodyParser.json());

app.use(serveStatic('wwwroot', {
	'index': ['index.html']
}));
var routes = require('./routes.js');
routes(app);

var server = app.listen(8090, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://localhost:8090/');
});