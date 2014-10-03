var myApp = angular.module('smartgridgame');

myApp.service('TaskService',['formatRequest','tasksFactory', function (formatRequest,tasksFactory){
	var tasks = [
		new task('Washer','2','5'),
		new task('Owen','5','5'),
		new task('car','6000','5')
	];

	this.getApplianceTask = function (id){
		var geturl = formatRequest.get({});
		geturl.id = id;

		if(geturl === undefined)
		{
		  setTimeout(function(){
		  return $scope.getApplianceTask();
		  }, 10);
		}
		else
		{ 
		  tasksFactory.gettasks(geturl,
		  function (response) {
		    return response.data;
		  },
		  function () {
		    //alert(JSON.stringify(response));
		    document.write(JSON.stringify(response));
		  });
		}
	}

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