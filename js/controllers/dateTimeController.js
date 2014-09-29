var myApp = angular.module('smartgridgame');

myApp.controller('dateTimePickerController', ['$scope', 'lowPriceService', function($scope, lowPriceService){
  $scope.today = function() {
    $scope.date = new Date();
  };
  $scope.today();

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
    lowPriceService.setTimer(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0));
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