var myApp = angular.module('smartgridgame');

myApp.controller('dailyTaskController', ['$scope', '$rootScope', function($scope, $rootScope){

var first = true;
$scope.dailyTasks = [
      {"task": "Charge Car", "startTime": Date(), "endTime": Date(), "done": false, "missed": true},
      {"task": "Make breakfast", "startTime": Date(), "endTime": Date(), "done": true, "missed": false},
      {"task": "Make lunch", "startTime": Date(), "endTime": Date(), "done": false, "missed": false}
]

var getDateWithoutTime = function() {
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

var timeBeforeTime = function(startTime, endTime) {
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
	if (timeBeforeTime(startTime, gameTime) && timeBeforeTime(gameTime, endTime)) {
		return true;
	} else {
		return false;
	}
};

$scope.isMissed = function(item) {
	var gameTime = $scope.curDate();
	if(!item.done && timeBeforeTime(item.endTime, gameTime)) {
		return true;
	} else {
		return false;
	}
};

$scope.updateStatus = function(input) {
	for(i = 0; i < $scope.dailyTasks.length; i++) {
		if($scope.dailyTasks[i].task == input) {
			if ($scope.inTime($scope.dailyTasks[i].startTime, $scope.dailyTasks[i].endTime)) {
				$scope.dailyTasks[i].done = true;
				//give points for completed task
			}
		}
	}
};

var updater = $scope.$watch('dateEpoch', function(){
	if($scope.dateEpoch != 1409565600 && first) {
		first = false;
		$scope.lastUpdated = getDateWithoutTime();
		for(i = 0; i < $scope.dailyTasks.length; i++)
		{
			$scope.dailyTasks[i].endTime = new Date(0, 0, 0, 10, 0, 0);
			$scope.dailyTasks[i].startTime = new Date(0, 0, 0, 7, 0, 0);
		}
	}
	//Updates every new day
	if(getDateWithoutTime() > $scope.lastUpdated) {
 		console.log("New day");
 		$scope.newDay();
 	}
 	//Checks if a deadline is missed on a daily task
 	for (i = 0; i < $scope.dailyTasks.length; i++) {
 		if($scope.isMissed($scope.dailyTasks[i])) {
 			//$scope.dailyTasks[i].missed = true;
 			//Give negative points for missed task
 		}
 	};
 	$scope.lastUpdated = getDateWithoutTime();
});
}]);