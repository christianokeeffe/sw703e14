var myApp = angular.module('smartgridgame');

myApp.service('TaskService', function (){
	var tasks = [
		new task('Washer','2'),
		new task('Owen','5'),
		new task('car','6000')
	];

	this.add = function (task){
		tasks.push(task);
	}

	this.get = function (id){
		for (i in taks){
			if (tasks[i].id == id){
				return tasks[i];
			}
		}
	}

	this.delete = function (id){
		for (i in tasks) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1);
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