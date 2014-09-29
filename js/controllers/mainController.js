var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval', function($scope,$interval){
	$scope.gameSecOnRealSec = 1800;
	$scope.dateEpoch = 1409572800;

	var test = $interval(function(){
		$scope.dateEpoch += $scope.gameSecOnRealSec;
		},1000);
} ]);