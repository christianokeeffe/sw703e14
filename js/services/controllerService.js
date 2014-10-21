var myApp = angular.module('smartgridgame');

myApp.service('controllerService', function () {

	var beforeTime;
	var Appliance;
	//used to contain the selected task in the actionModal
	var Task;
	//used to contain the selected appliance's tasks
	var Tasks;
	//used to store all tasks
	var StoredTasks = [];

	this.setAppliance = function(appliance) {
		Appliance = appliance;

		this.SelectTasksByApplianceID(appliance.id);
	};

	this.getAppliance = function() {
		return Appliance;
	};

	this.setTask = function(task) {
		Task = task;
	};

	this.getTask = function() {
		return Task;
	};

	this.getTasks = function() {
		return Tasks;
	};

	this.StoreAllTasks = function(tasks) {
		StoredTasks = tasks;
	};

	this.SelectTasksByApplianceID = function(id) {
		var tempTaskContainer = [];

		if(this.checkApplianceHasTasks(id)){
			for(i = 0; i < StoredTasks.length; i++){
				if(StoredTasks[i].refAppliance == id){
					tempTaskContainer.push(StoredTasks[i]);
				}
			}
		}

		Tasks = tempTaskContainer;
	};

	this.checkApplianceHasTasks = function(id){
		for(i = 0; i < StoredTasks.length; i++){
			if(StoredTasks[i].refAppliance == id){
				return true;
			}
		}
		return false;
	};

	this.setTimer = function(date) {
		beforeTime = date;
	};

	this.getTimer = function() {
		return beforeTime;
	};
});