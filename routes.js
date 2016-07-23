var profileServices = require('./services/profileServices.js'),
	codeServices = require('./services/codeServices.js'),
	packageServices = require('./services/packageServices.js'),
	adminAccountServices = require('./services/adminAccountServices.js'),
	scheduleServices = require('./services/scheduleServices.js'),
	miscServices = require('./services/miscServices.js');

function createDelayedFn(actualFn, customDelay) {
	var retValue,
		//Math.random() * (max - min) + min
		delayUsed = customDelay || (Math.random() * 2000 + 1000);
	if (delayUsed) {
		retValue = function() {
			var me = this;
			var args = Array.prototype.slice.call(arguments, 0);
			setTimeout(function() {
				actualFn.apply(me, args);
			}, delayUsed);
		};
	} else {
		retValue = actualFn;
	}
	return retValue;
}

module.exports = function(app) {
	app.get('/data/profiles', createDelayedFn(profileServices.getProfiles));
	app.get('/data/profiles/feeds', createDelayedFn(profileServices.getFeeds));
	app.post('/data/profiles/save', createDelayedFn(profileServices.saveProfile));	
	app.post('/data/profiles/delete', createDelayedFn(profileServices.deleteProfile));	
	app.get('/data/profiles/:id', createDelayedFn(profileServices.getProfile));


	app.get('/data/adminAccounts/list', createDelayedFn(adminAccountServices.getList));
	app.post('/data/adminAccounts/save', createDelayedFn(adminAccountServices.saveAccount));
	app.post('/data/adminAccounts/delete', createDelayedFn(adminAccountServices.deleteAccount));

	app.get('/data/packages/list', createDelayedFn(packageServices.getList));
	app.post('/data/packages/save', createDelayedFn(packageServices.savePackage));
	app.post('/data/packages/delete', createDelayedFn(packageServices.deletePackage));

	app.get('/data/codes/list', createDelayedFn(codeServices.getList));
	app.post('/data/codes/save', createDelayedFn(codeServices.saveCode));
	app.post('/data/codes/delete', createDelayedFn(codeServices.deleteCode));
	app.get('/data/codes/getAssignedUsers', createDelayedFn(codeServices.getAssignedUsers));
	app.post('/data/codes/assignUsers', createDelayedFn(codeServices.assignUsers));

	app.get('/data/schedules/list', createDelayedFn(scheduleServices.getList));
	app.post('/data/schedules/save', createDelayedFn(scheduleServices.saveSchedule));
	app.post('/data/schedules/delete', createDelayedFn(scheduleServices.deleteSchedule));

	app.get('/data/getUserLines', createDelayedFn(codeServices.getUserLines));
		
	app.get('/data/states/:abbr/cities', createDelayedFn(miscServices.getCities));
	app.get('/data/states/list', createDelayedFn(miscServices.getStates));
};