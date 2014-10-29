var myApp = angular.module('smartgridgame');

myApp.controller('optionalTaskController', ['$scope', '$rootScope', 'optionalTaskFactory', 'formatRequest', function($scope, $rootScope, optionalTaskFactory, formatRequest) {
  var first = true;

  $scope.optionalTasks = {};
    
  $scope.getOptionalTasks = function(){
    var geturl = {};
    geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
          return $scope.getOptionalTasks();
         }, 10);
    }
    else
    {
      optionalTaskFactory.optionalTask(geturl,
      function (response) {
        switch(response.status_code)
        {
          case '200':
            $scope.optionalTasks = response.data;
            for (var i = 0; i < $scope.optionalTasks.length; i++) {
            	$scope.optionalTasks[i].done = false;
            	$scope.optionalTasks[i].timesDone = 0;
              $scope.optionalTasks[i].day = 1;
            }
            break;
        }
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };
  $scope.getOptionalTasks();

  $scope.getDateWithoutTime = function() {
    currentDate = $scope.curDate();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  };

  $scope.newDay = function() {
    for(i = 0; i < $scope.optionalTasks.length; i++)
    {
      if($scope.optionalTasks[i].type == "d") {
        $scope.optionalTasks[i].done = false;
        $scope.optionalTasks[i].timesDone = 0;
      } else {
        if($scope.optionalTasks[i].day == 7) {
          $scope.optionalTasks[i].day = 1;
          $scope.optionalTasks[i].done = false;
          $scope.optionalTasks[i].timesDone = 0;
        } else {
          $scope.optionalTasks[i].day += 1;
        }
      }
    }
  };

  $scope.$on('task-communication', function(event, data){
    for (i = 0; i < $scope.optionalTasks.length; i++) {
      if($scope.optionalTasks[i].taskID == data.task.id && !$scope.optionalTasks[i].done) {
        if($scope.optionalTasks[i].timesDone + 1 == parseInt($scope.optionalTasks[i].times)) {
          $scope.optionalTasks[i].done = true;
          $rootScope.score += parseInt($scope.optionalTasks[i].reward);
        } else {
          $scope.optionalTasks[i].timesDone += 1;
          $rootScope.score += parseInt($scope.optionalTasks[i].reward);
        }
      }
    }
  });

  var updater = $scope.$watch('dateEpoch', function(){
    if($scope.dateEpoch != 1409565600 && first) {
      first = false;
      $scope.lastUpdated = $scope.getDateWithoutTime();
    }
    //Updates every new day
    if($scope.getDateWithoutTime() > $scope.lastUpdated) {
      $scope.newDay();
    }
    $scope.lastUpdated = $scope.getDateWithoutTime();
  });
}]);