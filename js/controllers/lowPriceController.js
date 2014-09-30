var myApp = angular.module('smartgridgame');

myApp.controller('lowPriceController', ['$scope', '$modalInstance', 'lowPriceService', function($scope, $modalInstance, lowPriceService) {
  alert($parent.test);
  $scope.header = lowPriceService.getApplience();
  $scope.task = lowPriceService.getTask().name;
  $scope.beforeTime = new Date();

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
    $scope.beforeTime = lowPriceService.get();
    $modalInstance.close($scope.beforeTime);
  };
}]);