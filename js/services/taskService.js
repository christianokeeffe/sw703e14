var myApp = angular.module('smartgridgame');

myApp.service('TaskService',['$scope','formatRequest','tasksFactory', function ($scope,formatRequest,tasksFactory){
	var tasks = [
		new task('Washer','2','5'),
		new task('Owen','5','5'),
		new task('car','6000','5')
	];

	this.get = function (id){
		for (i in taks){
			if (tasks[i].id == id){
				return tasks[i];
			}
		}
	}

	this.list = function(){
		return tasks;
	}
}]);

var task = function (tname, rtime, dtime){
  this.name = tname;
  this.runTime = rtime;
  this.deadlineTime = dtime;
};