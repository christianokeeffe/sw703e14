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

myApp.controller('timeController', ['$scope','$interval', function ($scope,$interval){
	$scope.timerRunning = false;
    $scope.difference = 0;

	$scope.startTimer = function (runTime){
        $scope.timerRunning = true;
        var tid = setInterval(function(){
            $scope.difference = runTime.getTime() - $scope.curDate().getTime();
            console.log($scope.difference + " " + tid);
            if($scope.difference <= 0)
            {
                $scope.timerRunning = false;
                clearInterval(tid);
            }
        },1000);
    };

    $scope.$on('module-communication', function (event, data){
        console.log('item name: ' + $scope.item.name + ', input: ' + data.username + ', time: ' + data.runTime);
        if($scope.item.name == data.username){
            var runTime = new Date(0);
            runTime.setUTCSeconds($scope.dateEpoch + 600000);
            $scope.startTimer(runTime);
        }
    });
}]);