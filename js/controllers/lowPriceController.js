var lowPriceController = function($scope, $modalInstance, selectedItem, selectedAction){
  $scope.header = selectedAction;
  $scope.task = selectedItem.name;

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };
};