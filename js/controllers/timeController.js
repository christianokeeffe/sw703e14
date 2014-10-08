var myApp = angular.module('smartgridgame');

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

    var statusBroadcast = function(cat, val){
        $rootScope.$broadcast('status-communication', {category: cat, value: val});
    };

	$scope.startTimer = function (runTime){
        $scope.timerRunning = true;

        $scope.$watch('dateEpoch', function(){
            $scope.difference = runTime.getTime() - $scope.curDate().getTime();
            
            if($scope.difference <= 0 && $scope.timerRunning)
            {
                $scope.timerRunning = false;
                console.log($scope.item.id);
                if($scope.item.id == 3 || $scope.item.id == 4){
                    //$rootScope.$broadcast('status-communication', {category: "laundry", value: 20});
                    statusBroadcast("laundry",20);
                } else if ($scope.item.id == 6){
                    //$rootScope.$broadcast('status-communication', {category: "dishes", value: 20});
                    statusBroadcast("dishes",20);
                } else if ($scope.item.id == 7){
                    //$rootScope.$broadcast('status-communication', {category: "hygiene", value: 20});
                    statusBroadcast("hygiene",20);
                }

                $scope.timerRunning = false;
            }
        });

        /*var tid = setInterval(function(){
            $scope.difference = runTime.getTime() - $scope.curDate().getTime();
            console.log($scope.difference + " " + tid + "-"+ runTime.getTime() +"-"+ $scope.curDate().getTime());
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                console.log($scope.item.id);
                if($scope.item.id == 3 || $scope.item.id == 4){
                    $rootScope.$broadcast('status-communication', {category: "laundry", value: 20});
                } else if ($scope.item.id == 6){
                    $rootScope.$broadcast('status-communication', {category: "dishes", value: 20});
                } else if ($scope.item.id == 7){
                    $rootScope.$broadcast('status-communication', {category: "hygiene", value: 20});
                }

                clearInterval(tid);
            }
        },1000);*/
    };

    $scope.$on('module-communication', function (event, data){
        console.log('item name: ' + $scope.item.name + ', input: ' + data.username + ', time: ' + data.runTime);
        if($scope.item.name == data.username){
            runTime = new Date(0);
            runTime.setUTCSeconds($scope.dateEpoch + 150000);
            $scope.startTimer(runTime);
        }
    });
}]);