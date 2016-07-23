var exports = module.exports = {};
var _ = require('underscore');
var mongoServices = require('./mongoServices.js');

exports.getList = function(req, res) {
	mongoServices.read(req, res, 'schedules');
};

exports.saveSchedule = function(req, res) {
	mongoServices.createOrUpdate(req, res, 'schedules');
};

exports.deleteSchedule = function(req, res) {
	var requestJson = req.body;
	mongoServices.deleteObject(req, res, 'schedules', requestJson._id);
};
