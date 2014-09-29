var myApp = angular.module('smartgridgame');

myApp.service('TaskService', function (){
	var tasks = [
		new task('Washer','2'),
		new task('Owen','5'),
		new task('car','6000')
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
});

var task = function (tname, ttime){
  this.name = tname;
  this.time = ttime;
};