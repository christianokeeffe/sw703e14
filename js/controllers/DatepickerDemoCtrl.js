var dateTimePickerController = function ($scope) {
  $scope.today = function() {
    $scope.date = new Date();
  };
  $scope.today();
  $scope.time = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = false;
  $scope.dateAndTime = new Date();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.changed = function () {
  $scope.opdateDateTime($scope.date, $scope.time);
  console.log('Time changed to: ' + $scope.dateAndTime);
  };

  $scope.opdateDateTime = function(date, time){
    $scope.dateAndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
               time.getHours(), time.getMinutes(), 0);
  };

  $scope.clear = function() {
    $scope.time = null;
  };
};