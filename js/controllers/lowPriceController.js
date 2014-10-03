var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$modalInstance', 'controllerService', function($scope, $modalInstance, controllerService) {
  $scope.header = controllerService.getAppliance();
  $scope.task = controllerService.getTask().name;

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
    $scope.beforeTime = controllerService.get();
    $modalInstance.close($scope.beforeTime);
  };
}]);