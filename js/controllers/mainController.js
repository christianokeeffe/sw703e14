var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval', function($scope,$interval){
	$scope.gameSecOnRealSec = 1800;
	$scope.dateEpoch = 1409565600;

	$scope.curDate = function(){
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds($scope.dateEpoch);
		return d;
	}

	var test = $interval(function(){
		$scope.dateEpoch += $scope.gameSecOnRealSec;
		},1000);
} ]);