var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

    var taskBroadcast = function(task) {
        $rootScope.$broadcast('task-communication', {task: task});
    };

    $scope.startTimer = function (runTime, appliance, task){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime() / 1000;

            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                if(appliance.type == 3){                    
                    statusBroadcast("laundry", parseInt(task.updateValue));
                } else if (appliance.type == 4 || appliance.type == 8){
                    statusBroadcast("dryClothes", parseInt(task.updateValue));
                } else if (appliance.type == 6){
                    statusBroadcast("dishes", parseInt(task.updateValue));
                } else if (appliance.type == 7){
                    statusBroadcast("hygiene", parseInt(task.updateValue));
                } else if (appliance.type == 2) {
                    statusBroadcast("car", parseInt(task.updateValue));
                }

                $scope.timersToSchedule.splice($rootScope.checkIndexOnTimerList(appliance.name),1);
                $scope.completeScheduleList.splice($rootScope.checkIndexOnCompleteList(appliance.name),1);
                taskBroadcast(task);
                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.timerSchedule.task.name == data.task.name){
            var runTime = parseInt($scope.curDate().getTime()/1000) + parseInt(data.task.executionTime) - $rootScope.gameSecOnRealSec;
            $scope.startTimer(runTime, data.appliance, data.task);
        }
    });
}]);