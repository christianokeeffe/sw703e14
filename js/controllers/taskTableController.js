var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController', ['$scope', function($scope){
	$scope.tableActionContent=['Washer','Owen','Car','Dryer'];
	
	$scope.tableActionHeadA="Items";
	$scope.tableActionHeadB="Activate";

}]);