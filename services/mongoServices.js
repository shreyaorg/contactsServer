var exports = module.exports = {};
var _ = require('underscore');
var ObjectID = require('mongoskin').ObjectID;

function loopBackFn(res) {
	return function(err, result) {
		if (err) throw err;
		res.json(result);
		res.end();
	};
}

function pagingLoopBackFn(res, totalCount) {
	return function(err, result) {
		if (err) throw err;
		var resultObj = {
			records: result,
			total: totalCount
		};
		res.json(resultObj);
		res.end();
	};
}

exports.createOrUpdate = function(req, res, collectionName) {
	var requestJson = req.body;
	if (requestJson._id) {
		var copy = _.clone(requestJson);
		delete copy._id;
		pmatrimonyDb.collection(collectionName).update({
			_id: mongoskin.helper.toObjectID(requestJson._id)
		}, {
			'$set': copy
		}, loopBackFn(res));
	} else {
		pmatrimonyDb.collection(collectionName).insert(requestJson, loopBackFn(res));
	}
};

exports.deleteObject = function(req, res, collectionName, id) {
	var filterCriteria = req.body || {};
	pmatrimonyDb.collection(collectionName).remove({
		_id: new ObjectID(id)
	}, function(err, result) {
		if (err) throw err;
		var resultObj = {
			"status": "success"
		};
		res.json(resultObj);
		res.end();
	});
};

exports.read = function(req, res, collectionName) {
	var filterCriteria = req.body || {};
	pmatrimonyDb.collection(collectionName).find(filterCriteria).toArray(loopBackFn(res));
};

exports.readPageWise = function(req, res, collectionName) {
	var filterCriteria = req.body || {};
	var skip = req.query['skip'] || 0;
	var limit = req.query['limit'] || 25;
	var collection = pmatrimonyDb.collection(collectionName);
	collection.count(filterCriteria, function(err, count) {
		collection.find(filterCriteria, null, {
			skip: skip,
			limit: limit,
			sort: {
				_id: -1
			}
		}).toArray(pagingLoopBackFn(res, count));
	});
};
exports.saveOnlyObject = function(req, res, collectionName) {
	var requestJson = req.body;
	var copy = _.clone(requestJson);
	var collection = pmatrimonyDb.collection(collectionName);
	collection.find().toArray(function(err, result) {
		if (err) {
			res.json({
				status: "error"
			});
			res.end();
			return;
		}
		if (result[0]) {
			var id = result[0]._id;
			collection.remove({
				_id: new ObjectID(id)
			}, function(err, result) {
				if (err) {
					res.json({
						status: "error"
					});
					res.end();
					throw err;
				}
				collection.insert(copy, function() {
					res.json({
						status: "success"
					});
					res.end();
				});
			});
		} else {
			collection.insert(copy, function() {
				res.json({
					status: "success"
				});
				res.end();
			});
		}
	});
};
exports.readOnlyObject = function(req, res, collectionName) {
	var requestJson = req.body;
	var copy = _.clone(requestJson);
	var collection = pmatrimonyDb.collection(collectionName);
	collection.find().toArray(function(err, result) {
		if (err) {
			res.json({
				status: "error"
			});
			res.end();
			return;
		}
		if (result[0]) {
			delete result[0]._id;
			res.json(result[0]);
			res.end();
		} else {
			res.json({});
			res.end();
		}
	});
};
exports.readUniqueObject = function(req, res, collectionName, id) {
	var collection = pmatrimonyDb.collection(collectionName);
	collection.find({
		_id: new ObjectID(id)
	}, null, {
		skip: 0,
		limit: 1,
		sort: {
			_id: -1
		}
	}).toArray(function(err, result) {
		if (err) throw err;
		var resultObj = result[0] || {};
		res.json(resultObj);
		res.end();
	});
};