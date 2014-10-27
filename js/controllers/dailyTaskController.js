var myApp = angular.module('smartgridgame');

myApp.controller('dailyTaskController', ['$scope', '$rootScope', function($scope, $rootScope){

var first = true;
var firstDay = true;
var startDate = new Date(0, 0, 0, 7, 0, 0);
var endDate = new Date(0, 0, 0, 10, 0, 0);
$scope.dailyTasks = [
      {"task": "Charge", "startTime": startDate, "endTime": endDate, "done": false, "missed": false},
      {"task": "Make breakfast", "startTime": startDate, "endTime": endDate, "done": false, "missed": false},
      {"task": "Make lunch", "startTime": startDate, "endTime": endDate, "done": false, "missed": false}
]

$scope.getDateWithoutTime = function() {
	currentDate = $scope.curDate();
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
};

$scope.newDay = function() {
	for(i = 0; i < $scope.dailyTasks.length; i++)
	{
		$scope.dailyTasks[i].done = false;
		$scope.dailyTasks[i].missed = false;
	}
};

$scope.timeBeforeTime = function(startTime, endTime) {
	if(startTime.getHours() != endTime.getHours()) {
		return (startTime.getHours() < endTime.getHours());
	} else if (startTime.getMinutes() != endTime.getMinutes()) {
		return (startTime.getMinutes() < endTime.getMinutes());
	} else {
		return true;
	}
}

$scope.inTime = function(startTime, endTime) {
	var gameTime = $scope.curDate();
	if ($scope.timeBeforeTime(startTime, gameTime) && $scope.timeBeforeTime(gameTime, endTime)) {
		return true;
	} else {
		return false;
	}
};

$scope.isMissed = function(item) {
	var gameTime = $scope.curDate();
	if(!item.done && $scope.timeBeforeTime(item.endTime, gameTime)) {
		return true;
	} else {
		return false;
	}
};

$scope.$on('task-communication', function(event, data){
	for (i = 0; i < $scope.dailyTasks.length; i++) {
		if($scope.dailyTasks[i].task == data.task.name) {
			if($scope.inTime($scope.dailyTasks[i].startTime, $scope.dailyTasks[i].endTime) && $scope.dailyTasks[i].done == false) {
				$scope.dailyTasks[i].done = true;
				$rootScope.score += 5000;
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
 		if($scope.isMissed($scope.dailyTasks[i]) && $scope.dailyTasks[i].missed == false && $scope.firstDay == false) {
 			$scope.dailyTasks[i].missed = true;
 			$rootScope.score -= 10000;
 		}
 	};
 	$scope.lastUpdated = $scope.getDateWithoutTime();
});
}]);