var exports = module.exports = {};
var mongoServices = require('./mongoServices.js');

exports.getList = function(req, res) {
	mongoServices.readPageWise(req, res, 'admins');
};

exports.saveAccount = function(req, res) {
	mongoServices.createOrUpdate(req, res, 'admins');
};
exports.deleteAccount = function(req, res) {
	var requestJson = req.body;
	mongoServices.deleteObject(req, res, 'admins', requestJson._id);
};