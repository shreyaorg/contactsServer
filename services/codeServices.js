var exports = module.exports = {};
var _ = require('underscore');
var mongoServices = require('./mongoServices.js');

exports.getList = function(req, res) {
	mongoServices.read(req, res, 'codes');
};

exports.saveCode = function(req, res) {
	mongoServices.createOrUpdate(req, res, 'codes');
};

exports.deleteCode = function(req, res) {
	var requestJson = req.body;
	mongoServices.deleteObject(req, res, 'codes', requestJson._id);
};

exports.getUserLines = function(req, res) {
	var requestJson = req.body;
	mongoServices.read(req, res, 'userLines');
};
exports.getAssignedUsers = function(req, res) {
	mongoServices.readOnlyObject(req, res, 'assignedUsers');
};
exports.assignUsers = function(req, res) {
	mongoServices.saveOnlyObject(req, res, 'assignedUsers');
};