var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

	$scope.startTimer = function (runTime){
        $scope.timerRunning = true;

        var unSuscribeWatch = $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime - $scope.curDate().getTime();
            console.log($scope.difference);
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                console.log($scope.item.id);
                if($scope.item.id == 3 || $scope.item.id == 4){
                    statusBroadcast("laundry",20);
                } else if ($scope.item.id == 6){
                    statusBroadcast("dishes",20);
                } else if ($scope.item.id == 7){
                    statusBroadcast("hygiene",20);
                }

                unSuscribeWatch();
            }
        });
    };

    $scope.$on('module-communication', function (event, data){
        if($scope.item.name == data.applianceName){
            var runTime = $scope.curDate().getTime()/1000 + data.runtime;
            $scope.startTimer(runTime);
        }
    });
}]);