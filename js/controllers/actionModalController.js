var myApp = angular.module('smartgridgame');

myApp.controller('actionModalController', ['$scope', '$modalInstance','controllerService','formatRequest', 'tasksFactory', '$translate', function($scope, $modalInstance, controllerService, formatRequest, tasksFactory, $translate){
  $scope.tasks = controllerService.getTableContent();
  $scope.header = controllerService.getAppliance().name;
  $translate('actionModal.selectItem').then(function (translations){$scope.selectedItem = translations;});

  $scope.buttonStyle = "margin-bottom: -15px";
  $scope.selected;
  $scope.alertShown = false;

  $scope.clicked = function(selectedTask) {
    $scope.selected = selectedTask;
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
    $scope.startGameTime();
    $modalInstance.dismiss('cancel');
  };
}]);