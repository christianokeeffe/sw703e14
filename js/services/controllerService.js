var myApp = angular.module('smartgridgame');

myApp.service('controllerService', function () {

	var beforeTime;
	var Appliance;
	var ApplianceArray;

	//used to contain the index of the selected task
	var TaskID;

	//used to store all tasks in sperated list for each appliance, stored at the id of the specific appliance
	var StoredTasks = [];

	this.setAppliance = function(appliance) {
		Appliance = appliance;
	};

	this.getAppliance = function() {
		return Appliance;
	};

	this.setApplianceArray = function(applianceArray) {
		ApplianceArray = applianceArray;
	}

	this.getApplianceArray = function() {
		return ApplianceArray
	};

	this.setTask = function(task) {
		TaskID = StoredTasks[Appliance.id].indexOf(task);
	};

	this.getTask = function() {
		return StoredTasks[Appliance.id][TaskID];
	};

	this.getTasks = function() {
		return StoredTasks[Appliance.id];
	};
	
	this.StoreAllTasks = function(tasks) {
		for (var i = 0; i < ApplianceArray.length; i++){
			var temp = [];
			for (var j = 0; j < tasks.length; j++){
				if (ApplianceArray[i].id == tasks[j].refAppliance){
					temp.push(tasks[j]);
				}
			};

			if(temp.length != 0){
				StoredTasks[ApplianceArray[i].id] = temp;
			}
		};
	};

	this.checkApplianceHasTasks = function(id){
		if(StoredTasks[id] != undefined){
			return true;
		} else {
			return false;
		}
	};

	this.setTimer = function(date) {
		beforeTime = date;
	};

	this.getTimer = function() {
		return beforeTime;
	};
});