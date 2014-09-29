var lowPriceController = function($scope, $modalInstance, lowPriceService, selectedItem, selectedAction){
  $scope.header = selectedAction;
  $scope.task = selectedItem.name;
  $scope.beforeTime = new Date();

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
  	$scope.beforeTime = lowPriceService.get();
  	$modalInstance.close($scope.beforeTime);
  };
};