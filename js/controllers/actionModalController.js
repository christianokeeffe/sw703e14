var myApp = angular.module('smartgridgame');

myApp.controller('actionModalController', ['$scope','$modalInstance','controllerService','formatRequest', 'tasksFactory', function($scope, $modalInstance, controllerService, formatRequest, tasksFactory){

  $scope.tasks = controllerService.getTableContent();
  $scope.header = controllerService.getAppliance();
  $scope.selectedItem = "selectItem"
  $scope.buttonStyle = "margin-bottom: -15px";
  $scope.selected;
  $scope.noTaskChosen = false;

  $scope.clicked = function(selectedItem) {
    $scope.selected = selectedItem;
    $scope.noTaskChosen = false;
    $scope.selectedItem = $scope.selected.name;
  };

  $scope.ok = function (input, selected) {
    if (selected === undefined) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.noTaskChosen = true;
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
}]);