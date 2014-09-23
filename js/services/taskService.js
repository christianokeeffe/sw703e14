var myApp = angular.module('smartgridgame');

myApp.service('TaskService', function (){
	var tasks = [
		new task('Washer','2'),
		new task('Owen','5'),
		new task('car','10')
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
  this.timeToCountDown = this.time;

  this.countDown = function (){
  	console.log(tname+ ' ' + ttime);
    temp = this.time;

    var interval = setInterval(function () {
      if (temp == 0){
        console.log("FINNISHED" + ' ' + tname);
        clearInterval(interval);
      } else {
        temp--;
        this.timeToCountDown = temp;
        console.log(tname+ ' ' + temp);
      }
    }, 1000);
  };

};