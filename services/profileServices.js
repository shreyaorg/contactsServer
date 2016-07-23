var exports = module.exports = {};
var mongoServices = require('./mongoServices.js');

exports.getFeeds = function(req, res) {
	mongoServices.read(req, res, 'feeds');
};
exports.getProfile = function(req, res) {
	var id = req.params['id'];	
	mongoServices.readUniqueObject(req, res, 'profiles', id);
};
exports.getProfiles = function(req, res) {
	mongoServices.readPageWise(req, res, 'profiles');
};

exports.saveProfile = function(req, res) {
	mongoServices.createOrUpdate(req, res, 'profiles');
};
exports.deleteProfile = function(req, res) {
	var requestJson = req.body;
	mongoServices.deleteObject(req, res, 'profiles', requestJson._id);
};