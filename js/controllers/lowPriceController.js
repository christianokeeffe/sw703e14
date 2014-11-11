var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$rootScope', '$modalInstance', 'controllerService', function($scope, $rootScope ,$modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance().name;
  $scope.task = controllerService.getTask();

  $scope.alertShown = false;

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.formatTime = function (time) {
    return pad(Math.floor(time/3600),2)+":"+pad(((time%3600)/3600)*60,2);
  };

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
$scope.duration = $scope.inputlist(controllerService.getTask().executionTime);

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.getTimer();
    if (parseInt($scope.beforeTime.getTime()/1000) < (parseInt($scope.curDate().getTime()/1000) + parseInt($scope.task.executionTime))) {
    	$scope.alertShown = true;
    } else {
    	$modalInstance.close({appliance: controllerService.getAppliance(), task: controllerService.getTask(), deadline: $scope.beforeTime.getTime()/1000}); 	
    }
  };
}]);