var myApp = angular.module('smartgridgame');

myApp.controller('actionModalController', ['$scope','$modalInstance','controllerService','formatRequest', 'tasksFactory', function($scope, $modalInstance, controllerService, formatRequest, tasksFactory){
  $scope.tasks = controllerService.getTableContent();
  $scope.header = controllerService.getAppliance();
  $scope.selectedItem = "Select a task"
  $scope.buttonStyle = "margin-bottom: -15px";
  $scope.selected;
  $scope.alertShown = false;

  $scope.clicked = function(selectedItem) {
    $scope.selected = selectedItem;
    $scope.alertShown = false;
    $scope.selectedItem = $scope.selected.name;
  };

  $scope.ok = function (input, selected) {
    if (selected === undefined) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.alertShown = true;
    } else {
      controllerService.setTask(selected);
      $modalInstance.close(input);
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);