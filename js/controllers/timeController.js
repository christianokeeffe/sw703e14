var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

	$scope.startTimer = function (runTime, type){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime() / 1000;
            console.log($scope.difference);
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                console.log($scope.item.type);
                if(type == 3 || type == 4){
                    statusBroadcast("laundry",20);
                } else if (type == 6){
                    statusBroadcast("dishes",20);
                } else if (type == 7){
                    statusBroadcast("hygiene",20);
                }

                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.timerSchedule.taskName == data.taskName){
            var runTime = parseInt($scope.curDate().getTime()/1000) + parseInt(data.runTime);
            $scope.startTimer(runTime, data.appliance.type);
        }
    });
}]);