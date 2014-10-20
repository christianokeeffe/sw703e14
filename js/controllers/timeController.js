var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

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

    $scope.startTimer = function (runTime, type, task){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime() / 1000;

            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                if(type == 3 || type == 4){                    
                    statusBroadcast("laundry", parseInt(task.updateValue));
                } else if (type == 6){
                    statusBroadcast("dishes", parseInt(task.updateValue));
                } else if (type == 7){
                    statusBroadcast("hygiene", parseInt(task.updateValue));
                }

                $scope.timersToSchedule.splice(checkIndexOfTask(task.name),1);
                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.timerSchedule.task.name == data.task.name){
            var runTime = parseInt($scope.curDate().getTime()/1000) + parseInt(data.task.executionTime);
            $scope.startTimer(runTime, data.type, data.task);
        }
    });
}]);