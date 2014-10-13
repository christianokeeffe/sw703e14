var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

	$scope.startTimer = function (runTime, value){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime() / 1000;
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                if($scope.item.type == 3 || $scope.item.id == 4){
                    statusBroadcast("laundry",value);
                } else if ($scope.item.id == 6){
                    statusBroadcast("dishes",value);
                } else if ($scope.item.id == 7){
                    statusBroadcast("hygiene",value);
                }

                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.item.name == data.applianceName){
            var runTime = parseInt($scope.curDate().getTime()/1000) + parseInt(data.runTime);
            $scope.startTimer(runTime, data.updatevalue);
        }
    });
}]);