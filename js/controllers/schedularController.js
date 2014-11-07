var myApp = angular.module('smartgridgame');

myApp.controller('schedularController', ['$scope', '$rootScope', function($scope, $rootScope){

  $rootScope.datesToSchedule = [];
  $rootScope.timersToSchedule = [];
  $rootScope.completeScheduleList = [];

  function boardCastActivation(task, appliance)
  {
    $scope.$broadcast('module-communication', {task: task, appliance: appliance});
  }

  $scope.secondsToDate = function(input){
    var result = new Date(0);
    result.setUTCSeconds(input);
    return result;
  }

  $rootScope.checkIndexOnTimerList = function(name){
    for (i = 0; i < $rootScope.timersToSchedule.length; i++)
    {
        if ($rootScope.timersToSchedule[i].appliance.name == name)
        {
            return i;
        }
    }
    return -1;
  };

  $rootScope.checkIndexOnCompleteList = function(name){
  	for (i = 0; i < $scope.completeScheduleList.length; i++)
    {
        if ($scope.completeScheduleList[i].appliance.name == name)
        {
            return i;
        }
    }
    return -1;
  };

  var schedular = $scope.$watch('dateEpoch', function(){

    for(i = 0; i < $rootScope.timersToSchedule.length; i++) 
    {
      var tempTimer = $rootScope.timersToSchedule[i];

      if(tempTimer.timerStarted == false)
      {
        boardCastActivation(tempTimer.task, tempTimer.appliance);
        $rootScope.timersToSchedule[i].timerStarted = true;
      }
    }

    for(index = 0; index < $scope.datesToSchedule.length; index++)
    {
      var tempSchedule = $scope.datesToSchedule[index];

      if((tempSchedule.passive == 0 && tempSchedule.starttime - $scope.curDate().getTime()/1000) <= 0)
      {
        $rootScope.timersToSchedule.push({appliance: tempSchedule.appliance, task: tempSchedule.task, timerStarted: false});
        $scope.datesToSchedule.splice(index, 1);
      }
    }
  });
}]);