var myApp = angular.module('smartgridgame');

myApp.service('controllerService', function () {
	var beforeTime = new Date();
	var Applience;
	var Task;
	var TableContent;

	this.setApplience = function(applience) {
		Applience = applience;
	};

	this.getApplience = function() {
		return Applience;
	};

	this.setTask = function(task) {
		Task = task;
	};

	this.getTask = function() {
		return Task
	};

	this.setTableContent = function(tableContent) {
		TableContent = tableContent;
	}

	this.getTableContent = function() {
		return TableContent;
	};

	this.setTimer = function(date) {
		beforeTime = date;
	};

	this.get = function() {
		return beforeTime;
	};
});