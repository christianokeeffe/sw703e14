var myApp = angular.module('smartgridgame');

myApp.controller('dateTimePickerController', ['$scope', 'controllerService', function($scope, controllerService){
  //$scope.date = $scope.curDate();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.time = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.dstep = 1;
  $scope.ismeridian = false;
  $scope.dateAndTime = new Date();

  $scope.opdateDateTime = function(date, time){
    controllerService.setTimer(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0));
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.changed = function () {
    $scope.opdateDateTime($scope.date, $scope.time);
  };

  $scope.clear = function() {
    $scope.time = null;
  };
}]);