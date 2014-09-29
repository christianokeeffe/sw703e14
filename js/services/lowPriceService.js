var myApp = angular.module('smartgridgame');

myApp.service('lowPriceService', function () {
	var beforeTime = new Date();

	this.setTimer = function(date) {
		beforeTime = date;
	};

	this.get = function() {
		return beforeTime;
	};
});