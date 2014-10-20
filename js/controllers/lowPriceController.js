var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$rootScope', '$modalInstance', 'controllerService', function($scope, $rootScope ,$modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance().name;
  $scope.task = controllerService.getTask().name;
  $scope.alertShown = false;

  $scope.close = function () {
    $scope.startGameTime();
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.getTimer();
    if ($scope.beforeTime < $rootScope.curDate()) {
    	$scope.alertShown = true;
    } else {
    	$modalInstance.close({appliance: controllerService.getAppliance(), taskName: controllerService.getTask().name, runTime: controllerService.getTask().executionTime, deadline: $scope.beforeTime.getTime()/1000 - controllerService.getTask().executionTime}); 	
    }
  };
}]);