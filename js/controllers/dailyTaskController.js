var myApp = angular.module('smartgridgame');

myApp.controller('dailyTaskController', ['$scope', '$rootScope', function($scope, $rootScope){

var getDateWithoutTime = function() {
	currentDate = $scope.curDate();
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
};


$scope.dailyTasks = [
      {"task": "Charge Car", "startTime": "7:00", "endTime": "10:00", "done": false, "missed": true},
      {"task": "Make breakfast", "startTime": "10:00", "endTime": "13:00", "done": true, "missed": false},
      {"task": "Make lunch", "startTime": "15:00", "endTime": "18:00", "done": false, "missed": false}
]

$scope.newDay = function() {
	for(i = 0; i < $scope.dailyTasks.length; i++)
	{
		$scope.dailyTasks[i].done = false;
		$scope.dailyTasks[i].missed = false;
	}
};

/*$scope.updateStatus = function() {
	for(i = 0; i < $scope.dailyTasks.length; i++){
		if() {

		}
	}
}*/

var first = true;
var updater = $scope.$watch('dateEpoch', function(){
	if($scope.dateEpoch != 1409565600 && first)
	{
		first = false;
		$scope.lastUpdated = getDateWithoutTime();
	}
	if(getDateWithoutTime() > $scope.lastUpdated) {
 		console.log("New day");
 		$scope.newDay();
 		$scope.lastUpdated = getDateWithoutTime();
 	} else {
 		$scope.lastUpdated = getDateWithoutTime();
 		$scope.dailyTasks[0].done = false;
 	};
});
}]);