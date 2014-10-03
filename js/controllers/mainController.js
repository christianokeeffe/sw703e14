var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope', '$rootScope','$interval', function($scope, $rootScope, $interval){
	$scope.gameSecOnRealSec = 82000;
	$scope.dateEpoch = 1409565600;

	$rootScope.curDate = function(){
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds($scope.dateEpoch);
		return d;
	}

	$interval(function(){
		$scope.dateEpoch += $scope.gameSecOnRealSec;
		},1000);
} ]);