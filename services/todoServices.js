var exports = module.exports = {};
var _ = require('underscore');
var mongoServices = require('./mongoServices.js');

exports.getList = function(req, res) {	
	mongoServices.read(req, res, 'todos');
};

exports.saveTodo = function(req, res) {	
	mongoServices.createOrUpdate(req, res, 'todos');
};

exports.delete = function(req, res) {	
  mongoServices.delete(req, res, 'todos');	
};