var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$rootScope', '$modalInstance', 'controllerService', function($scope, $rootScope ,$modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance();
  $scope.task = controllerService.getTask().name;
  $scope.alertShown = false;

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.getTimer();
    if ($scope.beforeTime < $rootScope.curDate()) {
    	$scope.alertShown = true;
    } else {
    	$modalInstance.close($scope.beforeTime); 	
    }

  };
}]);