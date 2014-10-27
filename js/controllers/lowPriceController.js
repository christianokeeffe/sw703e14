var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$rootScope', '$modalInstance', 'controllerService', function($scope, $rootScope ,$modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance().name;
  $scope.task = controllerService.getTask().name;
  
  $scope.alertShown = false;

  $scope.close = function () {
    $scope.startGameTime();
    $modalInstance.dismiss("Closed");
  };

  $scope.formatTime = function (time) {
    return pad(Math.floor(time/3600),2)+":"+pad((time%3600),2);
  };

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
$scope.duration = $scope.formatTime(controllerService.getTask().executionTime);

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.getTimer();
    if ($scope.beforeTime < $rootScope.curDate()) {
    	$scope.alertShown = true;
    } else {
    	$modalInstance.close({appliance: controllerService.getAppliance(), task: controllerService.getTask(), deadline: $scope.beforeTime.getTime()/1000}); 	
    }
  };
}]);