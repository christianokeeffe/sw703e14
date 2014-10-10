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
            $scope.difference = runTime.getTime() - $scope.curDate().getTime();
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
        console.log('item name: ' + $scope.item.name + ', input: ' + data.applianceName + ', time: ' + data.runTime);
        if($scope.item.name == data.applianceName){
            runTime = new Date(0);
            runTime.setUTCSeconds(($scope.curDate().getTime()/1000) + 150000);
            $scope.startTimer(runTime);
        }
    });
}]);