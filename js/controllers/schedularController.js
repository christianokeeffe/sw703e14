var myApp = angular.module('smartgridgame');

myApp.controller('schedularController', ['$scope', '$rootScope', function($scope, $rootScope){

  $rootScope.datesToSchedule = [];
  $rootScope.timersToSchedule = [];

  function boardCastActivation(task, inputType)
  {
    $scope.$broadcast('module-communication', {task: task, type: inputType});
  }

  $scope.SecondsToDate = function(input){
    var result = new Date(0);
    result.setUTCSeconds(input);
    return result;
  }

  var checkIndexOfTask = function(name){
    for (i = 0; i < $scope.timersToSchedule.length; i++)
    {
        if ($scope.timersToSchedule[i].task.name == name)
        {
            return i;
        }
    }
    return -1;
  };

  var schedular = $scope.$watch('dateEpoch', function(){

    for(i = 0; i < $scope.timersToSchedule.length; i++) 
    {
      var tempTimer = $scope.timersToSchedule[i];

      if(tempTimer.timerStarted == false)
      {
        boardCastActivation(tempTimer.task, tempTimer.applianceType);
        $scope.timersToSchedule[i].timerStarted = true;
      }
    }

    for(index = 0; index < $scope.datesToSchedule.length; index++)
    {
      var tempSchedule = $scope.datesToSchedule[index];

      if((tempSchedule.deadline - $scope.curDate().getTime()/1000) <= 0)
      {
      	if(checkIndexOfTask(tempTimer.task.name) == -1)
        {
        	alert("no task running");
        	$scope.timersToSchedule.push({applianceType: tempSchedule.appliance.type, task: tempSchedule.task, timerStarted: false});
        } else {
        	alert("task already running");
        }
        $scope.datesToSchedule.splice(index, 1);
      }
    }
  });
}]);