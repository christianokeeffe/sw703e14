var myApp = angular.module('smartgridgame');

myApp.service('controllerService', function () {
	var beforeTime;
	var Appliance;
	var Task;
	var TableContent = [];

	var TableContentAllowed = false;

	this.setAppliance = function(appliance) {
		Appliance = appliance;
	};

	this.getAppliance = function() {
		return Appliance;
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

	this.isAllowed = function(){
		return TableContentAllowed;
	}

	this.setAllowed = function(value){
		TableContentAllowed = value;
	}

	this.getTableContent = function() {
		return TableContent;
	};

	this.setTimer = function(date) {
		beforeTime = date;
	};

	this.getTimer = function() {
		return beforeTime;
	};
});