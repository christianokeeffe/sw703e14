var myApp = angular.module('smartgridgame');

myApp.controller('dateTimePickerController', ['$scope', '$rootScope' ,'controllerService', function($scope, $rootScope ,controllerService){
  $scope.date = $rootScope.curDate();
  controllerService.setTimer($scope.date);

  $scope.toggleMin = function() {
    $scope.minDate = $scope.date;
  };
  $scope.toggleMin();

  $scope.time = $scope.date;
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = false;
  $scope.dateAndTime = $scope.date;

  $scope.opdateDateTime = function(date, time){
    controllerService.setTimer(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0));
    $scope.dateAndTime = controllerService.getTimer();
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.changed = function () {
    $scope.opdateDateTime($scope.date, $scope.time);
  };
}]);