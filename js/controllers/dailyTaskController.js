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

$scope.inTime = function(startTime, endTime) {
	var gameTime = $scope.curDate();
	if ((gameTime.getHours() == startTime.getHours() && gameTime.getMinutes() >= startTime.getMinutes()) || gameTime.getHours() >= startTime.getHours()) {
		if ((gameTime.getHours() == endTime.getHours() && gameTime.getMinutes() <= endTime.getMinutes()) || gameTime.getHours() <= endTime.getHours()) {
			return true;
		} else {
			return false;
		}
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
			$scope.dailyTasks[i].startTime = new Date(0, 0, 0, 7, 0, 0);
			$scope.dailyTasks[i].endTime = new Date(0, 0, 0, 10, 0, 0);
		}
	}
	if(getDateWithoutTime() > $scope.lastUpdated) {
 		console.log("New day");
 		$scope.newDay();
 	}
 	$scope.lastUpdated = getDateWithoutTime();
});
}]);