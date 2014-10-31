var myApp = angular.module('smartgridgame');

myApp.controller('dailyTaskController', ['$scope', '$rootScope', 'dailyTaskFactory', 'formatRequest', function($scope, $rootScope, dailyTaskFactory, formatRequest){

var first = true;
var firstDay = true;

$scope.dailyTasks = {};
$rootScope.timesMissedWork = 0;
  
 $scope.getDailyTasks = function(){
 var geturl = {};

    geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
          return $scope.getDailyTasks();
         }, 10);
    }
    else
    {
      dailyTaskFactory.dailyTask(geturl,
      function (response) {
        switch(response.status_code)
        {
          case '200':
            $scope.dailyTasks = response.data;
            for (var i = 0; i < $scope.dailyTasks.length; i++) {
            	$scope.dailyTasks[i].done = false;
            	$scope.dailyTasks[i].missed = false;
            }
            break;
        }
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getDailyTasks();

$scope.getDateWithoutTime = function() {
	currentDate = $scope.curDate();
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
};

$scope.getGameTimeInMin = function() {
	var date = $scope.curDate();
	var time = parseInt(date.getHours()) * 60 + parseInt(date.getMinutes());
	return time;
};

$scope.newDay = function() {
	for(i = 0; i < $scope.dailyTasks.length; i++)
	{
		$scope.dailyTasks[i].done = false;
		$scope.dailyTasks[i].missed = false;
	}
};

$scope.inTime = function(startTime, endTime) {
	var gameTime = $scope.getGameTimeInMin();
	if (startTime <= gameTime && gameTime <= endTime) {
		return true;
	} else {
		return false;
	}
};

$scope.isMissed = function(item) {
	var gameTime = $scope.getGameTimeInMin();
	if(!item.done && item.endTime < gameTime) {
		return true;
	} else {
		return false;
	}
};

$scope.$on('task-communication', function(event, data){
	for (i = 0; i < $scope.dailyTasks.length; i++) {
		if($scope.dailyTasks[i].taskID == data.task.id && $scope.dailyTasks[i].id != "4") {
			if($scope.inTime($scope.dailyTasks[i].startTime, $scope.dailyTasks[i].endTime) && $scope.dailyTasks[i].done == false) {
				$scope.dailyTasks[i].done = true;
				$rootScope.score += parseInt($scope.dailyTasks[i].reward);
			}
		}
	}
});

var updater = $scope.$watch('dateEpoch', function(){
	if($scope.dateEpoch != 1409565600 && first) {
		first = false;
		$scope.lastUpdated = $scope.getDateWithoutTime();
	}
	//Updates every new day
	if($scope.getDateWithoutTime() > $scope.lastUpdated) {
 		$scope.newDay();
 		$scope.firstDay = false;
 	}
 	//Checks if a deadline is missed on a daily task
 	for (i = 0; i < $scope.dailyTasks.length; i++) {
 		if($scope.dailyTasks[i].id == "4") {

 			var hourOfLastUpdate = $scope.lastEpochUpdate / 60 / 60;
        	var currentHour = $scope.dateEpoch / 60 / 60;
        	currentHour = (currentHour%24)+1;
        	hourOfLastUpdate = (hourOfLastUpdate%24);
        	var dayOfLastUpdate = $scope.lastEpochUpdate / 60 / 60 / 24;
        	var currentDay = $scope.dateEpoch / 60 / 60 / 24;
        	dayOfLastUpdate = Math.floor(dayOfLastUpdate%7);
        	currentDay = Math.floor(currentDay%7);
 			
 			if(hourOfLastUpdate < 7 && 7 <= currentHour && currentDay != 2 && currentDay !=3) {
 				if($rootScope.carBattery - 2 * $rootScope.carChange >= 0) {	
 					$rootScope.score += parseInt($scope.dailyTasks[i].reward);
 					$scope.dailyTasks[i].done = true;
 				} else {
 					$rootScope.timesMissedWork += 1;
 					$rootScope.score += parseInt($scope.dailyTasks[i].penalty);
 					$scope.dailyTasks[i].missed = true;
 				}
 			}
 		} else if($scope.isMissed($scope.dailyTasks[i]) && $scope.dailyTasks[i].missed == false && $scope.firstDay == false && $scope.dailyTasks[i].id != "4") {
 			$scope.dailyTasks[i].missed = true;
 			$rootScope.score += parseInt($scope.dailyTasks[i].penalty);
 		}
 	};
 	$scope.lastUpdated = $scope.getDateWithoutTime();
});
}]);