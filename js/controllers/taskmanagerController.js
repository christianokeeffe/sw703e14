var myApp = angular.module('smartgridgame');

myApp.controller('taskmanagerController', ['$scope', function($scope) {
	$scope.selected = "Select a task..";
    $scope.lifeOfAction = ['bake', 'make'];

	$scope.update = function (action){
    	$scope.selected = action;
    }
}]);