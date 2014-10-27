var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$rootScope', '$modalInstance', 'controllerService', function($scope, $rootScope ,$modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance().name;
  $scope.task = controllerService.getTask();
  $scope.alertShown = false;

  $scope.close = function () {
    $scope.startGameTime();
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.getTimer();
    if (parseInt($scope.beforeTime.getTime()/1000) < (parseInt($scope.curDate().getTime()/1000) + parseInt($scope.task.executionTime))) {
    	$scope.alertShown = true;
    } else {
    	$modalInstance.close({appliance: controllerService.getAppliance(), task: controllerService.getTask(), deadline: $scope.beforeTime.getTime()/1000}); 	
    }
  };
}]);