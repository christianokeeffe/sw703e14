var myApp = angular.module('smartgridgame');

myApp.controller('dateTimePickerController', ['$scope', '$rootScope' ,'controllerService', function($scope, $rootScope ,controllerService){
  $scope.date = $rootScope.curDate();
  controllerService.setTimer($scope.date);

  //Used to set the minumum selectable date in the calender
  $scope.toggleMin = function() {
    $scope.minDate = $scope.date;
  };
  $scope.toggleMin();

  //data used by the timepicker
  $scope.time = $scope.date;
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = false;

   $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  //methods to update the chosen date and time
  $scope.opdateDateTime = function(date, time){
    controllerService.setTimer(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0));
  };

  $scope.changed = function () {
    $scope.opdateDateTime($scope.date, $scope.time);
  };
}]);