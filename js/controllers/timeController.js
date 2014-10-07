var myApp = angular.module('smartgridgame');

myApp.filter('time', ['$filter', function($filter)
{
    return function (input)
    {
        if (input == null)
        {
            return "";
        }

        var offset = input/1000;
        var result = "";

        var days = Math.floor(offset/86400);
        offset = Math.floor(offset%86400);

        if(days > 0)
        {
            var temp = "";

            if(days == 1)
            {
                temp = "day";
            }
            else
            {
                temp = "days";
            }

            result += temp + ": " + days + ", ";
        }

        var hours = Math.floor(offset/3600);
        offset = Math.floor(offset%3600);

        if(hours > 0)
        {
            if(hours < 10)
            {
                result += "0" + hours;
            }
            else
            {
                result += hours;
            }
        }
        else
        {
            result += "00";
        }

        result += ":";

        var minutes = Math.floor(offset/60);

        if(minutes > 0)
        {

            if(minutes < 10)
            {
                result += "0" + minutes;
            }
            else
            {
                result += minutes;
            }
        }
        else
        {
            result += "00";
        }

        return result;
    };
}]);

myApp.controller('timeController', ['$scope', '$rootScope','$interval', function ($scope, $rootScope, $interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

	$scope.startTimer = function (runTime){
        $scope.timerRunning = true;
        var tid = setInterval(function(){
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
        },1000);
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