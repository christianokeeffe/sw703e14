var myApp = angular.module('smartgridgame');

myApp.controller('actionModalController', ['$scope', '$modalInstance','controllerService','formatRequest', '$translate', function($scope, $modalInstance, controllerService, formatRequest, $translate){
  $scope.tasks = controllerService.getTasks();
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

  $scope.formatTime = function (time) {
    return pad(Math.floor(time/3600),2)+":"+pad(((time%3600)/3600)*60,2);
  };

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);