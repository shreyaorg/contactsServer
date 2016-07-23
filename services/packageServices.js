var exports = module.exports = {};
var mongoServices = require('./mongoServices.js');

exports.getList = function(req, res) {
	mongoServices.readPageWise(req, res, 'packages');
};

exports.savePackage = function(req, res) {
	mongoServices.createOrUpdate(req, res, 'packages');
};
exports.deletePackage = function(req, res) {
	var requestJson = req.body;
	mongoServices.deleteObject(req, res, 'packages', requestJson._id);
};