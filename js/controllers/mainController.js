var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval', function($scope,$interval){
	$scope.gameSecOnRealSec = 1800;
	$scope.hour = 0;
	$scope.realSec = 0;

	var test = $interval(function(){$scope.realSec = $scope.realSec + 1;
		$scope.hour = ($scope.realSec*$scope.gameSecOnRealSec)/3600;
		},1000);
} ]);