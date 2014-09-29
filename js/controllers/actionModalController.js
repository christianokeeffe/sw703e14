var actionModalController = function ($scope, $modalInstance, tableActionContent, selectedAction) {
	$scope.items = tableActionContent;
  $scope.header = selectedAction;
  $scope.selectedItem = "Select an item";
  $scope.buttonStyle = "margin-bottom: -15px";
  $scope.selected;
  $scope.isCollapsed = false;

  $scope.clicked = function(selectedItem){
  	$scope.selected = selectedItem;
    $scope.isCollapsed = false;
    $scope.selectedItem = $scope.selected.name;
  }

  $scope.ok = function (input, selected) {
    if (selected === undefined) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.isCollapsed = true;
    } else {
      var returnValues = {
        "mode": input,
        "item": selected
      };
      $modalInstance.close(returnValues);
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};