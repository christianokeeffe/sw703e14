var myApp = angular.module('smartgridgame');

myApp.controller('schedularController', ['$scope', '$rootScope', function($scope, $rootScope){

  $rootScope.datesToSchedule = [];
  $rootScope.timersToSchedule = [];
  $rootScope.completeScheduleList = [];

  function boardCastActivation(task, appliance)
  {
    var extime = task.executionTime;
    if(appliance.type == 2)
    {
      console.log("Org time:" + task.executionTime);
      var chargePerTime = task.updateValue/task.executionTime;
      extime = (100-$rootScope.carBattery)/chargePerTime;
      extime = extime - extime%60;
      console.log("New time:" + extime);
    }
    $rootScope.$broadcast('bill-communication', {name: appliance.name, time: extime, energyConsumption: appliance.energyConsumption});
    $scope.$broadcast('module-communication', {task: task, time: extime, appliance: appliance});
  }

  $scope.secondsToDate = function(input){
    var result = new Date(0);
    result.setUTCSeconds(input);
    return result;
  }

  $rootScope.checkIndexOnTimerList = function(name){
    for (i = 0; i < $scope.timersToSchedule.length; i++)
    {
        if ($scope.timersToSchedule[i].appliance.name == name)
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

    for(i = 0; i < $scope.timersToSchedule.length; i++) 
    {
      var tempTimer = $scope.timersToSchedule[i];

      if(tempTimer.timerStarted == false)
      {
        boardCastActivation(tempTimer.task, tempTimer.appliance);
        $scope.timersToSchedule[i].timerStarted = true;
      }
    }

    for(index = 0; index < $scope.datesToSchedule.length; index++)
    {
      var tempSchedule = $scope.datesToSchedule[index];

      if((tempSchedule.starttime - $scope.curDate().getTime()/1000) <= 0)
      {
        $scope.timersToSchedule.push({appliance: tempSchedule.appliance, task: tempSchedule.task, timerStarted: false});
        $scope.datesToSchedule.splice(index, 1);
      }
    }
  });
}]);