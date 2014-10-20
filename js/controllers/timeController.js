var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

        $scope.startTimer = function (runTime, type, value){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime() / 1000;
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                if(type == 3 || type == 4){
                    statusBroadcast("laundry", value);
                } else if (type == 6){
                    statusBroadcast("dishes", value);
                } else if (type == 7){
                    statusBroadcast("hygiene", value);
                }

                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.timerSchedule.taskName == data.taskName){
            var runTime = parseInt($scope.curDate().getTime()/1000) + parseInt(data.runTime);
            $scope.startTimer(runTime, data.appliance.type, data.updatevalue);
        }
    });
}]);