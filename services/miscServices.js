var exports = module.exports = {};
var _ = require('underscore');
var mongoServices = require('./mongoServices.js');

exports.getStates = function(req, res) {		
	mongoServices.read(req, res, 'states');
};

exports.getCities = function(req, res) {
	req.body = {
		state : req.params["abbr"]
	};
	mongoServices.read(req, res, 'cities');
};
