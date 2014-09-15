var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController', ['$scope', function($scope){
	$scope.tableContent=['Washer','Owen','Car','Dryer'];
	
	$scope.tableHeadA="Items";
	$scope.tableHeadB="Activate";

}]);