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

    $scope.changed = function (input) {
      if (input == 'time'){
    console.log('Time changed to: ' + $scope.time);
    opdateDateTime($scope.date, $scope.time);
  } else {
    console.log('Time changed to: ' + $scope.date);
    opdateDateTime($scope.date, $scope.time);
  }
  };

  $scope.opdateDateTime = function(date, time){
    dateAndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
               time.getHours(), time.getMinutes(), time.getSeconds());
    alert(dateAndTime);
  };

  $scope.clear = function() {
    $scope.time = null;
  };
};