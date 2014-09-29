var lowPriceController = function($scope, $modalInstance, 'lowPriceService', selectedItem, selectedAction){
  $scope.header = selectedAction;
  $scope.task = selectedItem.name;

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };

  $scope.setTimer = function () {
  	var beforeTime = this.get();
  	modalInstance.close(beforeTime);
  };
};